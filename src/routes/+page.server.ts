import { client } from "$lib/graphql/client";
import { GET_EPISODES_PAGE } from "$lib/graphql/queries";
import type { Episode } from "$lib/models/Episode.type";
import { error } from "@sveltejs/kit";

interface EpisodesPage {
  results: Array<Episode>;
  info: {
    next: number | null;
  };
}
interface EpisodesPageResponse {
  episodes: EpisodesPage
}

export async function load() {
  try {
    let allEpisodes: Episode[] = [];
    let nextPage: number | null = 1;

    while (nextPage) {
      const response: { data?: EpisodesPageResponse } = await client
        .query<{ episodes: EpisodesPage }>(GET_EPISODES_PAGE, {
          page: nextPage,
        })
        .toPromise();

      if (!response.data?.episodes) {
        throw error(500, "Failed to fetch episodes");
      }

      const { results, info } = response.data.episodes;

      allEpisodes = [...allEpisodes, ...results];
      nextPage = info.next;
    }

    const seasons: Record<string, Episode[]> = allEpisodes.reduce(
      (acc: Record<string, Episode[]>, episode: Episode) => {
        const season = episode.episode.match(/S(\d{2})/)?.[1];
        if (season) {
          acc[season] = acc[season] || [];
          acc[season].push(episode);
        }
        return acc;
      },
      {}
    );

    return { seasons };
  } catch (err) {
    console.error("Error loading episodes:", err);
    throw error(500, "Failed to fetch episodes");
  }
}

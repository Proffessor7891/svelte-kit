import { client } from '$lib/graphql/client';
import { GET_SEASON_DETAILS } from '$lib/graphql/queries';
import type { Character } from '$lib/models/Character.type';
import type { Episode } from '$lib/models/Episode.type';
import { error } from '@sveltejs/kit';

interface SeasonDetails {
  episodes: Episode[];
  characters: Character[];
}

export async function load({ params }: { params: { seasonId: string } }): Promise<SeasonDetails> {
  const { seasonId } = params;

  try {
    const response = await client
      .query(GET_SEASON_DETAILS, { seasonId })
      .toPromise();

    if (!response.data || !response.data.episodes) {
      throw error(404, 'Season not found');
    }

    const episodes: Episode[] = response.data.episodes.results;

    const characters: Character[] = [
      ...new Map(
        episodes
          .flatMap((ep: Episode) => ep.characters)
          .map((char: Character) => [char.id, char])
      ).values(),
    ];

    return {
      episodes,
      characters,
    };
  } catch (err) {
    console.error(err);
    throw error(500, 'Failed to fetch season data');
  }
}

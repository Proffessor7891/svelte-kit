import { client } from '$lib/graphql/client';
import { GET_EPISODE_DETAILS } from '$lib/graphql/queries';
import type { Episode } from '$lib/models/Episode.type';
import { error } from '@sveltejs/kit';


export async function load({ params }: { params: { episodeId: string } }) {
  const { episodeId } = params;

  try {
    const { data, error: graphqlError } = await client
      .query(GET_EPISODE_DETAILS, { id: episodeId })
      .toPromise();

    if (graphqlError) {
      console.error(graphqlError);
      throw error(500, 'GraphQL error occurred');
    }

    if (!data?.episode) {
      throw error(404, 'Episode not found');
    }

    return {
      episode: {...data.episode} as Episode,
    };
  } catch (err) {
    console.error('Error fetching episode:', err);
    throw error(500, 'Failed to fetch episode data');
  }
}

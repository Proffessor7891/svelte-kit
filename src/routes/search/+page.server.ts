import { client } from "$lib/graphql/client";
import { SEARCH_QUERY } from "$lib/graphql/queries";
import type { Character } from "$lib/models/Character.type";
import type { Episode } from "$lib/models/Episode.type";
import { type Actions, fail, json } from "@sveltejs/kit";


export interface SearchResults {
  characters: Character[] | null;
  episodes: Episode[] | null;
  success: boolean;
  error:string;
}

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const query = formData.get('query')?.toString().trim();

    if (!query || query.length < 3) {
      return fail(400, { error: 'Query must be at least 3 characters' });
    }

    try {

      const { data, error: graphqlError } = await client
        .query(SEARCH_QUERY, { name: query })
        .toPromise();

      if (graphqlError) {
        console.error('GraphQL Error:', graphqlError);
        return fail(500, { error: 'Failed to fetch data' });
      }

      const characters: Character[] = data?.characters?.results ?? [];
      const episodes: Episode[] = data?.episodes?.results ?? [];

      if (characters.length === 0 && episodes.length === 0) {
        return fail(404, { results: [], error: 'No results found' });
      }

      return {
        success: true,
        characters,
        episodes,
      } as SearchResults;
    } catch (err) {
      console.error('Error executing search:', err);
      return fail(500, { error: 'An unexpected error occurred' });
    }
  },
};

import { client } from "$lib/graphql/client.js";
import { GET_CHARACTER_DETAILS } from "$lib/graphql/queries";
import type { Character } from "$lib/models/Character.type";
import { error } from "@sveltejs/kit";

interface LoadParams {
  params: {
    characterId: string;
  };
}

interface CharacterResponse {
  character: Character;
  data: {
    character: Character | null;
  } | null;
}

export async function load({ params }: LoadParams) {
  const { characterId } = params;

  try {
    const response = await client
      .query<CharacterResponse>(GET_CHARACTER_DETAILS, {
        id: characterId,
      })
      .toPromise();

    if (!response.data || !response.data.character) {
      throw error(404, "Character not found");
    }

    return {
      character: response.data.character,
    };
  } catch (err) {
    console.error("Error fetching character data:", err);
    throw error(500, "Failed to fetch character data");
  }
}

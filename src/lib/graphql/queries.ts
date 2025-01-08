import type { Episode } from "$lib/models/Episode.type";
import { gql } from "@urql/svelte";

export const GET_EPISODES_BY_SEASON = gql`
  query GetEpisodesBySeason($season: String!) {
    episodes(filter: { episode: $season }) {
      results {
        id
        name
        episode
        characters {
          id
          name
        }
      }
    }
  }
`;

export const SEARCH_QUERY = gql`
  query Search($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
    episodes(filter: { name: $name }) {
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

export const GET_EPISODE_DETAILS = gql`
  query GetEpisodeDetails($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        image
        status
        gender
        created
      }
    }
  }
`;

export const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetails($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      episode {
        id
        name
        created
        episode
      }
    }
  }
`;

export const GET_ALL_EPISODES = gql`
  query GetAllEpisodes {
    episodes {
      info {
        count
        pages
      }
      results {
        id
        name
        episode
        air_date
      }
    }
  }
`;

export const GET_EPISODES_PAGE = gql`
  query GetEpisodesPage($page: Int!) {
    episodes(page: $page) {
      info {
        next
      }
      results {
        id
        name
        episode
        air_date
      }
    }
  }
`;

export const GET_SEASON_DETAILS = gql`
  query GetSeasonDetails($seasonId: String!) {
    episodes(filter: { episode: $seasonId }) {
      results {
        id
        name
        episode
        air_date
        characters {
          id
          name
          image
        }
      }
    }
  }
`;
export interface GetSeasonDetailsResponse {
  episodes: {
    results: Episode[];
  };
}

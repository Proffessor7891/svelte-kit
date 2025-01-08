import type { Episode } from "./Episode.type";

export interface Season {
  seasonNumber: string;
  episodes: Episode[];
}

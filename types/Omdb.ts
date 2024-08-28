// types/omdbTypes.ts
export interface OmdbRatingProps {
  Source: string;
  Value: string;
}

export interface OmdbProps {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: OmdbRatingProps[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: "movie" | "series";
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface OmdbApiResponse {
  Search?: OmdbProps[];
  totalResults: string;
  Response: string;
  Error?: string;
}

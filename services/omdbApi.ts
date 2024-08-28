import type { OmdbApiResponse } from "~/types/Omdb";

export const useOmdbFetch = async (
  search: string,
  type: "movie" | "series" | "",
  page: number
): Promise<OmdbApiResponse> => {
  const { omdbApi, omdbApiKey } = useRuntimeConfig().public;

  try {
    const data = await $fetch<OmdbApiResponse | null>(
      `${omdbApi}?apikey=${omdbApiKey}&s=${search}&type=${type}&page=${page}`
    );

    if (data && data.Response === "False") {
      throw new Error(`Erro na busca: ${data.Error}`);
    }

    return (
      data ?? {
        Response: "False",
        Search: [],
        totalResults: "0",
      }
    );
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};

export const useOmdbFetchDetail = async (
  imdbId: string
): Promise<OmdbApiResponse | null> => {
  const { omdbApi, omdbApiKey } = useRuntimeConfig().public;

  try {
    const data = await $fetch<OmdbApiResponse | null>(
      `${omdbApi}?apikey=${omdbApiKey}&i=${imdbId}`
    );

    if (data && data.Response === "False") {
      throw new Error(`Erro na busca: ${data.Error}`);
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch detail data:", error);
    throw error;
  }
};

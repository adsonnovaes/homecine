<template>
  <div>
    <header v-if="!loading">
      <div class="h-[400px]">
        <v-img
          :src="movie?.Poster"
          alt="cover image"
          height="400"
          contain
        ></v-img>
      </div>
      <div class="mt-16">
        <div class="text-sm text-gray-400 mb-4">
          <span class="text-sm text-gray-400 mb-4">Homecine / Movies</span>
        </div>
        <h1 class="text-4xl font-bold mb-6">{{ movie?.Title }}</h1>
      </div>
    </header>

    <div v-if="!loading" class="bg-black/30 rounded-md shadow-x">
      <v-table class="mt-8 !bg-transparent !text-white !text-base">
        <tbody>
          <tr>
            <td class="!p-8 font-bold">Título</td>
            <td>{{ movie?.Title }}</td>
          </tr>
          <tr>
            <td class="!p-8 font-bold">Ano</td>
            <td>{{ movie?.Year }}</td>
          </tr>
          <tr>
            <td class="!p-8 font-bold">Classificação</td>
            <td>{{ movie?.Rated }}</td>
          </tr>
          <tr>
            <td class="!p-8 font-bold">Lançamento</td>
            <td>{{ movie?.Released }}</td>
          </tr>
          <tr>
            <td class="!p-8 font-bold">Duração</td>
            <td>{{ movie?.Runtime }}</td>
          </tr>
          <tr>
            <td class="!p-8 font-bold">Gênero</td>
            <td>{{ movie?.Genre }}</td>
          </tr>
          <tr>
            <td class="!p-8 font-bold">Diretor</td>
            <td>{{ movie?.Director }}</td>
          </tr>
          <tr>
            <td class="!p-8 font-bold">Roteirista</td>
            <td>{{ movie?.Writer }}</td>
          </tr>
          <tr>
            <td class="!p-8 font-bold">Elenco</td>
            <td>{{ movie?.Actors }}</td>
          </tr>
          <tr>
            <td class="!p-8 font-bold">Sinopse</td>
            <td>{{ movie?.Plot }}</td>
          </tr>
          <tr>
            <td class="!p-8 font-bold">Idioma</td>
            <td>{{ movie?.Language }}</td>
          </tr>
          <tr>
            <td class="!p-8 font-bold">País</td>
            <td>{{ movie?.Country }}</td>
          </tr>
          <tr>
            <td class="!p-8 font-bold">Prêmios</td>
            <td>{{ movie?.Awards }}</td>
          </tr>
          <tr>
            <td class="!p-8 font-bold">Metascore</td>
            <td>{{ movie?.Metascore }}</td>
          </tr>
          <tr>
            <td class="!p-8 font-bold">Avaliação IMDB</td>
            <td>{{ movie?.imdbRating }}</td>
          </tr>
          <tr>
            <td class="!p-8 font-bold">Votos IMDB</td>
            <td>{{ movie?.imdbVotes }}</td>
          </tr>
          <tr>
            <td class="!p-8 font-bold">Bilheteria</td>
            <td>{{ movie?.BoxOffice }}</td>
          </tr>
          <tr>
            <td class="!p-8 font-bold">Produção</td>
            <td>{{ movie?.Production }}</td>
          </tr>
          <tr>
            <td class="!p-8 font-bold">Website</td>
            <td>
              <a :href="movie?.Website" target="_blank" class="text-blue-500">
                {{ movie?.Website }}
              </a>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>

    <div v-if="loading" class="flex items-center justify-center h-[692px]">
      <div class="spinner"></div>
    </div>

    <v-snackbar
      v-model="snackbarInfo.visibility"
      color="error-600"
      timeout="2000"
      multi-line
      location="top center"
    >
      {{ snackbarInfo.message }}

      <template v-slot:actions>
        <v-btn
          density="default"
          icon="mdi-close"
          @click="snackbarInfo.visibility = false"
        ></v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import type { OmdbProps } from "~/types/Omdb";
import type { SnackbarProps } from "~/types/Snackbar";
import { useRoute } from "vue-router";
import { useOmdbFetchDetail } from "~/services/omdbApi";

definePageMeta({
  layout: "header",
});

const loading = ref(true);

const snackbarInfo = ref<SnackbarProps>({
  visibility: false,
  message: "",
});

const route = useRoute();
const id = route.params.id as string;
const movie = ref<OmdbProps | null>(null);

onMounted(async () => {
  try {
    const response = await useOmdbFetchDetail(id);

    movie.value = response;
  } catch (error) {
    snackbarInfo.value.message =
      "Ocorreu um erro inesperado ao buscar as informações!";
    snackbarInfo.value.visibility = true;
  } finally {
    loading.value = false;
  }
});

useHead({
  title: "Carregando...",
  meta: [
    { name: "description", content: "Carregando..." },
    { property: "og:title", content: "Carregando..." },
    { property: "og:description", content: "Carregando..." },
  ],
});

watchEffect(() => {
  if (movie.value) {
    useHead({
      title: `${movie.value.Title} - Homecine`,
      meta: [
        { name: "title", content: movie.value.Title },
        { name: "description", content: movie.value.Plot },
        { property: "og:title", content: movie.value.Title },
        { property: "og:description", content: movie.value.Plot },
        { property: "og:image", content: movie.value.Poster },
        { property: "og:locale", content: "pt_BR" },
        { property: "og:site_name", content: "Homecine" },
        { property: "og:type", content: "website" },
      ],
    });
  }
});
</script>

<template>
  <div>
    <header class="space-y-2">
      <h1 class="text-gray-200 text-6xl font-bold">Cinema em casa</h1>
      <p class="text-2xl text-gray-300 max-w-[632px]">
        Encontre, pesquise e analise filmes e series, um local onde você pode se
        sentir no cinema diretamente de sua casa.
      </p>
    </header>

    <div class="mt-16 mb-8 flex gap-3">
      <v-text-field
        v-model="search"
        bg-color="transparent"
        color="white-100"
        :loading="loading"
        :disabled="loading"
        append-inner-icon="mdi-magnify"
        density="comfortable"
        label="Pesquise por nome"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>

      <v-btn-toggle
        v-model="filter"
        class="rounded-lg"
        base-color="transparent"
        :style="{
          background: 'rgba(0, 0, 0, 0.2)',
          color: '#EBE9FE',
          padding: '8px',
        }"
        color="deep-purple-accent-3"
        :disabled="loading"
        group
      >
        <v-btn class="!font-bold !rounded-md mr-2" value="">Todos</v-btn>

        <!-- <v-btn class="!font-bold !rounded-md mx-1" value="movies"
            >Filmes</v-btn
          > -->

        <v-btn class="!font-bold !rounded-md" value="series">Séries</v-btn>
      </v-btn-toggle>
    </div>

    <div>
      <span
        class="flex items-center gap-2 text-xl text-gray-300 font-bold"
        v-if="filter === 'series'"
        >Séries
        <span class="text-sm text-gray-400">({{ totalResults }})</span></span
      >
      <span
        class="flex items-center gap-2 text-xl text-gray-300 font-bold"
        v-else-if="filter === 'movie'"
        >Filmes
        <span class="text-sm text-gray-400">({{ totalResults }})</span></span
      >
      <span
        class="flex items-center gap-2 text-xl text-gray-300 font-bold"
        v-else
        >Todos
        <span class="text-sm text-gray-400">({{ totalResults }})</span></span
      >
    </div>

    <v-container>
      <v-row>
        <template v-if="items.length > 0 && !loading">
          <v-col v-for="item in items" :key="item.id" cols="auto">
            <UIItemList
              :cover-image="item.coverImage"
              :title="item.title"
              :id="item.id"
            />
          </v-col>
        </template>
        <template v-else-if="items.length <= 0 && !loading">
          <div
            class="w-full h-[380px] text-center flex items-center justify-center font-bold text-gray-300 text-3xl"
          >
            Nenhum resultado encontrado.
          </div>
        </template>
      </v-row>
    </v-container>

    <div
      v-if="loading || loadingMoreItems"
      class="flex items-center justify-center h-36"
    >
      <div class="spinner"></div>
    </div>

    <div v-if="!loading && items.length > 0" class="flex justify-center mt-7">
      <v-btn
        class="text-none"
        prepend-icon="mdi-plus"
        baseColor="primary-400"
        :disabled="loadingMoreItems"
        @click="loadMore"
      >
        Carregar mais
      </v-btn>
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
import type { SnackbarProps } from "~/types/Snackbar";
import { useOmdbFetch } from "@/services/omdbApi";

definePageMeta({
  layout: "header",
});

const placeholderImage = "/img/no-image.png";

const loading = ref(true);
const loadingMoreItems = ref(false);

const items = ref<any[]>([]);
const totalResults = ref(0);

const filter = ref<"" | "movie" | "series">("");
const search = ref("One");
const page = ref(1);

const snackbarInfo = ref<SnackbarProps>({
  visibility: false,
  message: "",
});

let debounceTimeout: any = null;

const fetchMoreData = async () => {
  loadingMoreItems.value = true;
  try {
    const response = await useOmdbFetch(search.value, filter.value, page.value);

    const newItems =
      response.Search?.map((item) => ({
        id: item.imdbID,
        title: item.Title,
        coverImage: item.Poster !== "N/A" ? item.Poster : placeholderImage,
      })) || [];

    items.value = [...items.value, ...newItems];
    totalResults.value = parseInt(response.totalResults) || 0;
  } catch (error) {
    snackbarInfo.value.message =
      "Ocorreu um erro inesperado, altere a pesquisa e tente novamente!";
    snackbarInfo.value.visibility = true;
  } finally {
    loadingMoreItems.value = false;
  }
};

const fetchData = async () => {
  // Verifica se search.value é uma string não vazia ou menor que 2, para evitar erro na api
  if (
    !search.value ||
    typeof search.value !== "string" ||
    search.value.trim().length <= 2
  )
    return;

  loadingMoreItems.value = true;
  try {
    const response = await useOmdbFetch(search.value, filter.value, page.value);

    items.value =
      response.Search?.map((item) => ({
        id: item.imdbID,
        title: item.Title,
        coverImage: item.Poster,
      })) || [];

    totalResults.value = parseInt(response.totalResults) || 0;
  } catch (error) {
    items.value = [];
    totalResults.value = 0;

    snackbarInfo.value.message =
      "Ocorreu um erro inesperado, altere a pesquisa e tente novamente!";
    snackbarInfo.value.visibility = true;
  } finally {
    loadingMoreItems.value = false;
    loading.value = false;
  }
};

const onSearch = () => {
  page.value = 1;
  fetchData();
};

const loadMore = () => {
  if (loadingMoreItems.value || items.value.length >= totalResults.value)
    return;

  page.value++;
  fetchMoreData();
};

watch(filter, () => {
  page.value = 1;
  fetchData();
});

watch(search, () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(() => {
    onSearch();
  }, 1000);
});

onMounted(() => {
  fetchData();
});

useHead({
  title: "Listagem - Homecine",
  meta: [
    {
      hid: "title",
      name: "title",
      content: "Homecine",
    },
    {
      hid: "description",
      name: "description",
      content: "Filmes e seus detalhes",
    },
    {
      hid: "keywords",
      name: "keywords",
      content: "filmes, séries e tvshows",
    },
    {
      hid: "og:title",
      property: "og:title",
      content: "Homecine",
    },
  ],
});
</script>

<style>
.spinner {
  width: 11.2px;
  height: 11.2px;
  border-radius: 11.2px;
  box-shadow: 28px 0px 0 0 rgba(71, 75, 255, 0.2),
    22.7px 16.5px 0 0 rgba(71, 75, 255, 0.4),
    8.68px 26.6px 0 0 rgba(71, 75, 255, 0.6),
    -8.68px 26.6px 0 0 rgba(71, 75, 255, 0.8), -22.7px 16.5px 0 0 #474bff;
  animation: spinner-b87k6z 1s infinite linear;
}

@keyframes spinner-b87k6z {
  to {
    transform: rotate(360deg);
  }
}
</style>

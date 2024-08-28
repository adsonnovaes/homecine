<template>
  <div>
    <!-- Conteúdo da página de detalhes do item -->
    <h1 class="">Detalhes do Item: {{ id }}</h1>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;
</script>

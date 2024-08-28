<template>
  <v-app>
    <div class="w-full h-full">
      <slot />
    </div>
  </v-app>
</template>

<script lang="ts" setup>
useHead({
  htmlAttrs: {
    class: "overflow-hidden",
  },
});
</script>

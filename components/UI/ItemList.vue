<template>
  <v-card
    width="264"
    class="rounded-lg shadow-lg"
    :style="{ backgroundColor: 'rgba(0, 0, 0, 0.2) !important' }"
    @click="navigateToItem"
    hover
  >
    <div class="relative">
      <v-img
        width="264"
        height="380"
        :src="coverImage"
        alt="cover image"
        cover
      ></v-img>

      <v-card-subtitle
        opacity="1"
        class="flex justify-center items-center absolute top-4"
      >
        <v-chip
          class="text-sm !bg-purple-950 text-white rounded-full"
          variant="elevated"
          v-if="review"
        >
          <v-icon start size="small">mdi-star</v-icon>
          {{ review }}
        </v-chip>
      </v-card-subtitle>
    </div>

    <div class="text-center px-4 py-5 text-gray-300 font-bold">
      {{ title }}
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { defineProps } from "vue";

interface ItemListProps {
  id: string;
  title: string;
  review?: number;
  coverImage: string;
}

const props = defineProps<ItemListProps>();

const router = useRouter();

const navigateToItem = () => {
  router.push(`/details/${props.id}`);
};
</script>

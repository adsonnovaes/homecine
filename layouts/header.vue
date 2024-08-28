<template>
  <div class="w-full h-dvh bg-[#121829] text-white overflow-y-scroll overflow-x-hidden">
    <v-toolbar class="px-5 py-2 !shadow-lg" color="grey-900-80">
      <div class="w-[42px] h-[42px]">
        <NuxtLink to="/">
          <img
            class="object-cover w-full h-full select-none rounded-full"
            src="/img/logo.png"
            alt="Logo"
          />
        </NuxtLink>
      </div>

      <v-toolbar-title class="!font-bold">Homecine</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="logout" icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <div
      class="w-full bg-[#121829] text-white [background-image:url('/img/bg-ilustration.png')] bg-[100%] bg-repeat-y px-28 py-20"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";

useHead({
  htmlAttrs: {
    class: "overflow-hidden",
  },
});

const router = useRouter();
const { logUserOut } = useAuthStore();

const logout = () => {
  logUserOut();
  router.push("/login");
};
</script>

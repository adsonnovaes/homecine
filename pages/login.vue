<template>
  <div class="flex w-full h-full bg-gray-50">
    <div
      class="w-full h-full flex items-center justify-center flex-col gap-16 lg:w-1/2"
    >
      <div class="w-full max-w-[504px] lg:ml-8 px-8">
        <header class="flex flex-col items-center gap-4 text-center mb-4">
          <h1 class="text-2xl font-bold text-gray-900 tracking-[-1px]">
            Entre em sua conta
          </h1>
        </header>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="user.username"
            :rules="emailRules"
            label="Username"
            type="text"
            placeholder="Insira seu username"
            aria-label="Campo para inserir o username"
            :disabled="loading"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.password"
            :rules="passwordRules"
            label="Senha"
            type="password"
            placeholder="Insira a senha"
            aria-label="Campo para inserir a senha"
            :disabled="loading"
            required
          ></v-text-field>

          <UIButton size="large" @click="login" :loading="loading"
            >Login</UIButton
          >
        </v-form>
      </div>
    </div>
    <div
      class="w-1/2 h-full justify-center items-center p-8 relative hidden lg:flex"
    >
      <img
        class="object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[32px]"
        src="/public/img/bg-login.jpg"
      />

      <div
        class="max-w-[656px] bottom-8 mx-8 p-10 absolute rounded-b-[32px] backdrop-blur-sm"
      >
        <p class="text-white font-medium text-xl mt-6">
          Veja a listagem e os detalhes de diversos filmes e series diretamente
          de sua casa!
        </p>
      </div>
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
import type { VForm } from "vuetify/lib/components/index.mjs";
import type { SnackbarProps } from "~/types/Snackbar";
import type { UserLoginProps } from "~/types/User";
import { useAuthStore } from "~/store/auth";

const { authenticateUser } = useAuthStore();
const { authenticated, loading } = storeToRefs(useAuthStore());

// Informações de um user de teste
const user = ref<UserLoginProps>({
  username: "emilys",
  password: "emilyspass",
});

const snackbarInfo = ref<SnackbarProps>({
  visibility: false,
  message: "",
});

const form = ref<VForm | null>(null);
const valid = ref(false);
const router = useRouter();

const emailRules = [(value: string) => !!value || "Username é obrigatório"];
const passwordRules = [(value: string) => !!value || "Senha é obrigatório"];

const login = async () => {
  if (form.value?.validate()) {
    try {
      await authenticateUser(user.value);

      if (authenticated.value) {
        router.push("/");
      }
    } catch (error) {
      snackbarInfo.value.message = "Ocorreu um erro inesperado!";
      snackbarInfo.value.visibility = true;
    }
  }
};

useHead({
  title: "Login - Homecine",
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

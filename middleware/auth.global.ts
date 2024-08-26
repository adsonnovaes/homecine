import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to) => {
  const { authenticated } = storeToRefs(useAuthStore());
  const token = useCookie("token");

  if (token.value) {
    authenticated.value = true;
  }

  // Se o token existe e está no /login, retornar para o dashboard
  if (token.value && to?.name === "login") {
    return navigateTo("/");
  }

  // Não existe token e o user está em uma página logada
  if (!token.value && to?.name !== "login") {
    abortNavigation();
    return navigateTo("/login");
  }
});

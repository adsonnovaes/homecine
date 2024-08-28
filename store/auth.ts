import { defineStore } from "pinia";

interface UserPayloadProps {
  username: string;
  password: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ username, password }: UserPayloadProps) {
      const { authApi } = useRuntimeConfig().public;

      this.loading = true;

      try {
        const { data, error }: any = await useFetch(`${authApi}`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: {
            username,
            password,
          },
        });

        if (error.value) {
          throw new Error("Authentication failed");
        }

        if (data.value) {
          const token = useCookie("token");
          token.value = data.value.token;
          this.authenticated = true;
        }

        return data.value;
      } catch (err) {
        this.authenticated = false;
        throw err;
      } finally {
        this.loading = false;
      }
    },
    logUserOut() {
      const token = useCookie("token");
      this.authenticated = false;
      token.value = null;
    },
  },
});

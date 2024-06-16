<template>
  <div>
    <v-container v-if="!isMobile">
        <v-app-bar
            color="#EB4511"
        >

        </v-app-bar>
    </v-container>

    <v-container v-else>
        
    </v-container>
  </div>
</template>

<script>
import { RouterLink, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { usePiniaStorage } from "../store/index.js";

export default {
  setup() {
    const isMobile = ref(false);

    const piniaStorage = usePiniaStorage();
    const router = useRouter();

    onMounted(() => {
      const updateIsMobile = () => {
        isMobile.value = window.innerWidth <= 480;
        if (isMobile.value) {
          router.push({ name: "warning" });
        }
      };

      updateIsMobile();
      window.addEventListener("resize", updateIsMobile);

      return () => {
        window.removeEventListener("resize", updateIsMobile);
      };
    });

    const logout = async () => {
      await piniaStorage.clearAuthData();
      router.push({ name: "login" });
    };

    return {
      isMobile,
      logout,
    };
  },
};
</script>

<style scoped></style>

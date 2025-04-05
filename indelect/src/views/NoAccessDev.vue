<template>
  <div>
    <v-container v-if="!isMobile">
      <v-img
        class="mx-auto my-6"
        max-width="228"
        src="https://i.postimg.cc/s1v7Gj6p/your-image.jpg"
      ></v-img>

      <v-card
        block
        class="mx-auto pa-12 pb-8"
        elevation="12"
        max-width="448"
        min-height="400"
        rounded="lg"
        color="#e89c9c"
      >
        <v-card-title
          class="text-h4 text-center text-decoration-underline mb-15"
        >
          Access Denied
        </v-card-title>

        <v-card-text class="text-center">
          You are missing administrative privileges to access the content of the site you are trying to access.
          The Log Out button will redirect you to the correct path to enjoy the available features. 
          If you are an admin and this message was not intended for you please contact the system administrator.
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            class="mb-6 mt-4 center"
            color="#000000"
            size="large"
            variant="tonal"
            @click="logout"
          >
            Log Out
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>

    <v-container v-else>
      <v-img
        class="mx-auto my-6"
        max-width="228"
        src="https://i.postimg.cc/s1v7Gj6p/your-image.jpg"
      ></v-img>

      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="12"
        max-width="448"
        min-height="400"
        rounded="lg"
        color="#e89c9c"
      >
        <v-card-title
          class="text-h5 text-center text-decoration-underline mb-6"
        >
          Access denied
        </v-card-title>
        <v-card-text class="text-center">
          You are missing administrative privileges to access the content of the site you are trying to access.
          The Log Out button will redirect you to the correct path to enjoy the available features. 
          If you are an admin and this message was not intended for you please contact the system administrator.
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            class="mb-6 mt-2"
            color="#000000"
            size="large"
            variant="tonal"
            @click="logout"
          >
            Log Out
          </v-btn>
        </v-card-actions>
      </v-card>
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
        };

        updateIsMobile();
        window.addEventListener("resize", updateIsMobile);

        return () => {
          window.removeEventListener("resize", updateIsMobile);
        };
      });

      const logout = async () => {
          
          await piniaStorage.clearAuthData();
          router.push({ name: 'login' })
      };

      return {
        isMobile,
        logout,
      };


    },
  };
</script>

<style scoped>
</style>

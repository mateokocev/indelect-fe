<template>
  <div>
    <v-container v-if="!isMobile">
      <v-img
        class="mx-auto my-6"
        max-width="228"
        src="https://res.cloudinary.com/dkzpi7xpb/image/upload/v1725308281/logo_ek0dql.png"
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
          Service unavailable
        </v-card-title>

        <v-card-text class="text-center">
          The service you are trying to access is intended as a mobile only
          experience and is not accessible on higher resolutions from desktop
          devices. To access the full experience the service offers please use a
          mobile device.
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
        src="https://res.cloudinary.com/dkzpi7xpb/image/upload/v1725308281/logo_ek0dql.png"
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
          Service unavailable
        </v-card-title>
        <v-card-text class="text-center">
          The service you are trying to access is not intended for accounts with
          administrative privileges and is not going to load. To access the
          content management system please use a desktop based device and make
          sure it's compatible with the admin system requirements.
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

<template>
 <v-app>
<div>
<v-container v-if="!isMobile" >

</v-container>
<v-container v-else>
  <div>
    <v-app>
      <v-container>
        <v-img
          class="mx-auto my-6"
          max-width="350"
          src="https://i.postimg.cc/s1v7Gj6p/your-image.jpg"
        ></v-img>

        <v-card
          class="mx-auto pa-12 pb-8"
          elevation="0"
          max-width="700"
          rounded="lg"
          color="white"
        >
          <h1 class="text-h5 text-center mb-6 black-text">Available Tickets</h1>
          <v-row>
            <v-col v-for="ticket in tickets" :key="ticket.id" cols="12" md="6">
              <v-card class="ticket-card mx-auto mb-4" max-width="300">
                <v-img
                  :src="ticket.image"
                  height="200px"
                  class="white--text align-end"
                ></v-img>
                <v-card-title class="black-text">
                  <router-link>
                    {{ ticket.name }}
                  </router-link>
                </v-card-title>
                <v-card-subtitle class="black-text">{{ ticket.info }}</v-card-subtitle>
                <v-card-subtitle class="black-text">Price: ${{ ticket.price }}</v-card-subtitle>
                <v-card-actions>
                  <router-link :to="'/ticket/' + ticket.id">
                    <v-btn color="primary">View Details</v-btn>
                  </router-link>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-app>
  </div>
</v-container>
</div>
 </v-app>
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
        if (!isMobile.value) {
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


<style scoped>
/* You can add scoped styles here if needed */
.text-decoration-none {
  text-decoration: none;
}

.ticket-card {
  transition: background-color 0.3s ease-out 100ms;
}

.ticket-card:hover {
  background-color: #FFB6C1;
}

/* New class for black text color */
.black-text {
  color: black;
}


</style>

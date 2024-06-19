<template>
  <v-app>
<div>
<v-container v-if="!isMobile" ></v-container>
<v-contain v-else>
  <v-card>
  <div>
    <h1>Welcome to the Museum Map</h1>
    <div class="map-container">
      <!-- Map Image (You can replace the image URL with your own map) -->
      <img src="https://i.postimg.cc/fRJwkzhr/addada.png" alt="Museum Map" class="map-image" @click="handleMapClick($event)">
      <!-- Hotspots -->
      <v-btn v-for="spot in hotspots" :key="spot.id" class="hotspot-button" :style="{ left: spot.coordinates.x + 'px', top: spot.coordinates.y + 'px' }" icon @click="showExhibition(spot.id)" small color="red">
        {{ spot.name }}
      </v-btn>
    </div>
    <!-- Exhibition Item Details -->
    <div v-if="selectedItem" class="exhibition-details">
      <h2>Exhibition Item Details</h2>
      <div>
        <p>ID: {{ selectedItem.id }}</p>
        <p>Name: {{ selectedItem.name }}</p>
        <!-- Add more details as needed -->
      </div>
    </div>
  </div>
</v-card>
</v-contain>
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

<style>
/* Add CSS styles for the map container and hotspots */
.map-container {
  position: relative;
}
.map-image {
  width: 100%;
  height: 100%;
}
.hotspot-button {
  position: absolute;
}
.exhibition-details {
  margin-top: 20px;
}
</style>

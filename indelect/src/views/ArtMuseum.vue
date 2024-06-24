<template>
  <v-app>
<div>
<v-container v-if="!isMobile" ></v-container>

<v-contain v-else>
  <v-app-bar
    dense
    clipped-left
    color="#B02E0C"
    app
    dark
    fixed
    elevate-on-scroll
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="btn-fix"></v-app-bar-nav-icon>
    <v-toolbar-title>Indelect</v-toolbar-title>
  </v-app-bar>

  <v-navigation-drawer
    class="fixed-drawer"
    width="250"
    v-model="drawer"
    app
  >
    <v-list-item class="px-2">
      <v-list-item-title>{{  userName }}</v-list-item-title>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item link @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
    </v-list>
  </v-navigation-drawer>

  <v-card>
    <div>
      <h1 class="mt-15">Welcome to the Art Museum Map</h1>
      <div class="map-container">
        <!-- Map Image (You can replace the image URL with your own map) -->
        <img src="../assets/mapa3.png" alt="Museum Map" class="map-image" >
        <!-- Hotspots -->
         <div v-for="(exhibit, index) in exhibits"
         :key="exhibit._id" > 
          <v-btn class="hotspot-button">
          {{ exhibit.exhibitName }}
        </v-btn>
      </div>
       
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

  <!-- New container for exhibit buttons -->
  <v-card>
    <div class="exhibit-buttons-container">
      <h2>Exhibit Pieces</h2>
      <v-btn v-for="spot in exhibits" :key="spot._id">
        {{ spot.exhibitName }}
      </v-btn>
    </div>
  </v-card>
</v-contain>
</div>
</v-app>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const isMobile = ref(false);
    const tickets = ref([]);
    const mini = ref(false);
    const drawer = ref(false);
    const userName = ref(null);
    const router = useRouter();
    const exhibits = ref([]);

    const updateIsMobile = () => {
      isMobile.value = window.innerWidth <= 480;
      if (!isMobile.value) {
        router.push({ name: "warning" });
      }
    };

    onMounted(async () => {
      updateIsMobile();
      getAllExhibits();
      await getUsername();
      window.addEventListener("resize", updateIsMobile);
      try {
        const response = await axios.get("/ticket/getAllTickets");
        tickets.value = response.data;
        console.log("Tickets fetched successfully:", tickets.value);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
      return () => {
        window.removeEventListener("resize", updateIsMobile);
      };
    });

    const getAllExhibits = async () => {
      try {
        const response = await axios.get("/exhibit/getall");
        exhibits.value = response.data;
        console.log(exhibits.value);
      } catch (error) {
        console.error("Getting exhibits failed:", error);
      }
    };


    const getUsername = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const response = await axios.get(`/GetUserName?email=${userEmail}`);
      userName.value = response.data.username;
    } catch (error) {
      console.error("Error:", error);
    }
  };


    const logout = async () => {
      // Implement your logout logic
      router.push({ name: "login" });
    };

  const goToPayment = async (MuseumName, Price) => {
      
      router.push("payment/"+MuseumName+Price);
    };
    return {
      isMobile,
      tickets,
      drawer,
      logout,
      goToPayment,
      getAllExhibits,
      userName,
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

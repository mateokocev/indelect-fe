<template>
  <v-app>
    <!-- Navigation and App Bar -->
    <v-container>
      <v-app-bar
        dense
        clipped-left
        color="#B02E0C"
        app
        dark
        fixed
        elevate-on-scroll
      >
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="btn-fix"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>Indelect</v-toolbar-title>
      </v-app-bar>

      <!-- Navigation Drawer -->
      <v-navigation-drawer
        class="fixed-drawer"
        width="250"
        v-model="drawer"
        app
      >
        <v-list-item class="px-4">
          <v-list-item-title >Username: {{ userName }}</v-list-item-title>
          
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
    </v-container>

    <!-- Main Content -->
    <v-container>
      <v-card class="pa-4" outlined>
        <h1 class="mt-4 mb-4 text-center">Welcome to the Science Museum Map</h1>
        <div class="map-container">
          <!-- Museum Map Image -->
          <img src="../assets/mapa1.png" alt="Museum Map" class="map-image" />
        </div>
      </v-card>

      <!-- Exhibit Buttons Container -->
      <v-card class="pa-4 mt-4" outlined>
        <h2 class="text-center mb-4">Exhibit Pieces</h2>
        <!-- Loop to create a button for each science exhibit -->
        <div class="exhibit-buttons-container">
          <div v-for="exhibit in scienceExhibits" :key="exhibit._id" class="mb-2">
            <v-btn
              color="primary"
              class="rounded-btn"
              @click="openDialog(exhibit)"
            >
              {{ exhibit.exhibitName }}
            </v-btn>
          </div>
        </div>
      </v-card>

      <!-- Dialog for Science Museum Images -->
      <v-dialog max-width="500" v-model="dialogVisible">
        <v-card>
          <v-card-title>
            <span class="headline">{{ selectedItem.exhibitName }}</span>
          </v-card-title>

          <v-card-text>
            <p>{{ selectedItem.description }}</p>
            <div v-for="(image, imgIndex) in selectedItem.images" :key="imgIndex">
              <v-img :src="image" alt="Science Image"></v-img>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialogVisible = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const isMobile = ref(false);
    const drawer = ref(false);
    const userName = ref(null);
    const router = useRouter();
    const exhibits = ref([]);
    const selectedItem = ref(null);
    const scienceExhibits = ref([]);
    const dialogVisible = ref(false);

    const updateIsMobile = () => {
      isMobile.value = window.innerWidth <= 480;
      if (!isMobile.value) {
        router.push({ name: "warning" });
      }
    };

    onMounted(() => {
      updateIsMobile();
      getAllExhibits();

      window.addEventListener("resize", updateIsMobile);
      getUsername();
      return () => {
        window.removeEventListener("resize", updateIsMobile);
      };
    });

    const getAllExhibits = async () => {
      try {
        const response = await axios.get("/exhibit/getall");
        exhibits.value = response.data;
        // Filter science exhibits
        scienceExhibits.value = exhibits.value.filter(exhibit => exhibit.toMuseum === "science");
      } catch (error) {
        console.error("Getting exhibits failed:", error);
      }
    };

    const openDialog = (exhibit) => {
      selectedItem.value = exhibit;
      dialogVisible.value = true; // Open the dialog
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

    const logout = () => {
      router.push({ name: "login" });
    };

    const handleAction1 = () => {
      // Implement your action 1 logic
    };

    const handleAction2 = () => {
      // Implement your action 2 logic
    };

    return {
      isMobile,
      drawer,
      userName,
      selectedItem,
      scienceExhibits,
      dialogVisible,
      openDialog,
      logout,
      handleAction1,
      handleAction2
    };
  },
};
</script>


<style>
/* General styling */
.v-card {
  background-color: #f9f9f9;
}

/* Map container */
.map-container {
  position: relative;
  width: 100%;
  height: auto;
  text-align: center;
}

.map-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

/* Exhibit buttons container */
.exhibit-buttons-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.rounded-btn {
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 16px;
  text-transform: none;
}

/* Navigation drawer */
.fixed-drawer {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.user-name {
  font-weight: bold;
  font-size: 18px;
  color: #fff;
}
</style>
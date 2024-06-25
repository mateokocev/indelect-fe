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
        <v-list-item class="px-2">
          <v-list-item-title>{{ userName }}</v-list-item-title>
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
      <v-card>
        <div>
          <h1 class="mt-15">Welcome to the Science Museum Map</h1>
          <div class="map-container">
            <!-- Museum Map Image -->
            <img src="../assets/mapa1.png" alt="Museum Map" class="map-image" />
          </div>

          

          <!-- Exhibition Item Details (shown when an exhibit is clicked) -->
          <div v-if="selectedItem" class="exhibition-details">
            <h2>Exhibition Item Details</h2>
            <div>
              <p>ID: {{ selectedItem._id }}</p>
              <p>Name: {{ selectedItem.exhibitName }}</p>
            </div>

            <!-- Buttons for additional actions -->
            <div class="button-container">
              <v-btn color="primary" @click="handleAction1()">Action 1</v-btn>
              <v-btn color="secondary" @click="handleAction2()">Action 2</v-btn>
            </div>
          </div>
        </div>
      </v-card>

      <!-- Optional: Exhibit Buttons Container (can be used for additional UI) -->
      <v-card>
        <div class="exhibit-buttons-container">
          <h2>Exhibit Pieces</h2>
          <v-btn @click="openDialog">Show Science Museum Images</v-btn>
          <v-btn>2</v-btn>
        </div>
      </v-card>

      <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Open Dialog"
            variant="flat"
          ></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="Dialog">
            <v-card>
              <v-card-title>
                <span class="headline">Science Museum Images</span>
              </v-card-title>
              <v-card-text>
                  <div
                    v-for="(image, index) in scienceImages"
                    :key="index"
                  >
                    <v-img :src="image"></v-img>
                  </div>

                  {{ scienceImages }}

              </v-card-text>

            </v-card>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                text="Close Dialog"
                @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

      

    
    </v-container>
  </v-app>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {

  data() {
    return {
      scienceImages: ref([])
    }
  },

  setup() {
    const isMobile = ref(false);
    const tickets = ref([]);
    const mini = ref(false);
    const drawer = ref(false);
    const userName = ref(null);
    const router = useRouter();
    const exhibits = ref([]);
    const selectedItem = ref(null);
    const scienceImages = ref([]);

    const updateIsMobile = () => {
      isMobile.value = window.innerWidth <= 480;
      if (!isMobile.value) {
        router.push({ name: "warning" });
      }
    };

    onMounted(async () => {
      updateIsMobile();
      getAllExhibits();
      openDialog();

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

    const openDialog = () => {
      const scienceImagesTemp = exhibits.value.flatMap((exhibit) =>
        exhibit.toMuseum === "science" ? exhibit.images : []
      );
      scienceImages.value = scienceImagesTemp;
      console.log(scienceImages.value)
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
    const showExhibitDetails = (exhibit) => {
      selectedItem.value = exhibit;
    };

    const logout = async () => {
      // Implement your logout logic
      router.push({ name: "login" });
    };

    const goToPayment = async (MuseumName, Price) => {
      router.push("payment/" + MuseumName + Price);
    };
    return {
      isMobile,
      tickets,
      drawer,
      logout,
      goToPayment,
      getAllExhibits,
      userName,
      showExhibitDetails,
      openDialog,
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

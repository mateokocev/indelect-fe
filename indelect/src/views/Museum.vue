<template>
  <v-app>
    <navigation-bar 
      :drawer="drawer" 
      :mini="mini" 
      :extended="extended"
      :userName="userName"
      @toggle-drawer="drawer = !drawer"
      @update:drawer="drawer = $event"
      @logout="logout"
    />

    <v-container>
      <v-card class="mt-16 pa-4" outlined>
        <div class="map-container">
          <img :src="mapImageSrc" :alt="`${museumTypeLabel} Museum Map`" class="map-image" />
        </div>
      </v-card>

      <v-card class="pa-4 mt-4" outlined>
        <h2 class="text-center mb-4">Exhibit Pieces</h2>
        <exhibit-list :exhibits="exhibits" @select="handleSelect" />
      </v-card>

      <leave-museum-dialog
        v-model:visible="leaveDialogVisible"
        :museumName="museumTypeLabel"
        :qrCodeUrl="qrCodeUrl"
      />

      <exhibit-dialog 
        :exhibit="selectedItem" 
        v-model:visible="dialogVisible" 
        :museumTypeLabel="museumTypeLabel" 
      />
    </v-container>
  </v-app>
</template>

<script>
  import { ref, onMounted, computed } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import axios from "axios";
  import NavigationBar from "../components/TicketView/NavigationBar.vue";
  import ExhibitList from "../components/MuseumView/ExhibitList.vue";
  import ExhibitDialog from "../components/MuseumView/ExhibitDialog.vue";
  import LeaveMuseumDialog from "../components/MuseumView/LeaveMuseumDialog.vue";
  import { usePiniaStorage } from "../store/index.js";

  export default {
    components: {
      NavigationBar,
      ExhibitList,
      ExhibitDialog,
      LeaveMuseumDialog,
    },
    setup() {
      const router = useRouter();
      const route = useRoute();
      const drawer = ref(false);
      const mini = ref(false);
      const extended = ref(false);
      const userName = ref(null);
      const exhibits = ref([]);
      const selectedItem = ref(null);
      const dialogVisible = ref(false);
      const leaveDialogVisible = ref(false);
      const isMobile = ref(false);

      const qrCodeUrl = computed(() => route.query.qrCode || "/src/assets/leave_museum_qrcode.png");
      const museumType = computed(() => route.params.museumType || "science");
      const museumTypeLabel = computed(() => {
        const type = museumType.value;
        return type.charAt(0).toUpperCase() + type.slice(1);
      });

      const mapImageSrc = computed(() => {
        const mapImages = {
          science: "/src/assets/science_map.png",
          history: "/src/assets/history_map.png",
          technology: "/src/assets/technology_map.png",
          art: "/src/assets/art_map.png"
        };
        return mapImages[museumType.value] || mapImages.science;
      });

      onMounted(() => {
        updateIsMobile();
        window.addEventListener("resize", updateIsMobile);
        getUsername();
        loadExhibits();
        return () => window.removeEventListener("resize", updateIsMobile);
      });

      const updateIsMobile = () => {
        isMobile.value = window.innerWidth <= 480;
        if (!isMobile.value) {
          router.push({ name: "warning" });
        }
      };

      const loadExhibits = async () => {
        try {
          const response = await axios.get(`/museum/${museumType.value}/exhibits`);
          exhibits.value = response.data;
        } catch (error) {
          console.error("Error loading exhibits:", error);
        }
      };

      const getUsername = async () => {
        try {
          const userEmail = localStorage.getItem("userEmail");
          if (!userEmail) return;
          const response = await axios.get(`/users/${userEmail}`);
          userName.value = response.data.username;
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      };

      const piniaStorage = usePiniaStorage();
      const logout = async () => {
        await piniaStorage.clearAuthData();
        router.push({ name: "login" });
      };

      const handleSelect = (exhibit) => {
        selectedItem.value = exhibit;
        dialogVisible.value = true;
      };

      return {
        drawer,
        mini,
        extended,
        userName,
        exhibits,
        selectedItem,
        dialogVisible,
        leaveDialogVisible,
        museumTypeLabel,
        mapImageSrc,
        logout,
        isMobile,
        handleSelect,
        qrCodeUrl
      };
    },
  };
</script>

<style>
  .v-card {
    background-color: #f9f9f9;
  }

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

  .fixed-drawer {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .user-name {
    font-weight: bold;
    font-size: 18px;
    color: #fff;
  }
</style>
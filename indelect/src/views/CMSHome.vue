<template>
  <v-app>
    <div>
      <v-container v-if="!isMobile">
        <app-header 
          :initialSearch="search"
          :initialFilters="filters"
          @update-filters="updateFilters"
          @search="search = $event"
          @logout="logout"
        />
        
        <exhibit-grid 
          :exhibits="filteredExhibits"
          :museumOptions="museumOptions"
          @load-exhibit="loadExhibitData"
          @update-exhibit="updateExhibit"
          @delete-exhibit="deleteExhibit"
          @add-exhibit="newExhibit"
          @refresh="getAllExhibits"
        />
      </v-container>

      <v-container v-else>
      </v-container>
    </div>
  </v-app>
</template>

<script>
  import { onMounted, ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { usePiniaStorage } from "../store/index.js";
  import axios from "axios";

  import AppHeader from '../components/CMSView/AppHeader.vue';
  import ExhibitGrid from '../components/CMSView/ExhibitGrid.vue';

  export default {
    name: 'CMSHome',
    components: {
      AppHeader,
      ExhibitGrid
    },
    setup() {
      const isMobile = ref(false);
      const search = ref("");
      const exhibits = ref([]);
      const showError = ref(false);
      
      const museumOptions = ["art", "science", "history", "technology"];
      
      const filters = ref({
        displayedExhibits: true,
        hiddenExhibits: true,
        artExhibits: true,
        scienceExhibits: true,
        historyExhibits: true,
        techExhibits: true
      });
      
      const piniaStorage = usePiniaStorage();
      const router = useRouter();

      const filteredExhibits = computed(() => {
        let filtered = exhibits.value;

        if (!filters.value.displayedExhibits && filters.value.hiddenExhibits) {
          filtered = filtered.filter((exhibit) => !exhibit.isDisplayed);
        } else if (filters.value.displayedExhibits && !filters.value.hiddenExhibits) {
          filtered = filtered.filter((exhibit) => exhibit.isDisplayed);
        } else if (!filters.value.displayedExhibits && !filters.value.hiddenExhibits) {
          return [];
        }

        if (!filters.value.artExhibits) {
          filtered = filtered.filter((exhibit) => exhibit.toMuseum !== "art");
        }
        if (!filters.value.scienceExhibits) {
          filtered = filtered.filter((exhibit) => exhibit.toMuseum !== "science");
        }
        if (!filters.value.historyExhibits) {
          filtered = filtered.filter((exhibit) => exhibit.toMuseum !== "history");
        }
        if (!filters.value.techExhibits) {
          filtered = filtered.filter(
            (exhibit) => exhibit.toMuseum !== "technology"
          );
        }

        if (search.value) {
          const query = search.value.toLowerCase();
          filtered = filtered.filter((exhibit) =>
            exhibit.exhibitName.toLowerCase().includes(query)
          );
        }

        return filtered;
      });

      onMounted(() => {
        const updateIsMobile = () => {
          isMobile.value = window.innerWidth <= 480;
          if (isMobile.value) {
            router.push({ name: "warning" });
          }
        };

        updateIsMobile();
        window.addEventListener("resize", updateIsMobile);
        getAllExhibits();

        return () => {
          window.removeEventListener("resize", updateIsMobile);
        };
      });

      const updateFilters = (newFilters) => {
        filters.value = { ...newFilters };
      };

      const logout = async () => {
        await piniaStorage.clearAuthData();
        router.push({ name: "login" });
      };

      const loadExhibitData = (exhibit) => {
        console.log("Exhibit Data loaded:", exhibit);
      };

      const getAllExhibits = async () => {
        try {
          const response = await axios.get("/exhibit");
          exhibits.value = response.data;
          console.log("Exhibits loaded:", exhibits.value.length);
        } catch (error) {
          console.error("Getting exhibits failed:", error);
          showError.value = true;
        }
      };

      const newExhibit = async (exhibitData) => {
        showError.value = false;
        
        try {
          await axios.post("/exhibit", exhibitData);
          await getAllExhibits();
          console.log("Exhibit added successfully");
        } catch (error) {
          console.error("Adding exhibit failed:", error);
          showError.value = true;
        }
      };

      const updateExhibit = async (id, updateData) => {
        showError.value = false;
        
        if (!id || !updateData) {
          console.error("Missing exhibit ID or update data");
          showError.value = true;
          return false;
        }

        try {
          await axios.put(`/exhibit/${id}`, updateData);
          await getAllExhibits();
          console.log("Exhibit updated successfully");
          return true;
        } catch (error) {
          console.error("Updating exhibit failed:", error);
          showError.value = true;
          return false;
        }
      };

      const deleteExhibit = async (id) => {
        showError.value = false;
        
        try {
          await axios.delete(`/exhibit/${id}`);
          await getAllExhibits();
          console.log("Exhibit deleted successfully");
          return true;
        } catch (error) {
          console.error("Deleting exhibit failed:", error);
          showError.value = true;
          return false;
        }
      };

      return {
        isMobile,
        search,
        exhibits,
        filters,
        filteredExhibits,
        showError,
        museumOptions,
        updateFilters,
        logout,
        loadExhibitData,
        getAllExhibits,
        newExhibit,
        updateExhibit,
        deleteExhibit
      };
    }
  };
</script>
<template>
  <v-app>
    <div>
      <v-container v-if="!isMobile">
        <v-app-bar color="#EB4511" dark>
          <v-img
            class="ml-4"
            max-width="80"
            rounded
            flat
            src="https://i.postimg.cc/s1v7Gj6p/your-image.jpg"
          ></v-img>

          <div class="vertical-separator"></div>

          <v-text-field
            class="search-bar mr-1"
            v-model="search"
            variant="solo-filled"
            placeholder="Search exhibits..."
            append-inner-icon="mdi-magnify"
            density="compact"
            bg-color="white"
            rounded
            flat
            hide-details
            @click:append="performSearch"
          ></v-text-field>

          <v-dialog max-width="300">
            <template v-slot:activator="{ props: openFilterWindow }">
              <v-btn
                v-bind="openFilterWindow"
                :ripple="false"
                density="compact"
                variant="plain"
                icon
              >
                <v-icon>mdi-filter-variant</v-icon>
              </v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card class="pb-4" rounded="lg" color="white">
                <v-card-title class="text-center">Filter</v-card-title>
                <div class="horizontal-filter-title-separator"></div>

                <v-checkbox
                  class="ml-6 top-checkbox-top-margin"
                  :ripple="false"
                  label="Displayed exhibits"
                  color="#EB4511"
                  density="compact"
                ></v-checkbox>

                <v-checkbox
                  class="ml-6"
                  :ripple="false"
                  label="Hidden exhibits"
                  color="#EB4511"
                  density="compact"
                ></v-checkbox>
                <div class="horizontal-filter-title-separator"></div>

                <v-toolbar
                  color="white"
                >
                  
                  <v-btn 
                    color="primary" 
                    @click=""
                  >
                    Apply
                  </v-btn>

                  <v-spacer></v-spacer>

                  <v-card-actions>
                    <v-btn 
                      color="secondary" 
                      @click="isActive.value = false"
                    >
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-toolbar>
              </v-card>
            </template>
          </v-dialog>

          <v-spacer></v-spacer>

          <v-btn
            @click="logout"
            :ripple="false"
            density="compact"
            variant="plain"
            icon
          >
            <v-icon>mdi-logout-variant</v-icon>
          </v-btn>
        </v-app-bar>
        
        <v-container
          class="mt-16 mb-5 mx-5"
          min-height="500"
        >
          <v-row>
            <v-col
              class="d-flex align-center justify-center"
              cols="5"
              v-for="(exhibit, index) in exhibits"
              :key="index"
            >
              <v-card
                class="custom-card"
                @click="viewExhibit(exhibit)"
                rounded="10"
                elevation="8"
              >
                <v-card-title>{{ exhibit.name }}</v-card-title>
              </v-card>
            </v-col>
            <v-col
              class="d-flex align-center justify-center"
              cols="5"
            >
              <v-card
                class="add-card"
                @click="addNewExhibit"
                color="#14baee"
                height="200"
              >
                <v-card-text
                  class="text-center add-card-top-margin"
                >
                  <v-icon
                    :size="64"
                    color="white"
                  >
                    mdi-plus
                  </v-icon>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>


      </v-container>

      <v-container v-else> </v-container>
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
    const displayedExhibits = ref(false);
    const hiddenExhibits = ref(false);
    const exhibits = ref([]);

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
      displayedExhibits,
      hiddenExhibits,
      exhibits
    };
  },
};
</script>

<style scoped>
.search-bar {
  max-width: 300px;
}

.vertical-separator {
  width: 1px;
  height: 90%;
  background-color: white;
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 5px;
}

.horizontal-filter-title-separator {
  height: 1px;
  width: 90%;
  align-self: center;
  background-color: #eb4511;
  margin-top: 6px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.top-checkbox-top-margin {
  margin-top: 22px;
}

.custom-card {
  height: 100%;
}

.add-card-top-margin {
  margin-top: 52px;
}

.custom-add-icon-size {

}
</style>
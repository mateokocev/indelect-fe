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

                <v-toolbar color="white">
                  <v-btn color="primary" @click=""> Apply </v-btn>

                  <v-spacer></v-spacer>

                  <v-card-actions>
                    <v-btn color="secondary" @click="isActive.value = false">
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
          class="mt-16 mb-3"
          min-height="500"
          style="padding: 16px 2px; margin-left: 0px"
        >
          <v-row>
            <v-col
              class="d-flex align-center justify-center"
              cols="2"
              v-for="(exhibit, index) in exhibits"
              :key="index"
            >
              <v-card
                class=""
                @click="viewExhibit(exhibit)"
                height="200"
                width="100%"
                rounded
                elevation="8"
              >
                <v-card-title>{{ exhibit.name }}</v-card-title>
              </v-card>
            </v-col>
            <v-col class="d-flex align-center justify-center" cols="2">
              <v-dialog max-width="800" persistent>
                <template v-slot:activator="{ props: openCreateNewWindow }">
                  <v-btn
                    class=""
                    v-bind="openCreateNewWindow"
                    :ripple="false"
                    color="#14baee"
                    height="200"
                    width="100%"
                    elevation="8"
                  >
                    <v-icon class="add-card-icon" :size="64" color="white">
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card class="pt-8 pb-8">
                    <v-card-title class="text-center"
                      >Add new exhibit</v-card-title
                    >
                    <div class="horizontal-addnew-title-separator"></div>
                    <v-text-field
                      class="new-name-bar ml-10"
                      v-model="newTitle"
                      label="Exhibit name..."
                      :rules="[rules.required]"
                      variant="underlined"
                      clearable
                    ></v-text-field>

                    <v-textarea
                      class="new-name-bar mt-4 ml-10"
                      v-model="newDescription"
                      label="Exhibit description..."
                      :rules="[rules.required]"
                      variant="underlined"
                      clearable
                    ></v-textarea>

                    <v-file-input
                      class="new-name-bar mt-4 ml-10"
                      v-model="newImages"
                      label="Exhibit images..."
                      :rules="[rules.required]"
                      @change="convertToBase64"
                      variant="underlined"
                      clearable
                      chips
                      multiple
                    ></v-file-input>
                    <v-btn @click="convertToBase64"> haha gae </v-btn>

                    <v-checkbox
                      v-model="newDisplayed"
                      class="ml-10 top-checkbox-top-margin"
                      :ripple="false"
                      label="Display exhibit"
                      color="#EB4511"
                      density="compact"
                    ></v-checkbox>

                    <v-toolbar class="mt-6" color="white">
                      <v-card-actions>
                        <v-btn
                          class="ml-16"
                          color="primary"
                          @click="
                            () => {
                              {
                                isActive.value = false;
                              }
                            }
                          "
                        >
                          Add New
                        </v-btn>
                      </v-card-actions>

                      <v-spacer></v-spacer>

                      <v-card-actions>
                        <v-btn
                          class="mr-16"
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
    const newTitle = ref("");
    const newDescription = ref("");
    const newImages = ref([]);
    const newDisplayed = ref(false);
    const base64Array = ref([]);

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

    const rules = {
      required: (v) => !!v || "This field is required",
    };

    const logout = async () => {
      await piniaStorage.clearAuthData();
      router.push({ name: "login" });
    };

    const convertToBase64 = async (newImages) => {
      const base64Array = [];
      console.log(newImages);

      const fileArray = Array.from(newImages);
      for (const file of fileArray) {
        base64Array.push(await fileToBase64(file));
      }

      console.log(base64Array.value);
      return base64Array;
    };

    const fileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    };

    const newExhibit = async () => {
      if (
        !newTitle.value ||
        !newDescription.value ||
        !newImages.value ||
        !newDisplayed.value
      ) {
        console.error("All fields are required");
        return;
      }

      try {
        const response = await axios.post("/exhibit/add", {
          exhibitName: newTitle.value,
          description: newDescription.value,
        });
      } catch (error) {
        console.error("Adding exhibit failed:", error);
      }
    };

    return {
      isMobile,
      rules,
      logout,
      displayedExhibits,
      hiddenExhibits,
      exhibits,
      newTitle,
      newDescription,
      newImages,
      newDisplayed,
      newExhibit,
      fileToBase64,
      convertToBase64,
      base64Array,
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

.horizontal-addnew-title-separator {
  height: 1px;
  width: 90%;
  align-self: center;
  background-color: #eb4511;
  margin-top: 6px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.top-checkbox-top-margin {
  margin-top: 22px;
}

.add-card-top-margin {
  margin-top: 52px;
}

.card-container-padding-ow {
  padding-left: 8px !important;
}

.new-name-bar {
  max-width: 90%;
}
</style>

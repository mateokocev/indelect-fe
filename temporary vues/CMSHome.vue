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
                  v-model="displayedExhibits"
                  :ripple="false"
                  label="Displayed exhibits"
                  color="#EB4511"
                  density="compact"
                ></v-checkbox>

                <v-checkbox
                  class="ml-6"
                  v-model="hiddenExhibits"
                  :ripple="false"
                  label="Hidden exhibits"
                  color="#EB4511"
                  density="compact"
                ></v-checkbox>
                <div class="horizontal-filter-title-separator"></div>

                
                <v-toolbar color="white">
                  <v-card-actions>
                    <v-btn class="justify-center" color="secondary" @click="isActive.value = false">
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
<!--  -->
<!--  -->
<!--  -->
<!--  -->
        <!-- Exhibit buttons -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
        <v-container
          class="mt-16 mb-3"
          style="padding: 16px 2px; margin-left: 0px"
        >
          <v-row>
            <v-col
            v-for="(exhibit, index) in filteredExhibits"
            :key="exhibit._id"
            class="d-flex align-center justify-center"
            cols="2"
            >
              <v-dialog max-width="800" persistent>
                <template v-slot:activator="{ props: openEditExistingWindow }">
                  <v-btn
                    class="exhibit-btn"
                    v-bind="openEditExistingWindow"
                    :ripple="false"
                    height="200"
                    width="100%"
                    elevation="8"
                    @click="loadExhibitData(exhibit)"
                    :style="{
                      backgroundImage: `url(${exhibit.images[0]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }"
                  >
                  <v-card-title class="white--text">{{ exhibit.exhibitName }}</v-card-title>
                  </v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card class="pt-8 pb-8">
                    <v-card-title class="text-center">Modify the exhibit: </v-card-title>
                    <div class="horizontal-addnew-title-separator"></div>
                    <v-text-field
                      class="new-name-bar ml-10"
                      v-model="exhibitTitle"
                      label="Exhibit name..."
                      :rules="[rules.required]"
                      variant="underlined"
                      clearable
                    ></v-text-field>

                    <v-textarea
                      class="new-name-bar mt-4 ml-10"
                      v-model="exhibitDescription"
                      label="Exhibit description..."
                      :rules="[rules.required]"
                      variant="underlined"
                      clearable
                    ></v-textarea>

                    <v-file-input
                      class="new-name-bar mt-4 ml-10 mb-n10"
                      v-model="orderattachment"
                      label="Exhibit images..."
                      :rules="[rules.required]"
                      variant="underlined"
                      clearable
                      chips
                      multiple
                    ></v-file-input>
                    <v-card-text class="ml-14 text-red text-caption">Warning: The images will be overwritten upon the selection of new ones</v-card-text>

                    <v-checkbox
                      v-model="exhibitDisplayed"
                      class="ml-10 top-checkbox-top-margin"
                      :ripple="false"
                      label="Display exhibit"
                      color="#EB4511"
                      density="compact"
                    ></v-checkbox>

                    <v-card
                      v-if="showError"
                      class="mx-auto pa-2 mb-12"
                      elevation="2"
                      max-width="400"
                      rounded="lg"
                      color="#e89c9c"
                    >
                      <v-card-text>
                        Modifying the exhibit failed due to unspecified reasons. Check all the fields or if you believe this to be as error contact the system administrator.
                      </v-card-text>
                    </v-card>

                    <v-toolbar class="mt-6" color="white">
                      <v-card-actions>
                        <v-btn
                          class="ml-16"
                          color="primary"
                          @click="updateExhibit"
                        >
                          Save changes
                        </v-btn>
                      </v-card-actions>

                      <v-spacer></v-spacer>

                      <v-card-actions>
                        <v-btn
                          class="ml-16 text-red"
                          @click="() => {
                              isActive.value = deleteExhibit();
                            }"
                        >
                          Delete
                        </v-btn>
                      </v-card-actions>

                      <v-card-actions>
                        <v-btn
                          class="mr-16"
                          color="secondary"
                          @click="() => {
                              isActive.value = false; 
                              onClosedDialogReset();
                            }"
                        >
                          Close
                        </v-btn>
                      </v-card-actions>
                    </v-toolbar>
                  </v-card>
                </template>
              </v-dialog>
            </v-col>
<!--  -->
<!--  -->
<!--  -->
<!--  -->
              <!-- Exhibit new -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
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
                      v-model="orderattachment"
                      label="Exhibit images..."
                      :rules="[rules.required]"
                      variant="underlined"
                      clearable
                      chips
                      multiple
                    ></v-file-input>

                    <v-checkbox
                      v-model="newDisplayed"
                      class="ml-10 top-checkbox-top-margin"
                      :ripple="false"
                      label="Display exhibit"
                      color="#EB4511"
                      density="compact"
                    ></v-checkbox>

                    <v-card
                      v-if="showError"
                      class="mx-auto pa-2 mb-12"
                      elevation="2"
                      max-width="400"
                      rounded="lg"
                      color="#e89c9c"
                    >
                      <v-card-text>
                        Adding the exhibit failed due to unspecified reasons. Check all the fields or if you believe this to be as error contact the system administrator.
                      </v-card-text>
                    </v-card>

                    <v-toolbar class="mt-6" color="white">
                      <v-card-actions>
                        <v-btn
                          class="ml-16"
                          color="primary"
                          @click="newExhibit"
                        >
                          Add New
                        </v-btn>
                      </v-card-actions>

                      <v-spacer></v-spacer>

                      <v-card-actions>
                        <v-btn
                          class="mr-16"
                          color="secondary"
                          @click="() => {
                              isActive.value = false;
                              onClosedDialogReset();
                            }"
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
import { ref, onMounted, watch, computed } from "vue";
import { usePiniaStorage } from "../store/index.js";
import axios from "axios";

export default {
  data() {
    return {
      displayedExhibits: ref(true),
      hiddenExhibits: ref(true)
    }
  },

  setup() {
    // site setup i app bar
    const isMobile = ref(false);
    const isActive = ref(false);
    const displayedExhibits = ref(true);
    const hiddenExhibits = ref(true);
    const search = ref("");

    // novi exhibiti
    const newTitle = ref("");
    const newDescription = ref("");
    const base64Files = ref([]);
    const orderattachment = ref([]);
    const newDisplayed = ref(false);
    const showError = ref(false);

    // postojeci exhibiti
    const exhibits = ref([]);
    const exhibitTitle = ref("");
    const exhibitDescription = ref("");
    const exhibitImages = ref([]);
    const exhibitDisplayed = ref(false);
    const exhibitID = ref("");

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

      getAllExhibits();

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

    const onClosedDialogReset = () => {

      newTitle.value = "";
      newDescription.value = "";
      orderattachment.value = [];
      newDisplayed.value = false;
      base64Files.value = [];
      showError.value = false;
    };

    const printBase = async () => {
      console.log(base64Files.value);
    };

    watch(orderattachment, (files) => {
      base64Files.value = [];
      if (!files.length) return;

      files.forEach(file => {
        let fr = new FileReader();
        fr.addEventListener("load", (e) => {
          base64Files.value.push(e.target.result);
        });
        fr.addEventListener("error", (e) => {
          console.error(`Error reading file ${file.name}:`, e);
        });
        fr.readAsDataURL(file);
      });
    });
// 
// 
//       POZIV RUTA
// 
// 


    const newExhibit = async () => {
      showError.value = false;

      if (
        !newTitle.value ||
        !newDescription.value ||
        !base64Files.value
      ) {
        console.error("All fields are required");
        showError.value = true;
      }

      try {
        const response = await axios.post("/exhibit/add", {
          exhibitName: newTitle.value,
          description: newDescription.value,
          images: base64Files.value,
          isDisplayed: newDisplayed.value
        });

        onClosedDialogReset();
        await getAllExhibits();
        console.log("Addition successful:", response.data);
      } catch (error) {
        console.error("Adding exhibit failed:", error);
        showError.value = true;
      }
    };

    const getAllExhibits = async () => {
      try {
        const response = await axios.get("/exhibit/getall");
        exhibits.value = response.data;
        console.log(exhibits.value);
      } catch (error) {
        console.error("Getting exhibits failed:", error);
      }
    };

    const loadExhibitData = (exhibit) => {
      console.log("Exhibit Data:", exhibit);
      exhibitTitle.value = exhibit.exhibitName;
      exhibitDescription.value = exhibit.description;
      exhibitImages.value = exhibit.images;
      exhibitDisplayed.value = exhibit.isDisplayed;
      exhibitID.value = exhibit._id;
    };

    const updateExhibit = async () => {
      showError.value = false;

      if (!exhibitID.value || !exhibitTitle.value || !exhibitDescription.value) {
        console.error("All fields are required");
        showError.value = true;
      }

      const updateData = {
        exhibitName: exhibitTitle.value,
        description: exhibitDescription.value,
        images: base64Files.value,
        isDisplayed: exhibitDisplayed.value,
      };
      console.log('Sending update request with data:', { id: exhibitID.value, updateData });

      try {
        const response = await axios.post("/exhibit/update", {
          id: exhibitID.value,
          updateData,
        });

        onClosedDialogReset();
        await getAllExhibits();
        console.log("Update successful:", response.data);
      } catch (error) {
        console.error("Updating exhibit failed:", error);
        showError.value = true;
      }
    };

    const deleteExhibit = async () => {
      showError.value = false;
      console.log(exhibitID.value);
      try {
        const response = await axios.delete("/exhibit/delete", {
          data: { id: exhibitID.value }
        });

        onClosedDialogReset();
        await getAllExhibits();
        console.log("Delete successful:", response.data);
      } catch (error) {
        console.error("Deleting exhibit failed:", error);
        showError.value = true;
      }
    };

    const filteredExhibits = computed(() => {
      if (displayedExhibits.value && hiddenExhibits.value) {
        return exhibits.value;
      } else if (displayedExhibits.value && !hiddenExhibits.value) {
        return exhibits.value.filter(exhibit => exhibit.isDisplayed);
      } else if (!displayedExhibits.value && hiddenExhibits.value) {
        return exhibits.value.filter(exhibit => !exhibit.isDisplayed);
      } else {
        return [];
      }
  });
 
    return {
      isMobile,
      displayedExhibits,
      hiddenExhibits,
      exhibits,
      filteredExhibits,
      rules,
      logout,
      newTitle,
      newDescription,
      base64Files,
      orderattachment,
      newDisplayed,
      newExhibit,
      watch,
      printBase,
      onClosedDialogReset,
      showError,
      getAllExhibits,
      exhibitTitle,
      exhibitDescription,
      exhibitImages,
      exhibitDisplayed,
      loadExhibitData,
      updateExhibit,
      deleteExhibit,
      isActive,
      search,
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

.exhibit-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
}

.exhibit-btn .v-card-title {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  padding: 10px 0;
}
</style>
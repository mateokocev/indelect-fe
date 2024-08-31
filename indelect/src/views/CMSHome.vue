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

                <v-checkbox
                  class="ml-6"
                  v-model="artExhibits"
                  :ripple="false"
                  label="Art museum exhibits"
                  color="#EB4511"
                  density="compact"
                ></v-checkbox>

                <v-checkbox
                  class="ml-6"
                  v-model="scienceExhibits"
                  :ripple="false"
                  label="Science museum exhibits"
                  color="#EB4511"
                  density="compact"
                ></v-checkbox>

                <v-checkbox
                  class="ml-6"
                  v-model="historyExhibits"
                  :ripple="false"
                  label="History museum exhibits"
                  color="#EB4511"
                  density="compact"
                ></v-checkbox>

                <v-checkbox
                  class="ml-6"
                  v-model="techExhibits"
                  :ripple="false"
                  label="Tech museum exhibits"
                  color="#EB4511"
                  density="compact"
                ></v-checkbox>

                <div class="horizontal-filter-title-separator"></div>

                <v-toolbar color="white">
                  <v-spacer></v-spacer>
                  <v-card-actions>
                    <v-btn color="secondary" @click="isActive.value = false">
                      Close
                    </v-btn>
                  </v-card-actions>
                  <v-spacer></v-spacer>
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
                      backgroundPosition: 'center',
                    }"
                  >
                    <v-card-title class="white--text">{{
                      exhibit.exhibitName
                    }}</v-card-title>
                  </v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card class="pt-8 pb-8">
                    <v-card-title class="text-center"
                      >Modify the exhibit:
                    </v-card-title>
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

                    <v-checkbox
                      v-model="exhibitDisplayed"
                      class="ml-10 top-checkbox-top-margin"
                      :ripple="false"
                      label="Display exhibit"
                      color="#EB4511"
                      density="compact"
                    ></v-checkbox>

                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn
                          v-bind="props"
                          color="white"
                          class="new-name-bar mt-4 ml-10"
                        >
                          {{ exhibitToMuseum || "Select Museum" }}
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(item, index) in museumOptions"
                          :key="index"
                          @click="selectModifyExhibitMuseum(item)"
                        >
                          <v-list-item-title>{{ item }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>

                    <v-btn
                      class="new-images-button mt-4 ml-10"
                      @click="testUploadWidgetExisting"
                    >
                      Add Images
                    </v-btn>

                    <v-card
                      class="new-images-carousel pa-4 ml-10 mt-4 flat"
                    >
                      <v-row class="flex-nowrap">
                        <v-col
                          v-for="(image, index) in exhibitImages"
                          :key="index"
                          class="d-flex align-center"
                          cols="auto"
                        >
                          <v-card
                            :style="{
                              backgroundImage: `url(${image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }"
                            width="300"
                            height="169"
                            class="image-card"
                            @click="removeImageExisting(index)"
                          >
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn icon @click.stop="removeImageExisting(index)">
                                <v-icon color="red">mdi-close</v-icon>
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card>

                    <v-card
                      v-if="showError"
                      class="mx-auto pa-2 mb-12"
                      elevation="2"
                      max-width="400"
                      rounded="lg"
                      color="#e89c9c"
                    >
                      <v-card-text>
                        Modifying the exhibit failed due to unspecified reasons.
                        Check all the fields or if you believe this to be as
                        error contact the system administrator.
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
                          @click="
                            () => {
                              isActive.value = deleteExhibit();
                            }
                          "
                        >
                          Delete
                        </v-btn>
                      </v-card-actions>

                      <v-card-actions>
                        <v-btn
                          class="mr-16"
                          color="secondary"
                          @click="
                            () => {
                              isActive.value = false;
                              onClosedDialogResetExisting();
                              getAllExhibits();
                            }
                          "
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

                    <v-checkbox
                      v-model="newDisplayed"
                      class="ml-10 top-checkbox-top-margin"
                      :ripple="false"
                      label="Display exhibit"
                      color="#EB4511"
                      density="compact"
                    ></v-checkbox>

                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn
                          v-bind="props"
                          color="white"
                          class="new-name-bar mt-4 ml-10"
                        >
                          {{ newToMuseum || "Select Museum" }}
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item
                          v-for="(item, index) in museumOptions"
                          :key="index"
                          @click="selectMuseum(item)"
                        >
                          <v-list-item-title>{{ item }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>

                    <v-btn
                      class="new-images-button mt-4 ml-10"
                      @click="testUploadWidget"
                    >
                      Add Images
                    </v-btn>

                    <v-card
                      class="new-images-carousel pa-4 ml-10 mt-4 flat"
                    >
                      <v-row class="flex-nowrap">
                        <v-col
                          v-for="(image, index) in newImagesHolder"
                          :key="index"
                          class="d-flex align-center"
                          cols="auto"
                        >
                          <v-card
                            :style="{
                              backgroundImage: `url(${image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }"
                            width="300"
                            height="169"
                            class="image-card"
                            @click="removeImage(index)"
                          >
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn icon @click.stop="removeImage(index)">
                                <v-icon color="red">mdi-close</v-icon>
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card>

                    <v-card
                      v-if="showError"
                      class="mx-auto pa-2 mb-12"
                      elevation="2"
                      max-width="400"
                      rounded="lg"
                      color="#e89c9c"
                    >
                      <v-card-text>
                        Adding the exhibit failed due to unspecified reasons.
                        Check all the fields or if you believe this to be as
                        error contact the system administrator.
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
                          @click="
                            () => {
                              isActive.value = false;
                              onClosedDialogReset();
                            }
                          "
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
import { Cloudinary } from "@cloudinary/url-gen";

export default {
  data() {
    return {
      displayedExhibits: ref(true),
      hiddenExhibits: ref(true),
      artExhibits: ref(true),
      scienceExhibits: ref(true),
      historyExhibits: ref(true),
      techExhibits: ref(true),
    };
  },

  setup() {
    // site setup i app bar
    const isMobile = ref(false);
    const isActive = ref(false);
    const isActiveImages = ref(false);
    const displayedExhibits = ref(true);
    const hiddenExhibits = ref(true);
    const artExhibits = ref(true);
    const scienceExhibits = ref(true);
    const historyExhibits = ref(true);
    const techExhibits = ref(true);
    const search = ref("");

    // novi exhibiti
    const newTitle = ref("");
    const newDescription = ref("");
    const newImagesHolder = ref([]);
    const newDisplayed = ref(false);
    const newToMuseum = ref("");
    const showError = ref(false);
    const menu = ref(false);
    const museumOptions = ["art", "science", "history", "technology"];

    // postojeci exhibiti
    const exhibits = ref([]);
    const exhibitTitle = ref("");
    const exhibitDescription = ref("");
    const exhibitImages = ref([]);
    const exhibitDisplayed = ref(false);
    const exhibitID = ref("");
    const exhibitToMuseum = ref("");

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
      console.log(newImagesHolder.value);

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
      newDisplayed.value = false;
      newImagesHolder.value = [];
      showError.value = false;
      newToMuseum.value = "";
    };

    const onClosedDialogResetExisting = () => {
      exhibitTitle.value = "";
      exhibitDescription.value = "";
      exhibitDisplayed.value = false;
      exhibitImages.value = [];
      showError.value = false;
      exhibitToMuseum.value = "";
    };

    const selectMuseum = (item) => {
      newToMuseum.value = item;
      menu.value = false;
    };

    const selectModifyExhibitMuseum = (item) => {
      exhibitToMuseum.value = item;
      menu.value = false;
    };

    const filteredExhibits = computed(() => {
      let filtered = exhibits.value;

      if (!displayedExhibits.value && hiddenExhibits.value) {
        filtered = filtered.filter((exhibit) => !exhibit.isDisplayed);
      } else if (displayedExhibits.value && !hiddenExhibits.value) {
        filtered = filtered.filter((exhibit) => exhibit.isDisplayed);
      } else if (!displayedExhibits.value && !hiddenExhibits.value) {
        return [];
      }

      if (!artExhibits.value) {
        filtered = filtered.filter((exhibit) => exhibit.toMuseum !== "art");
      }
      if (!scienceExhibits.value) {
        filtered = filtered.filter((exhibit) => exhibit.toMuseum !== "science");
      }
      if (!historyExhibits.value) {
        filtered = filtered.filter((exhibit) => exhibit.toMuseum !== "history");
      }
      if (!techExhibits.value) {
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

    const testUploadWidget = async () => {
      const myWidget = cloudinary.createUploadWidget(
        {
          cloudName: "dkzpi7xpb",
          uploadPreset: "indelect",
          multiple: true,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);

            newImagesHolder.value.push(result.info.secure_url);
            console.log(newImagesHolder.value);
          }
        }
      );

      myWidget.open();
    };

    const testUploadWidgetExisting = async () => {
      const myWidget = cloudinary.createUploadWidget(
        {
          cloudName: "dkzpi7xpb",
          uploadPreset: "indelect",
          multiple: true,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);

            exhibitImages.value.push(result.info.secure_url);
            console.log(exhibitImages.value);
          }
        }
      );

      myWidget.open();
    };

    const removeImage = (index) => {
      newImagesHolder.value.splice(index, 1);
    };

    const removeImageExisting = (index) => {
      exhibitImages.value.splice(index, 1);
    };
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
        !newImagesHolder.value ||
        !newToMuseum.value
      ) {
        console.error("All fields are required");
        showError.value = true;
      }

      try {
        const response = await axios.post("/exhibit/add", {
          exhibitName: newTitle.value,
          description: newDescription.value,
          images: newImagesHolder.value,
          isDisplayed: newDisplayed.value,
          toMuseum: newToMuseum.value,
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
      exhibitToMuseum.value = exhibit.toMuseum;
      exhibitID.value = exhibit._id;
    };

    const updateExhibit = async () => {
      showError.value = false;

      if (
        !exhibitID.value ||
        !exhibitTitle.value ||
        !exhibitDescription.value ||
        !exhibitToMuseum.value
      ) {
        console.error("All fields are required");
        showError.value = true;
      }

      const updateData = {
        exhibitName: exhibitTitle.value,
        description: exhibitDescription.value,
        images: exhibitImages.value,
        isDisplayed: exhibitDisplayed.value,
        toMuseum: exhibitToMuseum.value,
      };
      console.log("Sending update request with data:", {
        id: exhibitID.value,
        updateData,
      });

      try {
        const response = await axios.post("/exhibit/update", {
          id: exhibitID.value,
          updateData,
        });

        onClosedDialogResetExisting();
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
          data: { id: exhibitID.value },
        });

        onClosedDialogResetExisting();
        await getAllExhibits();
        console.log("Delete successful:", response.data);
        
      } catch (error) {
        console.error("Deleting exhibit failed:", error);
        showError.value = true;
      }
    };

    return {
      isMobile,
      displayedExhibits,
      hiddenExhibits,
      artExhibits,
      scienceExhibits,
      historyExhibits,
      techExhibits,
      exhibits,
      filteredExhibits,
      rules,
      logout,
      newTitle,
      newDescription,
      newImagesHolder,
      newDisplayed,
      newToMuseum,
      menu,
      museumOptions,
      selectMuseum,
      newExhibit,
      watch,
      onClosedDialogReset,
      onClosedDialogResetExisting,
      showError,
      getAllExhibits,
      exhibitTitle,
      exhibitDescription,
      exhibitImages,
      exhibitDisplayed,
      exhibitToMuseum,
      selectModifyExhibitMuseum,
      loadExhibitData,
      updateExhibit,
      deleteExhibit,
      isActive,
      isActiveImages,
      search,
      testUploadWidget,
      testUploadWidgetExisting,
      removeImage,
      removeImageExisting,
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

.new-images-button {
  width: 90%;
}

.new-images-carousel {
  overflow-x: auto;
  width: 90%;
}

.image-card {
  cursor: pointer;
  position: relative;
  background-color: #f5f5f5;
}
</style>

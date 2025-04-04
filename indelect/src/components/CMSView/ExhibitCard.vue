<template>
  <v-dialog v-model="dialog" max-width="800" persistent>
    <template v-slot:activator="{ props: openEditExistingWindow }">
      <v-btn
        class="exhibit-btn"
        v-bind="openEditExistingWindow"
        :ripple="false"
        height="200"
        width="100%"
        elevation="8"
        @click="openDialog"
        :style="{
          backgroundImage: `url(${exhibit.images[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        <v-card-title class="white--text">{{ exhibit.exhibitName }}</v-card-title>
      </v-btn>
    </template>
    <template v-slot:default>
      <v-card class="pt-8 pb-8">
        <v-card-title class="text-center">Modify the exhibit: </v-card-title>
        <div class="horizontal-addnew-title-separator"></div>
        <v-text-field
          class="new-name-bar ml-10"
          v-model="exhibitData.title"
          label="Exhibit name..."
          :rules="[rules.required]"
          variant="underlined"
          clearable
        ></v-text-field>

        <v-textarea
          class="new-name-bar mt-4 ml-10"
          v-model="exhibitData.description"
          label="Exhibit description..."
          :rules="[rules.required]"
          variant="underlined"
          clearable
        ></v-textarea>

        <v-checkbox
          v-model="exhibitData.displayed"
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
              {{ exhibitData.toMuseum || "Select Museum" }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in museumOptions"
              :key="index"
              @click="exhibitData.toMuseum = item"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <image-uploader 
          :images="exhibitData.images" 
          @add-images="onUploadImages"
          @remove-image="removeImage"
        />

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
            Check all the fields or if you believe this to be an error,
            contact the system administrator.
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
              @click="deleteExhibit"
            >
              Delete
            </v-btn>
          </v-card-actions>

          <v-card-actions>
            <v-btn
              class="mr-16"
              color="secondary"
              @click="closeDialog"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-toolbar>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import ImageUploader from '../CMSView/ImageUploader.vue';

export default {
  name: 'ExhibitCard',
  components: {
    ImageUploader
  },
  props: {
    exhibit: {
      type: Object,
      required: true
    },
    museumOptions: {
      type: Array,
      default: () => ["art", "science", "history", "technology"]
    }
  },
  data() {
    return {
      dialog: false,
      exhibitData: {
        id: '',
        title: '',
        description: '',
        images: [],
        displayed: false,
        toMuseum: ''
      },
      showError: false,
      rules: {
        required: v => !!v || 'This field is required'
      }
    };
  },
  created() {
    this.initializeData();
  },
  watch: {
    exhibit: {
      handler() {
        this.initializeData();
      },
      deep: true
    }
  },
  methods: {
    openDialog() {
      this.$emit('load-exhibit', this.exhibit);
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.resetForm();
      this.$emit('refresh');
    },
    initializeData() {
      this.exhibitData = {
        id: this.exhibit._id,
        title: this.exhibit.exhibitName,
        description: this.exhibit.description,
        images: [...this.exhibit.images],
        displayed: this.exhibit.isDisplayed,
        toMuseum: this.exhibit.toMuseum
      };
    },
    resetForm() {
      this.showError = false;
      this.initializeData();
    },
    onUploadImages(newImages) {
      this.exhibitData.images.push(...newImages);
    },
    removeImage(index) {
      this.exhibitData.images.splice(index, 1);
    },
    updateExhibit() {
      if (!this.validateForm()) {
        this.showError = true;
        return;
      }
      
      const updateData = {
        exhibitName: this.exhibitData.title,
        description: this.exhibitData.description,
        images: this.exhibitData.images,
        isDisplayed: this.exhibitData.displayed,
        toMuseum: this.exhibitData.toMuseum
      };
      
      this.$emit('update-exhibit', this.exhibitData.id, updateData);
      
      this.$emit('refresh');
      
      this.dialog = false;
      this.resetForm();
    },
    deleteExhibit() {
      this.$emit('delete-exhibit', this.exhibitData.id);
    },
    validateForm() {
      return this.exhibitData.title && 
             this.exhibitData.description && 
             this.exhibitData.toMuseum;
    }
  }
};
</script>

<style scoped>
.horizontal-addnew-title-separator {
  height: 1px;
  width: 90%;
  align-self: center;
  background-color: #eb4511;
  margin-top: 6px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.new-name-bar {
  max-width: 90%;
}

.top-checkbox-top-margin {
  margin-top: 22px;
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
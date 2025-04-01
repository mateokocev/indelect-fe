<template>
    <v-dialog max-width="800" persistent>
      <template v-slot:activator="{ props: openCreateNewWindow }">
        <v-btn
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
          <v-card-title class="text-center">Add new exhibit</v-card-title>
          <div class="horizontal-addnew-title-separator"></div>
          <v-text-field
            class="new-name-bar ml-10"
            v-model="newExhibit.title"
            label="Exhibit name..."
            :rules="[rules.required]"
            variant="underlined"
            clearable
          ></v-text-field>
  
          <v-textarea
            class="new-name-bar mt-4 ml-10"
            v-model="newExhibit.description"
            label="Exhibit description..."
            :rules="[rules.required]"
            variant="underlined"
            clearable
          ></v-textarea>
  
          <v-checkbox
            v-model="newExhibit.displayed"
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
                {{ newExhibit.toMuseum || "Select Museum" }}
              </v-btn>
            </template>
  
            <v-list>
              <v-list-item
                v-for="(item, index) in museumOptions"
                :key="index"
                @click="newExhibit.toMuseum = item"
              >
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
  
          <image-uploader 
            :images="newExhibit.images" 
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
              Adding the exhibit failed due to unspecified reasons.
              Check all the fields or if you believe this to be an
              error contact the system administrator.
            </v-card-text>
          </v-card>
  
          <v-toolbar class="mt-6" color="white">
            <v-card-actions>
              <v-btn
                class="ml-16"
                color="primary"
                @click="createExhibit"
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
                    resetForm();
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
  </template>
  
<script>
  import ImageUploader from './ImageUploader.vue';
  
  export default {
    name: 'AddExhibitButton',
    components: {
      ImageUploader
    },
    props: {
      museumOptions: {
        type: Array,
        default: () => ["art", "science", "history", "technology"]
      }
    },
    data() {
      return {
        newExhibit: {
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
    methods: {
      resetForm() {
        this.newExhibit = {
          title: '',
          description: '',
          images: [],
          displayed: false,
          toMuseum: ''
        };
        this.showError = false;
      },
      onUploadImages(newImages) {
        this.newExhibit.images.push(...newImages);
      },
      removeImage(index) {
        this.newExhibit.images.splice(index, 1);
      },
      createExhibit() {
        this.showError = false;
        
        if (!this.validateForm()) {
          this.showError = true;
          return;
        }
        
        const exhibitData = {
          exhibitName: this.newExhibit.title,
          description: this.newExhibit.description,
          images: this.newExhibit.images,
          isDisplayed: this.newExhibit.displayed,
          toMuseum: this.newExhibit.toMuseum
        };
        
        this.$emit('add-exhibit', exhibitData);
        this.resetForm();
      },
      validateForm() {
        return this.newExhibit.title && 
          this.newExhibit.description && 
          this.newExhibit.images.length > 0 && 
          this.newExhibit.toMuseum;
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
  
  .add-card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
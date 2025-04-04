<template>
    <div>
      <v-btn
        class="new-images-button mt-4 ml-10"
        @click="openUploadWidget"
      >
        Add Images
      </v-btn>
  
      <v-card
        class="new-images-carousel pa-4 ml-10 mt-4 flat"
      >
        <v-row class="flex-nowrap">
          <v-col
            v-for="(image, index) in images"
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
            >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click.stop="onRemoveImage(index)">
                  <v-icon color="red">mdi-close</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </div>
</template>
  
<script>
  export default {
    name: 'ImageUploader',
    props: {
      images: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      openUploadWidget() {
        const widget = cloudinary.createUploadWidget(
          {
            cloudName: "dkzpi7xpb",
            uploadPreset: "indelect",
            multiple: true,
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              this.$emit('add-images', [result.info.secure_url]);
            }
          }
        );
        
        widget.open();
      },
      onRemoveImage(index) {
        this.$emit('remove-image', index);
      }
    }
  };
</script>
  
<style scoped>
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
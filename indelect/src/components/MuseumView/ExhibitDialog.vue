<template>
  <v-dialog max-width="480" v-model="internalVisible">
    <v-card v-if="exhibit">
      <v-card-title class="dialog-title">
        <strong>{{ exhibit.exhibitName }}</strong>
      </v-card-title>
      <v-card-text>
        <p class="description">{{ exhibit.description }}</p>
        <v-divider class="divider"></v-divider>
        <div class="images-container">
          <div 
            v-for="(image, index) in exhibit.images" 
            :key="index" 
            class="image-wrapper"
          >
            <v-img :src="image" :alt="`${museumTypeLabel} Image`" />
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ExhibitDialog",
  props: {
    exhibit: {
      type: Object,
      default: null
    },
    visible: {
      type: Boolean,
      required: true
    },
    museumTypeLabel: {
      type: String,
      default: ""
    }
  },
  emits: ["update:visible"],
  computed: {
    internalVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  methods: {
    closeDialog() {
      this.internalVisible = false;
    }
  }
};
</script>

<style scoped>
.dialog-title {
  padding: 16px;
}

.description {
  margin-bottom: 16px;
}

.divider {
  margin: 16px 0;
}

.images-container {
  display: flex;
  flex-direction: column;
}

.image-wrapper {
  margin-bottom: 12px;
}
</style>
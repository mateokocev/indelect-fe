<template>
    <v-dialog max-width="480" v-model="internalVisible">
      <v-card v-if="exhibit">
        <v-card-title>
          <span class="headline">{{ exhibit.exhibitName }}</span>
        </v-card-title>
        <v-card-text>
          <p>{{ exhibit.description }}</p>
          <div v-for="(image, index) in exhibit.images" :key="index">
            <v-img :src="image" :alt="`${museumTypeLabel} Image`" />
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
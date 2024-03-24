<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="display-1 text-center">Explore the Museum</h1>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col v-for="(exhibit, index) in exhibits" :key="index" cols="12" sm="6" md="4" lg="3">
          <v-card class="mb-4" @click="viewExhibit(exhibit)">
            <v-img :src="exhibit.imageUrl" height="200">
              <v-card-title>{{ exhibit.title }}</v-card-title>
            </v-img>
            <v-card-actions>
              <v-btn text color="primary" @click.stop="viewExhibit(exhibit)">View Details</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
  
      <v-dialog v-model="dialog" max-width="600">
        <v-card>
          <v-img :src="selectedExhibit.imageUrl" height="400">
            <v-card-title>{{ selectedExhibit.title }}</v-card-title>
          </v-img>
          <v-card-text>{{ selectedExhibit.description }}</v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        exhibits: [
          {
            title: 'Artwork 1',
            imageUrl: '/path/to/image1.jpg',
            description: 'Description of artwork 1.',
          },
          {
            title: 'Artwork 2',
            imageUrl: '/path/to/image2.jpg',
            description: 'Description of artwork 2.',
          },
          // Add more exhibit objects as needed
        ],
        dialog: false,
        selectedExhibit: null,
      };
    },
    methods: {
      viewExhibit(exhibit) {
        this.selectedExhibit = exhibit;
        this.dialog = true;
      },
    },
  };
  </script>
  
  <style>
  /* Add custom styles here */
  </style>
  
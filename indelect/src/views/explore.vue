<template>
    <v-container>
      <v-row>
        <v-col
          v-for="(exhibit, index) in exhibits"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="mx-auto" max-width="344" outlined>
            <v-img
              :src="exhibit.imageUrl"
              height="200"
            ></v-img>
  
            <v-card-title>{{ exhibit.title }}</v-card-title>
  
            <v-card-text>
              {{ exhibit.description }}
            </v-card-text>
  
            <v-card-actions>
              <v-btn color="primary" text>View Details</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        exhibits: [
          {
            title: 'Exhibit 1',
            description: 'Description for exhibit 1',
            imageUrl: 'https://via.placeholder.com/300',
          },
          {
            title: 'Exhibit 2',
            description: 'Description for exhibit 2',
            imageUrl: 'https://via.placeholder.com/300',
          },
          {
            title: 'Exhibit 3',
            description: 'Description for exhibit 3',
            imageUrl: 'https://via.placeholder.com/300',
          },
          {
            title: 'Exhibit 4',
            description: 'Description for exhibit 4',
            imageUrl: 'https://via.placeholder.com/300',
          },
        ],
      };
    },
  };
  </script>
  
  <style>
  </style>
  
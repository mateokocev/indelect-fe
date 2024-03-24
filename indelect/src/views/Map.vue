<template>
    <div>
      <h1>Welcome to the Museum Map</h1>
      <div class="map-container">
        <!-- Map Image (You can replace the image URL with your own map) -->
        <img src="./assets/map.png" alt="Museum Map" class="map-image" @click="handleMapClick($event)">
        <!-- Hotspots -->
        <button v-for="spot in hotspots" :key="spot.id" :style="{ left: spot.coordinates.x + 'px', top: spot.coordinates.y + 'px' }" @click="showExhibition(spot.id)">
          {{ spot.name }}
        </button>
      </div>
      <!-- Exhibition Item Details -->
      <div v-if="selectedItem" class="exhibition-details">
        <h2>Exhibition Item Details</h2>
        <div>
          <p>ID: {{ selectedItem.id }}</p>
          <p>Name: {{ selectedItem.name }}</p>
          <!-- Add more details as needed -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        hotspots: [
          { id: 1, name: 'Spot 1', coordinates: { x: 100, y: 150 } },
          { id: 2, name: 'Spot 2', coordinates: { x: 200, y: 300 } },
          // Add more hotspots as needed
        ],
        selectedItem: null,
      };
    },
    methods: {
      showExhibition(itemId) {
        // Simulate fetching item details from API based on itemId
        // Replace this with actual API call in real application
        this.selectedItem = this.hotspots.find(spot => spot.id === itemId);
      },
      handleMapClick(event) {
        // Simulate clicking on map to deselect item
        this.selectedItem = null;
      },
    },
  };
  </script>
  
  <style>
  /* Add CSS styles for the map container and hotspots */
  .map-container {
    position: relative;
    width: 100%;
    height: 500px; /* Adjust height as needed */
  }
  .map-image {
    width: 100%;
    height: 100%;
  }
  button {
    position: absolute;
  }
  .exhibition-details {
    margin-top: 20px;
  }
  </style>
  
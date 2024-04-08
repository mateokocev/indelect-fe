<template>
  <div>
    <h1>Welcome to the Museum Map</h1>
    <div class="map-container">
      <!-- Map Image (You can replace the image URL with your own map) -->
      <img src="https://i.postimg.cc/fRJwkzhr/addada.png" alt="Museum Map" class="map-image" @click="handleMapClick($event)">
      <!-- Hotspots -->
      <v-btn v-for="spot in hotspots" :key="spot.id" class="hotspot-button" :style="{ left: spot.coordinates.x + 'px', top: spot.coordinates.y + 'px' }" icon @click="showExhibition(spot.id)" small color="red">
        {{ spot.name }}
      </v-btn>
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
        { id: 1, name: 'Spot 1', coordinates: { x: 200, y: -750 } },
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
}
.map-image {
  width: 100%;
  height: 100%;
}
.hotspot-button {
  position: absolute;
}
.exhibition-details {
  margin-top: 20px;
}
</style>

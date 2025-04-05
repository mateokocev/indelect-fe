<template>
    <div class="exhibit-buttons-container">
      <v-btn
        v-for="exhibit in exhibits"
        :key="exhibit._id"
        class="exhibit-btn"
        :ripple="false"
        height="200"
        width="100%"
        elevation="8"
        @click="$emit('select', exhibit)"
        :style="{
          backgroundImage: `url(${exhibit.images[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }"
      >
        <v-card-title class="white--text overlay-text">
          {{ exhibit.exhibitName }}
        </v-card-title>
      </v-btn>
    </div>
</template>
  
<script>
  export default {
    name: "ExhibitList",
    props: {
      exhibits: {
        type: Array,
        required: true,
      },
    },
    emits: ["select"],
  };
  </script>
  
  <style scoped>
  .exhibit-buttons-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }
  
  .exhibit-btn {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
  }
  
  .overlay-text {
    position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  padding: 10px 0;
  text-align: center;
  color: #fff !important;
  font-weight: 500;
  }
</style>
  
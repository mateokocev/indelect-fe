<template>
    <v-container class="mt-16 mb-3" style="padding: 16px 2px; margin-left: 0px">
      <v-row>
        <v-col
          v-for="exhibit in exhibits"
          :key="exhibit._id"
          class="d-flex align-center justify-center"
          cols="2"
        >
          <exhibit-card 
            :exhibit="exhibit"
            :museumOptions="museumOptions"
            @load-exhibit="$emit('load-exhibit', $event)"
            @update-exhibit="(id, updateData) => $emit('update-exhibit', id, updateData)"
            @delete-exhibit="$emit('delete-exhibit', $event)"
            @refresh="$emit('refresh')"
          />
        </v-col>
        
        <v-col class="d-flex align-center justify-center" cols="2">
          <add-exhibit-button 
            :museumOptions="museumOptions"
            @add-exhibit="$emit('add-exhibit', $event)"
          />
        </v-col>
      </v-row>
    </v-container>
</template>
    
<script>
  import ExhibitCard from './ExhibitCard.vue';
  import AddExhibitButton from './AddExhibitButton.vue';
  
  export default {
    name: 'ExhibitGrid',
    components: {
      ExhibitCard,
      AddExhibitButton
    },
    props: {
      exhibits: {
        type: Array,
        required: true
      },
      museumOptions: {
        type: Array,
        default: () => ["art", "science", "history", "technology"]
      }
    }
  };
</script>
<template>
  <v-dialog v-model="internalVisible" max-width="400">
    <v-card>
      <v-card-title class="text-h5 text-center" :style="{ color: '#B02E0C' }">
        {{ title }}
      </v-card-title>
      <v-card-text class="text-center">
        <p v-if="type === 'already-owned'">
          You already own a ticket for {{ museumName }}.
        </p>
        <p v-if="type === 'already-owned'">
          Check your tickets in the MY TICKETS tab.
        </p>
        <p v-if="type === 'error'">
          Failed to purchase ticket. Please try again.
        </p>
      </v-card-text>
      <v-card-actions class="justify-center pb-4">
        <v-btn color="#B02E0C" text @click="internalVisible = false">
          {{ closeButtonText }}
        </v-btn>
        <v-btn
          v-if="type === 'already-owned'"
          color="#EF866F"
          @click="$emit('view-my-tickets')"
        >
          View My Tickets
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      type: {
        type: String,
        default: 'error',
        validator: (value) => ['error', 'already-owned'].includes(value)
      },
      museumName: {
        type: String,
        default: ''
      }
    },
    emits: ['update:visible', 'view-my-tickets'],
    computed: {
      internalVisible: {
        get() {
          return this.visible;
        },
        set(val) {
          this.$emit('update:visible', val);
        }
      },
      title() {
        return this.type === 'already-owned'
          ? 'Ticket Already Owned'
          : 'Purchase Failed';
      },
      closeButtonText() {
        return this.type === 'already-owned' ? 'Close' : 'OK';
      }
    }
  };
</script>

<style scoped>
</style>
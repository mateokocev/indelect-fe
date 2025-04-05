<template>
  <v-dialog v-model="internalVisible" max-width="400">
    <v-card>
      <v-card-title class="text-h5 text-center">
        {{ museumName }}
      </v-card-title>
      <v-card-text class="text-center">
        <p>Scan this QR code to enter the museum:</p>
        <img :src="qrCodeUrl" alt="QR Code" class="qr-code"/>
        <p v-if="purchaseDate" class="mt-4">Purchase Date: {{ formatDate(purchaseDate) }}</p>
        <p v-else class="mt-4">This ticket has been added to your account.</p>
      </v-card-text>
      <v-card-actions class="justify-center pb-4">
        <v-btn color="#B02E0C" text @click="internalVisible = false">
          Close
        </v-btn>
        <v-btn color="#EF866F" @click="$emit('use-ticket', museumName, qrCodeUrl)">
          Use Ticket
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
      museumName: {
        type: String,
        default: ''
      },
      qrCodeUrl: {
        type: String,
        default: ''
      },
      purchaseDate: {
        type: [Date, String, null],
        default: null
      }
    },
    emits: ['update:visible', 'use-ticket'],
    computed: {
      internalVisible: {
        get() {
          return this.visible;
        },
        set(val) {
          this.$emit('update:visible', val);
        }
      }
    },
    methods: {
      formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    }
  }
</script>

<style scoped>
  .qr-code {
    max-width: 100%;
    height: auto;
    margin: 20px auto;
    display: block;
  }
</style>

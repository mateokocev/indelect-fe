<template>
  <div>
    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="#B02E0C"></v-progress-circular>
      </v-col>
    </v-row>
    
    <v-row v-else-if="tickets.length === 0">
      <v-col cols="12" class="text-center">
        <p>You don't have any tickets yet.</p>
        <v-btn color="#EF866F" class="mt-4" @click="$emit('browse-tickets')">
          Browse Tickets
        </v-btn>
      </v-col>
    </v-row>
    
    <v-row v-else>
      <v-col v-for="(ticket, index) in tickets" :key="index" cols="12">
        <v-card class="mb-4">
          <v-card-title class="text-h6">
            {{ getTicketName(ticket) }}
          </v-card-title>
          <v-card-text class="d-flex flex-column flex-md-row align-center">
            <div class="flex-grow-1">
              <p>Purchase Date: {{ formatDate(ticket.purchaseDate) }}</p>
            </div>
            <div class="qr-container">
              <img :src="ticket.qrCodeUrl" alt="QR Code" class="qr-code-small"/>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn 
              color="#B02E0C" 
              text 
              @click="handleViewQrCode(ticket)"
            >
              VIEW QR CODE
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    props: {
      tickets: {
        type: Array,
        required: true
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    emits: ['browse-tickets', 'view-qr-code'],
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
      },
      getTicketName(ticket) {
        if (!ticket) return 'Unknown';
        
        if (ticket.museumName) return ticket.museumName;
        
        if (ticket.ticket) {
          if (typeof ticket.ticket === 'object' && ticket.ticket.MuseumName) {
            return ticket.ticket.MuseumName;
          }
        }
        
        return 'Unknown Museum';
      },
      handleViewQrCode(ticket) {
        this.$emit('view-qr-code', ticket);
      }
    }
  }
</script>

<style scoped>
  .qr-code-small {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }

  .qr-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
  }

  @media (min-width: 960px) {
    .qr-container {
      margin-top: 0;
      margin-left: 12px;
    }
  }
</style>
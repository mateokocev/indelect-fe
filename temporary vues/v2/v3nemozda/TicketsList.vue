<template>
  <div>
    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="#B02E0C"></v-progress-circular>
      </v-col>
    </v-row>
    
    <v-row v-else-if="tickets.length === 0">
      <v-col cols="12" class="text-center">
        <p>No tickets available at the moment.</p>
      </v-col>
    </v-row>
    
    <v-row v-else>
      <v-col v-for="ticket in tickets" :key="ticket._id" cols="12" md="6">
        <ticket-card 
          :ticket="ticket" 
          :user-email="userEmail" 
          :user-tickets="userTickets"
          @ticket-purchased="handleTicketPurchased"
          @ticket-already-owned="handleTicketAlreadyOwned"
          @purchase-error="handlePurchaseError"
          @show-payment="handleShowPayment"
        ></ticket-card>
      </v-col>
    </v-row>
    
    <payment-dialog
      :visible="showPaymentDialog"
      @update:visible="showPaymentDialog = $event"
      :museum-name="paymentDetails.museumName"
      :price="paymentDetails.price"
      @payment-successful="handlePaymentSuccess"
    ></payment-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import TicketCard from './TicketCard.vue';
import PaymentDialog from './PaymentDialog.vue';

export default {
  components: {
    TicketCard,
    PaymentDialog
  },
  props: {
    tickets: {
      type: Array,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    userTickets: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['ticket-purchased', 'ticket-already-owned', 'purchase-error', 'view-my-tickets'],
  setup(props, { emit }) {
    const showPaymentDialog = ref(false);
    const paymentDetails = ref({
      museumName: '',
      price: 0,
      ticketRef: null
    });
    
    const handleTicketPurchased = (ticketData) => {
      emit('ticket-purchased', ticketData);
    };

    const handleTicketAlreadyOwned = (museumName) => {
      emit('ticket-already-owned', museumName);
    };

    const handlePurchaseError = () => {
      emit('purchase-error');
    };
    
    const handleShowPayment = (details) => {
      paymentDetails.value = {
        museumName: details.museumName,
        price: details.price
      };
      showPaymentDialog.value = true;
    };
    
    const handlePaymentSuccess = async () => {
      const ticket = props.tickets.find(t => t.MuseumName === paymentDetails.value.museumName);
      
      if (ticket) {
        try {
          const response = await axios.get(`/tickets/${ticket.MuseumName}/qrcode?email=${props.userEmail}`);
          handleTicketPurchased({
            museumName: ticket.MuseumName,
            qrCodeData: response.data
          });
        } catch (error) {
          console.error("Error purchasing ticket:", error);
          handlePurchaseError();
        }
      }
    };

    return {
      showPaymentDialog,
      paymentDetails,
      handleTicketPurchased,
      handleTicketAlreadyOwned,
      handlePurchaseError,
      handleShowPayment,
      handlePaymentSuccess
    };
  }
}
</script>
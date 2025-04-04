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
          @ticket-purchased="$emit('ticket-purchased', $event)"
          @ticket-already-owned="$emit('ticket-already-owned', $event)"
          @purchase-error="$emit('purchase-error')"
          @show-payment="handleShowPayment"
        ></ticket-card>
      </v-col>
    </v-row>
    
    <payment-dialog
      :visible="showPaymentDialog"
      @update:visible="showPaymentDialog = $event"
      :museum-name="paymentInfo.museumName"
      :price="paymentInfo.price"
      @payment-successful="handlePaymentSuccess"
      @payment-failed="$emit('purchase-error')"
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
    emits: ['ticket-purchased', 'ticket-already-owned', 'purchase-error'],
    setup(props, { emit }) {
      const showPaymentDialog = ref(false);
      const paymentInfo = ref({
        museumName: '',
        price: 0
      });
      
      const handleShowPayment = (info) => {
        console.log("Show payment dialog for:", info);
        paymentInfo.value = info;
        showPaymentDialog.value = true;
      };
      
      const handlePaymentSuccess = async () => {
        try {
          console.log("Payment successful, purchasing ticket for:", paymentInfo.value.museumName);
          
          const ticket = props.tickets.find(t => t.MuseumName === paymentInfo.value.museumName);
          
          if (!ticket) {
            console.error("Ticket not found for museum:", paymentInfo.value.museumName);
            emit('purchase-error');
            return;
          }
          
          const response = await axios.get(`/tickets/${ticket.MuseumName}/qrcode?email=${props.userEmail}`);
          emit('ticket-purchased', {
            museumName: ticket.MuseumName,
            qrCodeData: response.data
          });
        } catch (error) {
          console.error("Error purchasing ticket:", error);
          emit('purchase-error');
        }
      };
      
      return {
        showPaymentDialog,
        paymentInfo,
        handleShowPayment,
        handlePaymentSuccess
      };
    }
  };
</script>
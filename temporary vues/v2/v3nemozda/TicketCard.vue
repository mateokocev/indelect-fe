<template>
  <div>
    <v-card class="ticket-card mx-auto mb-4" max-width="300" hover>
      <v-card-title class="text-center">{{ ticket.MuseumName }}</v-card-title>
      <v-card-text class="pb-0">
        <p>{{ ticket.MuseumDetails }}</p>
      </v-card-text>
      <v-card-actions class="justify-center pb-3">
        <v-btn color="#EF866F" @click="showPaymentDialog" class="px-6">
          BUY FOR ${{ ticket.Price }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';

  export default defineComponent({
    name: 'TicketCard',
    props: {
      ticket: {
        type: Object,
        required: true
      },
      userEmail: {
        type: String,
        required: true
      },
      userTickets: {
        type: Array,
        default: () => []
      }
    },
    emits: ['ticket-purchased', 'ticket-already-owned', 'purchase-error', 'show-payment'],
    setup(props, { emit }) {
      const showPaymentDialog = () => {
        if (props.userTickets && props.userTickets.length > 0) {
          const ticketAlreadyOwned = props.userTickets.some(userTicket => {
            return userTicket && 
                  userTicket.ticket && 
                  userTicket.ticket.MuseumName === props.ticket.MuseumName;
          });

          if (ticketAlreadyOwned) {
            emit('ticket-already-owned', props.ticket.MuseumName);
            return;
          }
        }
        
        emit('show-payment', {
          museumName: props.ticket.MuseumName,
          price: props.ticket.Price
        });
      };

      const buyTicket = async () => {
        try {
          const response = await axios.get(`/tickets/${props.ticket.MuseumName}/qrcode?email=${props.userEmail}`);
          emit('ticket-purchased', {
            museumName: props.ticket.MuseumName,
            qrCodeData: response.data
          });
        } catch (error) {
          console.error("Error purchasing ticket:", error);
          emit('purchase-error');
        }
      };

      return {
        showPaymentDialog,
        buyTicket
      };
    }
  });
</script>

<style scoped>
  .ticket-card {
    transition: all 0.3s ease;
    border-radius: 8px;
  }

  .ticket-card:hover {
    background-color: #ffb6c1;
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }
</style>
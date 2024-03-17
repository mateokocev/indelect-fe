<template>
    <v-app>
      <v-main>
        <v-container>
          <h1 class="mb-4">Buy Tickets</h1>
          <v-row>
            <v-col v-for="ticket in tickets" :key="ticket.id" cols="12" sm="6" md="4">
              <v-card class="mb-4">
                <v-card-title>{{ ticket.name }}</v-card-title>
                <v-card-text>Price: ${{ ticket.price }}</v-card-text>
                <v-card-actions>
                  <v-btn :disabled="ticket.quantity === 0" @click="selectTicket(ticket)" color="primary">
                    {{ ticket.quantity > 0 ? 'Select' : 'Sold Out' }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn @click="checkout" color="success" :disabled="selectedTickets.length === 0">
                Checkout (${{ totalAmount }})
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tickets: [
          { id: 1, name: 'General Admission', price: 20, quantity: 10 },
          { id: 2, name: 'VIP Pass', price: 50, quantity: 5 },
        ],
        selectedTickets: [],
      };
    },
    computed: {
      totalAmount() {
        return this.selectedTickets.reduce((total, ticket) => total + ticket.price, 0);
      },
    },
    methods: {
      selectTicket(ticket) {
        if (ticket.quantity > 0) {
          this.selectedTickets.push(ticket);
          ticket.quantity--;
        }
      },
      checkout() {
        if (this.selectedTickets.length > 0) {
          // Implement your checkout logic here
          alert('Processing checkout. Total amount: $' + this.totalAmount.toFixed(2));
        } else {
          alert('Please select at least one ticket.');
        }
      },
    },
  };
  </script>
  
  <style>
  /* Add custom styles here */
  </style>
  
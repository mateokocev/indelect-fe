<template>
    <div>
      <h1>Payment</h1>
      <form @submit.prevent="processPayment">
        <input type="text" v-model="paymentDetails.cardNumber" placeholder="Card Number" required />
        <input type="text" v-model="paymentDetails.expiryDate" placeholder="Expiry Date" required />
        <input type="text" v-model="paymentDetails.cvc" placeholder="CVC" required />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        paymentDetails: {
          cardNumber: '',
          expiryDate: '',
          cvc: ''
        }
      };
    },
    methods: {
      processPayment() {
        // Process payment (this would normally involve calling a payment API)
        axios.post('/api/payment', this.paymentDetails)
          .then(response => {
            alert('Payment successful!');
            this.$store.commit('clearCart');
            this.$router.push('/');
          })
          .catch(error => {
            alert('Payment failed.');
          });
      }
    }
  };
  </script>
  
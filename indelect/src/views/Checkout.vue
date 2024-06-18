<template>
    <div>
      <h1>Checkout</h1>
      <ul>
        <li v-for="item in cart" :key="item.id">{{ item.name }} - {{ item.price }}</li>
      </ul>
      <router-link to="/payment">Proceed to Payment</router-link>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      cart() {
        return this.$store.state.cart;
      }
    }
  };
  </script>
  
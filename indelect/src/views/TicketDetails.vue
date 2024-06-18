<template>
    <div>
      <h1>{{ ticket.name }}</h1>
      <p>{{ ticket.description }}</p>
      <button @click="addToCart">Buy Ticket</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ticket: {}
      };
    },
    created() {
      const id = this.$route.params.id;
      // Fetch ticket details from an API
      axios.get(`/api/tickets/${id}`)
        .then(response => {
          this.ticket = response.data;
        });
    },
    methods: {
      addToCart() {
        // Add ticket to cart (using Vuex store)
        this.$store.commit('addToCart', this.ticket);
        this.$router.push('/checkout');
      }
    }
  };
  </script>
  
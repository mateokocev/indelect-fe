<template>
    <div>
      <h1>Available Tickets</h1>
      <ul>
        <li v-for="ticket in tickets" :key="ticket.id">
          <router-link :to="'/ticket/' + ticket.id">{{ ticket.name }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tickets: []
      };
    },
    created() {
      // Fetch tickets from an API
      axios.get('/api/tickets')
        .then(response => {
          this.tickets = response.data;
        });
    }
  };
  </script>
  
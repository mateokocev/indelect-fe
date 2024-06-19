<template>
    <nav class="navbar">
      <!-- Your navigation bar content -->
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <!-- Add more navigation links as needed -->
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar'
    // Your component logic here
  }
  </script>
  
  <style scoped>
  .navbar {
    background-color: #333;
    color: white;
    padding: 10px;
  }
  
  .navbar ul {
    list-style-type: none;
    padding: 0;
  }
  
  .navbar ul li {
    display: inline;
    margin-right: 10px;
  }
  
  .navbar ul li a {
    color: white;
    text-decoration: none;
  }
  </style>
  
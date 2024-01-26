<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const visible = ref(false);
</script>

<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      :src="'https://cdn.discordapp.com/attachments/913519250872881233/1200473327085555783/Screenshot_2024-01-09_at_00.53.45.png?ex=65c64ee8&is=65b3d9e8&hm=282c381b6904fdde1699c2c0cf8a9e23e4115d4ec3c52025f994756f7deab363'"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
      color="white" 
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
          class="Lozinka"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
          style="color: #EB4511;"
        >
          Forgot login password?
        </a>
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card
        class="mb-12"
        color="C1BFB5"  
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, your account will be temporarily locked for three hours. If you must log in now, you can also click "Forgot login password?" below to reset the login password.
        </v-card-text>
      </v-card>
      <router-link to="/home">
    <v-btn
      block
      class="mb-8"
      color="EB4511"
      size="large"
      variant="tonal"
      @click="login" 
    >
      Log In
    </v-btn>
</router-link>
      <v-card-text class="text-center">
        <router-link to="/signup" 
        class="text-blue text-decoration-none" 
        style="color: #8EB1C7;">
      Sign up now <v-icon icon="mdi-chevron-right">

      </v-icon>
    </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    visible: false,
  }),
}
</script>

<style scoped>
/* Add your scoped styles here */
</style>

<template>
  <div>
    <v-container v-if="!isMobile">

      <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://i.postimg.cc/s1v7Gj6p/your-image.jpg"
      ></v-img>

      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
        color="white" 
      >

        <div class="text-subtitle-1 text-medium-emphasis">Email address</div>
        <v-text-field
          v-model="email"
          :rules="[rules.email, rules.required]"
          density="compact"
          placeholder="Enter your email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Password</div>
        <v-text-field
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          :rules="[rules.password, rules.length(6), rules.required]"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          class="mb-7"
        ></v-text-field>



        <router-link to="/home" class="no-underline">
          <v-btn
            block
            class="mb-8"
            color="#EB4511"
            size="large"
            variant="tonal"
            @click="login"
          >
          Log In
          </v-btn>
        </router-link>

        <v-card-text class="text-center">
          <router-link to="/signup"
            class="text-black text-decoration-underline"
          >
          Don't have an account yet? Sign Up
          </router-link>
        </v-card-text>
      </v-card>
    </v-container>

    <v-container v-else>
      <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://i.postimg.cc/s1v7Gj6p/your-image.jpg"
      ></v-img>

      <v-card
        class="mx-auto pa-12 pb-8"
        max-width="448"
        elevation="0"
        rounded="lg"
        color="white" 
      >
      
        <div class="text-subtitle-1 text-medium-emphasis">Email address</div>
        <v-text-field
            v-model="email"
            :rules="[rules.email,rules.required]"
            density="compact"
            placeholder="Enter your email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            class=""
          ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Password</div>
        <v-text-field
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          :rules="[rules.password, rules.length(6), rules.required]"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          class="mb-7"
        ></v-text-field>

        <router-link to="/home" class="no-underline">
          <v-btn
            block
            class="mb-6"
            color="#EB4511"
            size="large"
            variant="tonal"
            @click="login"
          >
          Log In
          </v-btn>
        </router-link>

        <v-card-text class="text-center">
          <router-link to="/signup"
            class="text-black text-decoration-underline" 
          >
          Don't have an account yet? Sign Up
          </router-link>
        </v-card-text>
      </v-card>
    </v-container>

  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const isMobile = ref(false);
    const email = ref('');
    const password = ref('');
    const visible = ref(false);
    const isLoading = ref(false);

    onMounted(() => {
      const updateIsMobile = () => {
        isMobile.value = window.innerWidth <= 480;
      };

      updateIsMobile();
      window.addEventListener('resize', updateIsMobile);

      return () => {
        window.removeEventListener('resize', updateIsMobile);
      };
    });

    const rules = {
      email: v => !!v.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) || 'Please enter a valid email',
      length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
      password: v => !!v.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) || 'Password must contain an upper case letter, a numeric character, and a special character',
      required: v => !!v || 'This field is required'
    };

    const login = async () => {
      if (!email.value || !password.value) {
        console.error('All fields are required');
        return;
      }

      isLoading.value = true;
      try {
        const response = await axios.post('http://localhost:3030/login', {
          email: email.value,
          password: password.value
        });
        console.log('Login successful:', response.data);
        // Handle successful login
      } catch (error) {
        console.error('Login failed:', error);
        // Handle login error
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isMobile,
      email,
      password,
      visible,
      isLoading,
      rules,
      login
    };
  }
};
</script>

<style scoped>
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .no-underline {
    text-decoration: none;
  }
</style>

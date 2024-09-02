<template>
  <div>
    <v-container v-if="!isMobile">
      <v-img
        class="mx-auto my-6"
        max-width="228"
        src="https://res.cloudinary.com/dkzpi7xpb/image/upload/v1725308281/logo_ek0dql.png"
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

        <v-card
          v-if="showError"
          class="mx-auto pa-2 mb-14"
          elevation="2"
          max-width="400"
          rounded="lg"
          color="#e89c9c"
        >
          <v-card-text>
            Log In failed. This is due to wrong credentials or failure in
            authentication.
          </v-card-text>
        </v-card>

        <v-card
          v-if="showEmpty"
          class="mx-auto pa-2 mb-12"
          elevation="2"
          max-width="400"
          rounded="lg"
          color="#e89c9c"
        >
          <v-card-text> Log In failed. Missing arguments. </v-card-text>
        </v-card>

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

        <v-card-text class="text-center">
          <router-link
            to="/signup"
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
        src="https://res.cloudinary.com/dkzpi7xpb/image/upload/v1725308281/logo_ek0dql.png"
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
          :rules="[rules.email, rules.required]"
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

        <v-card
          v-if="showError"
          class="mx-auto pa-2 mb-12"
          elevation="2"
          max-width="400"
          rounded="lg"
          color="#e89c9c"
        >
          <v-card-text>
            Log In failed. This is due to wrong credentials or failure in
            authentication.
          </v-card-text>
        </v-card>

        <v-card
          v-if="showEmpty"
          class="mx-auto pa-2 mb-12"
          elevation="2"
          max-width="400"
          rounded="lg"
          color="#e89c9c"
        >
          <v-card-text> Log In failed. Missing arguments. </v-card-text>
        </v-card>

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

        
        <v-card-text class="text-center">
          <router-link
            to="/signup"
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
import { RouterLink, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";
import { usePiniaStorage } from "../store/index.js";

export default {
  setup() {
    const isMobile = ref(false);
    const email = ref("");
    const password = ref("");
    const visible = ref(false);
    const isLoading = ref(false);
    const showError = ref(false);
    const showEmpty = ref(false);

    const piniaStorage = usePiniaStorage();
    const router = useRouter();

    onMounted(() => {
      const updateIsMobile = () => {
        isMobile.value = window.innerWidth <= 480;
      };

      updateIsMobile();
      window.addEventListener("resize", updateIsMobile);

      return () => {
        window.removeEventListener("resize", updateIsMobile);
      };
    });

    const rules = {
      email: (v) =>
        !!v.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ||
        "Please enter a valid email",
      length: (len) => (v) =>
        (v || "").length >= len || `Invalid character length, required ${len}`,
      password: (v) =>
        !!v.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        "Password must contain an upper case letter, a numeric character, and a special character",
      required: (v) => !!v || "This field is required",
    };

    const hashPassword = async (password) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hash = await crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    };

    const login = async () => {
      showError.value = false;
      showEmpty.value = false;

      if (!email.value || !password.value) {
        console.error("All fields are required");
        showEmpty.value = true;
        return;
      }

      isLoading.value = true;

      try {
        const hashedPassword = await hashPassword(password.value);

        const response = await axios.post("/login", {
          email: email.value,
          password: hashedPassword,
        });

    console.log("Login successful:", response.data);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("isAdmin", response.data.isAdmin);
    localStorage.setItem("userEmail", email.value); // Save email address locally
    localStorage.setItem("User", email.value);
    piniaStorage.setAuthData(response.data.token, response.data.isAdmin);

        if (piniaStorage.getAdmin && isMobile.value) {
          router.push({ name: 'warning' });
        } else if (!piniaStorage.getAdmin && !isMobile.value) {
          router.push({ name: 'warning' });
        } else if (piniaStorage.getAdmin && !isMobile.value) {
          router.push({ name: 'cmshome' });
        } else if (!piniaStorage.getAdmin && isMobile.value) {
          router.push({ name: 'ticketlist' });
        }

      } catch (error) {
        console.error("Login failed:", error);
        showError.value = true;
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
      login,
      showError,
      showEmpty,
    };
  },
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
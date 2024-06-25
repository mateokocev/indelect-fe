<template>
  <div>
    <v-app>
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
          <div class="text-subtitle-1 text-medium-emphasis">Username</div>
          <v-text-field
            v-model="username"
            :rules="[rules.required]"
            density="compact"
            placeholder="Enter your username"
            prepend-inner-icon="mdi-account"
            variant="outlined"
          ></v-text-field>

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
            Register failed. Unspecified error.
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
          <v-card-text> Register failed. Missing arguments. </v-card-text>
        </v-card>

            <v-btn
              block
              class="mb-8"
              color="#EB4511"
              size="large"
              variant="tonal"
              @click="register"
            >
              Sign Up
              <template v-if="isLoading">
                <v-progress-circular
                  indeterminate
                  color="#EB4511"
                  size="24"
                ></v-progress-circular>
              </template>
            </v-btn>

          <v-card-text class="text-center">
            <router-link to="/" class="text-black text-decoration-underline">
              Already have an account? Log In
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
          <div class="text-subtitle-1 text-medium-emphasis">Username</div>
          <v-text-field
            v-model="username"
            :rules="[rules.required]"
            density="compact"
            placeholder="Enter your username"
            prepend-inner-icon="mdi-account"
            variant="outlined"
          ></v-text-field>

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
              Register failed. Unspecified error.
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
            <v-card-text> Register failed. Missing arguments. </v-card-text>
          </v-card>


            <v-btn
              block
              class="mb-6"
              color="#EB4511"
              size="large"
              variant="tonal"
              @click="register"
            >
              Sign Up
              <template v-if="isLoading">
                <v-progress-circular
                  indeterminate
                  color="#EB4511"
                  size="24"
                ></v-progress-circular>
              </template>
            </v-btn>

          <v-card-text class="text-center">
            <router-link to="/" class="text-black text-decoration-underline">
              Already have an account? Log In
            </router-link>
          </v-card-text>
        </v-card>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const isMobile = ref(false);
    const email = ref("");
    const password = ref("");
    const username = ref("");
    const visible = ref(false);
    const isLoading = ref(false);
    const showEmpty = ref(false);
    const showError = ref(false);

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
      const hash = await crypto.subtle.digest("SHA-256", data);
      return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    };

    const register = async () => {
      showError.value = false;
      showEmpty.value = false;

      if (!username.value || !email.value || !password.value) {
        console.error("All fields are required");
        showEmpty.value = true;
        return;
      }

      isLoading.value = true;

      try {
        const hashedPassword = await hashPassword(password.value);
        const response = await axios.post("/register", {
          username: username.value,
          email: email.value,
          password: hashedPassword,
        });
        console.log("Registration successful:", response.data);
        router.push({ name: 'login' });
      } catch (error) {
        console.error("Registration failed. Wompy Dompy:", error);
        showError.value = true;
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isMobile,
      email,
      password,
      username,
      visible,
      isLoading,
      rules,
      register,
      showEmpty,
      showError,
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

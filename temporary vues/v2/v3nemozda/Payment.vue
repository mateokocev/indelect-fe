<!-- Payment.vue -->
<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar
      dense
      clipped-left
      color="#B02E0C"
      app
      dark
      fixed
      elevate-on-scroll
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="btn-fix"></v-app-bar-nav-icon>
      <v-toolbar-title>Indelect</v-toolbar-title>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer
      class="fixed-drawer"
      width="250"
      v-model="drawer"
      app
    >
      <v-list-item class="px-2">
        <v-list-item-title>Username: {{ userName }}</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container class="mt-16 payment-container">
        <h1>Payment</h1>
        <h1>{{ museumName }}</h1>
        <h3>Price: {{ price }}</h3>

        <!-- Payment Form -->
        <v-form @submit.prevent="processPayment" class="payment-form">
          <v-text-field
            :rules="cardNumberRules"
            label="Card Number"
            v-model="paymentDetails.cardNumber"
            required
          ></v-text-field>
          <v-text-field
            :rules="expiryDateRules"
            label="Expiry Date (MM/YY)"
            v-model="paymentDetails.expiryDate"
            required
          ></v-text-field>
          <v-text-field
            :rules="cvcRules"
            label="CVC"
            v-model="paymentDetails.cvc"
            required
          ></v-text-field>

          <!-- Pay Now Button -->
          <v-btn
            type="submit"
            :disabled="paymentDetails.cvc === ''"
            class="pay-button"
            color="primary"
          >
            Pay Now
          </v-btn>

          <!-- Display QR Code -->
          <v-img v-if="nasQrKod" :src="nasQrKod"></v-img>

          <!-- Redeem Button -->
          <v-btn
            v-if="nasQrKod"
            class="pay-button mt-3"
            color="primary"
            @click="redeemQrCode(nasQrKod)"
          >
            Redeem
          </v-btn>
        </v-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: 'Payment',

  setup() {
    const router = useRouter();
    const drawer = ref(false);
    const userName = ref(null);
    const nasQrKod = ref(null); // Holds the generated QR code
    const paymentDetails = ref({
      cardNumber: '',
      expiryDate: '',
      cvc: ''
    });

    // Validation rules for the payment form
    const cardNumberRules = [
      v => !!v || 'Card number is required',
      v => /^\d{16}$/.test(v) || 'Card number must be 16 digits'
    ];

    const expiryDateRules = [
      v => !!v || 'Expiry date is required',
      v => /^\d{2}\/\d{2}$/.test(v) || 'Expiry date must be in MM/YY format'
    ];

    const cvcRules = [
      v => !!v || 'CVC is required',
      v => /^\d{3,4}$/.test(v) || 'CVC must be 3 or 4 digits'
    ];

    // Get username on component mount
    onMounted(async () => {
      await getUsername();
    });

    // Fetch the username
    const getUsername = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        const response = await axios.get(`/GetUserName?email=${userEmail}`);
        userName.value = response.data.username;
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    // Fetch and display the QR code after payment
    const getQrCode = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const museumName = router.currentRoute.value.params.MuseumName.slice(0, -2);
        const params = new URLSearchParams({ mail: email, museumName });
        const response = await axios.get(`/ticket/getQrCode?${params.toString()}`);

        if (response.data) {
          nasQrKod.value = response.data;
        } else {
          alert("You have already bought a ticket.");
        }
      } catch (error) {
        console.error("Failed to fetch QR code:", error);
      }
    };

    // Redeem the QR code
    const redeemQrCode = async (qrCode) => {
      try {
        const response = await axios.get(`/usporedi/?${qrCode}`);
        if (response.data) {
          router.push({ name: router.currentRoute.value.params.MuseumName.slice(0, -2) });
        }
      } catch (error) {
        console.error("Failed to redeem the QR code:", error);
      }
    };

    // Process the payment, get the QR code, and redeem it
    const processPayment = async () => {
      try {
        console.log("Processing payment...");

        // Simulate the payment process (replace with actual payment logic)
        const paymentSuccess = true;

        if (paymentSuccess) {
          // Fetch the QR code after the payment is successful
          await getQrCode();

          // If QR code is generated, redeem it
          if (nasQrKod.value) {
            await redeemQrCode(nasQrKod.value);
          }
        } else {
          console.error("Payment failed.");
        }
      } catch (error) {
        console.error("Error during payment process:", error);
      }
    };

    // Logout user
    const logout = () => {
      router.push({ name: "login" });
    };

    return {
      paymentDetails,
      cardNumberRules,
      expiryDateRules,
      cvcRules,
      drawer,
      userName,
      nasQrKod,
      getQrCode,
      redeemQrCode,
      processPayment,
      logout,
      museumName: router.currentRoute.value.params.MuseumName.slice(0, -2),
      price: router.currentRoute.value.params.MuseumName.slice(-2),
    };
  }
};
</script>

<style scoped>
.payment-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.payment-form {
  display: flex;
  flex-direction: column;
}

.fixed-drawer {
  position: fixed;
  top: 64px;
  left: 0;
  height: calc(100% - 64px);
  z-index: 1000;
  overflow-y: auto;
}

.v-main {
  padding-top: 0;
}

.v-app-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>

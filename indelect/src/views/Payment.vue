<template>
  <v-app>
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

    <v-navigation-drawer
      class="fixed-drawer"
      width="250"
      v-model="drawer"
      app
    >
      <v-list-item class="px-2">
        <v-list-item-title>Jim R</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link @click="goHome">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="mt-16 payment-container">
        <h1>Payment</h1>
        <h1>{{ $route.params.MuseumName.slice(0, -2) }}</h1>
        <h3>Price: {{ $route.params.MuseumName.slice(-2) }}</h3>

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
          <v-btn type="submit" class="pay-button" color="primary" @click="getQrCode()">Pay Now</v-btn>
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
  data() {
    return {
      paymentDetails: {
        cardNumber: '',
        expiryDate: '',
        cvc: ''
      },
      drawer: false,
      items: [
        { title: 'Item 1', icon: 'mdi-menu' },
        { title: 'Item 2', icon: 'mdi-menu' },
      ],
      cardNumberRules: [
        v => !!v || 'Card number is required',
        v => /^\d{16}$/.test(v) || 'Card number must be 16 digits'
      ],
      expiryDateRules: [
        v => !!v || 'Expiry date is required',
        v => /^\d{2}\/\d{2}$/.test(v) || 'Expiry date must be in MM/YY format'
      ],
      cvcRules: [
        v => !!v || 'CVC is required',
        v => /^\d{3,4}$/.test(v) || 'CVC must be 3 or 4 digits'
      ]
    };
  },
  setup() {
    const router = useRouter();
    const isMobile = ref(false);
    const tickets = ref([]);
    const mini = ref(false);
    const drawer = ref(false);

    const updateIsMobile = () => {
      isMobile.value = window.innerWidth <= 480;
      if (!isMobile.value) {
        router.push({ name: "warning" });
      }
    };

    onMounted(async () => {
      updateIsMobile();
      window.addEventListener("resize", updateIsMobile);
      try {
        const response = await axios.get("/ticket/getAllTickets");
        tickets.value = response.data;
        console.log("Tickets fetched successfully:", tickets.value);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
      return () => {
        window.removeEventListener("resize", updateIsMobile);
      };
    });
  
    const getQrCode = async () => {
      try {
        const mail = localStorage.getItem("userEmail");
        MuseumName= $route.params.MuseumName.slice(-2) 
        const params = new URLSearchParams({ mail: mail.value, museumName: museumName.value });
        const response = await axios.get(`/ticket/getQrCode?${params.toString()}`);
        qrCodeData.value = response.data;
        console.log("QR Code data:", qrCodeData.value);
      } catch (error) {
        console.error("Failed to fetch QR Code data:", error);
      }
    };

    const goHome = () => {
      router.push({ name: "home" });
    };

    const logout = async () => {
      // Implement your logout logic
      router.push({ name: "login" });
    };

    const processPayment = () => {
      axios.post('/api/payment', this.paymentDetails)
        .then(response => {
          alert('Payment successful!');
          router.push('/home');
        })
        .catch(error => {
          alert('Payment failed.');
        });
    };

    return {
      isMobile,
      tickets,
      drawer,
      goHome,
      logout,
      processPayment,
      getQrCode,
    };
  },
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

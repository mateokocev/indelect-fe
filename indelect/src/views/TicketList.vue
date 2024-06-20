<template  pa-0 ma-0y>
 <v-app >

<v-container v-if="!isMobile" >
</v-container>
<v-container style="margin: 0; padding: 0;" v-else>
  
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Welcome to Tickets Selection</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
          <v-btn icon><v-icon>mdi-filter</v-icon></v-btn>
        </template>

        <!-- Home Button -->
        <v-btn icon @click="goHome">
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <!-- Settings Button -->
        <v-btn icon @click="goSettings">
          <v-icon>mdi-settings</v-icon>
        </v-btn>

        <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
        <v-list :items="items"></v-list>
      </v-navigation-drawer>

      <v-main style="height: 500px;">
        <v-card-text>
          <!-- Your main content here -->
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>
  <div>
    <v-app>
      <v-container>
       

        <v-card
          class="mx-auto pa-12 pb-8"
          elevation="0"
          max-width="700"
          rounded="lg"
          color="white"
        >
          <h1 class="text-h5 text-center mb-6 black-text">Available Tickets</h1>
          <v-row>
            <v-col v-for="ticket in tickets" :key="ticket.id" cols="12" md="6">
              <v-card class="ticket-card mx-auto mb-4" max-width="300">
                <v-img
                  :src="ticket.image"
                  height="200px"
                  class="white--text align-end"
                ></v-img>
                <v-card-title class="black-text">
                  <router-link>
                    {{ ticket.name }}
                  </router-link>
                </v-card-title>
                <v-card-subtitle class="black-text">{{ ticket.info }}</v-card-subtitle>
                <v-card-subtitle class="black-text">Price: ${{ ticket.price }}</v-card-subtitle>
                <v-card-actions>
                  <router-link :to="'/ticket/' + ticket.id">
                    <v-btn color="primary">View Details</v-btn>
                  </router-link>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-app>
  </div>
</v-container>

 </v-app>
</template>


<script>
import { RouterLink, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { usePiniaStorage } from "../store/index.js";
import qrcode from "qrcode";
import axios from "axios";

export default {

   setup() {
    const isMobile = ref(false);

    const piniaStorage = usePiniaStorage();
    const router = useRouter();

    onMounted(async () => {
      const updateIsMobile = () => {
        isMobile.value = window.innerWidth <= 480;
        if (!isMobile.value) {
          router.push({ name: "warning" });
        }
      };

      updateIsMobile();
      window.addEventListener("resize", updateIsMobile);
      //----------------------------

      const tickets = await fetchAllTickets();
      console.log(tickets);
      //----------------------
      return () => {
        window.removeEventListener("resize", updateIsMobile);
      };
      


     
    });

    const logout = async () => {
      await piniaStorage.clearAuthData();
      router.push({ name: "login" });
    };

    const fetchAllTickets = async () => {
      try {
        const response = await axios.get("/ticket/getAllTickets"); 
        console.log("Tickets fetched successfully:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching tickets:", error);
        return [];
      }
    };

    const generateQRCodesForAllTickets = async (email) => {
  try {
    email="ovojetest@gmail.com"
    const tickets = await Ticket.find({});
    for (const ticket of tickets) {
      await generateUniqueQRCode(ticket, email);
    }
  } catch (error) {
    console.error("Error fetching tickets:", error);
  } finally {
    mongoose.connection.close();
  }
};

    const hello = () => {

      return "hello" 
    };



    return {
      isMobile,
      logout,
    };


  },





};
</script>


<style scoped>
/* You can add scoped styles here if needed */
.text-decoration-none {
  text-decoration: none;
}

.ticket-card {
  transition: background-color 0.3s ease-out 100ms;
}

.ticket-card:hover {
  background-color: #FFB6C1;
}

/* New class for black text color */
.black-text {
  color: black;
}


</style>

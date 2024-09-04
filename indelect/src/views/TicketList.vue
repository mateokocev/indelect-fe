<template>
  <v-container v-if="!isMobile"></v-container>
  <v-container style="margin: 0; padding: 0;" v-else>
    <v-card>
      <!-- NavBar -->
      <div id="app">
        <v-app id="inspire">
          <v-app-bar
            dense
            clipped-left
            color="#B02E0C"
            app
            :extended="extended"
            dark
            fixed
            elevate-on-scroll
          >
            <v-app-bar-nav-icon
              @click.stop="drawer = !drawer"
              class="btn-fix"
            ></v-app-bar-nav-icon>
            <v-toolbar-title>Indelect</v-toolbar-title>
          </v-app-bar>
          <v-navigation-drawer
            class="fixed-drawer"
            width="250"
            clipped
            v-model="drawer"
            :mini-variant.sync="mini"
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
          <!-- Page Content -->
          <div class="mt-14"></div>
          <v-container>
            <v-card
              class="mx-auto pa-2 pb-5"
              elevation="-1"
              max-width="700"
              rounded="lg"
              color="white"
            >
              <h1 class="text-h5 text-center mb-6 black-text">Available Tickets</h1>
              <v-row>
                <v-col v-for="ticket in tickets" :key="ticket.id" cols="12" md="6">
                  
                  <v-card class="ticket-card mx-auto mb-4" max-width="300">
                   <v-card-title style="font-size: 5vw;">  Museum Name: {{ ticket.MuseumName }}</v-card-title>
                   <h4 class="ma-1"> Museum Details: {{ ticket.MuseumDetails }}</h4>
                   <v-btn class="ma-2" color="#EF866F" @click="goToPayment(ticket.MuseumName,ticket.Price)">Price: {{ ticket.Price }}</v-btn>

                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-app>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const isMobile = ref(false);
    const tickets = ref([]);
    const mini = ref(false);
    const drawer = ref(false);
    const router = useRouter();
    const userName = ref(null);


    const updateIsMobile = () => {
      isMobile.value = window.innerWidth <= 480;
      if (!isMobile.value) {
        router.push({ name: "warning" });
      }
    };

    onMounted(async () => {
      updateIsMobile();
      await getUsername();
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


    const getUsername = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        const response = await axios.get(`/GetUserName?email=${userEmail}`);
        userName.value = response.data.username;
      } catch (error) {
        console.error("Error:", error);
      }
    };


   

    const logout = async () => {
      // Implement your logout logic
      router.push({ name: "login" });
    };

  const goToPayment = async (MuseumName, Price) => {
      
      router.push("payment/"+MuseumName+Price);
    };
    return {
      isMobile,
      tickets,
      drawer,
      logout,
      goToPayment,
      userName,
    };
  },
};
</script>

<style scoped>
.text-decoration-none {
  text-decoration: none;
}

.ticket-card {
  transition: background-color 0.3s ease-out 100ms;
}

.ticket-card:hover {
  background-color: #ffb6c1;
}

.black-text {
  color: black;
}

.fixed-drawer {
  position: fixed;
  top: 64px;
  left: 0;
  height: calc(100% - 64px);
  z-index: 1000;
  overflow-y: auto;
}

.content-container {
  margin-left: 310px;
  padding: 16px;
}

.v-app-bar {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.v-main {
  padding-top: 0px;
}
</style>

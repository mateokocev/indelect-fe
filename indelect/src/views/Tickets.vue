<template>
  <v-container v-if="!isMobile"></v-container>
  <v-container style="margin: 0; padding: 0;" v-else>
    <v-card>
      <div id="app">
        <v-app id="inspire">
          <navigation-bar 
            :drawer="drawer" 
            :mini="mini" 
            :extended="extended"
            :userName="userName"
            @toggle-drawer="drawer = !drawer"
            @update:drawer="drawer = $event"
            @logout="logout"
          />

          <div class="mt-14"></div>
          <v-container>
            <v-card class="mx-auto pa-2 pb-5" elevation="1" max-width="700" rounded="lg" color="white">
              <v-tabs
                v-model="activeTab"
                background-color="transparent"
                color="#B02E0C"
                centered
                class="mb-4"
              >
                <v-tab value="available">AVAILABLE TICKETS</v-tab>
                <v-tab value="my-tickets">MY TICKETS</v-tab>
              </v-tabs>
              
              <v-window v-model="activeTab">
                <v-window-item value="available">
                  <tickets-list
                    :tickets="tickets"
                    :user-email="userEmail"
                    :user-tickets="userTickets"
                    :loading="loading"
                    @ticket-purchased="onTicketPurchased"
                    @ticket-already-owned="onTicketAlreadyOwned"
                    @purchase-error="onPurchaseError"
                    @view-my-tickets="activeTab = 'my-tickets'"
                  ></tickets-list>
                </v-window-item>
                
                <v-window-item value="my-tickets">
                  <user-tickets-list
                    :tickets="userTickets"
                    :loading="loadingMyTickets"
                    @browse-tickets="activeTab = 'available'"
                    @view-qr-code="showQrCode"
                  ></user-tickets-list>
                </v-window-item>
              </v-window>
            </v-card>
          </v-container>
          
          <qr-code-dialog
            :visible="showQrDialog"
            @update:visible="showQrDialog = $event"
            :museum-name="purchasedTicket.museumName || getTicketName(selectedTicket)"
            :qr-code-url="purchasedTicket.qrCodeData || selectedTicket.qrCodeUrl"
            :purchase-date="selectedTicket.purchaseDate"
            @use-ticket="useTicket"
          ></qr-code-dialog>
          
          <warning-dialog
            :visible="showWarningDialog"
            type="already-owned"
            :museum-name="alreadyOwnedMuseum"
            @update:visible="showWarningDialog = $event"
            @view-my-tickets="viewMyTickets"
          ></warning-dialog>

          <warning-dialog
            :visible="showErrorDialog"
            type="error"
            @update:visible="showErrorDialog = $event"
          ></warning-dialog>
        </v-app>
      </div>
    </v-card>
  </v-container>
</template>

<script>
  import { ref, onMounted, watch } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  import { usePiniaStorage } from "../store/index.js";
  import NavigationBar from '../components/TicketView/NavigationBar.vue';
  import TicketsList from '../components/TicketView/TicketsList.vue';
  import UserTicketsList from '../components/TicketView/UserTicketsList.vue';
  import QrCodeDialog from '../components/TicketView/QrCodeDialog.vue';
  import WarningDialog from '../components/TicketView/WarningDialog.vue';

  export default {
    components: {
      NavigationBar,
      TicketsList,
      UserTicketsList,
      WarningDialog,
      QrCodeDialog,
    },
    setup() {
      const isMobile = ref(false);
      const tickets = ref([]);
      const userTickets = ref([]);
      const loading = ref(true);
      const loadingMyTickets = ref(true);
      const mini = ref(false);
      const drawer = ref(false);
      const router = useRouter();
      const userName = ref(null);
      const userEmail = ref('');
      const extended = ref(false);
      const showQrDialog = ref(false);
      const showWarningDialog = ref(false);
      const showErrorDialog = ref(false);
      const alreadyOwnedMuseum = ref('');
      const activeTab = ref('available');
      
      const purchasedTicket = ref({
        museumName: '',
        qrCodeData: ''
      });
      
      const selectedTicket = ref({
        museumName: '',
        qrCodeUrl: '',
        purchaseDate: null
      });

      const updateIsMobile = () => {
        isMobile.value = window.innerWidth <= 480;
        if (!isMobile.value) {
          router.push({ name: "warning" });
        }
      };

      onMounted(async () => {
        updateIsMobile();
        window.addEventListener("resize", updateIsMobile);
        
        userEmail.value = localStorage.getItem("userEmail");
        if (!userEmail.value) {
          router.push({ name: "login" });
          return;
        }
        
        await getUsername();
        await fetchTickets();
        await fetchUserTickets();

        return () => {
          window.removeEventListener("resize", updateIsMobile);
        };
      });

      watch(activeTab, async (newValue) => {
        if (newValue === 'my-tickets') {
          await fetchUserTickets();
        }
      });

      const fetchTickets = async () => {
        loading.value = true;
        try {
          const response = await axios.get("/tickets");
          tickets.value = response.data;
        } catch (error) {
          console.error("Error fetching tickets:", error);
        } finally {
          loading.value = false;
        }
      };

      const fetchUserTickets = async () => {
        loadingMyTickets.value = true;
        try {
          const response = await axios.get(`/users/${userEmail.value}`);
          if (response.data.tickets && Array.isArray(response.data.tickets)) {
            userTickets.value = response.data.tickets;
          } else {
            userTickets.value = [];
          }
        } catch (error) {
          console.error("Error fetching user tickets:", error);
          userTickets.value = [];
        } finally {
          loadingMyTickets.value = false;
        }
      };

      const getUsername = async () => {
        try {
          if (!userEmail.value) return;
          const response = await axios.get(`/users/${userEmail.value}`);
          userName.value = response.data.username;
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      };

      const getTicketName = (ticket) => {
        if (!ticket) return 'Unknown';
        if (ticket.museumName) return ticket.museumName;
        if (ticket.ticket) {
          if (typeof ticket.ticket === 'object' && ticket.ticket.MuseumName) {
            return ticket.ticket.MuseumName;
          }
        }
        return 'Unknown Museum';
      };

      const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      };

      const showQrCode = (ticket) => {
        selectedTicket.value = ticket;
        purchasedTicket.value = {
          museumName: '',
          qrCodeData: ''
        };
        showQrDialog.value = true;
      };

      const onTicketPurchased = (ticketData) => {
        purchasedTicket.value = ticketData;
        selectedTicket.value = {
          museumName: '',
          qrCodeUrl: '',
          purchaseDate: null
        };
        showQrDialog.value = true;
        fetchUserTickets();
      };

      const onTicketAlreadyOwned = (museumName) => {
        alreadyOwnedMuseum.value = museumName;
        showWarningDialog.value = true;
      };

      const onPurchaseError = () => {
        showErrorDialog.value = true;
      };

      const viewMyTickets = () => {
        activeTab.value = 'my-tickets';
        showWarningDialog.value = false;
      };
      
      const useTicket = (museumName, qrCodeUrl) => {
        console.log(qrCodeUrl);
        const museumType = museumName.replace(/museum/gi, '').trim().toLowerCase();
        router.push({ name: 'Museum', params: { museumType }, query: { qrCode: qrCodeUrl } });
      };

      const piniaStorage = usePiniaStorage();
      const logout = async () => {
        await piniaStorage.clearAuthData();
        router.push({ name: "login" });
      };

      return {
        isMobile,
        tickets,
        userTickets,
        loading,
        loadingMyTickets,
        drawer,
        mini,
        extended,
        logout,
        userName,
        userEmail,
        showQrDialog,
        showWarningDialog,
        showErrorDialog,
        alreadyOwnedMuseum,
        purchasedTicket,
        selectedTicket,
        activeTab,
        viewMyTickets,
        onTicketPurchased,
        onTicketAlreadyOwned,
        onPurchaseError,
        showQrCode,
        getTicketName,
        formatDate,
        useTicket
      };
    },
  };
</script>

<style scoped>
  .text-decoration-none {
    text-decoration: none;
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
  .qr-code {
    max-width: 100%;
    height: auto;
    margin: 20px auto;
    display: block;
  }
</style>
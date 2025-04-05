<template>
    <v-dialog v-model="internalVisible" max-width="400">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          class="leave-museum-btn"
          color="secondary"
          large
        >
          Leave Museum
        </v-btn>
      </template>
      
      <v-card>
        <v-card-text class="text-center">
          <p>Scan this QR code to leave the museum:</p>
          <img :src="qrCodeUrl" alt="QR Code" class="qr-code" />
        </v-card-text>
        <v-card-actions class="justify-center pb-4">
          <v-btn color="#B02E0C" text @click="internalVisible = false">
            Close
          </v-btn>
          <v-btn color="#EF866F" @click="leaveMuseum">
            Leave Museum
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
  
<script>
  import axios from "axios";
  
  export default {
    name: "LeaveMuseumDialog",
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      museumName: {
        type: String,
        default: "",
      },
      qrCodeUrl: {
        type: String,
        default: "",
      },
    },
    emits: ["update:visible"],
    computed: {
      internalVisible: {
        get() {
          return this.visible;
        },
        set(val) {
          this.$emit("update:visible", val);
        },
      },
    },
    methods: {
      async leaveMuseum() {
        const userEmail = localStorage.getItem("userEmail");
        console.log('The museum is....', this.museumName.toLowerCase())
        if (!userEmail) {
          console.error("No user email found in localStorage.");
          this.$router.push({ name: "tickets" });
          this.internalVisible = false;
          return;
        }
        
        try {
          const museumParam = this.museumName.toLowerCase();

          await axios.delete(`/tickets/${museumParam}/user/${userEmail}`);
        } catch (error) {
          console.error("Error deleting ticket:", error);
        }

        this.$router.push({ name: "tickets" });
        this.internalVisible = false;
      },
    },
  };
</script>
  
<style scoped>
  .leave-museum-btn {
    width: 100%;
    margin-top: 20px;
    font-size: 16px;
    padding: 12px 0;
  }
  .qr-code {
    max-width: 100%;
    height: auto;
    margin: 20px auto;
    display: block;
  }
</style>  
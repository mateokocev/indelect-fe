<template>
<v-app id="inspire">
    <v-system-bar color="#8EB1C7">
    </v-system-bar>

    <v-app-bar color="#B02E0C" flat height="72">
  <v-img
    class="my-6 ma-2"
    max-width="100"
    src="https://i.postimg.cc/s1v7Gj6p/your-image.jpg"
  ></v-img>

  <v-btn>
    Explore
  </v-btn>

  <v-btn>
    Exhibitions
  </v-btn>

  <v-btn>
    Buy ticket
  </v-btn>

  <v-btn icon>
    <v-icon>mdi-magnify</v-icon>
  </v-btn>

  <v-avatar></v-avatar>
</v-app-bar>

  
      <v-footer
        app
        color="grey-lighten-1"
      ></v-footer>
  
      <v-navigation-drawer floating color="#EF866F">
        <div class="d-flex px-2 my-2">
          <v-btn
            class="flex-grow-1"
            color="grey"
            height="40"
            variant="flat"
          >Account-settings</v-btn>
  
          <v-avatar
            class="ms-2"
             color="surface-variant"
            rounded
            variant="flat"
            >   
             <img 
            src="https://cdn.discordapp.com/attachments/902618947759788043/1200493635192508497/IMG_1424.jpg?ex=65c661d2&is=65b3ecd2&hm=6dedb4b280fe2489e3ba37126db3ae457e9cf2065edcf7b41457b1b912f82978" 
            alt="Avatar Image" 
            style="width: 100%; height: 100%; object-fit: cover;"
  />
</v-avatar>

        </div>
  
        <div class="d-flex px-2 my-2 align-center">
          <v-btn
            color="grey-lighten-4"
            variant="flat"
            height="40"
            class="flex-grow-1 me-2"
          >Your Tickets</v-btn>
  
          <v-avatar
            color="surface-variant"
            size="18"
          ></v-avatar>
  
          <v-avatar
            class="ms-1"
            color="surface-variant"
            size="18"
          ></v-avatar>
        </div>
  
        <div class="px-2 my-2">
          <v-text-field
            class="mb-4"
            density="compact"
            flat
            hide-details
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
          >Serch</v-text-field>
  
          <v-sheet
            class="mb-2"
            color="surface-variant"
            height="30"
            width="60%"
          >Comments</v-sheet>
  
          <v-sheet
            class="mb-1"
            color="grey-lighten-1"
            height="20"
            width="65%"
          >  Loram ipsum.........</v-sheet>
  
          <v-sheet
            class="mb-1"
            color="grey-lighten-1"
            height="20"
            width="70%"
          >  Loram ipsum.........</v-sheet>
  
          <v-sheet
            class="mb-1"
            color="grey-lighten-1"
            height="20"
            width="40%"
          ></v-sheet>
  
          <v-sheet
            color="grey-lighten-1"
            height="20"
            width="100%"
          ></v-sheet>
  
  
          <v-divider class="my-6"></v-divider>
  
          <v-sheet
            class="mb-2"
            color="surface-variant"
            height="30"
            width="60%"
          >Comment</v-sheet>
  
          <v-sheet
            class="mb-1"
            color="grey-lighten-1"
            height="20"
            width="65%"
          >  Loram ipsum.........</v-sheet>
  
          <v-sheet
            class="mb-1"
            color="grey-lighten-1"
            height="20"
            width="70%"
          >  Loram ipsum.........</v-sheet>
  
          <v-sheet
            class="mb-1"
            color="grey-lighten-1"
            height="20"
            width="40%"
          ></v-sheet>
  
          <v-sheet
            color="grey-lighten-1"
            height="20"
            width="100%"
          ></v-sheet>
  
          <v-divider class="my-6"></v-divider>
        </div>
      </v-navigation-drawer>
  
      <v-main>
        <v-sheet
          class="mx-auto pa-2 pt-6"
          color="grey-lighten-4"
        >
          <v-sheet
            color="grey-lighten-2"
            height="24"
            rounded="pill"
            width="88"
          ></v-sheet>
  
          <v-slide-group show-arrows>
            <v-slide-group-item
              v-for="n in 5"
              :key="n"
            >
              <v-sheet
                class="ma-3"
                color="grey-lighten-1"
                height="200"
                rounded
                width="250"
              ></v-sheet>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
  
        <v-sheet
          class="mx-auto pa-2 pt-6"
          color="grey-lighten-2"
        >
          <v-sheet
            color="grey"
            height="24"
            rounded="pill"
            width="88"
          ></v-sheet>
  
          <v-slide-group show-arrows>
            <v-slide-group-item
              v-for="n in 15"
              :key="n"
            >
              <v-sheet
                :width="n === 1 ? 300 : 150"
                color="grey-lighten-1"
                class="ma-3"
                height="200"
                rounded
              ></v-sheet>
            </v-slide-group-item>
          </v-slide-group>
  
          <v-container fluid>
            <v-row>
              <v-col
                v-for="n in 24"
                :key="n"
                cols="2"
              >
                <v-sheet
                  color="grey-lighten-1"
                  height="200"
                  rounded
                ></v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
    //
  </script>
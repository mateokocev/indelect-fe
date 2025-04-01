<template>
    <v-app-bar color="#EB4511" dark>
      <v-img
        class="ml-4"
        max-width="80"
        rounded
        flat
        src="https://res.cloudinary.com/dkzpi7xpb/image/upload/v1725308281/logo_ek0dql.png"
      ></v-img>
  
      <div class="vertical-separator"></div>
  
      <v-text-field
        class="search-bar mr-1"
        v-model="searchText"
        variant="solo-filled"
        placeholder="Search exhibits..."
        append-inner-icon="mdi-magnify"
        density="compact"
        bg-color="white"
        rounded
        flat
        hide-details
        @update:model-value="onSearchInput"
        @click:append="performSearch"
        @keyup.enter="performSearch"
      ></v-text-field>
  
      <v-dialog max-width="300">
        <template v-slot:activator="{ props: openFilterWindow }">
          <v-btn
            v-bind="openFilterWindow"
            :ripple="false"
            density="compact"
            variant="plain"
            icon
          >
            <v-icon>mdi-filter-variant</v-icon>
          </v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card class="pb-4" rounded="lg" color="white">
            <v-card-title class="text-center">Filter</v-card-title>
            <div class="horizontal-filter-title-separator"></div>
  
            <v-checkbox
              class="ml-6 top-checkbox-top-margin"
              v-model="filterOptions.displayedExhibits"
              :ripple="false"
              label="Displayed exhibits"
              color="#EB4511"
              density="compact"
              @change="updateFilters"
            ></v-checkbox>
  
            <v-checkbox
              class="ml-6"
              v-model="filterOptions.hiddenExhibits"
              :ripple="false"
              label="Hidden exhibits"
              color="#EB4511"
              density="compact"
              @change="updateFilters"
            ></v-checkbox>
  
            <v-checkbox
              class="ml-6"
              v-model="filterOptions.artExhibits"
              :ripple="false"
              label="Art museum exhibits"
              color="#EB4511"
              density="compact"
              @change="updateFilters"
            ></v-checkbox>
  
            <v-checkbox
              class="ml-6"
              v-model="filterOptions.scienceExhibits"
              :ripple="false"
              label="Science museum exhibits"
              color="#EB4511"
              density="compact"
              @change="updateFilters"
            ></v-checkbox>
  
            <v-checkbox
              class="ml-6"
              v-model="filterOptions.historyExhibits"
              :ripple="false"
              label="History museum exhibits"
              color="#EB4511"
              density="compact"
              @change="updateFilters"
            ></v-checkbox>
  
            <v-checkbox
              class="ml-6"
              v-model="filterOptions.techExhibits"
              :ripple="false"
              label="Tech museum exhibits"
              color="#EB4511"
              density="compact"
              @change="updateFilters"
            ></v-checkbox>
  
            <div class="horizontal-filter-title-separator"></div>
  
            <v-toolbar color="white">
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-btn color="secondary" @click="isActive.value = false">
                  Close
                </v-btn>
              </v-card-actions>
              <v-spacer></v-spacer>
            </v-toolbar>
          </v-card>
        </template>
      </v-dialog>
  
      <v-spacer></v-spacer>
  
      <v-btn
        @click="$emit('logout')"
        :ripple="false"
        density="compact"
        variant="plain"
        icon
      >
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>
</template>
  
<script>
  export default {
    name: 'AppHeader',
    props: {
      initialSearch: {
        type: String,
        default: ''
      },
      initialFilters: {
        type: Object,
        default: () => ({
          displayedExhibits: true,
          hiddenExhibits: true,
          artExhibits: true,
          scienceExhibits: true,
          historyExhibits: true,
          techExhibits: true
        })
      }
    },
    data() {
      return {
        searchText: this.initialSearch,
        filterOptions: { ...this.initialFilters }
      };
    },
    methods: {
      onSearchInput() {
        this.$emit('search', this.searchText);
      },
      performSearch() {
        console.log('Performing search for:', this.searchText);
        this.$emit('search', this.searchText);
      },
      updateFilters() {
        console.log('Updating filters:', this.filterOptions);
        this.$emit('update-filters', { ...this.filterOptions });
      }
    },
    watch: {
      initialSearch(newVal) {
        this.searchText = newVal;
      },
      initialFilters: {
        handler(newVal) {
          this.filterOptions = { ...newVal };
        },
        deep: true
      }
    }
  }
</script>
  
<style scoped>
  .search-bar {
    max-width: 300px;
  }
  
  .vertical-separator {
    width: 1px;
    height: 90%;
    background-color: white;
    margin-left: 16px;
    margin-right: 16px;
    border-radius: 5px;
  }
  
  .horizontal-filter-title-separator {
    height: 1px;
    width: 90%;
    align-self: center;
    background-color: #eb4511;
    margin-top: 6px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  
  .top-checkbox-top-margin {
    margin-top: 22px;
  }
</style>
<template>
  <div>
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
      <v-app-bar-nav-icon @click.stop="$emit('toggle-drawer')" class="btn-fix"></v-app-bar-nav-icon>
      <v-toolbar-title>Indelect</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      class="fixed-drawer"
      width="250"
      clipped
      v-model="internalDrawer"
      :mini-variant.sync="mini"
      app
    >
      <v-list-item class="px-2">
        <v-list-item-title>Username: {{ userName }}</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link @click="$emit('logout')">
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
  </div>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      required: true
    },
    mini: {
      type: Boolean,
      required: true
    },
    extended: {
      type: Boolean,
      default: false
    },
    userName: {
      type: String,
      default: ''
    }
  },
  emits: ['toggle-drawer', 'update:drawer', 'logout'],
  computed: {
    internalDrawer: {
      get() {
        return this.drawer;
      },
      set(val) {
        this.$emit('update:drawer', val);
      }
    }
  }
};
</script>

<style scoped>
.fixed-drawer {
  position: fixed;
  top: 64px;
  left: 0;
  height: calc(100% - 64px);
  z-index: 1000;
  overflow-y: auto;
}
</style>
<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      app
      right
      :dark="APP_CONFIG.layout.panel.isSidebarDark"
      class="sidebarContent"
      >
      <sidebar-list />
    </v-navigation-drawer>
    <v-app-bar
      clipped-right
      app
      :dark="APP_CONFIG.layout.panel.isHeaderDark"
      color="headerColor"
      >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link :to="APP_CONFIG.homeURL" >
        <v-img
          :src="APP_CONFIG.brandLogo"
          height="auto"
          width="120"
          >
        </v-img>
      </router-link>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main
      class="mainContent"
      >
      <v-container
        fluid
        >
        <v-row >
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <GlobalSnackbar />

    <v-footer
      app
      >
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import sidebarList from '../components/sidebar-list'
export default {
  name: 'LayoutsDemosBaselineFlipped',
  components: {
    'sidebar-list': sidebarList
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
}
</script>

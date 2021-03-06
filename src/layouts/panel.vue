<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      app
      :right="$vuetify.rtl"
      :dark="APP_CONFIG.layout.panel.isSidebarDark"
      :mini-variant="drawerIsMini"
      class="sidebarContent"
      >
      <v-card
        v-if="!drawerIsMini"
        to="/profile"
        class="pa-4 d-block rounded-0 transparent"
        elevation="1">
        <v-avatar
          class="mr-auto ml-auto d-block"
          rounded
          width="64"
          height="64">
          <img
            :src="avatarImage"
            />
        </v-avatar>
      <span
        class="d-block w-100 mt-4 text-caption text-center">
        {{ profile.name }}
      </span>
      </v-card>
      <sidebar-list />
      <portal-target
        class="mt-auto mb-5 align-self-center"
        name="layoutPanel_navigationDrawerAfterSidebarItems"
        :slot-props="{isMini: drawerIsMini}"
      ></portal-target>
      <v-divider class="d-block d-md-none"></v-divider>
      <v-list
        class="d-block d-md-none"
        dense>
        <v-list-item
          v-for="(item, index) in memberTerritoryMenus"
          :key="'member-territory-list-item-' + index"
          link
          :to="item.path"
          >
          <v-list-item-action>
            <v-icon>
              {{ item.iconName }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t(item.title) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
        <template v-slot:append>
          <v-list
            class="mt-auto d-none d-md-block"
            dense>
            <v-list-item
              @click.stop="drawerIsMini = !drawerIsMini">
              <v-icon
                >
                mdi-menu
              </v-icon>
            </v-list-item>
          </v-list>
        </template>
    </v-navigation-drawer>
    <v-app-bar
      :dark="APP_CONFIG.layout.panel.isHeaderDark"
      color="headerColor"
      :clipped-right="$vuetify.rtl"
      :clipped-left="!$vuetify.rtl"
      app
      >
      <router-link :to="APP_CONFIG.homeURL" >
        <v-img
          :src="APP_CONFIG.brandLogo"
          height="auto"
          width="50"
          >
        </v-img>
      </router-link>
      <v-spacer></v-spacer>
      <v-switch
        v-if="APP_CONFIG.themes.enableChange"
        dense
        inset
        class="mt-5 ml-2"
        @change="changeTheme"
      ></v-switch>
      <portal-target
        name="layoutPanel_appBarAfterMemberTerritory">
        <!--
          This component can be located anywhere in your App.
          The slot content of the above portal component will be rendered here.
        -->
      </portal-target>
      <v-app-bar-nav-icon
        class="d-block d-md-none"
        @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-menu
        offset-y >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :elevation="0"
            color="transparent"
            class="px-0 pr-2 d-md-block"
            v-bind="attrs"
            v-on="on"
            >
            <span class="white--text">
              {{ profile.name }}
            </span>
            <v-avatar
              class="mr-2"
              width="32"
              height="32">
              <img
                :src="avatarImage"
                />
            </v-avatar>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item
            v-for="(item, index) in memberTerritoryMenus"
            :key="'member-territory-list-item-' + index"
            link
            :to="item.path"
            >
            <v-list-item-action
              class="mx-0">
              <v-icon small>
                {{ item.iconName }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t(item.title) }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main
      class="mainContent"
      >
      <v-container
        fluid
        >
        <v-row >
          <v-col class="pt-0">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <GlobalSnackbar />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import sidebarList from '../components/sidebar-list'
export default {
  name: 'LayoutsPanel',
  components: {
    'sidebar-list': sidebarList
  },
  props: {
    source: String
  },
  computed: {
    profile () {
      return this.$store.state.auth.userInfo
    },
    memberTerritoryMenus () {
      return this.$store.state.layout.memberTerritoryMenus
    },
    avatarImage () {
      return this.avatarFile ? this.avatarFile : '/img/default-avatar.jpg'
    }
  },
  created () {
    this.getUser().then(response => {
      this.userInfo = response.data
      this.getProfilePic().then(response => {
        this.avatarFile = `data:image/png;base64, ${response.data}`
      })
      console.log(this.userInfo)
    })
  },
  data: () => ({
    drawer: null,
    drawerIsMini: null,
    avatarFile: null
  }),
  methods: {
    ...mapActions({
      getUser: 'users/getUser',
      getProfilePic: 'users/getProfilePic'
    }),
    changeTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>

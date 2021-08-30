<template>
  <div>
    <portal to="layoutPanel_appBarAfterMemberTerritory">
    </portal>
    <portal to="layoutPanelFullHeightSide_headerCenter">
      <v-icon
        class="mx-3">
        mdi-magnify
      </v-icon>
      <v-icon
        class="mx-3 float-right">
        mdi-bell-outline
      </v-icon>
    </portal>
    <portal to="layoutPanelFullHeightSide_sidebarBottom">
    <v-skeleton-loader
      class="mx-5 my-5"
      max-width="300"
      type="card"
      ></v-skeleton-loader>
    </portal>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'LayoutsDemosBaselineFlipped',
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  computed: {
    ...mapGetters({
      userInfo: 'auth/userInfo',
      token: 'auth/token'
    })
  },
  created () {
    this.getConfig()
    if (this.token !== 'Bearer null') {
      this.loadData()
    } else {
      this.$router.push({ name: 'login' })
    }
  },
  methods: {
    ...mapActions({
      getUserInfo: 'auth/getUserInfo',
      getAllUsers: 'users/getAllUsers',
      getConfig: 'auth/getConfig'
    }),
    loadData () {
      this.getUserInfo()
      const payload = {
        pageIndex: 1,
        pageSize: 10000
      }
      this.getAllUsers(payload)
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/main';
</style>

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
  methods: {
  ...mapActions({
      init: 'auth/init'
  }),
    isExceptionPath (routePath) {
      const exceptionPaths = [
        '/forgetpass',
        '/login',
        '/register',
        '/resetPassword',
        '/emailactivated',
        '/emailactivationfailed',
        '/termsandconditions',
        '/advertiser/register',
        '/advertiser/authenticationDetails',
        '/advertiser/resetPasswordDetails',
        '/advertiser/forgotPasswordDetails',
        '/publisher/register',
        '/publisher/authenticationDetails',
        '/publisher/resetPasswordDetails',
        '/publisher/forgotPasswordDetails'
      ]
      const isException = exceptionPaths.includes(routePath)
      return isException
    },
    loadPreData () {
      alert()
      if (this.isExceptionPath(window.location.pathname)) {
        this.isRouterViewVisible = true
      } else {
        this.init()
          .then((response) => {
            this.isRouterViewVisible = true
            const roles = response.data.result.role
            if (window.CURRENT_ROUTE_ROLES && !window.CURRENT_ROUTE_ROLES.includes(roles)) {
              setTimeout(() => {
                this.$router.push('/noaccess')
              }, 0)
            }
          })
          .catch(() => {
            this.isRouterViewVisible = true
            this.$router.push('/logout')
          })
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/main';
</style>

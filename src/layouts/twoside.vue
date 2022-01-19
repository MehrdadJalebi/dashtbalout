<template>
  <v-app
    id="inspire"
    class="layout-twoside">
    <v-main>
      <v-container
        class="authContent fill-height py-0"
        fluid
        >
        <v-row
          class="fill-height my-auto h-100 dark"
        >
        <v-col
          cols="12"
          sm="12"
          md="4"
          class="layout-twoside--content-area my-auto"
          >
          <router-link :to="APP_CONFIG.homeURL" >
            <v-img
              v-if="imageSrc"
              :src="imageSrc"
              class="mb-15 mx-auto"
              height="auto"
              width="230"
              >
            </v-img>
          </router-link>
          <div class="px-5 mx-5">
              <router-view />
          </div>
        </v-col>
          <v-col
            cols="12"
            class="d-md-flex d-none layout-twoside--artwork-area fill-height blue-grey lighten-5 justify-center align-center"
            sm="12"
            md="8"
            >
            <portal-target name="layoutTwoside">
              <!--
                This component can be located anywhere in your App.
                The slot content of the above portal component will be rendered here.
              -->
            </portal-target>
            <div class="right-side-container">
              <v-img
                v-if="artworkURL"
                max-width="100%"
                max-height="100%"
                :aspect-ratio="this.$route.meta.artworkAspectRatio || APP_CONFIG.layout.twoside.defaultArtworkAspectRatio"
                contain
                :src="artworkURL"
              />
              <div v-if="htmlConfig" class="mt-5 text-center" v-html="htmlConfig" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <GlobalSnackbar />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    source: String
  },
  data () {
    return {
      imageSrc: '',
      hasHtmlConfig: false,
      htmlConfig: null
    }
  },
  computed: {
    ...mapGetters({
      config: 'auth/config'
    }),
    artworkURL () {
      const routeArtwork = this.$route.meta.artwork
      return routeArtwork || false
    },
    copyRight () {
      if (this.$route.meta.copyRight === undefined || this.$route.meta.copyRight === true) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    config (val) {
      this.imageSrc = val.logo
      this.htmlConfig = val.LoginHtml
    }
  }
}
</script>
<style lang="scss">
.right-side-container {
  width: 100%;
}
</style>

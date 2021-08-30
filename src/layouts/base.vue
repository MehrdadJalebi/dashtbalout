<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height align-start"
        style="background-color:#F6F6F6"
        fluid
      >
        <v-row>
          <v-col cols="12">
            <router-link :to="APP_CONFIG.homeURL" >
              <v-img
                v-if="imageSrc"
                :src="imageSrc"
                class="mb-5 mx-auto"
                height="auto"
                width="230"
                >
              </v-img>
            </router-link>
            <router-view />
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
      imageSrc: ''
    }
  },
  computed: {
    ...mapGetters({
      config: 'auth/config'
    })
  },
  watch: {
    config (val) {
      this.imageSrc = val.logo
    }
  }
}
</script>

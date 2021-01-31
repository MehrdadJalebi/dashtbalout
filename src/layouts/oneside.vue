<template>
  <v-app
    id="inspire"
    class="layout-oneside">
    <v-main>
      <v-container
        class="authContent fill-height py-0"
        fluid
        >
        <router-view />
      </v-container>
    </v-main>
    <GlobalSnackbar />
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  }
}
</script>

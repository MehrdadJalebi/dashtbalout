<template>
  <div class="under-construction">
   <v-card
      class="mx-auto text-center white--text pa-10"
      max-width="400"
      color="red darken-1">
     <v-icon
      x-large
      color="white"
      >
      mdi-account-hard-hat
     </v-icon>
    <p
      class="mt-4 mb-0">
      {{ $t('components.underConstruction.description') }}
    </p>
   </v-card>
  </div>
</template>

<script>
/**
 * @name underConstruction
 * @description under-construction component for development use
 * @version 1.0.0
 */
export default {
  name: 'UnderConstruction'
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div
    class="profile-info-card-component"
    >
    <v-card
      :color="isPrimary ? '' : variant"
      :class="isPrimary ? '' : 'white--text'"
      class="rounded-lg"
      outlined
      >
      <v-list-item two-line>
        <v-list-item-avatar
          class="lighten-4"
          :color="variant"
          :size="isPrimary ? 96 : 56"
          >
          <v-icon
            class="darken-4"
            :color="variant"
            :x-large="isPrimary"
            :large="!isPrimary"
            >
            {{ icon }}
          </v-icon>
        </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
              class="mb-2"
              >
              {{ title }}
            </v-list-item-title>
              <v-list-item-subtitle
                >
                {{ description }}
              </v-list-item-subtitle>
          </v-list-item-content>
      </v-list-item>
    <v-divider
      />
      <v-card-actions>
        <router-link
          class="subtitle-1 mr-3"
          :class="isPrimary ? '' : 'white--text'"
          :to="{ name: linkUrl }"
          >
          {{ linkText }}
        </router-link>
          <v-spacer></v-spacer>
          <slot name="toolbox" />
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
/**
 * @name Profile component
 * @description To categorize information
 * @version [1.0.0]
 * @property [
     {String} title - Card title,
     {String} description - Card description,
     {String} icon - Card icon,
     {String} linkText - Card footer link text,
     {String} linkUrl - Card footer link url,
     {String} [variant] - Card color
   ]
 * @note: Replace [*] with new data and keep this comment above all components, for more information please
 follow https://jsdoc.app/index.html
 * @note To write document about props, methods and events you could use jsdoc.
 */
export default {
  name: 'ProfileInfoCard',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
    icon: {
      type: String,
      required: true
    },
    linkText: {
      type: String,
      required: true
    },
    linkUrl: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      required: false,
      default: 'primary'
    }
  },
  computed: {
    isPrimary () {
      return this.variant === 'primary'
    }
  }
}
</script>
<style lang="scss">
.profile-info-card-component {
  .v-list-item__subtitle {
    white-space: break-spaces;
  }
  .v-card__actions {
    a:first-child {
      text-decoration: none;
    }
  }
}
</style>

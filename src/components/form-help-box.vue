<template>
  <div class="form-help-box-component">
    <v-card
      class="d-flex flex-column justify-center align-center mb-2 px-5 rounded-lg"
      height="auto"
      outlined
    >
      <v-img
        class="my-5"
        :src="imgSrc"
      >
      </v-img>
      <p
        v-if="title"
        class="text-center col-md-6 col-sm-8 col-xs-10 text-h6 mb-2"
      >
      {{ title }}
      </p>
      <p
        v-if="descriptionHtml"
        class="text-center col-md-6 col-sm-8 col-xs-10 text-body-2 mb-2"
        :class="descriptionVariant + '--text'"
        v-html="descriptionHtml"
      />
      <p
        v-if="confirmMessage"
        class="text-center col-md-6 col-sm-8 col-xs-10 primary--text text-body-1 mb-0 pb-0"
      >
      {{ confirmMessage }}
      </p>
      <slot />
      <v-btn
        v-if="isButtonVisible"
        class="mb-12 mt-5"
        color="primary"
        @click="onClickButton"
      >
      {{ buttonText }}
      </v-btn>
      <p
        class="text-center col-md-6 col-sm-8 col-xs-10 grey--text text-body-2 mb-5"
      >
        {{ caption }}
      </p>
    </v-card>
  </div>
</template>

<script>
/**
 * @name formHelpBox
 * @description Page to guide and help users
 * @version 1.0.0
 * @property {string} [imgSrc] - Artwork of the page
 * @property {string} [title] - Title of the page
 * @property {string} [description] - Description of the page
 * @property {boolean} [isButtonVisible] - Description of the page
 * @property {string} [confirmMessage] - Confirm Message of the page
 * @property {string} [caption] - Caption of the page
 * @event clickButton - On click button action
 *
 * @note: Replace [*] with new data and keep this comment above all components, for more information please
 follow https://jsdoc.app/index.html
 * @note To write document about props, methods and events you could use jsdoc.
 */
export default {
  props: {
    imgSrc: {
      type: String,
      default: '',
      required: false
    },
    title: {
      type: String,
      default: '',
      required: false
    },
    descriptionHtml: {
      type: String,
      default: '',
      required: false
    },
    descriptionVariant: {
      type: String,
      default: 'grey',
      required: false
    },
    confirmMessage: {
      type: String,
      default: '',
      required: false
    },
    caption: {
      type: String,
      default: '',
      required: false
    },
    buttonText: {
      type: String,
      default () {
        return this.$t('components.formHelpBox.send')
      },
      required: false
    },
    isButtonVisible: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {
    onClickButton () {
      this.$emit('clickButton')
    }
  }
}
</script>

<style scoped>

</style>

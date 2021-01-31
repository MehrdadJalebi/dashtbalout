<template>
  <div class="confirm-box-component">
    <v-card
     flat
     class="pa-5 text-center mx-auto"
     max-width="780px">
     <v-layout
       align-center
       justify-center
       column
     >
       <p
       v-if="confirmTitle"
        class="primary--text"
        v-html="confirmTitle"
       />
       <p
          v-if="confirmMessage"
          class="warning--text "
        >
          <v-icon
            v-if="confirmMessageIcon"
            color="warning"
          >
            {{ confirmMessageIcon }}
          </v-icon>
          {{ confirmMessage }}
        </p>
        <v-card-actions>
        <v-spacer></v-spacer>
       <v-btn
          v-if="confirmButtonText"
          class="v-btn--min-width mt-5"
          color="primary"
          @click="onConfirm()">
          {{ confirmButtonText }}
       </v-btn>
       <v-btn
          v-if="cancelButtonText"
          class="v-btn--min-width mt-5"
          color="error"
          @click="onCancel()">
          {{ cancelButtonText }}
       </v-btn>
        </v-card-actions>
     </v-layout>
   </v-card>
  </div>
</template>

<script>
/**
 * @name confirm-box
 * @description Get confirmation from user
 * @version [1.0.0]
 * @event confirm
 * @event cancel
 * @property {String} [confirmTitle] - Specifies confirm title,
 * @property {String} [confirmMessage] - Specifies confirm message,
 * @property {String} [confirmMessageIcon] - Specifies confirm message icon,
 * @property {String} [confirmButtonText] - Specifies confirm button text,
 * @property {String} [cancelButtonText] - Specifies cancel button text,
 *
 * @note: Replace [*] with new data and keep this comment above all components, for more information please
 follow https://jsdoc.app/index.html
 * @note To write document about props, methods and events you could use jsdoc.
 */
export default {
  props: {
    confirmTitle: {
      type: String,
      default: '',
      required: false
    },
    confirmMessage: {
      type: String,
      default: '',
      required: false
    },
    confirmMessageIcon: {
      type: String,
      default: '',
      required: false
    },
    cancelButtonText: {
      type: String,
      default: '',
      required: false
    },
    confirmButtonText: {
      type: String,
      default: '',
      required: false
    }
  },
  methods: {
    onConfirm () {
      this.$emit('confirm')
    },
    onCancel () {
      this.$emit('cancel')
    }
  }
}
</script>

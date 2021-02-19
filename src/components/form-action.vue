<template>
  <div class="form-action-component">
    <slot v-if="hasSlot"></slot>
    <template v-else>
      <v-btn
        :disabled="!$parent.value"
        :color="submitColor"
        depressed
        @click="submitButtonClicked"
      >
        {{ submitText }}
      </v-btn>
      <v-btn
        :color="cancelColor"
        depressed
        outlined
        @click="cancelButtonClicked"
      >
        {{ cancelText }}
      </v-btn>
    </template>
  </div>
</template>

<script>
/**
 * @name formAction
 * @description form action component for horizontal-form
 * @version 1.0.0
 * @property {string} [submitText=Submit] - submit button show text.
 * @property {string} [cancelText=Cancel] - cancel button show text.
 * @property {string} [submitColor=primary] - submit button color.
 * @property {string} [cancelColor=secondary] - cancel button color.
 * @event FormAction#submit - emitted when submit button clicked.
 */
export default {
  name: 'FormAction',
  props: {
    submitText: {
      type: String,
      required: false,
      default: 'Submit'
    },
    cancelText: {
      type: String,
      required: false,
      default: 'Cancel'
    },
    submitColor: {
      type: String,
      required: false,
      default: 'primary'
    },
    cancelColor: {
      type: String,
      required: false,
      default: 'secondary'
    },
    novalidate: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    hasSlot () {
      return !!this.$slots.default
    }
  },
  methods: {
    submitButtonClicked (e) {
      if (!this.novalidate) this.$parent.validate()
      this.$nextTick(() => {
        if (this.$parent.value) this.$emit('submit', e)
      })
    },
    cancelButtonClicked (e) {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-action-component{
  border-top: none;
  .v-btn{
    min-width: 70px !important;
    margin-left: 10px;
  }
}
</style>

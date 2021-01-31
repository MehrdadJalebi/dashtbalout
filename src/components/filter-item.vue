<template>
  <form-item
    class="filter-item-component col-12 py-0"
    :class="['range', 'slider'].indexOf($attrs.type) !== -1 ?
            ['col-sm-8', 'col-md-6', 'col-lg-4'] :
            ['col-sm-4', 'col-md-3', 'col-lg-2']"
    :value="value"
    md
    v-bind="$attrs"
    @input="onChange"
  >
    <slot></slot>
  </form-item>
</template>

<script>
/**
 * @name filterItem
 * @description filter item component for filter-box
 * @version 1.0.0
 * @property {*} [v-model] - default input value (when slot not exists).
 */
import formItem from '../components/form-item'
export default {
  name: 'FilterItem',
  components: {
    'form-item': formItem
  },
  props: {
    value: {
      type: [String, Array, Boolean, Number, Date],
      required: false
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  methods: {
    onChange (e) {
      this.$emit('input', e)
    }
  }
}
</script>
<style lang="scss">
.filter-item-component {
  height: 50px !important;
  margin-top: 10px;
  & .v-text-field__details{
    display: none !important;
  }
  & .v-input, & .v-text-field__slot,
  & .v-select, & .v-select__slot {
    margin-top: 0 !important;
    padding-top: 0 !important;
    .v-select__selections {
      .v-select__selection:not(:nth-child(-n+3)) {
        display: none !important;
      }
      flex-flow: nowrap !important;
    }
  }
  & .v-input__slot {
    min-height: auto !important;
  }
}
</style>

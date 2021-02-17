<template>
  <div class="filter-box-component">
    <v-form class="form-inline pa-0">
      <filter-item
        v-if="!disableFromDate"
        v-model="fromDate"
        type="date"
        :placeholder="$t('components.filterBox.fromDate')"
        @input="onFilterClick"
      ></filter-item>
      <filter-item
        v-if="!disableToDate"
        v-model="toDate"
        type="date"
        :placeholder="$t('components.filterBox.toDate')"
        @input="onFilterClick"
      ></filter-item>
      <slot></slot>
    </v-form>
    <div class="filter-actions d-flex flex-row-reverse pb-4">
      <v-btn
        outlined
        :color="cancelButtonColor"
        @click="onCancelFilterClick"
      >
        {{ cancelButtonText || $t('components.filterBox.cancelButtonText') }}
      </v-btn>
      <v-btn
        class="mx-2"
        outlined
        :color="buttonColor"
        @click="onFilterClick"
      >
        {{ buttonText || $t('components.filterBox.buttonText') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
/**
 * @name filterBox
 * @description filter box component for report-table
 * @version 1.0.0
 */
export default {
  name: 'FilterBox',
  props: {
    disableFromDate: {
      type: Boolean,
      required: false,
      default: false
    },
    disableToDate: {
      type: Boolean,
      required: false,
      default: false
    },
    buttonText: {
      type: String,
      required: false,
      default: null
    },
    buttonColor: {
      type: String,
      required: false,
      default: 'primary'
    },
    cancelButtonText: {
      type: String,
      required: false,
      default: null
    },
    cancelButtonColor: {
      type: String,
      required: false,
      default: 'error'
    }
  },
  data: () => ({
    fromDate: null,
    toDate: null
  }),
  methods: {
    onFilterClick (e) {
      const { fromDate, toDate } = this
      const slotItems = {}
      if (this.$slots.default && this.$slots.default.length) {
        this.$slots.default.forEach(filterItem => {
          slotItems[filterItem.data.model.expression.split('.').pop()] = filterItem.data.model.value
        })
      }
      const payload = {
        ...(!this.disableFromDate) && { fromDate },
        ...(!this.disableToDate) && { toDate },
        ...slotItems
      }

      this.$emit('filter', payload)
    },
    onCancelFilterClick (e) {
      this.fromDate = null
      this.toDate = null
      this.$emit('cancelFilter')
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-box-component{
  position: relative;
  clear: both;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid var(--v-borderColor-base);
  border-radius: 10px;
  box-shadow: -2px 3px 5px hsla(0,0%,49%,.1);
}
</style>

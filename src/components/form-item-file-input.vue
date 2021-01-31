<template>
  <v-input
    class="form-file-input-uploader"
    :error-messages="error.message"
    :error="error.hasError"
  >
    <div
      class="upload-area"
    >
      <div class="pa-2 d-flex flex-row flex-wrap">
        <v-chip
          v-for="(f, i) in files"
          :key="i"
          class="ma-1 file-item"
          close
          @click:close="remove(i)"
        >
          {{ (f.name || f) | truncate }}
        </v-chip>
      </div>
      <label class="align-self-end">
        <div class="select-button ma-2">
          <span> {{ label }} </span>
        </div>
        <input
          type="file"
          :multiple="$attrs.multiple"
          :accept="$attrs.accept"
          @change="handleChange"
        />
      </label>
    </div>
  </v-input>
</template>

<script>
/**
 * @name formItemFileInput
 * @description file input for form-item
 * @version 1.0.0
 */
export default {
  name: 'FormItemFileInput',
  props: {
    value: {
      type: [String, Array, File],
      required: false
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  computed: {
    files () {
      if (!this.value) return []
      return this.valueType === 'Array' ? this.value : [this.value]
    },
    label () {
      return this.$attrs.placeholder || this.$t('components.formItemFileInput.selectLabel')
    },
    error () {
      const rules = this.$attrs.rules || []
      const errors = rules.filter(rule => rule(this.value) !== true)
      const hasError = errors.length > 0
      const message = hasError ? errors[0](this.value) : ''
      return {
        hasError,
        message
      }
    },
    valueType () {
      return this.getType(this.value)
    },
    multiple () {
      return Object.prototype.hasOwnProperty.call(this.$attrs, 'multiple')
    }
  },
  methods: {
    handleChange (e) {
      const selectedFiles = [...e.target.files]
      if (selectedFiles.length > 0) {
        if (this.multiple) {
          const newValue = [...this.value, ...selectedFiles]
          this.$emit('input', newValue)
        } else {
          this.$emit('input', selectedFiles[0])
        }
      }
    },
    remove (index) {
      if (this.valueType === 'Array') {
        const temp = [...this.value]
        temp.splice(index, 1)
        this.$emit('input', temp)
      } else {
        this.$emit('input', null)
      }
    },
    getType (value) {
      return Array.isArray(value) ? 'Array' : typeof value === 'string' ? 'String' : 'File'
    }
  },
  filters: {
    truncate (value) {
      if (!value) return ''
      if (value.length <= 10) return value
      return `${value.substr(0, 5)}...${value.substr(value.length - 4, 4)}`
    }
  }
}
</script>

<style scoped>
.select-button {
  padding: .3rem;
  border-radius: .3rem;

  text-align: center;
  cursor: pointer;
  border: 1px solid var(--v-borderColor-base);
}

input[type="file"] {
  display: none;
}
</style>

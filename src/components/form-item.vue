<template>
  <div
    class="form-item-component"
    :class="{ md }"
  >
    <div class="form-label">
      <v-icon> {{ icon }} </v-icon>
      <label> {{ label }} </label>
    </div>
    <slot v-if="hasSlot"></slot>
    <template v-else>
      <v-text-field
        v-if="type === 'textbox' && isNumber && !noNumberFormatter"
        :dir="ltr ? 'ltr' : 'rtl'"
        outlined
        :value="value ? formatNumber(value, numeralFormatter, numeralFormatterLocale) : null"
        v-bind="$attrs"
        @input="onChange"
      ></v-text-field>
      <v-text-field
        v-else-if="type === 'textbox'"
        :dir="ltr ? 'ltr' : 'rtl'"
        outlined
        :value="value"
        v-bind="$attrs"
        @input="onChange"
      ></v-text-field>
      <v-textarea
        v-else-if="type === 'textarea'"
        :dir="ltr ? 'ltr' : 'rtl'"
        no-resize
        outlined
        :value="value"
        v-bind="$attrs"
        @input="onChange"
      ></v-textarea>
      <v-select
        v-else-if="type === 'select'"
        :dir="ltr ? 'ltr' : 'rtl'"
        outlined
        :menu-props="{ offsetY: true }"
        :value="value"
        v-bind="$attrs"
        @input="onChange"
        @click="onClick"
      >
        <template
          v-if="Object.prototype.hasOwnProperty.call($attrs, 'selectAll')"
          v-slot:prepend-item
        >
          <v-list-item
            ripple
            @click="toggleSelectAll"
          >
            <v-list-item-action>
              <v-icon>
                {{ allSelected ? 'mdi-minus-box' : 'mdi-checkbox-blank-outline' }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title> {{ $attrs.selectAllPlaceholder ? $attrs.selectAllPlaceholder :  $t('components.formItem.selectAllPlaceholder') }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="mt-2"></v-divider>
        </template>
      </v-select>
      <v-checkbox
        v-else-if="type === 'checkbox'"
        v-model="value"
        v-bind="$attrs"
        @change="onChange"
      ></v-checkbox>
      <v-switch
        v-else-if="type === 'switch'"
        v-model="value"
        dense
        inset
        v-bind="$attrs"
        @change="onChange"
      ></v-switch>
      <v-radio-group
        v-else-if="type === 'radio'"
        row
        :value="value"
        v-bind="$attrs"
        @change="onChange"
        @mousedown="onMousedown"
      >
        <v-radio
          v-for="(option, index) in $attrs.options"
          :key="index"
          :label="option.text"
          :value="option.value"
        ></v-radio>
      </v-radio-group>
      <div
        v-else-if="type === 'range'"
        class="row mx-0 mt-0"
      >
        <div class="col-4 my-auto">
          {{ $attrs.placeholder }}
        </div>
        <v-range-slider
          class="col-8"
          :value="value"
          v-bind="$attrs"
          @change="onChange"
        >
          <template v-slot:prepend>
            {{ formatNumber(value[0], prependNumeralFormatter, prependNumeralFormatterLocale) }}
          </template>
          <template v-slot:append>
            {{ formatNumber(value[1], appendNumeralFormatter, appendNumeralFormatterLocale) }}
          </template>
        </v-range-slider>
      </div>
      <v-slider
        v-else-if="type === 'slider'"
        :value="value"
        :label="`${value}`"
        v-bind="$attrs"
        @change="onChange"
      ></v-slider>
      <form-item-file-input
        v-else-if="type === 'file'"
        :value="value"
        v-bind="$attrs"
        @input="onChange"
      ></form-item-file-input>
      <!--
      <div
        v-else-if="type === 'file'"
        class="form-uploader"
      >
        <v-file-input
          outlined
          truncate-length="10"
          v-bind="$attrs"
          width=200
          @change="onChange"
        ></v-file-input>
        <v-img
          v-if="value"
          :src="url"
        ></v-img>
      </div>
      -->
      <multiselect
        v-else-if="type === 'multiselect'"
        :value="value"
        v-bind="$attrs"
        @input="onChange"
      ></multiselect>
      <date-picker
        v-else-if="type === 'date' || type === 'datetime' || type === 'time'"
        format="YYYY-MM-DD"
        display-format="jDD jMMMM jYYYY"
        :type="type"
        :value="value"
        v-bind="$attrs"
        @input="onChange"
      >
      </date-picker>
      <v-combobox
        v-if="type === 'combobox'"
        :dir="ltr ? 'ltr' : 'rtl'"
        :value="value"
        v-bind="$attrs"
        @input="onChange"
      ></v-combobox>
      <v-autocomplete
        v-else-if="type === 'autocomplete'"
        :dir="ltr ? 'ltr' : 'rtl'"
        :menu-props="{ offsetY: true }"
        outlined
        :value="value"
        v-bind="$attrs"
        @input="onChange"
        @click="onClick"
      ></v-autocomplete>
    </template>
  </div>
</template>

<script>
/**
 * @name formItem
 * @description form item component for horizontal-form
 * @version 1.0.0
 * @property {string} [icon] - form label icon name.
 * @property {string} [label] - form label text.
 * @property {string} [type] - form input type (when slot not exists).
 * @property {Boolean} [ltr=false] - form input ltr direction. (default is rtl).
 * @property {Boolean} [md=false] - form input md size.
 * @property {*} [v-model] - default input value (when slot not exists).
 */
import Multiselect from 'vue-multiselect'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import formItemFileInput from '../components/form-item-file-input'
export default {
  name: 'FormItem',
  components: {
    multiselect: Multiselect,
    'date-picker': VuePersianDatetimePicker,
    formItemFileInput
  },
  props: {
    numeralFormatterLocale: {
      type: String,
      default: 'en',
      required: false
    },
    numeralFormatter: {
      type: String,
      default: '',
      required: false
    },
    prependNumeralFormatterLocale: {
      type: String,
      default: 'en',
      required: false
    },
    appendNumeralFormatterLocale: {
      type: String,
      default: 'en',
      required: false
    },
    prependNumeralFormatter: {
      type: String,
      default: '',
      required: false
    },
    appendNumeralFormatter: {
      type: String,
      default: '',
      required: false
    },
    label: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false,
      validator: (v) => ['textbox', 'textarea', 'select', 'checkbox', 'switch', 'radio', 'file',
        'multiselect', 'date', 'datetime', 'time', 'slider', 'range', 'combobox', 'autocomplete'].indexOf(v) !== -1
    },
    value: {
      type: [String, Boolean, Array, Number, File],
      required: false
    },
    ltr: {
      type: Boolean,
      required: false,
      default: false
    },
    md: {
      type: Boolean,
      required: false,
      default: false
    },
    isNumber: {
      type: Boolean,
      required: false,
      default: false
    },
    noNumberFormatter: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  computed: {
    hasSlot () {
      return !!this.$slots.default
    },
    url () {
      if (typeof this.value === 'string') {
        return this.value
      } else if (Array.isArray(this.value)) {
        return
      }
      return URL.createObjectURL(this.value)
    },
    allSelected () {
      return this.value.length === this.$attrs.items.length
    }
  },
  methods: {
    onChange (e) {
      // TODO: move it to better place
      String.prototype.toEnglishDigits = function () {
        return this.replace(/[۰-۹]/g, function (chr) {
          var persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
          return persian.indexOf(chr);
        });
      };
      if (e && this.isNumber) {
        e = e.replace(/[ ,.]/g, "")
        e = e.toEnglishDigits()
      }
      this.$emit('input', e)
    },
    onClick (e) {
      this.$emit('click', e)
    },
    onMousedown (e) {
      this.$emit('mousedown', e)
    },
    toggleSelectAll () {
      this.$nextTick(() => {
        if (this.allSelected) {
          this.$emit('input', [])
        } else {
          const values = this.$attrs.items.map(v => v.value)
          this.$emit('input', values)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.form-item-component > * + *{
  margin-top: 10px;
}
.form-item-component > div + span {
  margin-top: 0px;
}
.form-label{
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 200px;
  max-width: 200px;
  i + label{
    color: #9C9C9C;
    margin: 0 20px 0 10px;
  }
  @media (max-width: 780px) {
    margin-bottom: 20px;
    max-width: 100%;
  }
}
</style>

<route>
{
  "name": "forms",
  "meta": {
    "order": 4.1,
    "isVisible": true,
    "iconName": "mdi-pen"
  }
}
</route>
<template>
  <div>
    <page-title
      :title="$t('pages.forms.title')"
    ></page-title>
    <v-form
      v-model="formIsValid"
      :class="formData.type"
    >
      <form-item
        v-model="formData.type"
        :class="{ 'col-3': formData.type === 'form-inline' }"
        type="select"
        :items="formTypes"
        icon="mdi-cards-variant"
        :label="$t('pages.forms.typeSelectLabel')"
      ></form-item>
      <form-item
        v-model="formData.name"
        :class="{ 'col-3': formData.type === 'form-inline' }"
        type="textbox"
        :rules="nameRules"
        icon="mdi-form-textbox"
        :label="$t('pages.forms.nameTextLabel')"
        :placeholder="$t('pages.forms.nameTextPlaceholder')"
      ></form-item>
      <form-item
        v-model="formData.email"
        :class="{ 'col-3': formData.type === 'form-inline' }"
        type="textbox"
        icon="mdi-form-textbox"
        :label="$t('pages.forms.mailTextLabel')"
        :placeholder="$t('pages.forms.mailTextPlaceholder')"
        ltr
      ></form-item>
      <form-item
        :class="{ 'col-3': formData.type === 'form-inline' }"
        icon="mdi-form-textbox"
        :label="$t('pages.forms.mailTextSlotLabel')"
      >
        <v-text-field
          v-model="formData.email"
          :placeholder="$t('pages.forms.mailTextPlaceholder')"
          dir="ltr"
          outlined
        ></v-text-field>
      </form-item>
      <form-item
        v-model="formData.sheba"
        :class="{ 'col-3': formData.type === 'form-inline' }"
        type="textbox"
        :rules="shebaRules"
        icon="mdi-form-textbox"
        :label="$t('pages.forms.shebaTextLabel')"
        :placeholder="$t('pages.forms.shebaTextPlaceholder')"
        :suffix="$t('pages.forms.shebaSuffix')"
        ltr
      ></form-item>
      <form-item
        v-model="formData.textArea"
        :class="{ 'col-3': formData.type === 'form-inline' }"
        type="textarea"
        rows="4"
        icon="mdi-form-textarea"
        :label="$t('pages.forms.descTextareaLabel')"
        :placeholder="$t('pages.forms.descTextareaPlaceholder')"
      ></form-item>
      <form-item
        v-model="formData.select"
        :class="{ 'col-3': formData.type === 'form-inline' }"
        type="select"
        :rules="[v => !!v || $t('pages.forms.itemSelectRuleRequired')]"
        :items="complexItems"
        item-text="firstName"
        item-value="id"
        icon="mdi-select"
        :label="$t('pages.forms.itemSelectLabel')"
        :placeholder="$t('pages.forms.itemSelectPlaceholder')"
      ></form-item>
      <form-item
        v-model="formData.selectMultiple"
        :class="{ 'col-3': formData.type === 'form-inline' }"
        type="select"
        :items="items"
        icon="mdi-select-multiple"
        :label="$t('pages.forms.itemSelectMultipleLabel')"
        :placeholder="$t('pages.forms.itemSelectMultiplePlaceholder')"
        multiple
      ></form-item>
      <form-item
        v-model="formData.selectMultiple"
        :class="{ 'col-3': formData.type === 'form-inline' }"
        type="multiselect"
        :options="items"
        :multiple="true"
        icon="mdi-select-multiple"
        :label="$t('pages.forms.itemMultiselectLabel')"
        :placeholder="$t('pages.forms.itemMultiselectPlaceholder')"
      ></form-item>
      <form-item
        v-model="formData.date"
        :class="{ 'col-3': formData.type === 'form-inline' }"
        icon="mdi-calendar"
        :label="$t('pages.forms.datePickerLabel')"
        type="date"
      ></form-item>
      <form-item
        v-model="formData.datetime"
        :class="{ 'col-3': formData.type === 'form-inline' }"
        icon="mdi-calendar-clock"
        :label="$t('pages.forms.datetimePickerLabel')"
        type="datetime"
      ></form-item>
      <form-item
        v-model="formData.time"
        :class="{ 'col-3': formData.type === 'form-inline' }"
        icon="mdi-clock"
        :label="$t('pages.forms.timePickerLabel')"
        type="time"
      ></form-item>
      <form-item
        v-model="formData.counter"
        :class="{ 'col-3': formData.type === 'form-inline' }"
        type="slider"
        min="1"
        max="20"
        icon="mdi-counter"
        :label="$t('pages.forms.counterSliderLabel')"
      ></form-item>
      <form-item
        v-model="formData.checkbox"
        :class="{ 'col-3': formData.type === 'form-inline' }"
        type="checkbox"
        :rules="[v => !!v || $t('pages.forms.agreeCheckboxRuleRequired')]"
        icon="mdi-checkbox-marked"
        :label="$t('pages.forms.agreeCheckboxLabel')"
      ></form-item>
      <form-item
        v-model="formData.checkbox"
        :class="{ 'col-3': formData.type === 'form-inline' }"
        type="switch"
        :rules="[v => !!v || $t('pages.forms.agreeSwitchRuleRequired')]"
        icon="mdi-toggle-switch"
        :label="$t('pages.forms.agreeSwitchLabel')"
      ></form-item>
      <form-item
        v-model="formData.radiobox"
        :class="{ 'col-3': formData.type === 'form-inline' }"
        type="radio"
        :rules="[v => !!v || $t('pages.forms.genderRadioRuleRequired')]"
        :options="radioOptions"
        icon="mdi-radiobox-marked"
        :label="$t('pages.forms.genderRadioLabel')"
      ></form-item>
      <form-item
        v-model="formData.file"
        :class="{ 'col-3': formData.type === 'form-inline' }"
        type="file"
        icon="mdi-file-upload"
        accept="image/*"
        multiple
        :rules="fileRules"
        :label="$t('pages.forms.docFileLabel')"
        :placeholder="$t('pages.forms.docFilePlaceholder')"
      ></form-item>
      <form-item
        v-model="formData.combobox"
        :class="{ 'col-3': formData.type === 'form-inline' }"
        type="radio"
        icon="mdi-radiobox-marked"
        :label="$t('pages.forms.comboboxChipsLabel')"
        multiple
        chips
        deletable-chips
        append-icon
      ></form-item>
      <form-item
        v-model="formData.autocomplete"
        :class="{ 'col-3': formData.type === 'form-inline' }"
        type="autocomplete"
        :items="items"
        icon="mdi-select-multiple"
        :label="$t('pages.forms.autocompleteLabel')"
        multiple
      ></form-item>
      <form-action
        :submit-text="$t('pages.forms.sendButtonText')"
        :cancel-text="$t('pages.forms.returnButtonText')"
        novalidate
        @submit="onSubmitForm"
      ></form-action>
      <form-action>
        <v-btn
          :disabled="!formIsValid"
          color="success"
          depressed
          @click="onSubmitForm"
        >
          {{ $t('pages.forms.submitButtonText') }}
        </v-btn>
        <v-btn
          color="secondary"
          depressed
          outlined
          @click="$router.go(-1)"
        >
          {{ $t('pages.forms.cancelButtonText') }}
        </v-btn>
        <v-btn
          color="error"
        >
          {{ $t('pages.forms.removeButtonText') }}
        </v-btn>
      </form-action>
    </v-form>
  </div>
</template>

<script>
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data: () => ({
    // NOTE: Keep this name same in all form pages and components
    formIsValid: true,
    // NOTE: Keep this name same in all form pages and components
    formData: {
      type: 'form-horizontal',
      name: '',
      email: '',
      sheba: '',
      textArea: '',
      select: null,
      selectMultiple: null,
      checkbox: true,
      radiobox: null,
      file: [],
      counter: 10,
      datetime: null,
      date: null,
      time: null
    },
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ],
    formTypes: [
      'form-horizontal',
      'form-vertical',
      'form-inline'
    ]
  }),
  computed: {
    nameRules () {
      return [
        v => !!v || this.$t('pages.forms.nameTextRuleRequired'),
        v => (v && v.length <= 10) || this.$t('pages.forms.nameTextRuleMaxLength')
      ]
    },
    shebaRules () {
      return [
        v => (v && v.length === 24) || this.$t('pages.forms.shebaRuleLength'),
        v => (v && /^\d+$/.test(v)) || this.$t('pages.forms.shebaRuleOnlyNumber')
      ]
    },
    fileRules () {
      return [
        v => (v && v.length > 0) || 'Required'
      ]
    },
    complexItems () {
      return [...Array(5)].map((_, index) => ({
        id: index + 1,
        firstName: this.faker.name.firstName(),
        lastName: this.faker.name.lastName(),
        amount: this.faker.finance.amount()
      }))
    },
    radioOptions () {
      return [
        {
          text: this.$t('pages.forms.genderRadioOptionMale'),
          value: 'm'
        },
        {
          text: this.$t('pages.forms.genderRadioOptionFemale'),
          value: 'f'
        }
      ]
    }
  },
  methods: {
    // NOTE: Keep this name same in all form pages and components
    onSubmitForm () {
      console.log('on form submit clicked!')
      console.log(this.formData)
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

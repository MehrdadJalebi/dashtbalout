<template>
  <div class="register-component">
    <v-card
      flat
      class="transparent"
      :dark="isDark">
      <v-row
        v-if="titleEnabled"
        class="justify-center form-title pb-4"
        >
        {{$t('components.register.title')}}
      </v-row>
      <v-form ref="form" v-model="valid" @submit.prevent="register">
      <!-- name -->
      <div v-if="nameEnabled"  class="subtitle-2">
        <v-icon v-if="solo && iconEnabled" medium color="darken-2" class="ml-3">mdi-account-circle</v-icon>
        <span v-if="solo">{{nameTitle}}</span>
        <v-text-field
          v-model="userInfo.firstName"
          tabindex="2"
          :solo="solo"
          :outlined="outlined"
          flat
          color="primary"
          class="mt-2"
          :rules="nameRequiredEnabled ? [nameRules.required] : [] "
          :prepend-icon="outlined && iconEnabled ? 'mdi-account-circle' : ''"
          name="name"
          type="text"
          required
        ></v-text-field>
      </div>
      <!-- last name -->
      <div v-if="lastNameEnabled" class="subtitle-2">
        <v-icon v-if="solo && iconEnabled" medium color="darken-2" class="ml-3">mdi-account-circle</v-icon>
        <span v-if="solo">{{lastNameTitle}}</span>
        <v-text-field
          v-model="userInfo.lastName"
          tabindex="3"
          :solo="solo"
          :outlined="outlined"
          flat
          color="primary"
          class="mt-2"
          :rules="lastNameRequiredEnabled ? [lastNameRules.required, lastNameRules.pattern] : [] "
          name="lastName"
          :prepend-icon="outlined && iconEnabled ? 'mdi-account-circle' : ''"
          type="text"
          required
        ></v-text-field>
      </div>
      <!-- user name -->
      <div v-if="userNameEnabled" class="subtitle-2">
        <v-icon v-if="solo && iconEnabled" medium color="darken-2" class="ml-3">mdi-account-circle</v-icon>
        <span v-if="solo">{{userNameTitle}}</span>
        <v-text-field
          v-model="userInfo.username"
          tabindex="3"
          :solo="solo"
          :outlined="outlined"
          flat
          color="primary"
          class="mt-2"
          :rules="userNameRequiredEnabled ? [userNameRules.required] : [] "
          name="userName"
          :prepend-icon="outlined && iconEnabled ? 'mdi-account-circle' : ''"
          type="text"
          required
        ></v-text-field>
      </div>
      <!-- password  -->
      <div v-if="passwordEnabled" class="subtitle-2 input-placeholder-left">
        <v-icon  v-if="solo && iconEnabled" medium color="darken-2" class="ml-3">mdi-lock</v-icon>
        <span v-if="solo">{{passwordTitle}}</span>
        <v-text-field
          v-model="userInfo.password"
          tabindex="4"
          :solo="solo"
          :outlined="outlined"
          flat
          color="primary"
          class="mt-2"
          :prepend-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordValidation"
          :prepend-icon="outlined && iconEnabled ? 'mdi-lock' : ''"
          name="password"
          :type="showPass ? 'text' : 'password'"
          required
          @click:prepend-inner="showPass = !showPass"
        ></v-text-field>
      </div>
      <!-- phone number -->
      <div v-if="phoneNumberEnabled" class="subtitle-2 input-placeholder-left">
        <v-icon  v-if="solo && iconEnabled" medium color="darken-2" class="ml-3">mdi-cellphone-iphone</v-icon>
        <span v-if="solo">{{phoneNumberTitle}}</span>
        <v-text-field
          :value="userInfo.phoneNumber"
          tabindex="5"
          :solo="solo"
          :outlined="outlined"
          flat
          color="primary"
          class="mt-2"
          :rules="phoneNumberValidation"
          :prepend-icon="outlined && iconEnabled ? 'mdi-cellphone-iphone' : ''"
          name="phoneNumber"
          type="text"
          required
          ></v-text-field>
      </div>
      <!-- national code -->
      <div v-if="nationalCodeEnabled" class="subtitle-2 input-placeholder-left">
        <v-icon  v-if="solo && iconEnabled" medium color="darken-2" class="ml-3">mdi-cellphone-iphone</v-icon>
        <span v-if="solo">{{nationalCodeTitle}}</span>
        <v-text-field
          :value="userInfo.nationalCode"
          tabindex="5"
          :solo="solo"
          :outlined="outlined"
          flat
          color="primary"
          :rules="nationalCodeValidation"
          class="mt-2"
          :prepend-icon="outlined && iconEnabled ? 'mdi-cellphone-iphone' : ''"
          name="nationalCode"
          type="text"
          required
          ></v-text-field>
      </div>
      <!-- email -->
      <div v-if="emailEnabled" class="subtitle-2 input-placeholder-left">
        <v-icon v-if="solo && iconEnabled" col medium color="darken-2" class="ml-3">mdi-email</v-icon>
        <span v-if="solo">{{emailTitle}}</span>
        <v-text-field
          v-model="userInfo.email"
          autofocus
          tabindex="1"
          :solo="solo"
          :outlined="outlined"
          flat
          color="primary"
          class="mt-2"
          :rules="emailValidation"
          :prepend-icon="outlined && iconEnabled ? 'mdi-email' : ''"
          name="email"
          type="text"
          required
        ></v-text-field>
      </div>
      <!-- role -->
      <!-- register btn -->
      <v-row class="justify-center mx-0">
        <v-btn
          tabindex="7"
          type="submit"
          :width="buttonWidth"
          :block="isButtonFullWidth"
          :x-large="isButtonLarge"
          :disabled="!valid"
          :loading="isLoading"
          class="white--text mt-5"
          :color="registerButtonColor">
          {{registerButtonTitle}}
        </v-btn>
      </v-row>
      <!-- login link -->
      <v-row
        class="justify-center py-4 subtitle-2"
        >
        <span class="py-1">{{ $t('components.register.haveAccount') }}</span>
        <v-btn
          text
          :color="loginLinkColor"
          small
          class="px-0 text-decoration-underline"
          :to="{ name: loginRoute}">
          {{ loginLinkTitle }}
        </v-btn>
      </v-row>
    </v-form>
    </v-card>
  </div>
</template>
<script>
/**
 * @name registration component
 * @description when added to a page or layout, creates a form for new users to submit their
 profile information on the web site. On the front end of your web site, the default sign up form
 prompts new users to your app to enter their name, password,phone number, and email.
 * @version 1.0.0
 * @event register - return name , email, password, phone number
 * @property {String} [registerButtonTitle] - Specifies the title of the registration button,
 * @property {String} [isButtonFullWidth] -Specifies that Expands the button to 100% of available space,
 * @property {String} [registerButtonColor='blue darken-2'] - Specifies the color of the registration button,
 * @property {String} [loginLinkColor='blue darken-2'] - Specifies the color of the login link,
 * @property {String} [loginLinkTitle] - Specifies the title of the login link,
 * @property {String} [loginRoute='login'] - Specifies the URL of the login page,
 * @property {String} [termsAndConditionsRoute] - Specifies the URL of the termsAndConditions page,
 * @property {Boolean} [isDark=false]
 * @property {Boolean} [emailEnabled]
 * @property {String} [emailTitle]
 * @property {String} [emailPlaceholder]
 * @property {String} [emailRequiredMessage]
 * @property {String} [emailPatternRegex]
 * @property {String} [emailPatternMessage]
 * @property {Boolean} [emailRequiredEnabled=true]
 * @property {Boolean} [emailPatternEnabled=true]
 * @property {Boolean} [nameEnabled]
 * @property {String} [nameTitle]
 * @property {String} [namePlaceholder]
 * @property {String} [nameRequiredMessage]
 * @property {Boolean} [nameRequiredEnabled=true]
 * @property {Boolean} [nameEnabled]
 * @property {String} [lastNameTitle]
 * @property {String} [lastNamePlaceholder]
 * @property {String} [userNamePlaceholder]
 * @property {String} [lastNameRequiredMessage]
 * @property {Boolean} [lastNameRequiredEnabled=true]
 * @property {Boolean} [userNameRequiredEnabled=true]
 * @property {Boolean} [lastNameEnabled]
 * @property {Boolean} [userNameEnabled]
 * @property {Boolean} [nationalCodeEnabled]
 * @property {String} [passwordTitle]
 * @property {String} [passwordPlaceholder]
 * @property {String} [passwordRequiredMessage]
 * @property {String} [passwordPatternRegex]
 * @property {String} [passwordPatternMessage]
 * @property {Boolean} [passwordRequiredEnabled=true]
 * @property {Boolean} [passwordPatternEnabled=true]
 * @property {Boolean} [phoneNumberEnabled]
 * @property {String} [phoneNumberTitle]
 * @property {String} [nationalCodeTitle]
 * @property {String} [phoneNumberPlaceholder]
 * @property {String} [phoneNumberRequiredMessage]
 * @property {String} [phoneNumberPatternRegex]
 * @property {String} [phoneNumberPatternMessage]
 * @property {Boolean} [phoneNumberRequiredEnabled=true]
 * @property {Boolean} [nationalCodeRequiredEnabled=true]
 * @property {Boolean} [phoneNumberPatternEnabled=true]
 * @property {Boolean} [solo=true] - input theme is solo
 * @property {Boolean} [outlined=false] - input theme is outlined
 * @property {Boolean} [iconEnabled=true]
 * @property {Boolean} [titleEnabled=true] - Specifies whether main title is displayed or not
 * @property {Boolean} [isButtonLarge=false] - Specifies Button is larger than usual or not
 * @property {Number} [buttonWidth=200] - button width
 * @property {Boolean} [isLoading=false] - button loading state
 */
export default {
  props: {
    buttonWidth: {
      type: Number,
      default: 200,
      required: false
    },
    iconEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    solo: {
      type: Boolean,
      default: true,
      required: false
    },
    outlined: {
      type: Boolean,
      default: false,
      required: false
    },
    isDark: {
      type: Boolean,
      default: false,
      required: false
    },
    registerButtonTitle: {
      type: String,
      default () {
        return this.$t('components.register.register')
      },
      required: false
    },
    isButtonFullWidth: {
      type: Boolean,
      default: false,
      required: false
    },
    loginLinkTitle: {
      type: String,
      default () {
        return this.$t('components.register.login')
      },
      required: false
    },
    registerButtonColor: {
      type: String,
      default: 'blue darken-2',
      required: false
    },
    checkBoxColor: {
      type: String,
      default: 'blue darken-2',
      required: false
    },
    loginRoute: {
      type: String,
      default: 'login',
      required: true
    },
    loginLinkColor: {
      type: String,
      default: 'blue darken-2',
      required: false
    },
    emailEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    emailTitle: {
      type: String,
      default () {
        return this.$t('components.register.email')
      },
      required: false
    },
    emailPlaceholder: {
      type: String,
      default () {
        return this.$t('components.register.emailPlaceholder')
      },
      required: false
    },
    emailRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.register.emailRequired')
      },
      required: false
    },
    emailPatternRegex: {
      type: String,
      default: '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$/',
      required: false
    },
    emailPatternMessage: {
      type: String,
      default () {
        return this.$t('components.register.emailValidation')
      },
      required: false
    },
    emailRequiredEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    emailPatternEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    passwordEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    passwordTitle: {
      type: String,
      default () {
        return this.$t('components.register.password')
      },
      required: false
    },
    passwordPlaceholder: {
      type: String,
      default () {
        return this.$t('components.register.passwordPlaceholder')
      },
      required: false
    },
    passwordRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.register.passwordRequired')
      },
      required: false
    },
    passwordPatternMessage: {
      type: String,
      default () {
        return this.$t('components.register.passwordValidation')
      },
      required: false
    },
    passwordPatternRegex: {
      type: String,
      default: '/^(?=.*).{8,}/',
      required: false
    },
    passwordRequiredEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    passwordPatternEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    phoneNumberEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    nationalCodeEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    nationalCodeTitle: {
      type: String,
      default () {
        return this.$t('components.register.nationalCode')
      },
      required: false
    },
    phoneNumberTitle: {
      type: String,
      default () {
        return this.$t('components.register.phoneNumber')
      },
      required: false
    },
    phoneNumberPlaceholder: {
      type: String,
      default () {
        return this.$t('components.register.phoneNumberPlaceholder')
      },
      required: false
    },
    phoneNumberRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.register.phoneNumberRequired')
      },
      required: false
    },
    nationalCodeRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.register.nationalCodeRequired')
      },
      required: false
    },
    nationalCodeRequiredEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    phoneNumberPatternMessage: {
      type: String,
      default () {
        return this.$t('components.register.phoneNumberValidation')
      },
      required: false
    },
    phoneNumberPatternRegex: {
      type: String,
      default: '/09[0-9]{9,9}/',
      required: false
    },
    phoneNumberRequiredEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    phoneNumberPatternEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    nameEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    nameTitle: {
      type: String,
      default () {
        return this.$t('components.register.name')
      },
      required: false
    },
    namePlaceholder: {
      type: String,
      default () {
        return this.$t('components.register.name')
      },
      required: false
    },
    nameRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.register.nameRequired')
      },
      required: false
    },
    namePatternRegex: {
      type: String,
      default: '/^[\u0600-\u06FF\u0020]+$/',
      required: false
    },
    namePatternMessage: {
      type: String,
      default () {
        return this.$t('components.register.nameValidation')
      },
      required: false
    },
    nameRequiredEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    lastNameEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    userNameEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    userNameTitle: {
      type: String,
      default () {
        return this.$t('components.register.userName')
      },
      required: false
    },
    userNamePlaceholder: {
      type: String,
      default () {
        return this.$t('components.register.userName')
      },
      required: false
    },
    userNameRequiredEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    lastNameTitle: {
      type: String,
      default () {
        return this.$t('components.register.lastName')
      },
      required: false
    },
    lastNamePlaceholder: {
      type: String,
      default () {
        return this.$t('components.register.lastName')
      },
      required: false
    },
    lastNameRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.register.lastNameRequired')
      },
      required: false
    },
    userNameRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.register.userNameRequired')
      },
      required: false
    },
    lastNameRequiredEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    userNamePatternRegex: {
      type: String,
      default: '/^[\u0600-\u06FF\u0020]+$/',
      required: false
    },
    lastNamePatternRegex: {
      type: String,
      default: '/^[\u0600-\u06FF\u0020]+$/',
      required: false
    },
    lastNamePatternMessage: {
      type: String,
      default () {
        return this.$t('components.register.lastNameValidation')
      },
      required: false
    },
    titleEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    isButtonLarge: {
      type: Boolean,
      default: false,
      required: false
    },
    termsAndConditionsRoute: {
      type: String,
      default: '',
      required: false
    },
    isLoading: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      valid: true,
      userInfo: {
        password: '',
        phoneNumber: '',
        nationalCode: '',
        username: '',
        lastName: '',
        email: ''
      },
      showPass: false,
      passwordRules: {
        required: value => !!value || this.passwordRequiredMessage,
        pattern: value => RegExp(this.passwordPatternRegex.substring(1, this.passwordPatternRegex.length - 1)).test(value) || this.passwordPatternMessage
      },
      phoneNumberRules: {
        required: value => !!value || this.phoneNumberRequiredMessage,
        pattern: value => RegExp(this.phoneNumberPatternRegex.substring(1, this.phoneNumberPatternRegex.length - 1)).test(value) || this.phoneNumberPatternMessage,
        counter: value => value.length === 11 || this.$t('components.register.phoneNumberCountValidation')
      },
      nationalCodeRules: {
        required: value => !!value || this.nationalCodeRequiredMessage,
        counter: value => value.length === 10 || this.$t('components.register.nationalCodeCountValidation')
      },
      nameRules: {
        required: value => !!value || this.nameRequiredMessage,
        pattern: value => RegExp(this.namePatternRegex.substring(1, this.namePatternRegex.length - 1)).test(value) || this.namePatternMessage
      },
      userNameRules: {
        required: value => !!value || this.userNameRequiredMessage
      },
      lastNameRules: {
        required: value => !!value || this.lastNameRequiredMessage,
        pattern: value => RegExp(this.lastNamePatternRegex.substring(1, this.lastNamePatternRegex.length - 1)).test(value) || this.lastNamePatternMessage
      },
      emailRules: {
        required: value => !!value || this.emailRequiredMessage,
        pattern: value => RegExp(this.emailPatternRegex.substring(1, this.emailPatternRegex.length - 1)).test(value) || this.emailPatternMessage
      }
    }
  },
  computed: {
    emailValidation () {
      if (this.emailRequiredEnabled === true && this.emailPatternEnabled === true) {
        return [this.emailRules.required, this.emailRules.pattern]
      } else if (this.emailRequiredEnabled === true) {
        return [this.emailRules.required]
      } else if (this.emailPatternEnabled === true) {
        return [this.emailRules.pattern]
      }
      return ''
    },
    passwordValidation () {
      if (this.passwordRequiredEnabled === true && this.passwordPatternEnabled === true) {
        return [this.passwordRules.required, this.passwordRules.pattern]
      } else if (this.passwordRequiredEnabled === true) {
        return [this.passwordRules.required]
      } else if (this.passwordPatternEnabled === true) {
        return [this.passwordRules.pattern]
      }
      return ''
    },
    phoneNumberValidation () {
      if (this.phoneNumberRequiredEnabled === true && this.phoneNumberPatternEnabled === true) {
        return [this.phoneNumberRules.required, this.phoneNumberRules.pattern, this.phoneNumberRules.counter]
      } else if (this.phoneNumberRequiredEnabled === true) {
        return [this.phoneNumberRules.required, this.phoneNumberRules.counter]
      } else if (this.phoneNumberPatternEnabled === true) {
        return [this.phoneNumberRules.pattern, this.phoneNumberRules.counter]
      }
      return ''
    },
    nationalCodeValidation () {
      if (this.nationalCodeRequiredEnabled === true) {
        return [this.nationalCodeRules.required, this.nationalCodeRules.counter]
      }
      return ''
    }
  },
  methods: {
    register (event) {
      this.$emit('register', this.userInfo)
    }
  }
}
</script>

<style lang="scss">
  .register-component {
    $active-color : #26a69a;
    $input-text-color : #424242;
    $placeholder-text : #a3a3a3;
    $text-color-dark : #9c9c9c;
    $input-color : #F3F7F9;
    $input-hint : #1ABE75;
    .form-title {
      font-size : 20px;
    }
    .v-ripple__animation{
      opacity: 0 !important;
    }

    .v-btn {
      letter-spacing: 0;
      &:before , &.v-btn--active {
        background-color: transparent !important;
      }
    }

    .theme--dark {
      &.v-card {
        color: $text-color-dark;
        i {
           color: $text-color-dark;
        }
      }
      .v-icon {
        color: $text-color-dark;
      }
      .form-title {
        color : white;
      }
    }
    .v-text-field .v-input__slot {
      background: $input-color !important;
    }
    .v-input input::placeholder {
      color: $placeholder-text !important;
    }
    .v-input input {
      color: $input-text-color !important;
    }
    .v-text-field--placeholder{
      font-size: 12px;
    }
    .input-placeholder-left{
      input {
        text-align: left;
      }
    }
    .v-text-field--solo {
      &.error--text {
        .v-input__slot{
          border: 2px solid !important;
        }
      }
    }
    .v-text-field .v-input__control {
      min-height: 42px !important;
    }
    .v-text-field .v-input__slot {
      border-radius: 5px !important;
    }

    .v-input--checkbox {
      .v-label {
        font-size: 12px !important;
        text-decoration : underline;
      }
    }
    .v-input--selection-controls {
      margin-top: 0 !important;
      padding-top: 0 !important;
    }
    .v-application--is-rtl .v-input--selection-controls__input {
      margin-left: 15px !important;
    }

    .v-messages {
      color: $input-hint !important;
      min-height: 18px !important;
    }

    .v-text-field__details {
      padding: 0 !important;
      .error--text {
        display: flex;
        align-items: center;
        &:before {
          content: "\F0026";
          font: normal normal normal 24px/1 "Material Design Icons";
          font-size: 18px;
          padding-left : .5rem;
        }
      }
    }
  }
</style>

<template>
  <div class="forgot-password-component">
    <!-- step 1  enter email  -->
    <v-card
      flat
      class="transparent"
      :dark="isDark">
    <v-row
      v-if="titleEnabled"
      class="form-title justify-center  pb-4"
      >
      {{$t('components.forgotPassword.title')}}
    </v-row>
    <v-form ref="form" v-model="valid" @submit.prevent="onRecoverPassword">
      <!-- email -->
      <div class="subtitle-2 input-placeholder-left pt-1">
        <v-icon v-if="solo && iconEnabled" col medium color="darken-2" class="ml-3">mdi-email</v-icon>
        <span v-if="solo">{{ emailTitle }}</span>
        <v-text-field
          v-model="email"
          autofocus
          :solo="solo"
          :outlined="outlined"
          flat
          color="primary"
          class="mt-2"
          :label="this.emailTitle"
          :placeholder="this.emailPlaceholder"
          :rules="emailValidation"
          :prepend-icon="outlined && iconEnabled ? 'mdi-email' : ''" name="email"
          type="text"
          required
        ></v-text-field>
      </div>
      <!------------>
      <v-row
        class="justify-center mx-0 my-3">
        <v-btn
          type="submit"
          :width="buttonWidth"
          :disabled="!valid"
          :block="isButtonFullWidth"
          :x-large="isButtonLarge"
          class="white--text"
          :color="recoveryLinkColor">
          {{ recoveryButtonTitle }}
        </v-btn>
      </v-row>
      <v-row
        class="justify-center mx-0"
        >
        <v-btn
          v-if="backButtonEnabled"
          :width="buttonWidth"
          :x-large="isButtonLarge"
          :to="backButtonRoute"
          :color="backLinkColor">
          {{$t('components.forgotPassword.back')}}
        </v-btn>
      </v-row>
      <!-- register link -->
      <v-row
        class="justify-center py-4 subtitle-2"
        >
        <span class="py-1 pl-1">{{ $t('components.forgotPassword.notRegister') }}</span>
        <v-btn
          text
          :color="recoveryButtonColor"
          small
          class="px-0 text-decoration-underline"
          :to="{ name: registerRoute}">
            {{$t('components.forgotPassword.register')}}
        </v-btn>
      </v-row>
    </v-form>
    </v-card>
  </div>
</template>
<script>
/**
 * @name forgotPassword component
 * @description get recovery link with email
 * @version 1.0.0
 * @event forgotpass - return email
 * @property {Boolean} [isDark=false]
 * @property {String} [recoveryButtonTitle]
 * @property {String} [isButtonFullWidth] - Expands the button to 100% of available space,
 * @property {String} [recoveryButtonColor='blue darken-2']
 * @property {String} [recoveryLinkColor='blue darken-2']
 * @property {String} [registerRoute='register']
 * @property {String} [emailTitle]
 * @property {String} [emailPlaceholder]
 * @property {String} [emailRequiredMessage]
 * @property {String} [emailPatternRegex]
 * @property {String} [emailPatternMessage]
 * @property {Boolean} [emailIsRequired=true]
 * @property {Boolean} [emailHavePattern=true]
 * @property {Boolean} [solo=true] - input theme is solo
 * @property {Boolean} [outlined=false] - input theme is outlined
 * @property {Boolean} [iconEnabled=true]
 * @property {Boolean} [titleEnabled=true] - Specifies whether main title is displayed or not
 * @property {Boolean} [backButtonEnabled=false] - Specifies whether main back button is displayed or not
 * @property {String} [backButtonRoute='/'] - Specifies back button route
 * @property {String} [backLinkColor=''] - Specifies back button color
 * @property {Boolean} [isButtonLarge=false] - Specifies Button is larger than usual or not
 * @property {Number} [buttonWidth=200] - button width

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
    recoveryButtonTitle: {
      type: String,
      default () {
        return this.$t('components.forgotPassword.passwordRecovery')
      },
      required: false
    },
    isButtonFullWidth: {
      type: Boolean,
      default: false,
      required: false
    },
    recoveryButtonColor: {
      type: String,
      default: 'blue darken-2',
      required: false
    },
    recoveryLinkColor: {
      type: String,
      default: 'blue darken-2',
      required: false
    },
    registerRoute: {
      type: String,
      default: 'register',
      required: true
    },
    emailTitle: {
      type: String,
      default () {
        return this.$t('components.forgotPassword.email')
      },
      required: false
    },
    emailPlaceholder: {
      type: String,
      default () {
        return this.$t('components.forgotPassword.emailPlaceholder')
      },
      required: false
    },
    emailRequiredMessage: {
      type: String,
      default () {
        return this.$t('components.forgotPassword.emailRequired')
      },
      required: false
    },
    emailPatternRegex: {
      type: String,
      default: '/.+@.+..+/',
      required: false
    },
    emailPatternMessage: {
      type: String,
      default () {
        return this.$t('components.forgotPassword.emailValidation')
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
    titleEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    backButtonEnabled: {
      type: Boolean,
      default: true,
      required: false
    },
    backButtonRoute: {
      type: String,
      default: '/',
      required: false
    },
    backLinkColor: {
      type: String,
      default: 'rgba(25, 118, 210, 0.2)',
      required: false
    },
    isButtonLarge: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      valid: true,
      email: '',
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
    }
  },
  methods: {
    onRecoverPassword (event) {
      this.$emit('forgotpass', {
        email: this.email
      })
    }
  }
}
</script>

<style lang="scss">
  .forgot-password-component {
    $active-color : #26a69a;
    $input-text-color : #424242;
    $placeholder-text : #a3a3a3;
    $text-color-dark : #9c9c9c;
    $error-text : #cc4b4b;
    $input-color : #F3F7F9;

    .v-text-field .v-input__slot {
      background: $input-color !important;
    }
    .v-input input::placeholder {
      color: $placeholder-text !important;
    }
    .v-input input {
      color: $input-text-color !important;
    }

    .recover-password-details{
      font-size: 14px;
      color: #f2c94c;
    }
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
    .theme--light {
      .v-text-field .v-input__slot {
        background: #F3F7F9 !important;
      }
      .v-input input {
        color: $input-text-color;
      }
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
    .v-text-field .v-input__slot {
      border-radius: 5px !important;
    }
    .v-application--is-rtl .v-input--selection-controls__input {
      margin-left: 15px !important;
    }
    .v-messages {
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

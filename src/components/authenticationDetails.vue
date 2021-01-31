<template>
  <div class="authentication-details-component">
    <v-card
      flat
      color="transparent"
      :dark="isDark">
      <v-row
        v-if="title"
        class="text-body-1 text-sm-h6 font-weight-regular pb-4"
        :class="[titleTextColor ? `${titleTextColor}--text` : '']"
        justify="center">
        <span>{{title}}</span>
      </v-row>

      <v-card
        v-if="description"
        flat
        color="transparent"
        class="d-flex amber--text text-accent-1 justify-center text-sm-body-1 text-body-2 pt-5">
        <v-icon
          v-if="descriptionIcon"
          medium
          color="amber accent-1"
          class="align-baseline">{{descriptionIcon}}</v-icon>
        <span class="pr-3">{{description}}</span>
      </v-card>

      <v-card
        v-if="details"
        flat
        color="transparent"
        class="d-flex amber--text text-accent-1 text-pre-wrap  justify-center text-sm-body-1
        text-body-2 pt-6">
        <span class="pr-1">{{details}}</span>
      </v-card>
      <!------------>
      <v-row
        v-if="buttonEnabled"
        justify="center">
        <v-btn
          type="submit"
          autofocus
          :width="buttonWidth"
          class="white--text mt-7"
          :to="{ name: buttonRoute}"
          :color="buttonColor">
          {{ buttonTitle }}
        </v-btn>
      </v-row>
    </v-card>
  </div>
</template>
<script>
/**
 * @name authentication Details
 * @description Display the success message of the registration process or change the password or...
 * @version 1.0.0
 * @property {Boolean} [isDark=false]  - component theme
 * @property {String} [title]  - message Title text
 * @property {String} [titleTextColor]  - vutify text color class to change  message Title color
 * @property {String} [description] - description text
 * @property {String} [descriptionIcon='mdi-alert'] - description Icon
 * @property {String} [details]  - details text
 * @property {String} [buttonTitle] - button text
 * @property {String} [buttonRoute='login']  - when click on button goto another page
 * @property {String} [buttonColor='teal lighten-2']  - button color
 * @property {Boolean} [buttonEnabled=true]  - button show in component
 */
export default {
  props: {
    buttonWidth: {
      type: Number,
      default: 200,
      required: false
    },
    isDark: {
      type: Boolean,
      default: false,
      required: false
    },
    title: {
      type: String,
      default: '',
      required: false
    },
    titleTextColor: {
      type: String,
      default: '',
      requierd: false
    },
    description: {
      type: String,
      default: '',
      required: false
    },
    descriptionIcon: {
      type: String,
      default: 'mdi-alert',
      required: false
    },
    details: {
      type: String,
      default: '',
      required: false
    },
    buttonTitle: {
      type: String,
      default () {
        return this.$t('pages.authenticationDetails.login')
      },
      required: false
    },
    buttonRoute: {
      type: String,
      default: 'login',
      required: true
    },
    buttonColor: {
      type: String,
      default: 'blue darken-2',
      required: false
    },
    buttonEnabled: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
<style lang="scss">
  .authentication-details-component {
    .text-pre-wrap {
      white-space : pre-wrap;
    }
  }
</style>

<route>
{
  "name": "addUsers",
  "meta": {
    "order": 4,
    "isVisible": false,
    "iconName": "mdi-arrow-left"
  }
}
</route>
<template>
  <div class="mt-5 mx-5">
    <v-card>
      <v-card-title>{{$t('pages.users.add')}}</v-card-title>
      <v-stepper
        v-model="stepper.current"
        alt-labels
        >
        <v-stepper-header>
          <template v-for="n in stepper.steps">
            <v-stepper-step
              :key="`${n}-step`"
              :step="n"
              :complete="stepper.current > n"
              >
              {{ $t('pages.stepper.step' + n) }}
            </v-stepper-step>
        <v-divider
          v-if="n !== stepper.steps"
          :key="n"
          ></v-divider>
          </template>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content
            step="1"
            >
            <v-row
              class="px-3"
              >
              <v-col
                :sm="4"
                >
                <form-item
                  v-model="user.firstName"
                  type="textbox"
                  icon="mdi-account-circle"
                  :rules="[rules.required]"
                  :label="$t('enums.firstName')"
                  :placeholder="$t('enums.placeholders.firstName')"
                  ></form-item>
              </v-col>
                <v-col
                  :sm="4"
                  >
                  <form-item
                    v-model="user.lastName"
                    type="textbox"
                    :rules="[rules.required]"
                    icon="mdi-account-circle"
                    :label="$t('enums.lastName')"
                    :placeholder="$t('enums.placeholders.lastName')"
                    ></form-item>
                </v-col>
                  <v-col
                    :sm="4"
                    >
                    <form-item
                      v-model="user.username"
                      type="textbox"
                      :rules="[rules.required]"
                      icon="mdi-account-circle"
                      :label="$t('enums.userName')"
                      :placeholder="$t('enums.placeholders.userName')"
                      ></form-item>
                  </v-col>
            </v-row>
              <v-row
                class="px-3"
                >
                <v-col
                  :sm="4"
                  >
                  <form-item
                    v-model="user.nationalCode"
                    type="textbox"
                    icon="mdi-card-account-details"
                    :rules="nationalCodeValidation"
                    :label="$t('enums.nationalCode')"
                    :placeholder="$t('enums.placeholders.nationalCode')"
                    ></form-item>
                </v-col>
                  <v-col
                    :sm="4"
                    >
                    <form-item
                      v-model="user.phoneNumber"
                      type="textbox"
                      icon="mdi-cellphone"
                      :rules="phoneNumberValidation"
                      :label="$t('enums.phoneNumber')"
                      :placeholder="$t('enums.placeholders.phoneNumber')"
                      ></form-item>
                  </v-col>
                    <v-col
                      :sm="4"
                      >
                      <form-item
                        v-model="user.password"
                        type="textbox"
                        :rules="[rules.required]"
                        icon="mdi-lock"
                        :label="$t('enums.password')"
                        :placeholder="$t('enums.placeholders.password')"
                        ></form-item>
                    </v-col>
              </v-row>
                <v-row
                  class="px-3"
                  >
                  <v-col
                    :sm="12"
                    >
                    <form-item
                      v-model="user.email"
                      type="textbox"
                      icon="mdi-email"
                      :label="$t('enums.email')"
                      :placeholder="$t('enums.placeholders.email')"
                      ></form-item>
                  </v-col>
                </v-row>
                  <v-row
                    class="px-3 text-left"
                    >
                    <v-col
                      :sm="12"
                      >
                      <v-btn
                        large
                        :loading="isLoading"
                        class="px-5 ml-1 mr-auto"
                        color="primary"
                        :disabled="!isStep1Valid"
                        @click="goStep(2)"
                        >
                        {{ $t('pages.users.addUserBtn') }}
                      </v-btn>
                    </v-col>
                  </v-row>
          </v-stepper-content>
            <v-stepper-content
              step="2"
              >
              <v-row
                class="px-3"
                >
                <v-col
                  :sm="3"
                  >
                  <form-item
                    v-model="user.gender"
                    type="select"
                    :items="genderArray"
                    :rules="[rules.required]"
                    icon="mdi-human-male-female"
                    :label="$t('enums.gender')"
                    :placeholder="$t('enums.placeholders.gender')"
                    ></form-item>
                </v-col>
                  <v-col
                    :sm="3"
                    >
                    <form-item
                      v-model="user.maritalStatus"
                      type="select"
                      :items="maritalStatusesArray"
                      :rules="[rules.required]"
                      icon="mdi-ring"
                      :label="$t('enums.maritalStatus')"
                      :placeholder="$t('enums.placeholders.maritalStatus')"
                      ></form-item>
                  </v-col>
                    <v-col
                      :sm="3"
                      >
                      <form-item
                        v-model="user.childrenCount"
                        type="select"
                        :items="childrensCountArray"
                        icon="mdi-human-male-child"
                        :label="$t('enums.childrensCount')"
                        :placeholder="$t('enums.placeholders.childrensCount')"
                        ></form-item>
                    </v-col>
                      <v-col
                        :sm="3"
                        >
                        <form-item
                          v-model="user.personnelNumber"
                          type="textbox"
                          :rules="[rules.required]"
                          icon="mdi-account-circle"
                          :label="$t('enums.personnelNumber')"
                          :placeholder="$t('enums.placeholders.personnelNumber')"
                          ></form-item>
                      </v-col>
              </v-row>
              <v-row
                  class="px-3"
                  >
                  <v-col
                    :sm="3"
                    >
                    <form-item
                      v-model="user.fatherName"
                      type="textbox"
                      :rules="[rules.required]"
                      icon="mdi-account-circle"
                      :label="$t('enums.fatherName')"
                      :placeholder="$t('enums.placeholders.fatherName')"
                      ></form-item>
                  </v-col>
                    <v-col
                      :sm="3"
                      >
                      <form-item
                        v-model="user.birthdate"
                        icon="mdi-calendar"
                        type="date"
                        :rules="[rules.required]"
                        :label="$t('enums.birthDate')"
                        :placeholder="$t('enums.placeholders.birthDate')"
                      ></form-item>
                    </v-col>
                      <v-col
                        :sm="3"
                        >
                        <form-item
                          v-model="user.birthPlace"
                          type="textbox"
                          :rules="[rules.required]"
                          icon="mdi-map-marker"
                          :label="$t('enums.birthPlace')"
                          :placeholder="$t('enums.placeholders.birthPlace')"
                          ></form-item>
                      </v-col>
                        <v-col
                          :sm="3"
                          >
                          <form-item
                            v-model="user.placeIssue"
                            type="textbox"
                            icon="mdi-map-marker"
                            :label="$t('enums.placeIssue')"
                            :placeholder="$t('enums.placeholders.placeIssue')"
                            ></form-item>
                        </v-col>
              </v-row>
              <v-row
                class="px-3"
                >
                <v-col
                  :sm="3"
                  >
                  <form-item
                    v-model="user.birthCertificateNumber"
                    type="textbox"
                    icon="mdi-card-account-details-outline"
                    :rules="[rules.required]"
                    :label="$t('enums.birthCertificateNumber')"
                    :placeholder="$t('enums.placeholders.birthCertificateNumber')"
                    ></form-item>
                </v-col>
                  <v-col
                    :sm="3"
                    >
                    <form-item
                      v-model="user.centerTopicName"
                      type="textbox"
                      icon="mdi-office-building-marker-outline"
                      :label="$t('enums.centerTopicName')"
                      :placeholder="$t('enums.placeholders.centerTopicName')"
                      ></form-item>
                  </v-col>
                    <v-col
                      :sm="3"
                      >
                      <form-item
                        v-model="user.tel"
                        type="textbox"
                        :rules="[rules.required]"
                        icon="mdi-phone"
                        :label="$t('enums.telephone')"
                        :placeholder="$t('enums.placeholders.telephone')"
                        ></form-item>
                    </v-col>
                    <v-col
                      :sm="3"
                      >
                      <form-item
                        v-model="user.employeeStatus"
                        type="select"
                        :items="employeeStatusesArray"
                        icon="mdi-account"
                        :label="$t('enums.employeeStatus')"
                        :placeholder="$t('enums.placeholders.employeeStatus')"
                        ></form-item>
                    </v-col>
              </v-row>
              <v-row
                class="px-3"
                >
                <v-col
                  :sm="3"
                  >
                  <form-item
                    v-model="user.insuranceNumber"
                    type="textbox"
                    icon="mdi-newspaper-variant-outline"
                    :label="$t('enums.insuranceNumber')"
                    :placeholder="$t('enums.placeholders.insuranceNumber')"
                    ></form-item>
                </v-col>
                  <v-col
                    :sm="3"
                    >
                    <form-item
                      v-model="user.insuranceName"
                      type="textbox"
                      icon="mdi-office-building-outline"
                      :label="$t('enums.insuranceName')"
                      :placeholder="$t('enums.placeholders.insuranceName')"
                      ></form-item>
                  </v-col>
                    <v-col
                      :sm="3"
                      >
                      <form-item
                        v-model="user.experience"
                        type="select"
                        :items="experienceArray"
                        icon="mdi-calendar-account"
                        :label="$t('enums.experience')"
                        :placeholder="$t('enums.placeholders.experience')"
                        ></form-item>
                    </v-col>
                      <v-col
                        :sm="3"
                        >
                        <form-item
                          v-model="user.underSupportPersonsCount"
                          type="select"
                          :items="underSupportPersonsCountArray"
                          icon="mdi-human-capacity-decrease"
                          :label="$t('enums.underSupportPersonsCount')"
                          :placeholder="$t('enums.placeholders.underSupportPersonsCount')"
                          ></form-item>
                      </v-col>
              </v-row>
              <v-row
                class="px-3"
                >
                <v-col
                  :sm="3"
                  >
                  <form-item
                    v-model="user.employmentDate"
                    icon="mdi-calendar"
                    type="date"
                    :label="$t('enums.employmentDate')"
                    :placeholder="$t('enums.placeholders.employmentDate')"
                  ></form-item>
                </v-col>
                <v-col
                  :sm="3"
                  >
                  <form-item
                    v-model="user.startWorkDate"
                    icon="mdi-calendar"
                    type="date"
                    :label="$t('enums.startWorkDate')"
                    :placeholder="$t('enums.placeholders.startWorkDate')"
                  ></form-item>
                </v-col>
                <v-col
                  :sm="3"
                  >
                  <form-item
                    v-model="user.endWorkDate"
                    icon="mdi-calendar"
                    type="date"
                    :label="$t('enums.endWorkDate')"
                    :placeholder="$t('enums.placeholders.endWorkDate')"
                  ></form-item>
                </v-col>
                        <v-col
                          :sm="3"
                          >
                          <form-item
                            v-model="user.lessDevelopedAreas"
                            type="select"
                            :items="lessDevelopedAreasArray"
                            icon="mdi-map-marker"
                            :label="$t('enums.lessDevelopedAreas')"
                            :placeholder="$t('enums.placeholders.lessDevelopedAreas')"
                            ></form-item>
                        </v-col>
              </v-row>
                <v-row
                  class="px-3 text-left"
                  >
                  <v-col
                    :sm="12"
                    >
                    <v-btn
                      large
                      class="px-5 ml-1"
                      color="secondary"
                      depressed
                      outlined
                      @click="goBack(1)"
                      >
                      {{ $t('enums.return') }}
                   </v-btn>
                      <v-btn
                        large
                        class="px-5 ml-1 mr-auto"
                        color="primary"
                        :loading="isLoading"
                        :disabled="!isStep2Valid"
                        @click="goStep(3)"
                        >
                        {{ $t('pages.users.completeUserBtn') }}
                      </v-btn>
                    </v-col>
                </v-row>
            </v-stepper-content>
              <v-stepper-content
                step="3"
                >
                <v-row
                  v-for="(bankAccount, index) in bankAccounts"
                  :key="index"
                  class="px-3 text-left"
                  >
                  <v-col
                    :sm="2"
                    >
                    <form-item
                      v-model="bankAccount.bankName"
                      type="textbox"
                      icon="mdi-bank"
                      :label="$t('enums.bankName')"
                      :placeholder="$t('enums.placeholders.bankName')"
                      ></form-item>
                  </v-col>
                  <v-col
                    :sm="2"
                    >
                    <form-item
                      v-model="bankAccount.bankBranch"
                      type="textbox"
                      icon="mdi-bank-outline"
                      :label="$t('enums.bankBranch')"
                      :placeholder="$t('enums.placeholders.bankBranch')"
                      ></form-item>
                  </v-col>
                  <v-col
                    :sm="2"
                    >
                    <form-item
                      v-model="bankAccount.accountNumber"
                      type="textbox"
                      icon="mdi-credit-card-outline"
                      :label="$t('enums.accountNumber')"
                      :placeholder="$t('enums.placeholders.accountNumber')"
                      ></form-item>
                  </v-col>
                  <v-col
                    :sm="3"
                    >
                    <form-item
                      v-model="bankAccount.cardNumber"
                      type="textbox"
                      icon="mdi-credit-card-outline"
                      :label="$t('enums.cardNumber')"
                      :placeholder="$t('enums.placeholders.cardNumber')"
                      ></form-item>
                  </v-col>
                  <v-col
                    :sm="3"
                    >
                    <form-item
                      v-model="bankAccount.shabaNumber"
                      type="textbox"
                      icon="mdi-credit-card-outline"
                      :label="$t('enums.shabaNumber')"
                      :placeholder="$t('enums.placeholders.shabaNumber')"
                      ></form-item>
                  </v-col>
                </v-row>
                <v-row>
                    <v-col
                      class="text-center"
                      :sm="12"
                      >
                      <v-btn
                        large
                        class="px-5 ml-1"
                        color="primary"
                        depressed
                        @click="addAnotherBankAccount"
                        >
                        {{ $t('enums.addAnotherBankAccount') }}
                      </v-btn>
                      <v-btn
                        large
                        outlined
                        class="px-1"
                        color="danger"
                        @click="removeLastBankAccount"
                        >
                        {{ $t('enums.remove') }}
                      </v-btn>
                    </v-col>
                </v-row>
                <v-row
                  class="px-3 text-left"
                  >
                  <v-col
                    :sm="12"
                    >
                    <v-btn
                      large
                      class="px-5 ml-1"
                      color="secondary"
                      depressed
                      outlined
                      @click="goBack(2)"
                      >
                      {{ $t('enums.return') }}
                    </v-btn>
                      <v-btn
                        large
                        class="px-5 ml-1 mr-auto"
                        color="primary"
                        :loading="isLoading"
                        @click="addUserInfos"
                        >
                        {{ $t('pages.users.addBankInfoBtn') }}
                      </v-btn>
                  </v-col>
                </v-row>
              </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data () {
    return {
      user: {},
      underSupportPersonsCountArray: [],
      childrensCountArray: [],
      experienceArray: [],
      devotionStatusesArray: [
        {
          text: this.$t('enums.has'),
          value: true
        },
        {
          text: this.$t('enums.hasnt'),
          value: false
        }
      ],
      lessDevelopedAreasArray: [
        {
          text: this.$t('enums.has'),
          value: true
        },
        {
          text: this.$t('enums.hasnt'),
          value: false
        }
      ],
      stepper: {
        current: 1,
        steps: 3,
        step1: {},
        step2: {},
        step3: {}
      },
      bankAccounts: [
        {
          bankName: null,
          bankBranch: null,
          accountNumber: null,
          cardNumber: null,
          shabaNumber: null
        }
      ],
      phoneNumberPatternRegex: '/09[0-9]{9,9}/',
      nationalCodePatternRegex: '/[0-9]{9,9}/',
      userId: null,
      isLoading: false,
      phoneNumberRules: {
        required: value => !!value || this.$t('components.register.phoneNumberRequired'),
        pattern: value => (value && RegExp(this.phoneNumberPatternRegex.substring(1,
          this.phoneNumberPatternRegex.length - 1)).test(value)) || this.$t('components.register.phoneNumberCountValidation'),
        counter: value => (value && value.length === 11) || this.$t('components.register.phoneNumberCountValidation')
      },
      nationalCodeRules: {
        required: value => !!value || this.$t('components.register.nationalCodeRequired'),
        pattern: value => (value && RegExp(this.nationalCodePatternRegex.substring(1,
          this.nationalCodePatternRegex.length - 1)).test(value)) || this.$t('components.register.nationalCodeCountValidation'),
        counter: value => (value && value.length === 10) || this.$t('components.register.nationalCodeCountValidation')
      },
      rules: {
        required: value => !!value || 'این فیلد اجباری است'
      },
      isRepeated: false
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters({
      genderArray: 'enums/genderArray',
      maritalStatusesArray: 'enums/maritalStatusesArray',
      employeeStatusesArray: 'enums/employeeStatusesArray'
    }),
    phoneNumberValidation () {
      return [this.phoneNumberRules.required, this.phoneNumberRules.pattern, this.phoneNumberRules.counter]
    },
    nationalCodeValidation () {
      return [this.nationalCodeRules.required, this.nationalCodeRules.pattern, this.nationalCodeRules.counter]
    },
    isStep1Valid () {
      return ['firstName', 'lastName', 'username', 'nationalCode', 'phoneNumber',
        'password'].filter(key => this.user[key] === null || this.user[key] === undefined || this.user[key] === '').length === 0
    },
    isStep2Valid () {
      return ['personnelNumber', 'gender', 'maritalStatus', 'fatherName', 'birthdate',
        'birthPlace', 'birthCertificateNumber', 'tel'].filter(key => this.user[key] === null ||
         this.user[key] === undefined || this.user[key] === '').length === 0
    }
  },
  created () {
    this.childrensCountArray = Array.from({ length: 30 }, (_, i) => ++i)
    this.experienceArray = Array.from({ length: 30 }, (_, i) => ++i)
    this.underSupportPersonsCountArray = Array.from({ length: 30 }, (_, i) => ++i)
  },
  methods: {
    ...mapActions({
      addUser: 'users/addUser',
      register: 'users/register',
      updateByUserId: 'users/updateByUserId',
      addBankAccountByUserId: 'bankAccounts/addBankAccountByUserId',
      userNameExist: 'users/userNameExist',
      mobileExist: 'users/mobileExist',
      emailExist: 'users/emailExist',
      showToast: 'snackbar/showToastMessage'
    }),
    goStep (n) {
      this.isLoading = true
      if (this.stepper.current === 1) {
        if (Object.keys(this.user).length !== 0) {
          this.userNameExist({ username: this.user.username }).then(usernameResponse => {
            if (usernameResponse.data) {
              const errorMessage = this.$t('pages.users.userNameExist')
              this.showToast({ content: errorMessage, color: 'error' })
              this.isLoading = false
            } else {
              if (this.user.email) {
                this.emailExist({ email: this.user.email }).then(emailResponse => {
                  if (emailResponse.data) {
                    this.isRepeated = true
                    const errorMessage = this.$t('pages.users.emailExist')
                    this.showToast({ content: errorMessage, color: 'error' })
                    this.isLoading = false
                  } else {
                    this.isRepeated = false
                  }
                })
              }
              this.mobileExist({ mobile: this.user.phoneNumber }).then(mobileResponse => {
                if (mobileResponse.data) {
                  const errorMessage = this.$t('pages.users.mobileExist')
                  this.showToast({ content: errorMessage, color: 'error' })
                  this.isLoading = false
                } else if (!this.isRepeated) {
                  this.isLoading = false
                  this.stepper.current = n
                }
              })
            }
          })
        } else {
          const errorMessage = this.$t('toasts.completeFields')
          this.showToast({ content: errorMessage, color: 'error' })
          this.isLoading = false
        }
      } else if (this.stepper.current === 2) {
        if (this.user.experience) this.user.experience = Number(this.user.experience)
        this.isLoading = false
        this.stepper.current = n
      }
    },
    goBack (n) {
      this.stepper.current = n
    },
    addAnotherBankAccount () {
      this.bankAccounts.push({
        bankName: null,
        bankBranch: null,
        accountNumber: null,
        cardNumber: null,
        shabaNumber: null
      })
    },
    removeLastBankAccount () {
      this.bankAccounts.pop()
    },
    addBankAccounts () {
      if (this.bankAccounts.length !== 0) {
        this.bankAccounts.forEach(bankAccount => {
          const payload = bankAccount
          payload.userid = this.userId
          this.addBankAccountByUserId(payload).then(response => {
            const successMessage = this.$t('pages.users.userCompletedSuccessfully')
            this.showToast({ content: successMessage, color: 'success' })
          })
        })
        this.isLoading = false
        this.$router.push({ name: 'users' })
      } else {
        this.isLoading = false
        this.$router.push({ name: 'users' })
      }
    },
    addUserInfos () {
      const payload = this.user
      this.isLoading = true
      this.register(payload)
        .then(response => {
          this.userId = response.data.id
          this.user.userid = this.userId
          payload.userid = this.userId
          this.updateByUserId(payload).then(userResponse => {
            this.addBankAccounts()
          })
        })
    }
  }
}
</script>
<style lang="scss">
  .v-input__control{
    flex-direction: row;
  }
</style>

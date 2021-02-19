<route>
{
  "name": "editUsers",
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
      <v-card-title>{{$t('pages.users.edit')}}</v-card-title>
      <v-stepper
        v-model="stepper.current"
        alt-labels
        >
        <v-stepper-header>
          <template v-for="n in stepper.steps">
            <v-stepper-step
              :key="`${n}-step`"
              :step="n"
              :rules="[() => n !== 2 ? true : stepper.current === n ? stepper.step2.isValid : true]"
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
                    :rules="nationalCodeValidation"
                    icon="mdi-account-circle"
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
                      icon="mdi-account-circle"
                      :rules="phoneNumberValidation"
                      :label="$t('enums.phoneNumber')"
                      :placeholder="$t('enums.placeholders.phoneNumber')"
                      ></form-item>
                  </v-col>
                  <v-col
                    :sm="4"
                    >
                    <form-item
                      v-model="user.email"
                      type="textbox"
                      icon="mdi-account-circle"
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
                        class="px-5 ml-1 mr-auto"
                        color="primary"
                        :loading="isLoading"
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
                    icon="mdi-account-circle"
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
                      icon="mdi-account-circle"
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
                        icon="mdi-account-circle"
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
                    :rules="[rules.required]"
                        type="date"
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
                          icon="mdi-account-circle"
                    :rules="[rules.required]"
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
                            icon="mdi-account-circle"
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
                    icon="mdi-account-circle"
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
                      icon="mdi-account-circle"
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
                        icon="mdi-account-circle"
                    :rules="[rules.required]"
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
                        icon="mdi-account-circle"
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
                    icon="mdi-account-circle"
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
                      icon="mdi-account-circle"
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
                        icon="mdi-account-circle"
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
                          icon="mdi-account-circle"
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
                            icon="mdi-account-circle"
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
                    :sm="4"
                    >
                    <form-item
                      v-model="bankAccount.bankName"
                      type="textbox"
                      icon="mdi-account-circle"
                      :label="$t('enums.bankName')"
                      :placeholder="$t('enums.placeholders.bankName')"
                      ></form-item>
                  </v-col>
                  <v-col
                    :sm="4"
                    >
                    <form-item
                      v-model="bankAccount.bankBranch"
                      type="textbox"
                      icon="mdi-account-circle"
                      :label="$t('enums.bankBranch')"
                      :placeholder="$t('enums.placeholders.bankBranch')"
                      ></form-item>
                  </v-col>
                  <v-col
                    :sm="4"
                    >
                    <form-item
                      v-model="bankAccount.accountNumber"
                      type="textbox"
                      icon="mdi-account-circle"
                      :label="$t('enums.accountNumber')"
                      :placeholder="$t('enums.placeholders.accountNumber')"
                      ></form-item>
                  </v-col>
                  <v-col
                    :sm="4"
                    >
                    <form-item
                      v-model="bankAccount.cardNumber"
                      type="textbox"
                      icon="mdi-account-circle"
                      :label="$t('enums.cardNumber')"
                      :placeholder="$t('enums.placeholders.cardNumber')"
                      ></form-item>
                  </v-col>
                  <v-col
                    :sm="4"
                    >
                    <form-item
                      v-model="bankAccount.shabaNumber"
                      type="textbox"
                      icon="mdi-account-circle"
                      :label="$t('enums.shabaNumber')"
                      :placeholder="$t('enums.placeholders.shabaNumber')"
                      ></form-item>
                  </v-col>
                    <v-col
                      class="pt-5 d-flex flex-column justify-center align-center text-right"
                      :sm="1"
                      >
                      <v-btn
                        v-if="bankAccount.id"
                        small
                        outlined
                        class="mt-5"
                        color="primary"
                        @click="editBankAccount(bankAccount)"
                      >
                      {{ $t('enums.tableActions.edit') }}
                      </v-btn>
                      <v-btn
                        v-else
                        small
                        outlined
                        class="mt-5"
                        color="success"
                        @click="addBankAccount(bankAccount)"
                      >
                      {{ $t('enums.tableActions.add') }}
                      </v-btn>
                      <v-btn
                        small
                        outlined
                        class="mt-1 px-5"
                        color="red"
                        @click="remove(bankAccount, index)"
                      >
                      {{ $t('enums.tableActions.delete') }}
                      </v-btn>
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
                        :loading="isLoading"
                        class="px-5 ml-1 mr-auto"
                        color="primary"
                        @click="finalEdit"
                        >
                        {{ $t('pages.users.editBankInfoBtn') }}
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
        step2: {},
        step3: {}
      },
      bankAccounts: [],
      newBankAccounts: [],
      userId: this.$route.query.id,
      phoneNumberRules: {
        required: value => !!value || this.$t('components.register.phoneNumberRequired'),
        pattern: value => RegExp(this.phoneNumberPatternRegex.substring(1, this.phoneNumberPatternRegex.length - 1)).test(value) || this.phoneNumberPatternMessage,
        counter: value => value.length === 11 || this.$t('components.register.phoneNumberCountValidation')
      },
      nationalCodeRules: {
        required: value => !!value || this.$t('components.register.nationalCodeRequired'),
        counter: value => value.length === 10 || this.$t('components.register.nationalCodeCountValidation')
      },
      rules: {
        required: value => !!value || 'این فیلد اجباری است'
      }
    }
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
      return [this.nationalCodeRules.required, this.nationalCodeRules.counter]
    },
    isStep1Valid () {
      return Object.keys(this.user).filter(key => this.user[key] === null ||
         this.user[key] === undefined || this.user[key] === '').length === 0
    },
    isStep2Valid () {
      return this.user.gender !== null && this.user.maritalStatus !== null &&
        this.user.fatherName !== null && this.user.birthdate !== null &&
        this.user.birthPlace !== null && this.user.birthCertificateNumber !== null &&
        this.user.tel !== null
    }
  },
  created () {
    this.isLoading = true
    this.childrensCountArray = Array.from({ length: 30 }, (_, i) => ++i)
    this.experienceArray = Array.from({ length: 30 }, (_, i) => ++i)
    this.underSupportPersonsCountArray = Array.from({ length: 30 }, (_, i) => ++i)
    const payload = {
      userid: this.userId
    }
    this.getUserById(payload)
      .then(response => {
        this.user = response.data
        this.getBankAccounts()
        this.isLoading = false
      })
  },
  methods: {
    ...mapActions({
      getUserById: 'users/getUserByUserId',
      updateByUserId: 'users/updateByUserId',
      updateBankAccount: 'bankAccounts/updateBankAccount',
      removeBankAccount: 'bankAccounts/removeBankAccount',
      getBankAccountByUserId: 'bankAccounts/getBankAccountByUserId',
      addBankAccountByUserId: 'bankAccounts/addBankAccountByUserId',
      userNameExist: 'users/userNameExist',
      mobileExist: 'users/mobileExist',
      emailExist: 'users/emailExist',
      showToast: 'snackbar/showToastMessage'
    }),
    goStep (n) {
      if (this.stepper.current === 2) {
        this.user.userid = this.userId
        this.user.experience = Number(this.user.experience)
        this.updateByUserId(this.user).then(response => {
          const successMessage = this.$t('pages.users.userCompletedSuccessfully')
          this.showToast({ content: successMessage, color: 'success' })
        })
      }
      this.stepper.current = n
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
    remove (bankAccount, index) {
      if (bankAccount.id !== null && bankAccount.id !== undefined) {
        this.isLoading = true
        const payload = {
          id: bankAccount.id
        }
        this.removeBankAccount(payload).then(response => {
          const successMessage = this.$t('toasts.bankAccountDeletedSuccessfully')
          this.showToast({ content: successMessage, color: 'success' })
          this.isLoading = false
          this.bankAccounts.splice(index, 1)
        })
      } else {
        this.bankAccounts.splice(index, 1)
      }
    },
    editBankAccount (bankAccount) {
      this.isLoading = true
      this.updateBankAccount(bankAccount).then(response => {
        const successMessage = this.$t('toasts.bankInfoEditedSuccessfully')
        this.showToast({ content: successMessage, color: 'success' })
        this.isLoading = false
      })
    },
    addBankAccount (bankAccount) {
      this.isLoading = true
      const payload = bankAccount
      payload.userid = this.userId
      this.addBankAccountByUserId(payload).then(response => {
        const successMessage = this.$t('toasts.bankInfoAddedSuccessfully')
        this.showToast({ content: successMessage, color: 'success' })
        this.isLoading = false
      })
    },
    getBankAccounts () {
      this.isLoading = true
      this.getBankAccountByUserId({ userid: this.userId }).then(res => {
        this.bankAccounts = res.data
        this.isLoading = false
      })
    },
    finalEdit () {
      this.$router.push({ name: 'users' })
    }
  }
}
</script>
<style lang="scss" scoped>
  .v-input__control{
    flex-direction: row;
  }
</style>

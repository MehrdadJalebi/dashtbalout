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
                        icon="mdi-account-circle"
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
                      icon="mdi-account-circle"
                      :label="$t('enums.maritalStatus')"
                      :placeholder="$t('enums.placeholders.maritalStatus')"
                      ></form-item>
                  </v-col>
                    <v-col
                      :sm="3"
                      >
                      <form-item
                        v-model="user.childrensCount"
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
                      icon="mdi-account-circle"
                      :label="$t('enums.fatherName')"
                      :placeholder="$t('enums.placeholders.fatherName')"
                      ></form-item>
                  </v-col>
                    <v-col
                      :sm="3"
                      >
                      <form-item
                        v-model="user.birthDate"
                        type="textbox"
                        icon="mdi-account-circle"
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
                        v-model="user.telephone"
                        type="textbox"
                        icon="mdi-account-circle"
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
                        type="textbox"
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
                    type="textbox"
                    icon="mdi-account-circle"
                    :label="$t('enums.employmentDate')"
                    :placeholder="$t('enums.placeholders.employmentDate')"
                    ></form-item>
                </v-col>
                <v-col
                  :sm="3"
                  >
                  <form-item
                    v-model="user.startWorkDate"
                    type="textbox"
                    icon="mdi-account-circle"
                    :label="$t('enums.startWorkDate')"
                    :placeholder="$t('enums.placeholders.startWorkDate')"
                    ></form-item>
                </v-col>
                <v-col
                  :sm="3"
                  >
                  <form-item
                    v-model="user.endWorkDate"
                    type="textbox"
                    icon="mdi-account-circle"
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
                    :sm="5"
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
                    :sm="6"
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
                      class="d-flex align-center"
                      :sm="1"
                      >
                      <v-icon
                        class="mt-5"
                        color="red"
                        @click="removeLastBankAccount"
                      >
                        mdi-delete
                      </v-icon>
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
                        class="px-5 ml-1 mr-auto"
                        color="primary"
                        @click="editBankAccounts"
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
      bankAccounts: [
        {
          bankName: null,
          bankBranch: null,
          accountNumber: null,
          cardNumber: null,
          shabaNumber: null
        }
      ],
      userId: this.$route.query.id
    }
  },
  computed: {
    ...mapGetters({
      userRoleArray: 'enums/userRoleArray',
      genderArray: 'enums/genderArray',
      maritalStatusesArray: 'enums/maritalStatusesArray',
      employeeStatusesArray: 'enums/employeeStatusesArray'
    })
  },
  created () {
    this.childrensCountArray = Array.from({ length: 30 }, (_, i) => ++i)
    this.underSupportPersonsCountArray = Array.from({ length: 30 }, (_, i) => ++i)
    const payload = {
      userid: this.userId
    }
    this.getUserById(payload)
      .then(response => {
        this.user = response.data
        const bankPayload = {
          userid: this.userId
        }
        this.getBankAccountByUserId(bankPayload).then(res => {
          console.log('eeeee', res)
          this.bankAccounts = res.data
        })
      })
  },
  methods: {
    ...mapActions({
      getUserById: 'users/getUserByUserId',
      updateByUserId: 'users/updateByUserId',
      addBankAccount: 'bankAccounts/addBankAccountByUserId',
      getBankAccountByUserId: 'bankAccounts/getBankAccountByUserId',
      userNameExist: 'users/userNameExist',
      mobileExist: 'users/mobileExist',
      emailExist: 'users/emailExist',
      showToast: 'snackbar/showToastMessage'
    }),
    goStep (n) {
      if (this.stepper.current === 2) {
        console.log(this.user)
        this.user.userid = this.userId
        this.updateByUserId(this.user).then(response => {
          const successMessage = this.$t('pages.users.userCompletedSuccessfully')
          this.showToast({ content: successMessage, color: 'success' })
          console.log(response)
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
    removeLastBankAccount () {
      const id = this.bankAccounts[this.bankAccounts.length - 1].id
      console.log(id)
      // this.bankAccounts.pop()
    },
    editBankAccounts () {
      this.bankAccounts.forEach(bankAccount => {
        const payload = bankAccount
        payload.id = this.userId
        this.addBankAccount(payload).then(response => {
          const successMessage = this.$t('pages.users.bankInfoEditedSuccessfully')
          this.showToast({ content: successMessage, color: 'success' })
          console.log(response)
        })
      })
      this.$router.push({ name: 'users' })
    },
    editUser () {
      // fatherName
      // birthdate
      // birthPlace
      // placeIssue ?
      // birthCertificateNumber ?
      // centerTopicName ?
      // tel ? sabet?
      // startWorkDate
      // endWorkDate
      // experience
      // employmentDate

    }
  }
}
</script>

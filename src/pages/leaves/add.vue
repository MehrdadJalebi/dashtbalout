<route>
{
  "name": "addLeaves",
  "meta": {
    "order": 4,
    "isVisible": false,
    "iconName": "mdi-arrow-left",
    "roles": ["User", "Admin", "SuperUser"]
  }
}
</route>
<template>
  <div class="mt-5 mx-5">
      <v-card>
        <v-card-title>{{$t('pages.leaves.add')}}</v-card-title>
        <v-card
          outlined
          color="orange"
          class="border-box mx-3 mb-3"
          >
          <v-card
            flat
            class="d-flex">
            <v-layout
              justify-right
              align-center
              class="pa-2"
              >
              <div>
                <div class="alert-circle">
                  <v-icon class="orange--text text-h2">mdi-alert</v-icon>
                </div>
              </div>
              <div>
                <v-card-text
                  class="orange--text"
                  v-html="$t('pages.leaves.noticeText')"
                  >
                </v-card-text>
              </div>
            </v-layout>
          </v-card>
        </v-card>
        <v-row
          class="px-3"
          >
          <v-col
            :sm="8"
            >
            <form-item
              v-model="leave.title"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.leaveTitle')"
              :placeholder="$t('enums.placeholders.leaveTitle')"
              ></form-item>
          </v-col>
          <v-col
            :sm="4"
            >
            <form-item
              v-model="leave.leaveNumber"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.leaveRegisterationNumber')"
              :placeholder="$t('enums.placeholders.leaveRegisterationNumber')"
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
              v-model="leave.counterParty"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.counterParty')"
              :placeholder="$t('enums.placeholders.counterParty')"
              ></form-item>
          </v-col>
          <v-col
            :sm="3"
            >
            <form-item
              v-model="leave.rowOfAgreement"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.rowOfAgreement')"
              :placeholder="$t('enums.placeholders.rowOfAgreement')"
              ></form-item>
          </v-col>
          <v-col
            :sm="2"
            >
            <form-item
              v-model="leave.workshopCode"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.workshopCode')"
              :placeholder="$t('enums.placeholders.workshopCode')"
              ></form-item>
          </v-col>
          <v-col
            :sm="3"
            >
            <form-item
              v-model="leave.payrollType"
              type="select"
              :items="payrollTypesArray"
              icon="mdi-account-circle"
              :label="$t('enums.payrollsType')"
              :placeholder="$t('enums.placeholders.payrollsType')"
              ></form-item>
          </v-col>
        </v-row>
        <v-row
        class="px-3"
          >
          <v-col
            :sm="5"
            >
            <form-item
              v-model="leave.monthlyWorkTimeType"
              type="select"
              :items="monthlyWorkTimeTypesArray"
              icon="mdi-account-circle"
              :label="$t('enums.monthlyWorkTimeType')"
              :placeholder="$t('enums.placeholders.monthlyWorkTimeType')"
              ></form-item>
          </v-col>
          <v-col
            :sm="7"
            >
            <form-item
              v-model="leave.monthlyWorkAmount"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.monthlyWorkAmount')"
              :placeholder="$t('enums.placeholders.monthlyWorkAmount')"
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
              v-model="leave.workshopPlace"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.workshopPlace')"
              :placeholder="$t('enums.placeholders.workshopPlace')"
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
              v-model="leave.description"
              type="textarea"
              rows="2"
              icon="mdi-account-circle"
              :label="$t('enums.details')"
              :placeholder="$t('enums.placeholders.details')"
              ></form-item>
          </v-col>
        </v-row>
          <v-card-actions>
            <v-btn
              large
              class="px-5 ml-1 mt-2 mr-auto"
              color="success"
              @click="add"
              >
              {{ $t('pages.leaves.addLeaveBtn') }}
            </v-btn>
          </v-card-actions>
      </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data () {
    return {
      leave: {}
    }
  },
  computed: {
    ...mapGetters({
      monthlyWorkTimeTypesArray: 'enums/monthlyWorkTimeTypesArray',
      payrollTypesArray: 'enums/payrollTypesArray'
    })
  },
  methods: {
    ...mapActions({
      addLeave: 'leaves/addLeave',
      showToast: 'snackbar/showToastMessage'
    }),
    add () {
      this.leave.monthlyWorkAmount = parseInt(this.leave.monthlyWorkAmount)
      console.log(this.leave)
      this.addLeave(this.leave)
        .then(() => {
          const successMessage = this.$t('pages.leaves.addedSuccessfully')
          this.showToast({ content: successMessage, color: 'success' })
          this.$router.push({ name: 'leaves' })
        })
    }
  }
}
</script>

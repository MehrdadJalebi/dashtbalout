<route>
{
  "name": "editContracts",
  "meta": {
    "order": 4,
    "isVisible": false,
    "iconName": "mdi-arrow-left",
    "roles": ["admin"]
  }
}
</route>
<template>
  <div class="mt-5 mx-5">
      <v-card>
        <v-card-title>{{$t('pages.contracts.edit')}}</v-card-title>
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
                  v-html="$t('pages.contracts.noticeText')"
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
              v-model="contract.title"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.contractTitle')"
              :placeholder="$t('enums.placeholders.contractTitle')"
              ></form-item>
          </v-col>
          <v-col
            :sm="4"
            >
            <form-item
              v-model="contract.contractNumber"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.contractRegisterationNumber')"
              :placeholder="$t('enums.placeholders.contractRegisterationNumber')"
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
              v-model="contract.counterParty"
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
              v-model="contract.rowOfAgreement"
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
              v-model="contract.workshopCode"
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
              v-model="contract.payrollType"
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
              v-model="contract.monthlyWorkTimeType"
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
              v-model="contract.monthlyWorkAmount"
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
              v-model="contract.workshopPlace"
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
              v-model="contract.description"
              type="textarea"
              rows="3"
              icon="mdi-account-circle"
              :label="$t('enums.details')"
              :placeholder="$t('enums.placeholders.details')"
              ></form-item>
          </v-col>
        </v-row>
          <v-card-actions>
            <v-btn
              large
              class="px-5 ml-1 mr-auto"
              color="success"
              @click="editContract"
              >
              {{ $t('pages.contracts.addContractBtn') }}
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
      contract: {}
    }
  },
  computed: {
    ...mapGetters({
      monthlyWorkTimeTypesArray: 'enums/monthlyWorkTimeTypesArray',
      payrollTypesArray: 'enums/payrollTypesArray'
    })
  },
  created () {
    const payload = {
      id: this.$route.query.id
    }
    this.getContractById(payload)
      .then(response => {
        this.contract = response.data
      })
  },
  methods: {
    ...mapActions({
      getContractById: 'contracts/getContractById',
      updateContract: 'contracts/updateContract',
      showToast: 'snackbar/showToastMessage'
    }),
    editContract () {
      this.updateContract(this.contract)
        .then(() => {
          const successMessage = this.$t('pages.contracts.editedSuccessfully')
          this.showToast({ content: successMessage, color: 'success' })
          this.$router.push({ name: 'contracts' })
        })
    }
  }
}
</script>

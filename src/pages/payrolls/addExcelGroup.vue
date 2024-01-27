<route>
{
  "name": "addExcelGroupPayrolls",
  "meta": {
    "order": 4,
    "isVisible": false,
    "iconName": "mdi-arrow-left"
  }
}
</route>
<template>
  <div>
    <v-card class="mt-5">
      <v-card-title>
        {{ $t('pages.payrolls.addExcelGroup') }}
      </v-card-title>
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
                  v-html="$t('pages.payrolls.noticeText3')"
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
            :sm="4"
            >
            <form-item
              v-model="payroll.contractId"
              type="autocomplete"
              :items="contractsList"
              :rules="[rules.required]"
              icon="mdi-account-circle"
              :label="$t('enums.contractTitle')"
              :placeholder="$t('enums.placeholders.contractTitle')"
              ></form-item>
          </v-col>
          <v-col
            :sm="4"
            >
            <form-item
              v-model="payroll.month"
              type="select"
              :items="monthsArray"
                    :rules="[rules.required]"
              icon="mdi-account-circle"
              :label="$t('enums.month')"
              :placeholder="$t('enums.placeholders.month')"
              ></form-item>
          </v-col>
          <v-col
            :sm="4"
            >
            <form-item
              v-model="payroll.year"
              type="select"
              :items="yearsArray"
                    :rules="[rules.required]"
              icon="mdi-account-circle"
              :label="$t('enums.year')"
              :placeholder="$t('enums.placeholders.year')"
              ></form-item>
          </v-col>
        </v-row>
        <v-row
          class="px-3"
          >
          <v-col
            :sm="6"
            >
            <form-item
              v-model="file"
              class="file-upload mb-3"
              type="file"
              :rules="[rules.required]"
              icon="mdi-folder-zip"
              accept=".xlsx"
              :label="$t('enums.payrollFile')"
              :placeholder="$t('enums.placeholders.chooseFile')"
              ></form-item>
          </v-col>
        </v-row>
          <v-card-actions>
            <v-btn
              large
              :loading="isLoading"
              class="px-5 ml-1 mr-auto"
              color="success"
              @click="addNewPayroll"
              >
              {{ $t('pages.payrolls.addPayrollBtn') }}
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
      payroll: {
        year: null,
        month: null,
        contractId: null,
        file: null
      },
      yearsArray: [1395, 1396, 1397, 1398, 1399, 1400, 1401, 1402, 1403, 1403, 1404, 1405, 1406,
        1407, 1408, 1409],
      userList: [],
      contractsList: [],
      isLoading: false,
      file: null,
      rules: {
        required: value => !!value || 'این فیلد اجباری است'
      }
    }
  },
  computed: {
    ...mapGetters({
      monthsArray: 'enums/monthsArray'
    }),
    fileRules () {
      return [
        v => (v && v.length > 0) || 'Required'
      ]
    }
  },
  created () {
    const payload = {
      pageIndex: 1,
      pageSize: 100000
    }
    this.getAllContracts(payload)
      .then(response => {
        this.contractsList = response.data.map(contract => {
          return { text: contract.title, value: contract.id }
        })
        this.isLoading = false
      })
  },
  methods: {
    ...mapActions({
      getAllContracts: 'contracts/getAllContracts',
      uploadXlsx: 'cdn/uploadXlsx',
      showToast: 'snackbar/showToastMessage'
    }),
    addNewPayroll () {
      this.isLoading = true
      const payload = {
        year: this.payroll.year,
        month: this.payroll.month,
        contractId: this.payroll.contractId,
        file: this.file
      }
      if (this.payroll.year && this.payroll.month && this.payroll.contractId) {
        this.uploadXlsx(payload)
          .then(response => {
            this.isLoading = false
            const successMessage = this.$t('toasts.fileUploadedSuccessfully')
            this.showToast({ content: successMessage, color: 'success' })
          })
          .catch(err => {
            console.error(err)
            this.isLoading = false
            const errorMessage = this.$t('toasts.groupExcelPayrollError')
            this.showToast({ content: errorMessage, color: 'error' })
          })
      } else {
        this.isLoading = false
        const errorMessage = this.$t('toasts.fillFields')
        this.showToast({ content: errorMessage, color: 'error' })
      }
    }
  }
}
</script>
<style lang="scss">
.v-input__control{
  flex-direction: row;
}
</style>

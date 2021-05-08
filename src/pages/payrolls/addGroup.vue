<route>
{
  "name": "addGroupPayrolls",
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
        {{ $t('pages.payrolls.addGroup') }}
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
                  v-html="$t('pages.payrolls.noticeText')"
                  >
                </v-card-text>
                <v-card-text
                  class="orange--text"
                  v-html="$t('pages.payrolls.noticeText2')"
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
              type="select"
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
              multiple
                    :rules="[rules.required]"
              icon="mdi-folder-zip"
              accept=".zip,.rar,.7zip"
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
        fileIds: [],
        year: null,
        month: null,
        contractId: null
      },
      yearsArray: [1395, 1396, 1397, 1398, 1399, 1400],
      userList: [],
      contractsList: [],
      isLoading: false,
      file: [],
      fileList: [],
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
      addGroupPayroll: 'payrolls/addGroupPayroll',
      uploadZip: 'cdn/uploadZip',
      checkGroupPayrollExist: 'payrolls/checkGroupPayrollExist',
      showToast: 'snackbar/showToastMessage'
    }),
    addNewPayroll () {
      this.isLoading = true
      const payload = {
        year: this.payroll.year,
        month: this.payroll.month,
        contractId: this.payroll.contractId
      }
      if (this.payroll.year && this.payroll.month && this.payroll.contractId) {
        this.checkGroupPayrollExist(payload).then(response => {
          if (response.data === false) {
            this.uploadZip(this.file).then(response => {
              response.data.items.map(item => {
                this.payroll.fileIds.push(item.fileId)
              })
              if (this.payroll.fileIds.length !== 0) {
                this.addGroupPayroll(this.payroll).then(response => {
                  this.isLoading = false
                  const successMessage = this.$t('pages.payrolls.addedSuccessfully')
                  this.showToast({ content: successMessage, color: 'success' })
                  this.$router.push({ name: 'payrolls' })
                }, error => {
                  this.showToast({ content: error, color: 'error' })
                  this.isLoading = false
                })
              } else {
                this.isLoading = false
                const errorMessage = this.$t('toasts.fillFields')
                this.showToast({ content: errorMessage, color: 'error' })
              }
            })
          } else {
            this.isLoading = false
            const errorMessage = this.$t('toasts.groupPayrollAlreadyExists')
            this.showToast({ content: errorMessage, color: 'error' })
          }
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

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
              icon="mdi-file-upload"
              accept="image/*"
              :label="$t('enums.payrollFile')"
              :placeholder="$t('enums.placeholders.chooseFile')"
              @input="uploadPayroll"
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
        fileIds: []
      },
      yearsArray: [1395, 1396, 1397, 1398, 1399, 1400],
      userList: [],
      contractsList: [],
      isLoading: false,
      file: [],
      fileList: []
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
      upload: 'cdn/upload',
      showToast: 'snackbar/showToastMessage'
    }),
    addNewPayroll () {
      console.log('this.payroll is: ', this.payroll)
      this.addGroupPayroll(this.payroll).then(response => {
        console.log('payroll res is: ', response)
        const successMessage = this.$t('pages.payrolls.addedSuccessfully')
        this.showToast({ content: successMessage, color: 'success' })
        this.$router.push({ name: 'payrolls' })
      })
    },
    uploadPayroll () {
      this.isLoading = true
      this.upload(this.file).then(response => {
        console.log('response is: ', response)
        response.data.items.map(item => {
          this.payroll.fileIds.push(item.fileId)
          this.isLoading = false
        })
      })
    }
  }
}
</script>

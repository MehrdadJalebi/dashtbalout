<route>
{
  "name": "addPayrolls",
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
        {{ $t('pages.payrolls.add') }}
      </v-card-title>
        <v-row
          class="px-3"
          >
          <v-col
            :sm="4"
            >
            <form-item
              v-model="payroll.userId"
              type="select"
              :items="userList"
              icon="mdi-account-circle"
                    :rules="[rules.required]"
              :label="$t('enums.userList')"
              :placeholder="$t('enums.placeholders.userList')"
              ></form-item>
          </v-col>
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
            :sm="2"
            >
            <form-item
              v-model="payroll.month"
              type="select"
              :items="monthsArray"
              icon="mdi-account-circle"
                    :rules="[rules.required]"
              :label="$t('enums.month')"
              :placeholder="$t('enums.placeholders.month')"
              ></form-item>
          </v-col>
          <v-col
            :sm="2"
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
              icon="mdi-file-upload"
              accept="image/*"
              :label="$t('enums.payrollFile')"
              :placeholder="$t('enums.placeholders.chooseFile')"
              ></form-item>
          </v-col>
        </v-row>
          <v-card-actions>
            <v-btn
              :loading="isLoading"
              large
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
        fileId: []
      },
      yearsArray: [1395, 1396, 1397, 1398, 1399, 1400],
      userList: [],
      contractsList: [],
      file: null,
      fileList: [],
      rules: {
        required: value => !!value || 'این فیلد اجباری است'
      },
      isLoading: false
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
    this.getAllUsers(payload)
      .then(response => {
        this.isLoading = false
        this.userList = response.data.map(user => {
          return { text: user.fullName, value: user.id }
        })
      })
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
      getAllUsers: 'users/getAllUsers',
      getAllContracts: 'contracts/getAllContracts',
      addPayroll: 'payrolls/addPayroll',
      upload: 'cdn/upload',
      showToast: 'snackbar/showToastMessage'
    }),
    addNewPayroll () {
      this.isLoading = true
      this.fileList.push(this.file)
      this.upload(this.fileList).then(response => {
        this.payroll.fileId = response.data.items[response.data.items.length - 1].fileId
        if (this.payroll.fileId.length !== 0 && this.payroll.userId !== null && this.payroll.contractId !== null &&
          this.payroll.year !== null && this.payroll.month !== null) {
          this.addPayroll(this.payroll).then(response => {
            const successMessage = this.$t('pages.payrolls.addedSuccessfully')
            this.showToast({ content: successMessage, color: 'success' })
            this.$router.push({ name: 'payrolls' })
          })
        } else {
          const errorMessage = this.$t('toasts.fillFields')
          this.showToast({ content: errorMessage, color: 'error' })
        }
        this.isLoading = false
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

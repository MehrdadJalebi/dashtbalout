<route>
{
  "name": "payrolls",
  "meta": {
    "order": 3,
    "isVisible": true,
    "iconName": "mdi-cash-multiple",
    "roles": ["Admin"]
  }
}
</route>
<template>
  <div class="mt-3">
    <page-title
      :title="$t('pages.payrolls.payrollsList')"
    >
    <div
       class="mb-3">
         <v-btn
           class="ml-2 mb-2 w-sm-100"
          color="error"
           @click="deleteGroupPayrollModal">
           <v-icon
             class="ml-2"
             small>
             mdi-delete
           </v-icon>
       {{ $t('pages.payrolls.deleteGroupPayrollBtn') }}
         </v-btn>
         <v-btn
          class="ml-2 mb-2 w-sm-100"
           to="/payrolls/add"
           color="success">
           <v-icon
             class="ml-2"
             small>
             mdi-plus
           </v-icon>
       {{ $t('pages.payrolls.add') }}
         </v-btn>
         <v-btn
          class="ml-2 mb-2 w-sm-100"
           to="/payrolls/addGroup"
           color="success">
           <v-icon
             class="ml-2"
             small>
             mdi-plus
           </v-icon>
       {{ $t('pages.payrolls.addGroup') }}
         </v-btn>
         <v-btn
          class="mb-2 w-sm-100"
           to="/payrolls/addExcelGroup"
           color="success">
           <v-icon
             class="ml-2"
             small>
             mdi-plus
           </v-icon>
       {{ $t('pages.payrolls.addExcelGroup') }}
         </v-btn>
    </div>
    </page-title>
    <v-card class="mt-5 mb-5">
        <v-row
          class="px-3"
          >
          <v-col
            :sm="6"
            >
            <form-item
              v-model="userid"
              type="autocomplete"
              :items="userList"
              icon="mdi-account-circle"
              :label="$t('enums.userList')"
              :placeholder="$t('enums.placeholders.userList')"
              ></form-item>
          </v-col>
          <v-col
            v-if="userListLoading"
            class="d-flex align-self-center mt-5"
            :sm="1"
            >
            <v-progress-circular
              indeterminate
              color="primary"
              :value="20"
              />
          </v-col>
          <v-col
            :sm="12"
            >
            <v-btn
              large
              class="px-5 ml-1 mr-auto"
              color="primary"
              @click="getUserPayrolls"
              >
              {{ $t('enums.getUserPayrolls') }}
            </v-btn>
          </v-col>
        </v-row>
    </v-card>
    <v-data-table
      align-center
      class="report-table"
      :headers="headers"
      :hide-default-header="isMobile"
      :options.sync="pages"
      :items="payrollsList"
      :loading="isLoading"
      disable-sort
      >
      <template slot="item" slot-scope="props">
        <tr>
          <td class="data-min-td min-20"> {{ props.item.title }} </td>
          <td class="data-min-td"> {{ props.item.contractNumber}} </td>
          <td class="data-min-td"> {{ props.item.payrollType}} </td>
          <td class="data-min-td"> {{ props.item.year }} </td>
          <td class="data-min-td"> {{ props.item.month}} </td>
          <td class="data-min-td">
            <div class="d-flex justify-around">
            <v-btn
              small
              class="px-1"
              color="primary"
              @click="downloadPayroll(props.item)"
              >
              <v-icon
                small>
                mdi-download
              </v-icon>
              {{ $t('enums.downloadPayroll') }}
            </v-btn>
            <v-btn
              small
              class="px-1 mr-1"
              color="error"
              @click="deletePayrollModal(props.item.fileId)"
              >
              <v-icon
                small>
                mdi-delete
              </v-icon>
              {{ $t('enums.tableActions.delete') }}
            </v-btn>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog
      v-model="deletePayrollDialog"
      width="700"
      >
      <v-card class="px-3 pb-3">
        <v-card-title class="headline">
          {{ $t('pages.payrolls.deletePayrollConfirmation.title') }}
        </v-card-title>
      <v-card
        outlined
        class="border-box"
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
                v-html="$t('confirms.deletePayrollConfirmation')"
                >
              </v-card-text>
            </div>
          </v-layout>
        </v-card>
      </v-card>
      <v-row class="mt-3">
        <v-col class="text-center" :sm="12">
          <v-btn
            class="mr-3"
            color="error"
            @click="deletePayrollDialog = false"
            >
            {{ $t('enums.cancel') }}
          </v-btn>
          <v-btn
            :loading="deleteLoading"
            class="mr-3"
            color="success"
            @click="deletePayroll"
            >
            {{ $t('pages.payrolls.deletePayrollBtn') }}
          </v-btn>
        </v-col>
      </v-row>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteGroupPayrollDialog"
      width="700"
      >
      <v-card class="px-3 pb-3">
        <v-card-title class="headline">
          {{ $t('pages.payrolls.deleteGroupPayrollConfirmation.title') }}
        </v-card-title>
      <v-card
        outlined
        class="border-box"
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
                v-html="$t('confirms.deleteGroupPayrollConfirmation')"
                >
              </v-card-text>
            </div>
          </v-layout>
        </v-card>
          <v-layout
            justify-right
            align-center
            class="pa-2"
            >
            <v-row
              class="px-3 mb-2"
              >
              <v-col
                :sm="6"
                >
                <form-item
                  v-model="payrollToDelete.month"
                  type="select"
                  :items="monthsArray"
                  :rules="[rules.required]"
                        icon="mdi-calendar"
                  :label="$t('enums.month')"
                  :placeholder="$t('enums.placeholders.month')"
                  ></form-item>
              </v-col>
                <v-col
                  :sm="6"
                  >
                  <form-item
                    v-model="payrollToDelete.year"
                    type="select"
                    :items="yearsArray"
                    :rules="[rules.required]"
                    icon="mdi-calendar"
                    :label="$t('enums.year')"
                    :placeholder="$t('enums.placeholders.year')"
                    ></form-item>
            </v-col>
          </v-row>
          </v-layout>
      </v-card>
      <v-row class="mt-3">
        <v-col class="text-center" :sm="12">
          <v-btn
            class="mr-3"
            color="error"
            @click="deleteGroupPayrollDialog = false"
            >
            {{ $t('enums.cancel') }}
          </v-btn>
          <v-btn
            :loading="deleteGroupLoading"
            class="mr-3"
            :disabled="!isDeleteGroupPayrollValid"
            color="success"
            @click="deleteGroupPayroll"
            >
            {{ $t('pages.payrolls.deleteGroupPayrollConfirmationBtn') }}
          </v-btn>
        </v-col>
      </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data () {
    return {
      pages: {},
      totalItems: 0,
      isLoading: false,
      payrollsList: [],
      userList: [],
      payrollToDelete: {
        month: null,
        year: null
      },
      userid: null,
      fileId: null,
      deleteLoading: false,
      deleteGroupLoading: false,
      deletePayrollDialog: false,
      deleteGroupPayrollDialog: false,
      rules: {
        required: value => !!value || 'این فیلد اجباری است'
      },
      yearsArray: [1395, 1396, 1397, 1398, 1399, 1400, 1401, 1402, 1403, 1403, 1404, 1405, 1406,
        1407, 1408, 1409]
    }
  },
  computed: {
    ...mapGetters({
      monthsArray: 'enums/monthsArray',
      allUsers: 'users/users',
      hasUsersSucceeded: 'users/hasUsersSucceeded'
    }),
    isDeleteGroupPayrollValid () {
      return Object.keys(this.payrollToDelete).filter(key => this.payrollToDelete[key] === null ||
         this.payrollToDelete[key] === undefined || this.payrollToDelete[key] === '').length === 0
    },
    headers () {
      return [
        {
          text: this.$t('enums.headers.contractTitle'),
          value: 'title'
        },
        {
          text: this.$t('enums.headers.contractNumber'),
          value: 'contractNumber'
        },
        {
          text: this.$t('enums.headers.payrollType'),
          value: 'payrollType'
        },
        {
          text: this.$t('enums.headers.year'),
          value: 'year'
        },
        {
          text: this.$t('enums.headers.month'),
          value: 'month'
        },
        {
          text: this.$t('enums.headers.actions'),
          value: ''
        }
      ]
    },
    userListLoading () {
      return !this.hasUsersSucceeded
    },
    isMobile () {
      return window.innerWidth < 767
    }
  },
  watch: {
    allUsers: {
      handler () {
        this.setUserList()
      },
      deep: true
    }
  },
  created () {
    if (this.allUsers.length) {
      this.setUserList()
    }
  },
  methods: {
    ...mapActions({
      getPayrollByUserId: 'payrolls/getPayrollByUserId',
      delete: 'payrolls/delete',
      deleteGroupPayrolls: 'payrolls/deleteGroupPayrolls',
      showToast: 'snackbar/showToastMessage',
      ticket: 'cdn/ticket',
      getExcel: 'cdn/getExcel',
      download: 'cdn/download'
    }),
    getUserPayrolls () {
      this.isLoading = true
      const userIdPayload = {
        userid: this.userid
      }
      this.getPayrollByUserId(userIdPayload).then(response => {
        this.isLoading = false
        //        console.log('response is: ', response)
        this.payrollsList = response.data
      })
    },
    downloadPayroll (item) {
      if (item.payrollType === 'Excel') {
        this.getExcelData(item)
      } else {
        this.downloadImage(item)
      }
    },
    getExcelData (item) {
      const payload = {
        year: item.year,
        month: this.getMonthNumber(item.month),
        contractId: item.contractNumber,
        userId: this.userid
      }
      this.getExcel(payload).then(response => {
        console.log('asdasdasdas', response)
      })
    },
    getMonthNumber (text) {
      return this.monthsArray.find((month) => month.text === text).value
    },
    downloadImage ({ fileId }) {
      const payload = {
        fileid: fileId
      }
      this.ticket(payload).then(response => {
        const filePath = response.data
        const a = document.createElement('A')
        a.href = filePath
        a.download = filePath.substr(filePath.lastIndexOf('/') + 1)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
    },
    deletePayrollModal (fileId) {
      this.fileId = fileId
      this.deletePayrollDialog = true
    },
    deleteGroupPayrollModal () {
      this.deleteGroupPayrollDialog = true
    },
    deletePayroll () {
      this.deleteLoading = true
      const payload = {
        fileid: this.fileId
      }
      this.delete(payload).then(response => {
        const successMessage = this.$t('pages.payrolls.payrollDeletedSuccessfully')
        this.showToast({ content: successMessage, color: 'success' })
        this.deleteLoading = false
        this.deletePayrollDialog = false
        this.getUserPayrolls()
      })
    },
    deleteGroupPayroll () {
      this.deleteGroupPayrollDialog = false
      this.isLoading = true
      this.deleteGroupPayrolls(this.payrollToDelete).then(response => {
        this.isLoading = false
        const successMessage = this.$t('pages.payrolls.payrollGroupDeletedSuccessfully')
        this.showToast({ content: successMessage, color: 'success' })
      })
    },
    setUserList () {
      this.userList = this.allUsers.map(user => {
        return { text: user.fullName, value: user.id }
      })
    }
  }
}
</script>
<style lang="scss">
.v-btn {
  letter-spacing: 0;
}
</style>

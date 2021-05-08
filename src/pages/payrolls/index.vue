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
          class="mb-2 w-sm-100"
           to="/payrolls/addGroup"
           color="success">
           <v-icon
             class="ml-2 mb-2"
             small>
             mdi-plus
           </v-icon>
       {{ $t('pages.payrolls.addGroup') }}
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
              type="select"
              :items="userList"
              icon="mdi-account-circle"
              :label="$t('enums.userList')"
              :placeholder="$t('enums.placeholders.userList')"
              ></form-item>
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
      :options.sync="pages"
      :items="payrollsList"
      :loading="isLoading"
      disable-sort
      >
      <template slot="item" slot-scope="props">
        <tr>
          <td class="data-min-td"> {{ props.item.title }} </td>
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
              @click="downloadPayroll(props.item.fileId)"
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
      payrollToDelete: {},
      userid: null,
      fileId: null,
      deleteLoading: false,
      deleteGroupLoading: false,
      deletePayrollDialog: false,
      deleteGroupPayrollDialog: false,
      rules: {
        required: value => !!value || 'این فیلد اجباری است'
      },
      yearsArray: [1395, 1396, 1397, 1398, 1399, 1400]
    }
  },
  computed: {
    ...mapGetters({
      monthsArray: 'enums/monthsArray'
    }),
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
  },
  methods: {
    ...mapActions({
      getAllUsers: 'users/getAllUsers',
      getPayrollByUserId: 'payrolls/getPayrollByUserId',
      delete: 'payrolls/delete',
      deleteGroupPayrolls: 'payrolls/deleteGroupPayrolls',
      showToast: 'snackbar/showToastMessage',
      ticket: 'cdn/ticket',
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
    downloadPayroll (fileId) {
      const payload = {
        fileid: fileId
      }
      this.ticket(payload).then(response => {
        window.open(response.data, '_blank')
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
      this.deleteGroupLoading = true
      this.deleteGroupPayrolls(this.payrollToDelete).then(response => {
        this.deleteGroupPayrollDialog = false
        this.deleteGroupLoading = false
        const successMessage = this.$t('pages.payrolls.payrollGroupDeletedSuccessfully')
        this.showToast({ content: successMessage, color: 'success' })
      })
    }
  }
}
</script>

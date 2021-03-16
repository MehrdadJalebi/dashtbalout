<route>
{
  "name": "payrolls",
  "meta": {
    "order": 3,
    "isVisible": true,
    "iconName": "mdi-arrow-left",
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
            <v-btn
              small
              outlined
              class="px-1"
              color="primary"
              @click="downloadPayroll(props.item.fileId)"
              >
              {{ $t('enums.downloadPayroll') }}
            </v-btn>
            <v-btn
              small
              outlined
              class="px-1 mr-1"
              color="error"
              @click="deletePayroll(props.item.fileId)"
              >
              {{ $t('enums.tableActions.delete') }}
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data () {
    return {
      pages: {},
      totalItems: 0,
      isLoading: false,
      payrollsList: [],
      userList: [],
      userid: null
    }
  },
  computed: {
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
    deletePayroll (fileId) {
      const payload = {
        fileid: fileId
      }
      this.delete(payload).then(response => {
        const successMessage = this.$t('pages.payrolls.payrollDeletedSuccessfully')
        this.showToast({ content: successMessage, color: 'success' })
        this.getUserPayrolls()
      })
    }
  }
}
</script>

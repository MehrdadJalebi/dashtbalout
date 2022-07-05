<route>
{
  "name": "leaves",
  "meta": {
    "order": 4,
    "isVisible": true,
    "iconName": "mdi-account-arrow-right",
    "roles": ["Admin", "SuperUser", "User"]
  }
}
</route>
<template>
  <div class="mt-3">
    <page-title
      :title="$t('pages.leaves.leavesList')"
    >
    <div
       class="mb-3">
         <v-btn
          class="w-sm-100"
           to="/leaves/add"
           color="success">
           <v-icon
             class="mr-2"
             small>
             mdi-plus
           </v-icon>
       {{ $t('pages.leaves.add') }}
         </v-btn>
       </div>
    </page-title>
    <v-row
      v-if="role && role !== 'User'"
      class="px-3 mb-3"
      >
      <v-col
        :sm="5"
        >
        <form-item
          v-model="userId"
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
                :sm="3"
                >
                <form-item
                  v-model="fromDateTime"
                  icon="mdi-calendar"
                  type="datetime"
                  :label="$t('enums.fromDateTime')"
                  :placeholder="$t('enums.placeholders.fromDateTime')"
                  ></form-item>
              </v-col>
              <v-col
                :sm="3"
                >
                <form-item
                  v-model="toDateTime"
                  icon="mdi-calendar"
                  type="datetime"
                  :label="$t('enums.toDateTime')"
                  :placeholder="$t('enums.placeholders.toDateTime')"
                  ></form-item>
              </v-col>
          <v-col
            :sm="12"
            >
            <v-btn
              large
              class="px-5 ml-1 mr-auto"
              color="primary"
              @click="getUsersLeaves"
              >
              {{ $t('enums.getUserLeaves') }}
            </v-btn>
            <v-btn
              large
              class="px-5 ml-1 mr-auto"
              color="error"
              @click="clean"
              >
              {{ $t('enums.clean') }}
            </v-btn>
          </v-col>
    </v-row>
    <v-row
      class="px-3 mb-3"
      >
      <v-col
        :sm="6"
        class="d-flex align-items-center"
        >
        <div
          v-if="userId"
          class="d-flex align-self-end mb-5 ml-5"
          >
          {{ $t('pages.leaves.balance') + ' : ' + userBalance }}
        </div>
        <form-item
          v-if="role && role !== 'User' && userId"
          v-model="balance"
          type="textbox"
          ltr
          class="mr-5"
          icon="mdi-calendar-plus"
          :label="$t('pages.leaves.setBalance')"
          >
        </form-item>
          <v-btn
            v-if="role && role !== 'User' && userId"
            large
            class="align-self-end mb-3 mr-5"
            color="primary"
            @click="setUserBalance"
          >
            {{ $t('pages.leaves.setBalanceBtn') }}
          </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      align-center
      class="report-table light-hover"
      :headers="headers"
      :hide-default-header="isMobile"
      :options.sync="pages"
      :items="leavesList"
      :loading="isLoading"
      disable-sort
    >
      <template slot="item" slot-scope="props">
        <tr
                            :class="{
                                     'success-light': props.item.status === 'Approve',
                                      'error-light': props.item.status === 'Reject'
                                   }"
        >
          <td class="data-min-td"> {{ props.item.reason }} </td>
          <td class="data-min-td"> {{ leaveType(props.item.type) }} </td>
          <td class="data-min-td min-10"> {{ toJalali(props.item.startDateTime) }} </td>
          <td class="data-min-td min-10"> {{ toJalali(props.item.endDateTime) }} </td>
          <td class="data-min-td py-3" v-html="props.item.description"></td>
          <td
            class="data-min-td min-10"
            >
            <div large class="d-flex">
            <v-icon>
              {{ getIcon(props.item.status) }}
            </v-icon>
              <span class="mr-1 align-self-center">{{ leaveStatus(props.item.status) }}</span>
            </div>
          </td>
          <td v-if="role === 'Admin' || role === 'SuperUser'" class="data-min-td">
            <div class="d-flex justify-around">
              <v-btn
                small
                color="success"
                @click="approve(props.item.id)"
                >
                {{ $t('enums.tableActions.approve') }}
              </v-btn>
              <v-btn
                small
                color="error"
                class="mr-2"
                @click="reject(props.item.id)"
                >
                {{ $t('enums.tableActions.reject') }}
              </v-btn>
              <v-btn
                small
                color="primary"
                class="mr-2"
                @click="printBalance(props.item.description)"
                >
                {{ $t('enums.tableActions.print') }}
              </v-btn>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { JalaliDateTime } from 'jalali-date-time'
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data () {
    return {
      page: 1,
      pageCount: 1000,
      pages: {},
      totalItems: 0,
      isLoading: true,
      userId: '',
      balance: '',
      userBalance: '',
      fromDateTime: null,
      toDateTime: null,
      userList: [],
      leavesList: []
    }
  },
  computed: {
    ...mapGetters({
      role: 'auth/role',
      user: 'users/user',
      allUsers: 'users/users',
      hasUsersSucceeded: 'users/hasUsersSucceeded'
    }),
    headers () {
      return [
        {
          text: this.$t('enums.headers.reason'),
          value: 'reason'
        },
        {
          text: this.$t('enums.headers.type'),
          value: 'type'
        },
        {
          text: this.$t('enums.headers.startDateTime'),
          value: 'startDateTime'
        },
        {
          text: this.$t('enums.headers.endDateTime'),
          value: 'endDateTime'
        },
        {
          text: this.$t('enums.headers.description'),
          value: 'description'
        },
        {
          text: this.$t('enums.headers.status'),
          value: 'status'
        }
      ]
    },
    isMobile () {
      return window.innerWidth < 767
    },
    userListLoading () {
      return !this.hasUsersSucceeded
    }
  },
  created () {
    if (!this.allUsers.length) {
      this.getUsers()
    }
    this.getData()
  },
  watch: {
    allUsers: {
      handler (newVal) {
        this.setUserList()
      },
      immediate: true
    },
    role () {
      this.getData()
    },
    userId (newVal) {
      if (newVal) {
        this.getUserBalance()
      }
    }
  },
  methods: {
    ...mapActions({
      getLeaves: 'leaves/getLeaves',
      getAllLeaves: 'leaves/getAllLeaves',
      getAllUsers: 'users/getAllUsers',
      approveLeave: 'leaves/approveLeave',
      rejectLeave: 'leaves/rejectLeave',
      setBalance: 'leaves/setBalance',
      getBalance: 'leaves/getBalance',
      showToast: 'snackbar/showToastMessage'
    }),
    setUserList () {
      this.userList = this.allUsers.map(user => {
        return { text: user.fullName, value: user.id }
      })
    },
    getUsers () {
      const payload = {
        pageIndex: 1,
        pageSize: 10000
      }
      this.getAllUsers(payload)
    },
    getData () {
      if (this.role) {
        if (this.role === 'User') {
          this.loadData()
        } else {
          this.getUsersLeaves()
        }
      }
    },
    loadData () {
      const payload = {
        pageIndex: this.page,
        pageSize: this.pageCount
      }
      this.getLeaves(payload)
        .then(response => {
          this.leavesList = response.data
          this.userId = this.user.id
          this.getUserBalance()
          this.isLoading = false
        })
    },
    leaveType (type) {
      return this.$t(`enums.${type.toLowerCase()}`)
    },
    leaveStatus (status) {
      return this.$t(`enums.${status.toLowerCase()}`)
    },
    getIcon (status) {
      if (status === 'Approve') {
        return 'mdi-check-bold'
      } else if (status === 'Reject') {
        return 'mdi-close-thick'
      } else {
        return 'mdi-clock'
      }
    },
    toJalali (date) {
      const jalali = JalaliDateTime()
      return jalali.toString(new Date(date))
    },
    approve (id) {
      this.isLoading = true
      const payload = {
        leaveId: id
      }
      this.approveLeave(payload)
        .then(response => {
          const successMessage = this.$t('pages.leaves.approvedSuccessfully')
          this.showToast({ content: successMessage, color: 'success' })
          this.getData()
          this.isLoading = false
        })
    },
    reject (id) {
      this.isLoading = true
      const payload = {
        leaveId: id
      }
      this.rejectLeave(payload)
        .then(response => {
          const errorMessage = this.$t('pages.leaves.rejectedSuccessfully')
          this.showToast({ content: errorMessage, color: 'error' })
          this.getData()
          this.isLoading = false
        })
    },
    getUsersLeaves () {
      this.isLoading = true
      let start = null
      let end = null
      let fromDateTime = null
      let toDateTime = null
      if (this.fromDateTime) {
        start = new Date(this.fromDateTime)
        const userTimezoneOffset = start.getTimezoneOffset() * 60000
        fromDateTime = new Date(start.getTime() - userTimezoneOffset)
      }
      if (this.toDateTime) {
        end = new Date(this.toDateTime)
        const userTimezoneOffset = end.getTimezoneOffset() * 60000
        toDateTime = new Date(end.getTime() - userTimezoneOffset)
      }
      const payload = {
        FromDateTime: fromDateTime,
        ToDateTime: toDateTime,
        UserId: this.userId,
        PageIndex: this.page,
        PageSize: this.pageCount
      }
      this.getAllLeaves(payload).then(response => {
        this.leavesList = response.data
        this.isLoading = false
      })
    },
    clean () {
      this.userId = ''
      this.fromDateTime = ''
      this.toDateTime = ''
      this.getUsersLeaves()
    },
    getUserBalance () {
      this.isLoading = true
      const payload = {
        userId: this.userId
      }
      this.getBalance(payload).then(response => {
        this.userBalance = response.data
        this.isLoading = false
      })
    },
    setUserBalance () {
      this.isLoading = true
      const intBalance = parseInt(this.balance)
      const payload = {
        userId: this.userId,
        value: intBalance
      }
      if (!this.balance) {
        this.isLoading = false
        const errorMessage = this.$t('toasts.fillFields')
        this.showToast({ content: errorMessage, color: 'error' })
      } else if (isNaN(intBalance)) {
        this.isLoading = false
        const errorMessage = this.$t('pages.leaves.enterNumber')
        this.showToast({ content: errorMessage, color: 'error' })
      } else {
        this.setBalance(payload).then(response => {
          const successMessage = this.$t('pages.leaves.balanceSetsSuccessfully')
          this.showToast({ content: successMessage, color: 'success' })
          this.balance = ''
          this.getUserBalance()
        })
      }
    },
    printBalance (text) {
      var mywindow = window.open('', 'PRINT')
      mywindow.document.write(text)
      mywindow.document.close()
      mywindow.focus()
      mywindow.print()
      mywindow.close()
    }
  }
}
</script>

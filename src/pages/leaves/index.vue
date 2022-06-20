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
    <v-data-table
      align-center
      class="report-table"
      :headers="headers"
      :hide-default-header="isMobile"
      :options.sync="pages"
      :items="leavesList"
      :loading="isLoading"
      disable-sort
    >
      <template slot="item" slot-scope="props">
        <tr>
          <td class="data-min-td"> {{ props.item.reason }} </td>
          <td class="data-min-td"> {{ leaveType(props.item.type) }} </td>
          <td class="data-min-td min-10"> {{ toJalali(props.item.startDateTime) }} </td>
          <td class="data-min-td min-10"> {{ toJalali(props.item.endDateTime) }} </td>
          <td class="data-min-td py-3" v-html="props.item.description"></td>
          <td
            class="data-min-td"
            :class="{
              'success--text': props.item.status === 'Approve',
              'error--text': props.item.status === 'Reject',
            }"
          > {{ leaveStatus(props.item.status) }} </td>
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
      pageCount: 15,
      pages: {},
      totalItems: 0,
      isLoading: true,
      leavesList: []
    }
  },
  computed: {
    ...mapGetters({
      role: 'auth/role'
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
    }
  },
  created () {
    if (this.role === 'Admin' || this.role === 'SuperUser') {
      this.headers.push(
        {
          text: this.$t('enums.headers.actions'),
          value: 'actions'
        }
      )
    }
    this.loadData()
  },
  methods: {
    ...mapActions({
      getLeaves: 'leaves/getLeaves',
      approveLeave: 'leaves/approveLeave',
      rejectLeave: 'leaves/rejectLeave',
      showToast: 'snackbar/showToastMessage'
    }),
    loadData () {
      const payload = {
        pageIndex: this.page,
        pageSize: this.pageCount
      }
      this.getLeaves(payload)
        .then(response => {
          this.leavesList = response.data
          this.isLoading = false
        })
    },
    leaveType (type) {
      return this.$t(`enums.${type.toLowerCase()}`)
    },
    leaveStatus (status) {
      return this.$t(`enums.${status.toLowerCase()}`)
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
          this.isLoading = false
        })
    }
  }
}
</script>

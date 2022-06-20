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
          <td class="data-min-td py-3"> {{ props.item.description }} </td>
          <td
            class="data-min-td min-20"
            :class="{
              'success--text': props.item.status === 'Approve',
              'error--text': props.item.status === 'Reject',
            }"
          > {{ leaveStatus(props.item.status) }} </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
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
    this.loadData()
  },
  methods: {
    ...mapActions({
      getLeaves: 'leaves/getLeaves',
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
      return jalali.toDate(new Date(date))
    }
  }
}
</script>

<route>
{
  "name": "userPayrolls",
  "meta": {
    "order": 3,
    "isVisible": true,
    "iconName": "mdi-cash-multiple",
    "roles": ["User"]
  }
}
</route>
<template>
  <div class="mt-3">
    <page-title
      :title="$t('pages.userPayrolls.payrollsList')"
    >
    </page-title>
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
    this.getUserPayrolls()
  },
  methods: {
    ...mapActions({
      getPayrolls: 'payrolls/getPayrolls',
      showToast: 'snackbar/showToastMessage',
      ticket: 'cdn/ticket',
      download: 'cdn/download'
    }),
    getUserPayrolls () {
      this.isLoading = true
      this.getPayrolls().then(response => {
        this.isLoading = false
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
    }
  }
}
</script>

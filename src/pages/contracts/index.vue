<route>
{
  "name": "contracts",
  "meta": {
    "order": 4,
    "isVisible": true,
    "iconName": "mdi-arrow-left",
    "roles": ["Admin"]
  }
}
</route>
<template>
  <div class="mt-3">
    <page-title
      :title="$t('pages.contracts.contractsList')"
    >
    <div
       class="mb-3">
         <v-btn
           to="/contracts/add"
           color="success">
           <v-icon
             class="mr-2"
             small>
             mdi-plus
           </v-icon>
       {{ $t('pages.contracts.add') }}
         </v-btn>
       </div>
    </page-title>
    <v-data-table
      align-center
      class="report-table"
      :headers="headers"
      :options.sync="pages"
      :items="contractsList"
      :loading="isLoading"
      disable-sort
      >
      <template slot="item" slot-scope="props">
        <tr>
          <td class="data-min-td"> {{ props.item.title }} </td>
          <td class="data-min-td"> {{ props.item.contractNumber }} </td>
          <td class="data-min-td"> {{ props.item.counterParty }} </td>
          <td class="data-min-td"> {{ props.item.workshopCode }} </td>
          <td class="data-min-td">
            <v-btn
              :to="'/contracts/edit?id='+ props.item.id"
              small
              outlined
              color="primary"
              >
              {{ $t('enums.tableActions.edit') }}
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
      page: 1,
      pageCount: 15,
      pages: {},
      totalItems: 0,
      isLoading: true,
      contractsList: []
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
          text: this.$t('enums.headers.counterParty'),
          value: 'counterParty'
        },
        {
          text: this.$t('enums.headers.workshopCode'),
          value: 'workshopCode'
        },
        {
          text: this.$t('enums.headers.actions'),
          value: 'actions'
        }
      ]
    }
  },
  created () {
    const payload = {
      pageIndex: this.page,
      pageSize: this.pageCount
    }
    this.getAllContracts(payload)
      .then(response => {
        this.contractsList = response.data
        this.isLoading = false
      })
  },
  methods: {
    ...mapActions({
      getAllContracts: 'contracts/getAllContracts'
    })
  }
}
</script>

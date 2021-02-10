<route>
{
  "name": "payrolls",
  "meta": {
    "order": 3,
    "isVisible": true,
    "iconName": "mdi-arrow-left"
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
           to="/payrolls/add"
           color="success">
           <v-icon
             class="mr-2"
             small>
             mdi-plus
           </v-icon>
       {{ $t('pages.payrolls.add') }}
         </v-btn>
    </div>
    </page-title>
    <v-data-table
      align-center
      class="report-table"
      :headers="headers"
      :options.sync="pages"
      :server-items-length="totalItems"
      :items="payrollsList"
      :loading="isLoading"
      disable-sort
      >
      <template slot="item" slot-scope="props">
        <tr>
          <td class="data-min-td"> {{ props.item.title }} </td>
          <td class="data-min-td"> {{ props.item.firstName}} </td>
          <td class="data-min-td"> {{ props.item.lastName}} </td>
          <td class="data-min-td"> {{ props.item.company }} </td>
          <td class="data-min-td"> {{ props.item.contractTitle }} </td>
          <td class="data-min-td"> {{ props.item.year }} </td>
          <td class="data-min-td"> {{ props.item.month}} </td>
          <td class="data-min-td"> {{ props.item.income }} </td>
          <td class="data-min-td"> {{ props.item.type }} </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data () {
    return {
      pages: {},
      totalItems: 0,
      isLoading: false,
      payrollsList: []
    }
  },
  computed: {
    headers () {
      return [
        {
          text: this.$t('enums.headers.nationalCode'),
          value: 'nationalCode'
        },
        {
          text: this.$t('enums.headers.firstName'),
          value: 'firstName'
        },
        {
          text: this.$t('enums.headers.lastName'),
          value: 'lastName'
        },
        {
          text: this.$t('enums.headers.contractTitle'),
          value: 'title'
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
          text: this.$t('enums.headers.income'),
          value: 'income'
        },
        {
          text: this.$t('enums.headers.type'),
          value: 'type'
        }
      ]
    }
  }
}
</script>

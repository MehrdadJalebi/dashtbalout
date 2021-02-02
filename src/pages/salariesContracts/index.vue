<route>
{
  "name": "salariesContracts",
  "meta": {
    "order": 4,
    "isVisible": true,
    "iconName": "mdi-arrow-left"
  }
}
</route>
<template>
  <div class="mt-3">
    <page-title
      :title="$t('pages.salariesContracts.contractsList')"
    >
    <div                                                                                                                        
       class="mb-3">                                                                                
         <v-btn                                                                                     
           to="/salariesContracts/add"                                                          
           color="success">                                                                         
           <v-icon                                                                                  
             class="mr-2"                                                                           
             small>                                                                                 
             mdi-plus                                                                               
           </v-icon>                                                                                
       {{ $t('pages.salariesContracts.add') }}                                                   
         </v-btn>                                                                                   
       </div>      
    </page-title>
    <v-data-table
      align-center
      class="report-table"
      :headers="headers"
      :options.sync="pages"
      :server-items-length="totalItems"
      :items="contractsList"
      :loading="isLoading"
      disable-sort
      >
      <template slot="item" slot-scope="props">
        <tr>
          <td class="data-min-td"> {{ props.item.title }} </td>
          <td class="data-min-td"> {{ props.item.registerationNumber }} </td>
          <td class="data-min-td"> {{ props.item.company }} </td>
          <td class="data-min-td"> {{ props.item.factoryCode }} </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data(){
    return {
      pages: {},
      totalItems: 0,
      isLoading: false,
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
          text: this.$t('enums.headers.contractRegisterationNumber'),
          value: 'registerationNumber'
        },
        {
          text: this.$t('enums.headers.contractCompany'),
          value: 'company'
        },
        {
          text: this.$t('enums.headers.factoryCode'),
          value: 'factoryCode'
        }
      ]
    }
  },
}
</script>

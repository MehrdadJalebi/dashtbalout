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
          <td class="data-min-td"> {{ props.item.firstName }} </td>
          <td class="data-min-td"> {{ props.item.lastName }} </td>
          <td class="data-min-td"> {{ props.item.nationalCode }} </td>
          <td class="data-min-td"> {{ props.item.personalNumber }} </td>
          <td class="data-min-td">
            <v-switch
              v-model="editAccess"
              ></v-switch>
          </td>
          <td class="data-min-td">
          <v-btn
            outlined
            color="primary"
            >
            {{ $t('enums.tableActions.edit') }}
          </v-btn>
          <v-btn
            class="mr-3"
            outlined
            color="danger"
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
          text: this.$t('enums.headers.firstName'),
          value: 'firstName'
        },
        {
          text: this.$t('enums.headers.lastName'),
          value: 'lastName'
        },
        {
          text: this.$t('enums.headers.nationalCode'),
          value: 'nationalCode'
        },
        {
          text: this.$t('enums.headers.personalNumber'),
          value: 'personalNumber'
        },
        {
          text: this.$t('enums.headers.editAccess'),
          value: 'editAccess'
        },
        {
          text: this.$t('enums.headers.actions'),
          value: 'actions'
        }
      ]
    }
  },
}
</script>

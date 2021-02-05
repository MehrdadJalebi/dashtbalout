<route>
{
  "name": "fileReceipts",
  "meta": {
    "order": 3.9,
    "isVisible": true,
    "iconName": "mdi-arrow-left"
  }
}
</route>
<template>
  <div class="mt-3">
    <page-title
      :title="$t('pages.fileReceipts.contractsList')"
    >
    <div                                                                                                                        
       class="mb-3">                                                                                
         <v-btn                                                                                     
           to="/fileReceipts/add"                                                          
           color="success">                                                                         
           <v-icon                                                                                  
             class="mr-2"                                                                           
             small>                                                                                 
             mdi-plus                                                                               
           </v-icon>                                                                                
       {{ $t('pages.fileReceipts.add') }}                                                   
         </v-btn>                                                                                   
       </div>      
    </page-title>
    <v-data-iterator
      :items="contractsList"
      :items-per-page.sync="pageCount"
      :page="page"
      hide-default-footer
      no-data-text=""
      >
      <template v-slot:default="props">
        <v-container fluid class="mb-6 mb-sm-0">
          <v-row
            class="equal-size"
            >
            <v-col
              v-for="(contract, index) in props.items"
              :key="index"
              :cols="12"
              :sm="6"
              :md="4"
              >
              <v-card
                class="contract-card"
                >
                <v-card-actions>
                  <v-btn
                    text
                    @click.stop="$router.push({ path: '/publisher/inventories/edit', query: { id: inventory.id } })"
                    >
                    {{ $t('common.edit') }}
                  </v-btn>
                    <v-btn
                      color="green"
                      text
                      @click.stop="">{{ $t('common.verify') }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-slot:footer>
        <v-container fluid>
          <v-footer
            v-if="inventoryList.length > 0"
            absolute
            color="transparent"
            >
            <pagination
              :isButtonLoading="isButtonLoading"
              :page="page"
              :totalItems="inventoryListCount"
              :pageCount="pageCount"
              @change="loadData"/>
          </v-footer>
        </v-container>
      </template>
    </v-data-iterator>
  </div>
</template>
<script>
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data(){
    return {
      page: 1,
      pageCount: 6,
    }
  }
}
</script>

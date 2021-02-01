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
  <div>
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
  </div>
</template>
<script>
export default {
  layout: APP_CONFIG.layout.mainPanelLayout
}
</script>

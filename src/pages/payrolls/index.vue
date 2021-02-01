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
  <div>
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
  </div>
</template>
<script>
export default {
  layout: APP_CONFIG.layout.mainPanelLayout
}
</script>

<route>
{
  "name": "index",
  "meta": {
    "order": 1,
    "isVisible": true,
    "iconName": "mdi-home"
  }
}
</route>
<template>
  <div class="home text-end">
    <v-row class="mt-3">
      <v-col :sm="4">
        <div class="counts-boxes greenbg">
          <h3>تعداد پرسنل و کاربران</h3>
          <h3>{{ userCount }}</h3>
        </div>
      </v-col>
      <v-col :sm="4">
        <div class="counts-boxes redbg">
          <h3>تعداد قراردادها</h3>
          <h3>{{ contractCount }}</h3>
        </div>
      </v-col>
      <v-col :sm="4">
        <div class="counts-boxes bluebg">
          <h3>تعداد فیشها</h3>
          <h3>{{ payrollCount }}</h3>
        </div>
      </v-col>
    </v-row>
    <div class="counts-boxes"></div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
export default {
  name: 'Home',
  layout: APP_CONFIG.layout.mainPanelLayout,
  data () {
    return {
      userCount: null,
      contractCount: null,
      payrollCount: null
    }
  },
  created () {
    this.getUserCount().then(response => {
      this.userCount = response.data
    })
    this.getContractCount().then(response => {
      this.contractCount = response.data
    })
    this.getPayrollCount().then(response => {
      this.payrollCount = response.data
    })
  },
  methods: {
    ...mapActions({
      getUserCount: 'users/getUserCount',
      getContractCount: 'users/getContractCount',
      getPayrollCount: 'users/getPayrollCount'
    })
  }
}
</script>

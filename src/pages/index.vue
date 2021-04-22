<route>
{
  "name": "index",
  "meta": {
    "order": 1,
    "isVisible": true,
    "iconName": "mdi-home",
    "roles": ["Admin"]
  }
}
</route>
<template>
  <div class="home text-end">
    <v-row class="mt-3 mb-5">
      <v-col md="4" sm="12">
        <div class="counts-boxes greenbg text-right">
          <v-row>
            <v-col :sm="7">
              <h1>{{ userCount }}</h1>
              <h4 class="mt-3">{{ $t('pages.index.usersCount') }}</h4>
            </v-col>
            <v-col class="text-left" :sm="5">
              <img src="/img/users.png" alt="">
            </v-col>
          </v-row>
          <v-row>
            <v-col :sm="12">
              <router-link :to="{ name: 'users'}">
                <h5 class="text-center white--text">{{ $t('pages.index.goToUsers') }}</h5>
              </router-link>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col md="4" sm="12">
        <div class="counts-boxes redbg text-right">
          <v-row>
            <v-col :sm="7">
              <h1>{{ contractCount }}</h1>
              <h4 class="mt-3">{{ $t('pages.index.contractsCount') }}</h4>
            </v-col>
            <v-col class="text-left" :sm="5">
              <img src="/img/contracts.png" alt="">
            </v-col>
          </v-row>
          <v-row>
            <v-col :sm="12">
              <router-link :to="{ name: 'contracts'}">
                <h5 class="text-center white--text">{{ $t('pages.index.goToContracts') }}</h5>
              </router-link>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col md="4" sm="12">
        <div class="counts-boxes bluebg text-right">
          <v-row>
            <v-col :sm="7">
              <h1>{{ payrollCount }}</h1>
              <h4 class="mt-3">{{ $t('pages.index.payrollsCount') }}</h4>
            </v-col>
            <v-col class="text-left" :sm="5">
              <img src="/img/payrolls.png" alt="">
            </v-col>
          </v-row>
          <v-row>
            <v-col :sm="12">
              <router-link :to="{ name: 'payrolls'}">
              <h5 class="text-center white--text">{{ $t('pages.index.goToPayrolls') }}</h5>
              </router-link>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col md="4" sm="12">
        <div class="counts-boxes add text-center" @click="$router.push({ path: 'users/add' })">
          <h3>{{ $t('pages.index.addUser') }}</h3>
          <img src="/img/addUser.png" alt="">
        </div>
      </v-col>
      <v-col md="4" sm="12">
        <div class="counts-boxes add text-center" @click="$router.push({ path: 'contracts/add' })">
          <h3>{{ $t('pages.index.addContract') }}</h3>
          <img src="/img/addContract.png" alt="">
        </div>
      </v-col>
      <v-col md="4" sm="12">
        <div class="counts-boxes add text-center" @click="$router.push({ path: 'payrolls/addGroup' })">
          <h3>{{ $t('pages.index.addGroupPayroll') }}</h3>
          <img src="/img/addPayroll.png" alt="">
        </div>
      </v-col>
    </v-row>
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

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
    <v-row class="mt-5">
      <v-col sm="12">
        <v-card class="px-3 pb-3">
          <v-card-title>
            {{ $t('pages.index.lastAddedUsers') }}
          </v-card-title>
          <v-data-table
            class="report-table text-right"
            :headers="headers"
            :items="usersList"
            :loading="isLoading"
            disable-sort
            >
            <template slot="item" slot-scope="props">
              <tr>
                <td class="data-min-td"> {{ props.item.firstName }} </td>
                <td class="data-min-td"> {{ props.item.lastName }} </td>
                <td class="data-min-td"> {{ props.item.nationalCode }} </td>
                <td class="data-min-td"> {{ props.item.username }} </td>
                <td class="data-min-td"> {{ props.item.personnelNumber }} </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
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
      page: 1,
      pageCount: 10000,
      usersList: [],
      isLoading: true,
      userCount: null,
      contractCount: null,
      payrollCount: null
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
          text: this.$t('enums.headers.userName'),
          value: 'userName'
        },
        {
          text: this.$t('enums.headers.personnelNumber'),
          value: 'personnelNumber'
        }
      ]
    }
  },
  created () {
    this.loadData()
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
      getAllUsers: 'users/getAllUsers',
      getUserCount: 'users/getUserCount',
      getContractCount: 'users/getContractCount',
      getPayrollCount: 'users/getPayrollCount'
    }),
    loadData () {
      this.isLoading = true
      const payload = {
        pageIndex: this.page,
        pageSize: this.pageCount
      }
      this.getAllUsers(payload)
        .then(response => {
          var length = response.data.length
          for (var i = 1; i <= 5; i++) {
            this.usersList.push(response.data[length - i])
          }
          this.isLoading = false
        })
    }
  }
}
</script>

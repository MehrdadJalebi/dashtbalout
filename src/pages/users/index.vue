<route>
{
  "name": "users",
  "meta": {
    "order": 2,
    "isVisible": true,
    "iconName": "mdi-arrow-left",
    "roles": ["Admin"]
  }
}
</route>
<template>
  <div class="mt-3">
    <page-title
      :title="$t('pages.users.usersList')"
    >
     <div
       class="mb-3">
        <v-btn
          :outlined="!filterBtn.isActive"
          max-width="42"
          min-width="42"
          class="ml-2"
          :color="filterBtn.btnColor"
          @click="filter()">
          <v-icon
            :color="filterBtn.iconColor">
            mdi-filter
          </v-icon>
        </v-btn>
         <v-btn
           color="success"
           @click="excelAddUsersModal">
           <v-icon
             class="mr-2"
             small>
             mdi-plus
           </v-icon>
       {{ $t('pages.users.excelAdd') }}
         </v-btn>
         <v-btn
           class="mr-2"
           to="/users/add"
           color="success">
           <v-icon
             class="mr-2"
             small>
             mdi-plus
           </v-icon>
       {{ $t('pages.users.add') }}
         </v-btn>
      </div>
    </page-title>
      <filter-box
        v-if="filterBtn.isActive"
        :disable-from-date=true
        :disable-to-date=true
        @Filter="onFilter"
        @cancelFilter="onCancelFilter"
        >
        <filter-item
          v-model="filterObject.search"
          type="textbox"
          :placeholder="$t('components.filterBox.search')"
          @input="onFilter"
          ></filter-item>
        <filter-item
          v-model="filterObject.userType"
          type="select"
          :items='userTypeArray'
          :placeholder="$t('components.filterBox.userStatus')"
          @input="onFilter"
          ></filter-item>
      </filter-box>
    <v-data-table
      class="report-table text-right"
      :headers="headers"
      :options.sync="pages"
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
          <td class="data-min-td">
            <v-switch
              v-model="props.item.isAdmin"
              @click="changeUserRole(props.item.id, props.item.role)"
              ></v-switch>
          </td>
          <td class="data-min-td">
            <v-switch
              v-model="props.item.isActive"
              @click="changeUserState(props.item.id, props.item.userState)"
              ></v-switch>
          </td>
          <td class="data-min-td">
          <v-btn
            :to="'/users/edit?id='+ props.item.id"
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
    <v-dialog
      v-model="dialog"
      width="700"
      >
      <v-card class="px-3 pb-3">
        <v-card-title class="headline">
          {{ $t('pages.users.excelAddUsers.title') }}
        </v-card-title>
      <v-card
        outlined
        class="border-box"
        >
        <v-card
          flat
          class="d-flex">
          <v-layout
            justify-right
            align-center
            class="pa-2"
            >
            <div>
              <div class="alert-circle">
                <v-icon class="orange--text text-h2">mdi-alert</v-icon>
              </div>
            </div>
            <div>
              <v-card-text
                class="orange--text"
                v-html="$t('pages.users.excelAddUsers.noticeText')"
                >
              </v-card-text>
            </div>
          </v-layout>
        </v-card>
        <v-card-actions>
          <v-btn
            class="mr-auto"
            outlined
            color="orange"
            >
            {{ $t('pages.users.excelAddUsers.sampleBtn') }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <div class="text-center mt-3">
        <v-btn
          color="primary"
          >
          {{ $t('pages.users.excelAddUsers.chooseFile') }}
        </v-btn>
      <v-btn
        class="mr-3"
        color="success"
        >
        {{ $t('pages.users.excelAddUsers.uploadFile') }}
      </v-btn>
      </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data () {
    return {
      page: 1,
      pageCount: 15,
      dialog: false,
      pages: {},
      totalItems: 0,
      isLoading: true,
      usersList: [],
      filterBtn: {
        iconColor: 'primary',
        btnColor: 'primary',
        isActive: false
      },
      filterObject: {
        userType: null,
        search: null
      }
    }
  },
  computed: {
    ...mapGetters({
      userTypeArray: 'enums/userTypeArray'
    }),
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
        },
        {
          text: this.$t('enums.headers.adminAccess'),
          value: ''
        },
        {
          text: this.$t('enums.headers.userState'),
          value: ''
        },
        {
          text: this.$t('enums.headers.actions'),
          value: 'actions'
        }
      ]
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    ...mapActions({
      getAllUsers: 'users/getAllUsers',
      changeRole: 'users/changeRole',
      enableUser: 'users/enableUser',
      disableUser: 'users/disableUser',
      showToast: 'snackbar/showToastMessage'
    }),
    filter () {
      this.filterBtn.isActive = !this.filterBtn.isActive
      if (this.filterBtn.isActive) {
        this.filterBtn.iconColor = 'white'
        this.filterBtn.btnColor = 'primary'
      } else {
        this.filterObject = {}
        this.loadData()
        this.filterBtn.iconColor = 'primary'
        this.filterBtn.btnColor = 'primary'
      }
    },
    onFilter (payload) {
      this.page = 1
      this.loadData()
    },
    onCancelFilter () {
      this.page = 1
      this.filterObject = {}
      this.loadData()
    },
    loadData () {
      this.isLoading = true
      const payload = {
        pageIndex: this.page,
        pageSize: this.pageCount,
        ...this.filterObject
      }
      this.getAllUsers(payload)
        .then(response => {
          this.usersList = response.data
          this.usersList.map(user => {
            user.isAdmin = user.role === 'Admin'
            user.isActive = user.userState === 'Enable'
          })
          console.log(this.usersList)
          this.isLoading = false
        })
    },
    excelAddUsersModal () {
      this.dialog = true
    },
    changeUserRole (id, role) {
      const payload = {
        userid: id,
        role: role === 'Admin' ? 'User' : 'Admin'
      }
      this.changeRole(payload).then(() => {
        const successMessage = this.$t('pages.users.roleChangedSuccessfully')
        this.showToast({ content: successMessage, color: 'success' })
      })
    },
    changeUserState (id, state) {
      const payload = {
        userid: id
      }
      if (state === 'Enable') {
        this.disableUser(payload).then(() => {
          const successMessage = this.$t('pages.users.userDisabledSuccessfully')
          this.showToast({ content: successMessage, color: 'success' })
        })
      } else {
        this.enableUser(payload).then(() => {
          const successMessage = this.$t('pages.users.userEnabledSuccessfully')
          this.showToast({ content: successMessage, color: 'success' })
        })
      }
    }
  }
}
</script>

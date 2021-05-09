<route>
{
  "name": "users",
  "meta": {
    "order": 2,
    "isVisible": true,
    "iconName": "mdi-account",
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
           class="ml-2 mb-2"
          :color="filterBtn.btnColor"
          @click="filter()">
          <v-icon
            :color="filterBtn.iconColor">
            mdi-filter
          </v-icon>
        </v-btn>
         <v-btn
           class="ml-2 w-sm-100 mb-2"
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
           class="mb-2 w-sm-100"
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
              @click="changeUserRoleModal(props.item.id, props.item.role)"
              ></v-switch>
          </td>
          <td class="data-min-td">
            <v-switch
              v-model="props.item.isActive"
              @click="changeUserState(props.item.id, props.item.userState)"
              ></v-switch>
          </td>
          <td class="data-min-td">
            <div class="d-flex justify-around">
              <v-btn
                :to="'/users/edit?id='+ props.item.id"
                small
                color="primary"
                >
                <v-icon
                  small>
                  mdi-pen
                </v-icon>
                {{ $t('enums.tableActions.edit') }}
              </v-btn>
                <v-btn
                  small
                  class="mr-1"
                  color="primary"
                  @click="resetUserPassword(props.item.id)"
                  >
                  <v-icon
                    small>
                    mdi-lock
                  </v-icon>
                  {{ $t('enums.tableActions.resetPassword') }}
                </v-btn>
                  <v-btn
                    small
                    class="mr-1"
                    color="error"
                    @click="deleteUserModal(props.item.id)"
                    >
                    <v-icon
                      small>
                      mdi-delete
                    </v-icon>
                    {{ $t('enums.tableActions.delete') }}
                  </v-btn>
            </div>
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
            @click="downloadSample"
            >
            {{ $t('pages.users.excelAddUsers.sampleBtn') }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-row>
        <v-col :sm="12">
      <div class="text-center mt-3">
        <form-item
          v-model="file"
          class="file-upload mb-5"
          type="file"
          icon="mdi-file-upload"
          accept=".xlsx, .xls, .csv"
          :label="$t('enums.excelFile')"
          :placeholder="$t('enums.placeholders.chooseFile')"
          >
        </form-item>
      </div>
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col class="mt-5 text-center" :sm="12">
      <v-btn
        :loading="uploadLoading"
        class="mr-3"
        color="success"
        @click="uploadExcel"
        >
        {{ $t('pages.users.excelAddUsers.uploadFile') }}
      </v-btn>
        </v-col>
      </v-row>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteUserDialog"
      width="700"
      >
      <v-card class="px-3 pb-3">
        <v-card-title class="headline">
          {{ $t('pages.users.deleteUserConfirmation.title') }}
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
                v-html="$t('confirms.deleteUserConfirmation')"
                >
              </v-card-text>
            </div>
          </v-layout>
        </v-card>
      </v-card>
      <v-row class="mt-3">
        <v-col class="text-center" :sm="12">
          <v-btn
            class="mr-3"
            color="error"
            @click="deleteUserDialog = false"
            >
            {{ $t('enums.cancel') }}
          </v-btn>
          <v-btn
            :loading="deleteLoading"
            class="mr-3"
            color="success"
            @click="deleteUser"
            >
            {{ $t('pages.users.deleteUserBtn') }}
          </v-btn>
        </v-col>
      </v-row>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="changeUserRoleDialog"
      persistent
      width="700"
      >
      <v-card class="px-3 pb-3">
        <v-card-title class="headline">
          {{ $t('pages.users.changeUserRoleConfirmation.title') }}
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
                v-html="$t('confirms.changeUserRoleConfirmation')"
                >
              </v-card-text>
            </div>
          </v-layout>
        </v-card>
      </v-card>
      <v-row class="mt-3">
        <v-col class="text-center" :sm="12">
          <v-btn
            :loading="changeUserRoleLoading"
            class="mr-3"
            color="success"
            @click="changeUserRole"
            >
            {{ $t('pages.users.changeUserRoleBtn') }}
          </v-btn>
          <v-btn
            class="mr-3"
            color="error"
            @click="cancelUserState"
            >
            {{ $t('pages.confirmModal.cancel') }}
          </v-btn>
        </v-col>
      </v-row>
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
      pageCount: 100000,
      dialog: false,
      deleteUserDialog: false,
      changeUserRoleDialog: false,
      pages: {},
      totalItems: 0,
      isLoading: true,
      uploadLoading: false,
      deleteLoading: false,
      changeUserRoleLoading: false,
      usersList: [],
      filterBtn: {
        iconColor: 'primary',
        btnColor: 'primary',
        isActive: false
      },
      filterObject: {
        userType: null,
        search: null
      },
      file: null,
      fileList: [],
      userId: null,
      userRole: null
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
      delete: 'users/deleteUser',
      disableUser: 'users/disableUser',
      resetPassword: 'users/resetPassword',
      excel: 'users/excel',
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
          this.isLoading = false
        })
    },
    excelAddUsersModal () {
      this.dialog = true
    },
    changeUserRole () {
      this.changeUserRoleLoading = true
      const payload = {
        userid: this.userId,
        role: this.userRole === 'Admin' ? 'User' : 'Admin'
      }
      this.changeRole(payload).then(() => {
        const successMessage = this.$t('pages.users.roleChangedSuccessfully')
        this.showToast({ content: successMessage, color: 'success' })
        this.loadData()
        this.changeUserRoleDialog = false
        this.changeUserRoleLoading = false
      })
    },
    cancelUserState () {
      this.changeUserRoleDialog = false
      this.loadData()
    },
    changeUserState (id, state) {
      const payload = {
        userid: id
      }
      if (state === 'Enable') {
        this.disableUser(payload).then(() => {
          const successMessage = this.$t('pages.users.userDisabledSuccessfully')
          this.showToast({ content: successMessage, color: 'success' })
          this.loadData()
        })
      } else {
        this.enableUser(payload).then(() => {
          const successMessage = this.$t('pages.users.userEnabledSuccessfully')
          this.showToast({ content: successMessage, color: 'success' })
          this.loadData()
        })
      }
    },
    uploadExcel () {
      this.uploadLoading = true
      this.fileList.push(this.file)
      this.excel(this.fileList).then(response => {
        const successMessage = this.$t('toasts.fileUploadedSuccessfully')
        this.showToast({ content: successMessage, color: 'success' })
        this.uploadLoading = false
        this.dialog = false
      }, error => {
        this.showToast({ content: error.response.data.error, color: 'error' })
        this.uploadLoading = false
        this.dialog = false
      })
    },
    deleteUserModal (userId) {
      this.userId = userId
      this.deleteUserDialog = true
    },
    deleteUser () {
      this.deleteLoading = true
      const payload = {
        userid: this.userId
      }
      this.delete(payload).then(response => {
        const successMessage = this.$t('toasts.userDeletedSuccessfully')
        this.showToast({ content: successMessage, color: 'success' })
        this.deleteLoading = false
        this.deleteUserDialog = false
        this.loadData()
      })
    },
    changeUserRoleModal (userId, userRole) {
      this.userId = userId
      this.userRole = userRole
      this.changeUserRoleDialog = true
    },
    resetUserPassword (userId) {
      this.isLoading = true
      this.resetPassword({ userid: userId }).then(response => {
        const successMessage = response.data
        this.showToast({ content: successMessage, color: 'success' })
        this.isLoading = false
      })
    },
    downloadSample () {
      window.open('https://salary.asazan.com/personal.xls', '_blank')
    }
  }
}
</script>

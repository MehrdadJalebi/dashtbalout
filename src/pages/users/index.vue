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
        @filter="onFilter"
        @cancelFilter="onCancelFilter"
        >
        <filter-item
          v-model="filterObject.search"
          type="textbox"
          :placeholder="$t('components.filterBox.search')"
          ></filter-item>
        <filter-item
          v-model="filterObject.userType"
          type="select"
          :items='userTypeArray'
          :placeholder="$t('components.filterBox.userStatus')"
          ></filter-item>
      </filter-box>
    <v-data-table
      class="report-table text-right"
      :headers="headers"
      :hide-default-header="isMobile"
      :options.sync="pages"
      :items="usersList"
      :loading="isLoading"
      disable-sort
      >
      <template slot="item" slot-scope="props">
        <tr>
          <td class="data-min-td py-2"> {{ props.item.firstName }} </td>
          <td class="data-min-td py-2 min-20"> {{ props.item.lastName }} </td>
          <td class="data-min-td py-2"> {{ props.item.nationalCode }} </td>
          <td class="data-min-td py-2"> {{ props.item.username }} </td>
          <td class="data-min-td py-2"> {{ props.item.personnelNumber }} </td>
          <td class="data-min-td py-2">
            {{ showRole(props.item.role) }}
          </td>
          <td class="data-min-td py-2">
            {{ showGroup(props.item.groupId) }}
          </td>
          <td class="data-min-td">
            <v-icon
              large
              :color="props.item.isActive ? 'success' : ''"
              @click="changeUserState(props.item.id, props.item.userState)"
              >mdi-check-circle</v-icon>
          </td>
          <td class="data-min-td">
            <div class="d-flex justify-around">
              <v-btn
                small
                color="primary"
                @click="changeUserSettingsModal(props.item)"
                >
                <v-icon
                  small>
                  mdi-pen
                </v-icon>
                {{ $t('enums.tableActions.userSettings') }}
              </v-btn>
              <v-btn
                :to="'/users/edit?id='+ props.item.id"
                small
                class="mr-1"
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
      v-model="changeUserSettingsDialog"
      persistent
      width="700"
      >
      <v-card class="px-3 pb-3">
        <v-card-title class="headline">
          {{ $t('pages.users.userSettingsConfirmation.title') }}
        </v-card-title>
      <v-card
        outlined
        class="border-box"
        >
      </v-card>
      <form-item
        v-model="userRole"
        type="select"
        class="my-3"
        :items="userRolesArray"
        icon="mdi-account-circle"
        :label="$t('enums.type')"
        :placeholder="$t('enums.placeholders.type')"
       ></form-item>
      <form-item
        v-model="userGroup"
        type="select"
        class="my-3"
        :items="personGroupsList"
        icon="mdi-account-circle"
        :label="$t('enums.groupName')"
        :placeholder="$t('enums.placeholders.groupName')"
       ></form-item>
          <v-btn
            v-if="hasUserGroup"
            color="error"
            :loading="deleteGroupLoading"
            @click="deleteUserGroup"
            >
            {{ $t('pages.users.deleteUserGroupBtn') }}
          </v-btn>
      <v-row class="mt-3">
        <v-col class="text-center" :sm="12">
          <v-btn
            :loading="changeUserSettingsLoading"
            class="mr-3"
            color="success"
            @click="changeUserSettings"
            >
            {{ $t('pages.users.changeUserSettingsBtn') }}
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
      changeUserSettingsDialog: false,
      pages: {},
      totalItems: 0,
      isLoading: true,
      uploadLoading: false,
      deleteLoading: false,
      deleteGroupLoading: false,
      changeUserSettingsLoading: false,
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
      userRole: null,
      userGroup: null,
      hasUserGroup: false,
      personGroupsList: []
    }
  },
  computed: {
    ...mapGetters({
      userTypeArray: 'enums/userTypeArray',
      allUsers: 'users/users',
      personGroups: 'personGroups/personGroups'
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
          text: this.$t('enums.headers.role'),
          value: ''
        },
        {
          text: this.$t('enums.headers.groupName'),
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
    },
    userRolesArray () {
      return [
        {
          text: this.$t('enums.userRoles.admin'),
          value: 'Admin'
        },
        {
          text: this.$t('enums.userRoles.superUser'),
          value: 'SuperUser'
        },
        {
          text: this.$t('enums.userRoles.user'),
          value: 'User'
        }
      ]
    },
    isMobile () {
      return window.innerWidth < 767
    }
  },
  watch: {
    personGroups: {
      handler (newVal) {
        console.log('newVal is: ', newVal)
        if (newVal) {
          this.personGroupsList = newVal.map(group => {
            return { text: group.groupName, value: group.id }
          })
        }
      },
      immediate: true
    }
  },
  created () {
    if (!this.allUsers.length) {
      this.loadData()
    } else {
      this.usersList = this.allUsers
      this.usersList.map(user => {
        user.isAdmin = user.role === 'Admin'
        user.isSuperUser = user.role === 'SuperUser'
        user.isActive = user.userState === 'Enable'
      })
      this.isLoading = false
    }
    this.getUserGroups()
  },
  beforeDestroy () {
    if (this.filterObject.userType || this.filterObject.search) {
      this.onCancelFilter()
    }
  },
  methods: {
    ...mapActions({
      getAllUsers: 'users/getAllUsers',
      changeRole: 'users/changeRole',
      enableUser: 'users/enableUser',
      delete: 'users/deleteUser',
      disableUser: 'users/disableUser',
      getAllPersonGroups: 'personGroups/getAllPersonGroups',
      changePersonGroup: 'personGroups/changePersonGroup',
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
          this.usersList = this.allUsers
          this.usersList.map(user => {
            user.isAdmin = user.role === 'Admin'
            user.isSuperUser = user.role === 'SuperUser'
            user.isActive = user.userState === 'Enable'
          })
          this.isLoading = false
        })
    },
    excelAddUsersModal () {
      this.dialog = true
    },
    changeUserSettings () {
      this.changeUserSettingsLoading = true
      const payload = {
        userid: this.userId,
        role: this.userRole
      }
      this.changeRole(payload).then(() => {
        const groupPayload = {
          userid: this.userId,
          groupId: this.userGroup
        }
        this.changePersonGroup(groupPayload).then(() => {
          const successMessage = this.$t('pages.users.settingsChangedSuccessfully')
          this.showToast({ content: successMessage, color: 'success' })
          this.loadData()
          this.changeUserSettingsDialog = false
          this.changeUserSettingsLoading = false
        })
      })
    },
    cancelUserState () {
      this.changeUserSettingsDialog = false
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
    changeUserSettingsModal (user) {
      this.userId = user.id
      this.userRole = user.role
      this.userGroup = user.groupId
      this.hasUserGroup = !!this.userGroup
      this.changeUserSettingsDialog = true
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
      window.open(`${window.location.origin}/personal.xls`, '_blank')
    },
    showRole (userRole) {
      if (userRole === 'Admin') return this.$t('enums.userRoles.admin')
      else if (userRole === 'SuperUser') return this.$t('enums.userRoles.superUser')
      else return this.$t('enums.userRoles.user')
    },
    showGroup (userGroup) {
      let groupName
      this.personGroupsList.find(group => {
        if (group.value === userGroup) {
          groupName = group.text
        }
      })
      return groupName
    },
    getUserGroups () {
      const payload = {
        pageIndex: 1,
        pageSize: 1000
      }
      this.getAllPersonGroups(payload)
        .then(response => {
          this.personGroupsList = response.data.map(group => {
            return { text: group.groupName, value: group.id }
          })
        })
    },
    deleteUserGroup () {
      this.deleteGroupLoading = true
      this.userGroup = 0
      const groupPayload = {
        userid: this.userId,
        groupId: this.userGroup
      }
      this.changePersonGroup(groupPayload).then(() => {
        const successMessage = this.$t('pages.users.groupDeletedSuccessfully')
        this.showToast({ content: successMessage, color: 'success' })
        this.loadData()
        this.hasUserGroup = false
        this.deleteGroupLoading = false
      })
    }
  }
}
</script>

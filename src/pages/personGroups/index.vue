<route>
{
  "name": "personGroups",
  "meta": {
    "order": 4,
    "isVisible": true,
    "iconName": "mdi-account-group",
    "roles": ["Admin"]
  }
}
</route>
<template>
  <div class="mt-3">
    <page-title
      :title="$t('pages.personGroups.personGroupsList')"
    >
    <div
       class="mb-3">
         <v-btn
          class="w-sm-100"
           to="/personGroups/add"
           color="success">
           <v-icon
             class="mr-2"
             small>
             mdi-plus
           </v-icon>
       {{ $t('pages.personGroups.add') }}
         </v-btn>
       </div>
    </page-title>
    <v-data-table
      align-center
      class="report-table"
      :headers="headers"
      :hide-default-header="isMobile"
      :options.sync="pages"
      :items="personGroupsList"
      :loading="isLoading"
      disable-sort
    >
      <template slot="item" slot-scope="props">
        <tr>
          <td class="data-min-td"> {{ props.item.groupName }} </td>
          <td class="data-min-td"> {{ props.item.personsList }} </td>
          <td class="data-min-td">
            <div class="d-flex justify-around">
              <v-btn
                small
                color="primary"
                class="mr-2"
                @click="editPersonGroupModal(props.item)"
                >
                <v-icon
                  small>
                  mdi-pen
                </v-icon>
                {{ $t('enums.tableActions.edit') }}
              </v-btn>
              <v-btn
                small
                color="error"
                class="mr-2"
                @click="deletePersonGroupModal(props.item)"
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
      v-model="deletePersonGroupDialog"
      width="700"
      >
      <v-card class="px-3 pb-3">
        <v-card-title class="headline">
          {{ $t('pages.personGroups.deletepersonGroupConfirmation.title') }}
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
                v-html="$t('confirms.deletePersonGroupConfirmation')"
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
            @click="deletePersonGroupDialog = false"
            >
            {{ $t('enums.cancel') }}
          </v-btn>
          <v-btn
            :loading="deleteLoading"
            class="mr-3"
            color="success"
            @click="deleteGroup"
            >
            {{ $t('pages.personGroups.deletePersonGroupBtn') }}
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
      pageCount: 1000,
      pages: {},
      totalItems: 0,
      isLoading: true,
      editLoading: false,
      deleteLoading: false,
      deletePersonGroupDialog: false,
      editPersonGroupDialog: false,
      personGroup: {},
      personGroupsList: []
    }
  },
  computed: {
    ...mapGetters({
      personGroups: 'personGroups/personGroups'
    }),
    headers () {
      return [
        {
          text: this.$t('enums.headers.groupName'),
          value: 'groupName'
        },
        {
          text: this.$t('enums.headers.personsList'),
          value: 'personsList'
        },
        {
          text: this.$t('enums.headers.actions'),
          value: 'actions'
        }
      ]
    },
    isMobile () {
      return window.innerWidth < 767
    },
    userListLoading () {
      return !this.hasUsersSucceeded
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    ...mapActions({
      editPersonGroup: 'personGroups/editPersonGroup',
      deletePersonGroup: 'personGroups/deletePersonGroup',
      getAllPersonGroups: 'personGroups/getAllPersonGroups',
      showToast: 'snackbar/showToastMessage'
    }),
    loadData () {
      const payload = {
        pageIndex: this.page,
        pageSize: this.pageCount
      }
      this.getAllPersonGroups(payload)
        .then(response => {
          this.personGroupsList = response.data
          console.log('personGroups: ', this.personGroupsList)
          this.isLoading = false
        })
    },
    editPersonGroupModal (personGroup) {
      this.personGroup = personGroup
      this.editPersonGroupDialog = true
    },
    deletePersonGroupModal (personGroup) {
      this.personGroup = personGroup
      this.deletePersonGroupDialog = true
    },
    editGroup () {
      this.editLoading = true
      const payload = {
        id: this.personGroup.id,
        groupName: this.personGroup.groupName
      }
      this.editPersonGroup(payload)
        .then(response => {
          this.editLoading = false
          this.editPersonGroupDialog = false
          const successMessage = this.$t('pages.personGroups.personGroupEditedSuccessfully')
          this.showToast({ content: successMessage, color: 'success' })
          this.loadData()
        })
    },
    deleteGroup () {
      this.deleteLoading = true
      const payload = {
        id: this.personGroup.id
      }
      this.deletePersonGroup(payload)
        .then(response => {
          this.deleteLoading = false
          this.deletePersonGroupDialog = false
          const successMessage = this.$t('pages.personGroups.personGroupDeletedSuccessfully')
          this.showToast({ content: successMessage, color: 'success' })
          this.loadData()
        })
    }
  }
}
</script>

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
          <td class="data-min-td">
            <div class="group-persons">
              <span v-for="(person, index) in props.item.persons" :key="index">
                {{ person.fullName }}
                <span v-if="index < (props.item.persons.length - 1)"> - </span>
              </span>
            </div>
          </td>
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
          {{ $t('pages.personGroups.deletePersonGroupConfirmation.title') }}
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
            @click.stop="deletePersonGroupDialog = false"
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
    <v-dialog
      v-model="editPersonGroupDialog"
      width="700"
      scrollable
      >
      <v-card class="px-3 pb-3" height="75vh">
        <v-card-title class="headline">
          {{ $t('pages.personGroups.editPersonGroup.title') }}
        </v-card-title>
          <v-card-text>
        <v-row
          class="px-3 mb-3"
          >
          <v-col
            :sm="11"
            >
            <form-item
              v-model="personGroup.groupName"
              type="textbox"
              icon="mdi-account-group"
              :label="$t('enums.groupName')"
              :rules="[rules.required]"
              :placeholder="$t('enums.placeholders.groupName')"
              ></form-item>
          </v-col>
          <v-col
            :sm="11"
            >
            <label class="typo__label">
              <v-icon>mdi-account-group</v-icon>
              {{ $t('enums.personsList') }}
            </label>
            <multiselect
              v-model="personGroupPersons"
              :options="userList"
              :multiple="true"
              :close-on-select="false"
              :preserve-search="true"
              :placeholder="$t('enums.placeholders.personsList')"
              :select-label="$t('multiselect.selectLabel')"
              :selected-label="$t('multiselect.selectedLabel')"
              :deselect-label="$t('multiselect.deselectLabel')"
              label="text"
              track-by="text"
              :preselect-first="true"
            >
            <template #noResult>{{ $t('multiselect.noResult') }}</template>
            </multiselect>
          </v-col>
            <v-col
              v-if="userListLoading"
              class="d-flex align-self-center mt-5"
              :sm="1"
              >
              <v-progress-circular
                indeterminate
                color="primary"
                :value="20"
                />
            </v-col>
        </v-row>
          </v-card-text>
          <v-card-actions>
      <v-row class="mt-5">
        <v-col class="text-center" :sm="12">
          <v-btn
            color="error"
            @click="editPersonGroupDialog = false"
            >
            {{ $t('enums.cancel') }}
          </v-btn>
            <v-btn
            class="mr-3"
              color="success"
              :loading="editLoading"
              @click="editGroup"
              >
              {{ $t('pages.personGroups.editPersonGroupBtn') }}
            </v-btn>
        </v-col>
      </v-row>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Multiselect from 'vue-multiselect'

export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  components: { Multiselect },
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
      userList: [],
      personGroupPersons: [],
      personGroup: {},
      personGroupsList: [],
      rules: {
        required: value => !!value || 'این فیلد اجباری است'
      }
    }
  },
  computed: {
    ...mapGetters({
      allUsers: 'users/users',
      hasUsersSucceeded: 'users/hasUsersSucceeded',
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
  watch: {
    allUsers: {
      handler (newVal) {
        this.setUserList()
      },
      immediate: true
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
    async setUserList () {
      this.userList = await this.allUsers.map(user => {
        return { text: user.fullName, value: user.personId }
      })
    },
    loadData () {
      const payload = {
        pageIndex: this.page,
        pageSize: this.pageCount
      }
      this.getAllPersonGroups(payload)
        .then(response => {
          this.personGroupsList = response.data
          this.isLoading = false
        })
    },
    editPersonGroupModal (personGroup) {
      this.personGroupPersons = []
      this.personGroup = { ...personGroup }
      personGroup.persons.forEach(person => {
        this.personGroupPersons.push({ text: person.fullName, value: person.id })
      })
      this.editPersonGroupDialog = true
    },
    deletePersonGroupModal (personGroup) {
      this.personGroup = { ...personGroup }
      this.deletePersonGroupDialog = true
    },
    editGroup () {
      const personIds = this.personGroupPersons.map((person) => {
        return person.value
      })
      this.editLoading = true
      const payload = {
        id: this.personGroup.id,
        groupName: this.personGroup.groupName,
        personIds: personIds
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

<route>
{
  "name": "users",
  "meta": {
    "order": 2,
    "isVisible": true,
    "iconName": "mdi-arrow-left"
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
          <td class="data-min-td"> {{ props.item.personnelNumber }} </td>
          <td class="data-min-td">
            <v-switch
              v-model="editAccess"
              ></v-switch>
          </td>
          <td class="data-min-td">
          <v-btn
            small
            outlined
            color="primary"
            >
            {{ $t('enums.tableActions.edit') }}
          </v-btn>
          <v-btn
            small
            class="mr-3"
            outlined
            color="danger"
            >
            {{ $t('enums.tableActions.delete') }}
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
import { mapActions } from 'vuex'
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
      usersList: []
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
          text: this.$t('enums.headers.personalNumber'),
          value: 'personalNumber'
        },
        {
          text: this.$t('enums.headers.editAccess'),
          value: 'editAccess'
        },
        {
          text: this.$t('enums.headers.actions'),
          value: 'actions'
        }
      ]
    }
  },
  created () {
    const payload = {
      pageIndex: this.page,
      pageSize: this.pageCount
    }
    this.getAllUsers(payload)
      .then(response => {
        this.usersList = response.data
        this.isLoading = false
      })
  },
  methods: {
    ...mapActions({
      getAllUsers: 'users/getAllUsers'
    }),
    excelAddUsersModal () {
      this.dialog = true
    }
  }
}
</script>

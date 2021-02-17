<route>
{
  "name": "messages",
  "meta": {
    "order": 4.01,
    "isVisible": true,
    "iconName": "mdi-arrow-left",
    "roles": ["Admin"]
  }
}
</route>
<template>
  <div class="mt-3">
    <page-title
      :title="$t('pages.messages.title')"
    >
     <div
       class="mb-3">
         <v-btn
           class="mr-2"
           to="/messages/add"
           color="success">
           <v-icon
             class="mr-2"
             small>
             mdi-plus
           </v-icon>
       {{ $t('pages.messages.add') }}
         </v-btn>
      </div>
    </page-title>
        <v-row
          class="px-3 mb-3"
          >
          <v-col
            :sm="6"
            >
            <form-item
              v-model="userId"
              type="select"
              :items="userList"
              icon="mdi-account-circle"
              :label="$t('enums.userList')"
              :placeholder="$t('enums.placeholders.userList')"
              ></form-item>
          </v-col>
          <v-col
            :sm="12"
            >
            <v-btn
              large
              class="px-5 ml-1 mr-auto"
              color="primary"
              @click="getUserMessages"
              >
              {{ $t('enums.getUserMessages') }}
            </v-btn>
          </v-col>
        </v-row>
    <v-data-table
      align-center
      class="report-table"
      :headers="headers"
      :options.sync="pages"
      :items="messagesList"
      :loading="isLoading"
      disable-sort
      >
      <template slot="item" slot-scope="props">
        <tr>
          <td class="data-min-td"> {{ props.item.title }} </td>
          <td class="data-min-td"> {{ props.item.body.substring(0,60) }}
            <span v-if="props.item.body.length > 60">...</span>
          </td>
          <td v-if="props.item.isRead" class="data-min-td success--text"> {{ isRead }} </td>
          <td v-else class="data-min-td error--text"> {{ isntRead }} </td>
          <td class="data-min-td"> {{ props.item.dateAt }} </td>
          <td class="data-min-td">
            <v-btn
              small
              outlined
              class="px-1"
              color="primary"
              @click="showMessageModal(props.item)"
              >
              {{ $t('enums.showMessage') }}
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
          {{ $t('enums.showMessage') }}
        </v-card-title>
      <v-card
        outlined
        class="border-box"
        >
        <v-card
          flat
          class="d-flex">
          <v-layout
            flex-column
            justify-right
            align-center
            class="pa-2"
            >
            <v-row>
              <v-card-text>{{$t('enums.messageTitle') }} : {{ message.title }}</v-card-text>
            </v-row>
        <v-row>
          <v-card-text>{{$t('enums.messageBody') }} : {{ message.body}}</v-card-text>
        </v-row>
          </v-layout>
        </v-card>
      </v-card>
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
      message: {},
      pages: {},
      userId: null,
      isLoading: false,
      dialog: false,
      userList: [],
      messagesList: [],
      isRead: this.$t('enums.isRead'),
      isntRead: this.$t('enums.isntRead')
    }
  },
  created () {
    const payload = {
      pageIndex: 1,
      pageSize: 100000
    }
    this.getAllUsers(payload)
      .then(response => {
        this.userList = response.data.map(user => {
          return { text: user.fullName, value: user.id }
        })
      })
  },
  computed: {
    headers () {
      return [
        {
          text: this.$t('enums.headers.messageTitle'),
          value: 'title'
        },
        {
          text: this.$t('enums.headers.messageBody'),
          value: 'body'
        },
        {
          text: this.$t('enums.headers.status'),
          value: 'isRead'
        },
        {
          text: this.$t('enums.headers.sendingDate'),
          value: 'dateAt'
        },
        {
          text: this.$t('enums.headers.actions'),
          value: 'actions'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      getAllUsers: 'users/getAllUsers',
      getMessagesByUserId: 'messages/getMessagesByUserId',
      showToast: 'snackbar/showToastMessage'
    }),
    getUserMessages () {
      this.isLoading = true
      this.getMessagesByUserId({ userid: this.userId }).then(response => {
        this.messagesList = response.data
        this.isLoading = false
      })
    },
    showMessageModal (val) {
      this.message = val
      this.dialog = true
    }
  }
}
</script>

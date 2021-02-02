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
           @click="excelAddUsersModal"
           color="success">
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
      align-center
      class="report-table negotiation-list"
      :headers="headers"
      :options.sync="pages"
      :server-items-length="totalItems"
      :items="negotiationsList"
      :loading="isLoading"
      disable-sort
      >
      <template slot="item" slot-scope="props">
        <tr>
          <td class="data-min-td"> {{ props.item.negotiatorName }} </td>
          <td class="data-min-td"> {{ $t('pages.admin.negotiations.roles.' +
            toLowerCamelCase(props.item.negotiatorType)) }} </td>
          <td class="data-min-td"> {{ props.item.receiverName }} </td>
          <td class="data-min-td">
            <v-btn
              text
              target="_blank"
              color="primary"
              :to="{ name: 'inventory', params: { id: props.item.inventoryId } }">
              {{ props.item.inventoryPageName }}
            </v-btn>
          </td>
          <td class="data-min-td">
            <v-btn
              text
              target="_blank"
              color="primary"
              :to="{
                name: 'advertiserCampaign',
                params: { id: props.item.campaignId },
                query: { advertiserId: props.item.advertiserId }
              }">
              {{ props.item.campaignTitle }}
            </v-btn>
          </td>
          <td class="data-max-td"> {{ $t('enums.campaignCategories.' +
            toLowerCamelCase(props.item.advertiseType)) }} </td>
          <td class="data-min-td"> {{ props.item.suggestedPrice }} </td>
          <td class="data-min-td"> {{ $t('enums.negotiationStatuses.' +
            toLowerCamelCase(props.item.status)) }} </td>
          <td class="data-min-td">
            <v-select
              :placeholder="$t('pages.admin.negotiations.tableHeader.changeStatus')"
              dense
              hide-details
              outlined
              solo
              flat
              :menu-props="{ offsetY: true }"
              :items='getNegotiationActionTypes(props.item.status)'
              @input="e => changeNegotiationState(e, props.item.id)"
            >
            </v-select>
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
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data(){
    return {
      dialog: false
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
  methods: {
    excelAddUsersModal() {
      this.dialog = true
    }
  }
}
</script>

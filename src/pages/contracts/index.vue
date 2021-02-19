<route>
{
  "name": "contracts",
  "meta": {
    "order": 4,
    "isVisible": true,
    "iconName": "mdi-arrow-left",
    "roles": ["Admin"]
  }
}
</route>
<template>
  <div class="mt-3">
    <page-title
      :title="$t('pages.contracts.contractsList')"
    >
    <div
       class="mb-3">
         <v-btn
           to="/contracts/add"
           color="success">
           <v-icon
             class="mr-2"
             small>
             mdi-plus
           </v-icon>
       {{ $t('pages.contracts.add') }}
         </v-btn>
       </div>
    </page-title>
    <v-data-table
      align-center
      class="report-table"
      :headers="headers"
      :options.sync="pages"
      :items="contractsList"
      :loading="isLoading"
      disable-sort
      >
      <template slot="item" slot-scope="props">
        <tr>
          <td class="data-min-td"> {{ props.item.title }} </td>
          <td class="data-min-td"> {{ props.item.contractNumber }} </td>
          <td class="data-min-td"> {{ props.item.counterParty }} </td>
          <td class="data-min-td"> {{ props.item.workshopCode }} </td>
          <td class="data-min-td">
            <v-btn
              :to="'/contracts/edit?id='+ props.item.id"
              small
              outlined
              color="primary"
              >
              {{ $t('enums.tableActions.edit') }}
            </v-btn>
            <v-btn
              small
              outlined
              class="mr-1"
              color="error"
              @click="deleteContractModal(props.item.id)"
              >
              {{ $t('enums.tableActions.delete') }}
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog
      v-model="deleteContractDialog"
      width="700"
      >
      <v-card class="px-3 pb-3">
        <v-card-title class="headline">
          {{ $t('pages.contracts.deleteContractConfirmation.title') }}
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
                v-html="$t('confirms.deleteContractConfirmation')"
                >
              </v-card-text>
            </div>
          </v-layout>
        </v-card>
      </v-card>
      <v-row class="mt-3">
        <v-col class="text-center" :sm="12">
          <v-btn
            :loading="deleteLoading"
            class="mr-3"
            color="success"
            @click="deleteContract"
            >
            {{ $t('pages.contracts.deleteContractBtn') }}
          </v-btn>
        </v-col>
      </v-row>
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
      pages: {},
      deleteContractDialog: false,
      deleteLoading: false,
      contractId: null,
      totalItems: 0,
      isLoading: true,
      contractsList: []
    }
  },
  computed: {
    headers () {
      return [
        {
          text: this.$t('enums.headers.contractTitle'),
          value: 'title'
        },
        {
          text: this.$t('enums.headers.contractNumber'),
          value: 'contractNumber'
        },
        {
          text: this.$t('enums.headers.counterParty'),
          value: 'counterParty'
        },
        {
          text: this.$t('enums.headers.workshopCode'),
          value: 'workshopCode'
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
      getAllContracts: 'contracts/getAllContracts',
      delete: 'contracts/deleteContract',
      showToast: 'snackbar/showToastMessage'
    }),
    loadData () {
      const payload = {
        pageIndex: this.page,
        pageSize: this.pageCount
      }
      this.getAllContracts(payload)
        .then(response => {
          this.contractsList = response.data
          this.isLoading = false
        })
    },
    deleteContractModal (contractId) {
      this.contractId = contractId
      this.deleteContractDialog = true
    },
    deleteContract () {
      this.deleteLoading = true
      const payload = {
        id: this.contractId
      }
      this.delete(payload).then(response => {
        const successMessage = this.$t('toasts.contractDeletedSuccessfully')
        this.showToast({ content: successMessage, color: 'success' })
        this.deleteLoading = false
        this.deleteContractDialog = false
        this.loadData()
      })
    }
  }
}
</script>

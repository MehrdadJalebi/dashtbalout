<route>
{
  "name": "addFileReceipts",
  "meta": {
    "order": 4,
    "isVisible": false,
    "iconName": "mdi-arrow-left"
  }
}
</route>
<template>
  <div>
        <v-card-title>{{$t('pages.fileReceipts.add')}}</v-card-title>
        <v-card
          outlined
          color="orange"
          class="border-box mx-3 mb-3"
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
                  v-html="$t('pages.salariesContracts.noticeText')"
                  >
                </v-card-text>
              </div>
            </v-layout>
          </v-card>
        </v-card>
        <v-row
          class="px-3"
          >
          <v-col
            :sm="6"
            >
            <form-item
              v-model="contract.title"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.contractTitle')"
              :placeholder="$t('enums.placeholders.contractTitle')"
              ></form-item>
          </v-col>
          <v-col
            :sm="3"
            >
            <form-item
              v-model="contract.payrollsType"
              type="select"
              :items="payrollTypesArray"
              icon="mdi-account-circle"
              :label="$t('enums.payrollsType')"
              :placeholder="$t('enums.placeholders.payrollsType')"
              ></form-item>
          </v-col>
          <v-col
            :sm="3"
            >
            <form-item
              v-model="contract.registerationNumber"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.contractRegisterationNumber')"
              :placeholder="$t('enums.placeholders.contractRegisterationNumber')"
              ></form-item>
          </v-col>
        </v-row>
        <v-row
        class="px-3"
          >
          <v-col
            :sm="6"
            >
            <form-item
              v-model="contract.company"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.contractCompany')"
              :placeholder="$t('enums.placeholders.contractCompany')"
              ></form-item>
          </v-col>
          <v-col
            :sm="2"
            >
            <form-item
              v-model="contract.tier"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.contractTier')"
              :placeholder="$t('enums.placeholders.contractTier')"
              ></form-item>
          </v-col>
          <v-col
            :sm="4"
            >
            <form-item
              v-model="contract.factoryCode"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.factoryCode')"
              :placeholder="$t('enums.placeholders.factoryCode')"
              ></form-item>
          </v-col>
        </v-row>
        <v-row
        class="px-3"
          >
          <v-col
            :sm="12"
            >
            <form-item
              v-model="contract.factoryPlace"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.factoryPlace')"
              :placeholder="$t('enums.placeholders.factoryPlace')"
              ></form-item>
          </v-col>
        </v-row>
        <v-row
        class="px-3"
          >
          <v-col
            :sm="12"
            >
            <form-item
              v-model="contract.details"
              type="textarea"
              rows="4"
              icon="mdi-account-circle"
              :label="$t('enums.details')"
              :placeholder="$t('enums.placeholders.details')"
              ></form-item>
          </v-col>
        </v-row>
          <v-card-actions>
            <v-btn
              large
              class="px-5 ml-1 mr-auto"
              color="success"
              >
              {{ $t('pages.salariesContracts.addContractBtn') }}
            </v-btn>
          </v-card-actions>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data(){
    return {
      contract: {},
    }
  },
  computed: {
    ...mapGetters({
      payrollTypesArray: 'enums/payrollTypesArray',
    })
  },
}
</script>

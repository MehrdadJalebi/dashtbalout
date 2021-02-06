<route>
{
  "name": "addUsers",
  "meta": {
    "order": 4,
    "isVisible": false,
    "iconName": "mdi-arrow-left"
  }
}
</route>
<template>
  <div class="mt-5 mx-5">
      <v-card>
        <v-card-title>{{$t('pages.users.add')}}</v-card-title>
        <v-row
        class="px-3"
          >
          <v-col
            :sm="4"
            >
            <form-item
              v-model="user.firstName"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.firstName')"
              :placeholder="$t('enums.placeholders.firstName')"
              ></form-item>
          </v-col>
          <v-col
            :sm="4"
            >
            <form-item
              v-model="user.lastName"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.lastName')"
              :placeholder="$t('enums.placeholders.lastName')"
              ></form-item>
          </v-col>
          <v-col
            :sm="4"
            >
            <form-item
              v-model="user.nationalCode"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.nationalCode')"
              :placeholder="$t('enums.placeholders.nationalCode')"
              ></form-item>
          </v-col>
        </v-row>
        <v-row
        class="px-3"
          >
          <v-col
            :sm="3"
            >
            <form-item
              v-model="user.gender"
              type="select"
              :items="genderArray"
              icon="mdi-account-circle"
              :label="$t('enums.gender')"
              :placeholder="$t('enums.placeholders.gender')"
              ></form-item>
          </v-col>
          <v-col
            :sm="3"
            >
            <form-item
              v-model="user.maritalStatus"
              type="select"
              :items="maritalStatusesArray"
              icon="mdi-account-circle"
              :label="$t('enums.maritalStatus')"
              :placeholder="$t('enums.placeholders.maritalStatus')"
              ></form-item>
          </v-col>
          <v-col
            :sm="3"
            >
            <form-item
              v-model="user.childrensCount"
              type="select"
              :items="childrensCountArray"
              icon="mdi-account-circle"
              :label="$t('enums.childrensCount')"
              :placeholder="$t('enums.placeholders.childrensCount')"
              ></form-item>
          </v-col>
          <v-col
            :sm="3"
            >
            <form-item
              v-model="user.underSupportPersonsCount"
              type="select"
              :items="underSupportPersonsCountArray"
              icon="mdi-account-circle"
              :label="$t('enums.underSupportPersonsCount')"
              :placeholder="$t('enums.placeholders.underSupportPersonsCount')"
              ></form-item>
          </v-col>
        </v-row>
        <v-row
        class="px-3"
          >
          <v-col
            :sm="3"
            >
            <form-item
              v-model="user.personalNumber"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.personalNumber')"
              :placeholder="$t('enums.placeholders.personalNumber')"
              ></form-item>
          </v-col>
          <v-col
            :sm="3"
            >
            <form-item
              v-model="user.employeeStatus"
              type="select"
              :items="employeeStatusesArray"
              icon="mdi-account-circle"
              :label="$t('enums.employeeStatus')"
              :placeholder="$t('enums.placeholders.employeeStatus')"
              ></form-item>
          </v-col>
          <v-col
            :sm="3"
            >
            <form-item
              v-model="user.devotion"
              type="select"
              :items="devotionStatusesArray"
              icon="mdi-account-circle"
              :label="$t('enums.devotion')"
              :placeholder="$t('enums.placeholders.devotion')"
              ></form-item>
          </v-col>
          <v-col
            :sm="3"
            >
            <form-item
              v-model="user.lessDevelopedAreas"
              type="select"
              :items="lessDevelopedAreasArray"
              icon="mdi-account-circle"
              :label="$t('enums.lessDevelopedAreas')"
              :placeholder="$t('enums.placeholders.lessDevelopedAreas')"
              ></form-item>
          </v-col>
        </v-row>
          <v-card-actions>
            <v-btn
              large
              class="px-5 ml-1 mr-auto"
              color="success"
              >
              {{ $t('pages.users.addUserBtn') }}
            </v-btn>
          </v-card-actions>
      </v-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data () {
    return {
      user: {},
      underSupportPersonsCountArray: [],
      childrensCountArray: [],
      devotionStatusesArray: [
        {
          text: this.$t('enums.has'),
          value: true
        },
        {
          text: this.$t('enums.hasnt'),
          value: false
        }
      ],
      lessDevelopedAreasArray: [
        {
          text: this.$t('enums.has'),
          value: true
        },
        {
          text: this.$t('enums.hasnt'),
          value: false
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      userRoleArray: 'enums/userRoleArray',
      genderArray: 'enums/genderArray',
      maritalStatusesArray: 'enums/maritalStatusesArray',
      employeeStatusesArray: 'enums/employeeStatusesArray'
    })
  },
  created () {
    this.childrensCountArray = Array.from({ length: 30 }, (_, i) => ++i)
    this.underSupportPersonsCountArray = Array.from({ length: 30 }, (_, i) => ++i)
  },
  methods: {
    ...mapActions({
      addUser: 'users/addUser'
    }),
    addUser () {

    }
  }
}
</script>

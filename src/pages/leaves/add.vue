<route>
{
  "name": "addLeaves",
  "meta": {
    "order": 4,
    "isVisible": false,
    "iconName": "mdi-arrow-left",
    "roles": ["User", "Admin", "SuperUser"]
  }
}
</route>
<template>
  <div class="mt-5 mx-5">
      <v-card>
        <v-card-title>{{$t('pages.leaves.add')}}</v-card-title>
        <v-row
          class="px-3"
          >
          <v-col
            :sm="8"
            >
            <form-item
              v-model="leave.reason"
              type="textbox"
              icon="mdi-account-circle"
              :label="$t('enums.reason')"
              :rules="[rules.required]"
              :placeholder="$t('enums.placeholders.reason')"
              ></form-item>
          </v-col>
          <v-col
            :sm="4"
            >
            <form-item
              v-model="leave.type"
              type="select"
              :items="leaveTypesArray"
              icon="mdi-account-circle"
              :rules="[rules.required]"
              :label="$t('enums.type')"
              :placeholder="$t('enums.placeholders.type')"
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
                  v-model="leave.startDateTime"
                  icon="mdi-calendar"
                  type="datetime"
                  :rules="[rules.required]"
                  :label="$t('enums.startDateTime')"
                  :placeholder="$t('enums.placeholders.startDateTime')"
                  ></form-item>
              </v-col>
              <v-col
                :sm="6"
                >
                <form-item
                  v-model="leave.endDateTime"
                  icon="mdi-calendar"
                  type="datetime"
                  :rules="[rules.required]"
                  :label="$t('enums.endDateTime')"
                  :placeholder="$t('enums.placeholders.endDateTime')"
                  ></form-item>
              </v-col>
          </v-row>
          <v-card-actions>
            <v-btn
              large
              class="px-5 ml-1 mt-2 mr-auto"
              color="success"
              @click="add"
              >
              {{ $t('pages.leaves.addLeaveBtn') }}
            </v-btn>
          </v-card-actions>
      </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data () {
    return {
      leave: {},
      rules: {
        required: value => !!value || 'این فیلد اجباری است'
      }
    }
  },
  computed: {
    ...mapGetters({
      leaveTypesArray: 'enums/leaveTypesArray'
    })
  },
  methods: {
    ...mapActions({
      addLeave: 'leaves/addLeave',
      showToast: 'snackbar/showToastMessage'
    }),
    add () {
      const start = new Date(this.leave.startDateTime)
      const end = new Date(this.leave.endDateTime)
      var userTimezoneOffset = start.getTimezoneOffset() * 60000

      const payload = {
        type: this.leave.type,
        reason: this.leave.reason,
        startDateTime: new Date(start.getTime() - userTimezoneOffset),
        endDateTime: new Date(end.getTime() - userTimezoneOffset)
      }
      if (this.leave.type && this.leave.reason && this.leave.startDateTime && this.leave.endDateTime) {
        this.addLeave(payload)
          .then(() => {
            const successMessage = this.$t('pages.leaves.requestAddedSuccessfully')
            this.showToast({ content: successMessage, color: 'success' })
            this.$router.push({ name: 'leaves' })
          })
      } else {
        const errorMessage = this.$t('toasts.fillFields')
        this.showToast({ content: errorMessage, color: 'error' })
      }
    }
  }
}
</script>

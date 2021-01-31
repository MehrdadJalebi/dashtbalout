<template>
  <div
     class="chat-component"
    >
    <v-card
      class="rounded-t-0"
      :height="windowHeight - 200">
      <v-row
        no-gutters
        >
        <!-- user and search col -->
        <v-col
          v-if="!chatOnly"
          md="4"
          lg="3"
          :class="selectedUser.userName == '' ? '' : 'd-none d-md-block'"
          >
          <v-card
            outlined
            tile
            :class="$vuetify.breakpoint.lg || $vuetify.breakpoint.xl || $vuetify.breakpoint.md ?
            'chat_left-border' : 'chat_border-0'"
            >
            <!-- search -->
            <v-card
              outlined
              tile
              class="d-flex align-center px-2 chat__header-height chat_bottom-border">
              <v-text-field
                v-model="search"
                :placeholder="$t('pages.chat.searchInChat')"
                flat
                prepend-icon="mdi-magnify"
                hide-details
                height="100%"
                class="pt-0 mt-0 text-caption"
              ></v-text-field>
            </v-card>
            <!-- user -->
            <v-card
              flat
              :height="windowHeight - 250"
              :max-height="windowHeight - 250"
            >
            <vuescroll
              :ops="ops"
            >
              <v-card
                v-for="(user, index) in filteredUserList"
                v-bind:key="index"
                outlined
                tile
                class="chat_bottom-border pa-2"
                v-on:click="getSelectedUser(user)"
                >
                <v-row
                  align="center"
                  no-gutters
                  >
                  <v-col
                    align="right"
                    cols="2"
                    >
                    <v-avatar
                      color="grey lighten-2"
                      >
                      <img
                        :src="avatar(user.avatarImage)"
                      >
                     </v-avatar>
                  </v-col>
                  <v-col
                    class="px-3"
                    cols="7"
                    >
                    <v-card
                      flat
                      color="transparent"
                      class="text-truncate text-body-2"
                      >
                      <span>{{user.name}}</span>
                    </v-card>
                    <v-card
                      flat
                      color="transparent"
                      class="text-truncate chat__details_color text-caption"
                      >
                      <span>{{userMessage(user)}}</span>
                    </v-card>
                  </v-col>
                  <v-col
                    class="pl-1 text-caption"
                    align="left"
                    cols="3"
                    >
                    <span
                      class="chat__details_color">
                      {{dateMessage(user)}}
                    </span>
                  </v-col>
                </v-row>
              </v-card>
            </vuescroll>
            </v-card>
          </v-card>
        </v-col>
        <!-- chat col -->
        <v-col
          :md="chatOnly ? 12 : 8"
          :lg="chatOnly ? 12 : 9"
          :class="selectedUser.userName == '' ? 'd-none d-md-block': ''">
          <v-card
            v-show="selectedUser.userName != ''"
            flat
            :height="windowHeight - 303"
            :max-height="windowHeight - 303"
            color="transparent">
            <!-- selected user header -->
            <v-card
              outlined
              tile
              class="d-flex align-center chat__header-height chat_bottom-border px-2">
              <div>
                <v-avatar
                  class="ml-3"
                  color="grey lighten-2"
                  size="32">
                  <img :src="avatar(selectedUser.avatarImage)" />
                </v-avatar>
                <span>{{selectedUser.name}}</span>
              </div>
              <v-spacer></v-spacer>
              <v-card-actions
                class="d-md-none px-0">
                <v-icon
                  v-if="!chatOnly"
                  large
                  left
                  @click="resetSelectedUser()"
                >
                 mdi-chevron-left
                </v-icon>
              </v-card-actions>
            </v-card>
            <!-- chat box -->
            <v-card
              flat
              color="transparent"
              :max-height="($vuetify.breakpoint.sm || $vuetify.breakpoint.xs) ? windowHeight - 250 : windowHeight - 303"
              :height="($vuetify.breakpoint.sm || $vuetify.breakpoint.xs) ? windowHeight - 250 : windowHeight - 303">
            <vuescroll
              ref="vs"
              :ops="ops"
            >
              <v-container
                v-for="(messagesGroup, index) in selectedUser.messages"
                v-bind:key="index"
                class="pa-1">
                <v-row no-gutters>
                  <v-col cols="4" md="5" class="mt-2">
                    <v-divider></v-divider>
                  </v-col>
                  <v-col align="center" cols="4" md="2" class="text-body-2 chat__details_color">
                    <span>{{(moment(messagesGroup.date).format("jYYYY/jMM/jDD")) === (moment().format("jYYYY/jMM/jDD")) ? $t("pages.chat.today") :  moment(messagesGroup.date).format("jYYYY/jMM/jDD") }}</span>
                  </v-col>
                  <v-col cols="4" md="5" class="mt-2">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>

                <v-row
                  v-for="(message, index) in messagesGroup.messages"
                  v-bind:key="index"
                  no-gutters
                  :class="[!isCurrentUserMessage(message.writer) ? 'flex-row-reverse' : '']"
                  class="d-flex flex-nowrap text-caption px-2 py-4">
                  <v-avatar color="grey lighten-2">
                    <img :src="!isCurrentUserMessage(message.writer) ? avatar(selectedUser.avatarImage) : avatar(userInfo.avatarImage) " />
                  </v-avatar>
                  <v-row
                    no-gutters
                    align="center"
                    :class="[!isCurrentUserMessage(message.writer) ? 'flex-row-reverse' : '']"
                    class="d-flex flex-nowrap mt-5"
                    >
                    <div
                      class="mx-3 rounded-lg"
                      :class="[!isCurrentUserMessage(message.writer) ? 'message-box-in cyan lighten-4 cyan--text text--lighten-4 ' : 'message-box-out grey lighten-2 grey--text text--lighten-2']">
                      <span class="text-pre-wrap grey--text text--darken-3">{{message.text}}</span>
                    </div>
                    <v-icon
                      v-if="isCurrentUserMessage(message.writer)"
                      :color="message.isRead ? 'success' : 'grey'"
                    >
                      mdi-check
                    </v-icon>
                    <span
                      class="grey--text text--darken-1 px-2"
                    >
                      {{moment(message.sendTime).format("hh:mm")}}
                    </span>
                  </v-row>
               </v-row>
              </v-container>
            </vuescroll>
            </v-card>
            <v-footer
              :fixed="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
              padless
              outlined
              class="chat_top-border chat_input-message"
             >
              <v-row
                no-gutters
                align="center"
                height="50"
               >
                <v-textarea
                  ref="msg"
                  :placeholder="$t('pages.chat.typeMessage')"
                  type='text'
                  autofocus
                  no-resize
                  rows="1"
                  :clearable="isEmptyText"
                  hide-details
                  class="pt-0 mt-0 pr-3 chat__details_color text-caption"
                  @keydown.enter.exact.prevent
                  @keydown.enter.exact="sendMessage()"
                  @input="messageText($event)"
                ></v-textarea>
                  <v-btn
                    color="blue darken-2"
                    class="ma-2 white--text send-message--btn"
                    @click="sendMessage()"
                  >
                  <v-icon left dense dark>mdi-send</v-icon>
                    {{$t('pages.chat.sendMessage')}}
                </v-btn>
              </v-row>
            </v-footer>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
/**
 * @name chat component
 * @description
 * @version 1.0.0
 * @author mahsa <mahsa.allahyari71@gmail.com>
 * @event onSendMessage - return user message  array[{userName: 'String', avatarImage:'String',
 lastOnline:'String', messages:[{text:'String', sendTime:'Date', writer:'String', isRead:'Boolean'}]}]
 * @property {Array} [conversationData] - [{userName: 'String', avatarImage:'String',
 lastOnline:'String', messages:[{text:'String', sendTime:'Date', writer:'String', isRead: 'Boolean'}]}]
 * @property {object} [userInfo] - {userName:'String', avataImage:''}
 */
import moment from 'moment-jalaali'
import vuescroll from 'vuescroll'

moment().format('jYYYY/jM/jD')
moment.locale('fa')

export default {
  components: {
    vuescroll
  },
  props: {
    conversationData: {
      type: Array,
      default: () => [],
      required: true
    },
    userInfo: {
      type: Object,
      default: () => ({}),
      required: true
    },
    chatOnly: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      moment: moment,
      selectedUser: {
        name: '',
        userName: '',
        avatarImage: '',
        lastOnline: '',
        messages: ''
      },
      chatText: '',
      search: '',
      lastMessage: '',
      windowHeight: 0,
      sortedUser: '',
      isEmptyText: false,
      ops: {
        vuescroll: {},
        scrollPanel: {
          scrollingX: false,
          speed: 0,
          verticalNativeBarPos: 'left'
        },
        rail: {},
        bar: {
          background: '#c1c1c1',
          opacity: 1
        }
      }
    }
  },
  created () {
    this.sortedUser = this.sortedMessages()
    const firstUser = this.filteredUserList && this.filteredUserList.length > 0
      ? this.filteredUserList[0] : {}
    this.getSelectedUser(firstUser)
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowHeight)
      this.getWindowHeight()
    })
    this.scrollChat()
  },
  watch: {
    conversationData: {
      deep: true,
      handler () {
        this.sortedUser = this.sortedMessages()
      }
    }
  },
  computed: {
    filteredUserList () {
      const term = this.search
      return this.sortedUser.filter(function (user) {
        return user.name.toLowerCase().includes(term.toLowerCase())
      })
    }
  },
  methods: {
    isCurrentUserMessage (writer) {
      return writer === this.userInfo.userName
    },
    resetSelectedUser () {
      this.selectedUser.userName = ''
      this.selectedUser.name = ''
      this.selectedUser.lastOnline = ''
      this.selectedUser.avatarImage = ''
      this.selectedUser.messages = ''
    },
    userMessage (user) {
      const text = user.messages.slice(-1)[0]
        ? user.messages.slice(-1)[0].messages.slice(-1)[0]
          ? user.messages.slice(-1)[0].messages.slice(-1)[0].text
          : ''
        : ''
      return text
    },
    dateMessage (user) {
      const date = user.messages.slice(-1)[0]
        ? user.messages.slice(-1)[0].messages.slice(-1)[0]
          ? user.messages.slice(-1)[0].messages.slice(-1)[0].date
          : null
        : null
      moment(date).format('jYYYY/jMM/jDD')
    },
    avatar (image) {
      return (image !== '' ? image : '/img/samples/user-sample.png')
    },
    messageText (event) {
      return (this.chatText = event)
    },
    getWindowHeight (event) {
      this.windowHeight = document.documentElement.clientHeight
    },
    sortedMessages () {
      const allData = []
      this.conversationData.forEach(val => {
        const groups = val.messages.reduce((groups, message) => {
          const date = new Date(message.sendTime.toDateString())
          if (!groups[date]) {
            groups[date] = []
          }
          groups[date].push(message)
          return groups
        }, {})
        const groupArrays = Object.keys(groups).map((date) => {
          return {
            date,
            messages: groups[date]
          }
        })
        groupArrays.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date)
        })
        groupArrays.forEach(val => {
          val.messages.sort(function (a, b) {
            return new Date(a.sendTime) - new Date(b.sendTime)
          })
        })
        const userData = {
          name: val.name,
          userName: val.userName,
          lastOnline: val.lastOnline,
          avatarImage: val.avatarImage,
          messages: groupArrays
        }
        allData.push(userData)
      })
      return allData.sort(function (a, b) {
        return new Date((b.messages.slice(-1)[0]).messages.slice(-1)[0].sendTime) - new
        Date((a.messages.slice(-1)[0]).messages.slice(-1)[0].sendTime)
      })
    },
    scrollChat () {
      const that = this
      setTimeout(function () {
        that.$refs.vs.scrollTo({ y: '100%' })
      }, 300)
    },
    getSelectedUser (user) {
      this.selectedUser.name = user.name
      this.selectedUser.userName = user.userName
      this.selectedUser.avatarImage = user.avatarImage
      this.selectedUser.messages = user.messages
      this.chatText = ''
      this.scrollChat()
    },
    sendMessage () {
      const msgRef = this.$refs.msg
      if (this.chatText.trim() !== '') {
        const userMessage = {
          name: this.selectedUser.name,
          userName: this.selectedUser.userName,
          lastOnline: this.selectedUser.lastOnline,
          avatarImage: this.selectedUser.avatarImage,
          messages: { text: this.chatText, sendTime: new Date(), writer: this.userInfo.userName }
        }
        this.$emit('sendMessage', userMessage)
        this.chatText = ''
        this.isEmptyText = true
        msgRef.reset()
        this.sortedMessages().forEach(items => {
          if (items.userName === this.selectedUser.userName) {
            this.getSelectedUser(items)
          }
        })
        this.scrollChat()
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getWindowHeight)
  }
}
</script>

<style lang="scss">
  .chat-component {
    .chat_bottom-border {
      border-left: 0;
      border-right: 0;
      border-top: 0;
    }
    .chat_border-0 {
      border: 0;
    }
    .chat_top-border {
      border-left: 0;
      border-right: 0;
      border-bottom: 0;
    }
    .chat_left-border {
      border-right: 0;
      border-top: 0;
      border-bottom: 0;
    }
    .chat__header-height{
      height: 3rem;
    }
    .v-input__control>.v-input__slot:before {
      border-style: none !important;
      border-width: 0 ;
    }
    .v-input__control>.v-input__slot:after {
      border-style: none !important;
      border-width: 0 ;
    }

    .message-box-in {
      max-width : 40rem;
      padding: 6px 10px;
      position: relative;
      align-self: flex-start;
    }

    .message-box-in:after {
      content: "";
      position: absolute;
      border: 10px solid transparent;
      border-bottom: 10px solid;
      border-left: none;
      top: -19px;
      left: 10px;
    }

    .message-box-out {
       max-width: 40rem;
       padding: 6px 10px;
       position: relative;
       align-self: flex-start;
     }

     .message-box-out:after {
       content: "";
       position: absolute;
       border: 10px solid transparent;
       border-bottom: 10px solid;
       border-right: none;
       top: -19px;
       right: 10px;
     }
    .chat__overflow-y-scroll {
      overflow-y: scroll;
    }
    .chat_input-message {
      z-index: 5;
    }
    .text-pre-wrap {
      white-space : pre-wrap;
    }
    .__rail-is-vertical {
      right: auto !important;
      left : 1px;
    }
    .send-message--btn .v-icon {
      transform: rotate(-180deg);
    }
  }
</style>

<route>
{
  "name": "chat",
  "meta": {
    "order": 7,
    "isVisible": false,
    "iconName": "mdi-arrow-left"
  }
}
</route>
<template>
  <div>
    <page-title
      :title="$t('pages.chat.title')"
    ></page-title>
    <chat
      :conversationData="conversationData"
      :userInfo="userInfo"
      :chatOnly="false"
      @sendMessage="message($event)" />
  </div>
</template>
<script>
import faker from '../../node_modules/faker/locale/fa'
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data () {
    return {
      conversationData: [],
      userInfo: {
        UserName: '',
        avatarImage: ''
      }
    }
  },
  methods: {
    message (payload) {
      this.conversationData.forEach((items, index) => {
        if (items.userName === payload.userName) {
          return items.messages.push(payload.messages)
        }
      })
    }
  },
  mounted () {
    this.userInfo.name = faker.name.firstName() + ' ' + faker.name.lastName()
    this.userInfo.userName = faker.name.firstName() + ' ' + faker.name.lastName()
    this.userInfo.avatarImage = faker.image.avatar()
    for (var i = 1; i <= 50; i++) {
      var messagesTemp = []
      for (var j = 1; j <= 100; j++) {
        var randomDate = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000))
        const currentDate = new Date()
        if ((j % 2) === 0) {
          messagesTemp.push({
            text: faker.lorem.sentences(),
            sendTime: randomDate,
            writer: '',
            isRead: !(currentDate.getDate() === randomDate.getDate() && currentDate.getMonth() ===
            randomDate.getMonth() && currentDate.getFullYear() === randomDate.getFullYear())
          })
        } else {
          messagesTemp.push({
            text: faker.lorem.sentences(),
            sendTime: randomDate,
            writer: this.userInfo.userName,
            isRead: !(currentDate.getDate() === randomDate.getDate() && currentDate.getMonth() ===
            randomDate.getMonth() && currentDate.getFullYear() === randomDate.getFullYear())
          })
        }
      }
      this.conversationData.push({
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        userName: faker.name.firstName() + ' ' + faker.name.lastName(),
        lastOnline: faker.date.weekday(),
        avatarImage: faker.image.avatar(),
        messages: messagesTemp
      })
    }
    setTimeout(() => {
      messagesTemp = []
      messagesTemp.push({
        text: faker.lorem.sentences(),
        sendTime: new Date(),
        writer: ''
      })
      this.conversationData.push({
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        userName: faker.name.firstName() + ' ' + faker.name.lastName(),
        lastOnline: faker.date.weekday(),
        avatarImage: faker.image.avatar(),
        messages: messagesTemp
      })
    }, 3000)
  }
}
</script>

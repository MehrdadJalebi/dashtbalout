export default {
  namespaced: true,
  state: {
    profile: {
      name: ' ',
      role: 'USER',
      avatar: '/img/default-avatar.jpg',
      email: ''
    },
    memberTerritoryMenus: [
      {
        title: 'pages.profile.title',
        path: '/profile',
        iconName: 'mdi-cog'
      },
      {
        title: 'pages.logout.title',
        path: '/logout',
        iconName: 'mdi-logout'
      }
    ]
  },
  mutations: {
    updateProfile (state, payload) {
      state.profile = payload
    },
    updateMemberTerritoryMenus (state, payload) {
      state.memberTerritoryMenus = payload
    }
  },
  actions: {
    updateProfile (context, payload) {
      context.commit('updateProfile', payload)
    },
    updateMemberTerritoryMenus (context, payload) {
      context.commit('updateMemberTerritoryMenus', payload)
    }
  }
}

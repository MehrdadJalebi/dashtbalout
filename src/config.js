import fa from './locale/fa'
import en from './locale/en'
import API_JSON from '../public/swagger/openapi.json'

// NOTE: put all applciation config here
export default {
  homeURL: '/',
  locale: 'fa',
  localeDateFormat: 'LL',
  localeDateTimeFormat: 'LLL',
  localeDateString: 'fa-IR',
  locales: {
    fa,
    en
  },
  rtl: true,
  darkTheme: false,
  apiBaseURL: 'https://webapi.asazan.com',
  apiJson: API_JSON,
  brandLogo: '/img/brand-logo.jpeg',
  defaultPagesArtwork: '/img/samples/artwork.png',
  themes: {
    enableChange: false,
    light: {
      headerColor: '#0E1E3D',
      mainContent: '#ffffff',
      sidebarContent: '#182E59',
      formInputColor: '#F3F7F9',
      borderColor: '#E1E7EE',
      authContent: '#0E1E3D'
    },
    dark: {
      headerColor: '#000000',
      mainContent: '#333333',
      sidebarContent: '#222222',
      formInputColor: '#2C2C2C',
      borderColor: '#4E4E4E',
      authContent: '#0E1E3D'
    }
  },
  layout: {
    mainPanelLayout: 'panel',
    twoside: {
      defaultArtworkAspectRatio: 2
    },
    panel: {
      isHeaderDark: false,
      isSidebarDark: true
    }
  },
  validBrowsers: {
    chrome: '>30',
    firefox: '>30',
    ie: '>10',
    edge: '>12',
    safari: '>3.1',
    opera: '>12'
  }
}

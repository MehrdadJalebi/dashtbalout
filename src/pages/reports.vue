<route>
{
  "name": "reports",
  "meta": {
    "order": 4.2,
    "isVisible": false,
    "iconName": "mdi-book"
  }
}
</route>
<template>
  <div>
    <page-title
      :title="$t('pages.reports.title')"
    >
     <v-btn
       outlined
       color="primary">
       <v-icon
         small>
         mdi-plus
       </v-icon>
       {{ faker.commerce.color() }}
     </v-btn>
     <v-btn
       outlined
       class="mx-2"
       color="success">
       <v-icon
         small>
         mdi-filter
       </v-icon>
       {{ faker.commerce.color() }}
     </v-btn>
     <v-btn
       outlined
       color="primary">
       {{ faker.commerce.color() }}
     </v-btn>
    </page-title>
    <filter-box
      @filter="onFilter"
    >
      <filter-item
        v-model="filterBox.campaignType"
        type="select"
        :items="campaignTypes"
        :placeholder="$t('pages.reports.campaignTypePlaceholder')"
        multiple
      ></filter-item>
      <filter-item
        v-model="filterBox.gender"
        type="select"
        :items="genders"
        :placeholder="$t('pages.reports.genderPlaceholder')"
        multiple
      ></filter-item>
      <filter-item
        v-model="filterBox.name"
        type="textbox"
        :placeholder="$t('pages.reports.namePlaceholder')"
        multiple
      ></filter-item>
      <filter-item
        v-model="filterBox.ageRange"
        type="range"
        min="15"
        max="100"
        :placeholder="$t('pages.reports.ageRangePlaceholder')"
      ></filter-item>
    </filter-box>
    <v-data-table
      class="report-table"
      :headers="headers"
      :items="items"
      disable-sort
    >
      <template v-slot:item.email="{ item }">
        <div class="english-number">
          {{ item.email }}
        </div>
      </template>
      <template v-slot:item.show>
        <v-btn
          color="primary"
          depressed
          outlined
          class="float-left"
        >
          {{ $t('pages.reports.show') }}
        </v-btn>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          color="red"
          @click="onDeleteItem(item)"
        >
          mdi-delete
        </v-icon>
        <v-icon
          small
          class="mr-2"
          @click="onEditItem(item)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data () {
    return {
      items: [],
      filterBox: {
        name: null,
        campaignType: null,
        gender: null,
        ageRange: [20, 40]
      }
    }
  },
  computed: {
    headers () {
      return [
        {
          text: this.$t('pages.reports.tableHeader.name'),
          value: 'name'
        },
        {
          text: this.$t('pages.reports.tableHeader.email'),
          value: 'email'
        },
        {
          text: this.$t('pages.reports.tableHeader.amount'),
          value: 'amount'
        },
        {
          text: this.$t('pages.reports.tableHeader.phone'),
          value: 'phone'
        },
        {
          text: this.$t('pages.reports.tableHeader.startDate'),
          value: 'startDate'
        },
        {
          text: this.$t('pages.reports.tableHeader.endDate'),
          value: 'endDate'
        },
        {
          text: this.$t('pages.reports.tableHeader.actions'),
          value: 'actions'
        },
        {
          text: this.$t('pages.reports.tableHeader.show'),
          value: 'show'
        }
      ]
    },
    campaignTypes () {
      return [
        this.$t('pages.reports.campaignTypes.type1'),
        this.$t('pages.reports.campaignTypes.type2'),
        this.$t('pages.reports.campaignTypes.type3'),
        this.$t('pages.reports.campaignTypes.type4'),
        this.$t('pages.reports.campaignTypes.type5'),
        this.$t('pages.reports.campaignTypes.type6')
      ]
    },
    genders () {
      return [
        this.$t('pages.reports.female'),
        this.$t('pages.reports.male')
      ]
    }
  },
  methods: {
    randomDataGenerator (count) {
      return [...Array(count)].map((_, index) => ({
        id: index,
        name: this.faker.name.firstName(),
        email: this.faker.internet.email(),
        amount: this.faker.finance.amount(),
        phone: this.faker.phone.phoneNumber(),
        startDate: this.faker.date.past().toLocaleDateString(this.APP_CONFIG.localeDateString),
        endDate: this.faker.date.future().toLocaleDateString(this.APP_CONFIG.localeDateString)
      }))
    },
    onEditItem (item) {
      console.log('Clicked on edit Item ', item.id)
    },
    onDeleteItem (item) {
      console.log('Clicked on delete Item ', item.id)
    },
    onFilter (payload) {
      console.log(payload)
    }
  },
  created () {
    // set timeout only for loading experience
    setTimeout(
      () => {
        this.items = this.randomDataGenerator(40)
      },
      1000
    )
  }
}
</script>

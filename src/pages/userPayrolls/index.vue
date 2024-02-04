<route>
{
  "name": "userPayrolls",
  "meta": {
    "order": 3,
    "isVisible": true,
    "iconName": "mdi-cash-multiple",
    "roles": ["User", "SuperUser"]
  }
}
</route>
<template>
  <div class="mt-3">
    <page-title
      :title="$t('pages.userPayrolls.payrollsList')"
    >
    </page-title>
    <v-data-table
      align-center
      class="report-table"
      :headers="headers"
      :hide-default-header="isMobile"
      :options.sync="pages"
      :items="payrollsList"
      :loading="isLoading"
      disable-sort
      >
      <template slot="item" slot-scope="props">
        <tr>
          <td class="data-min-td min-20"> {{ props.item.title }} </td>
          <td class="data-min-td"> {{ props.item.contractNumber}} </td>
          <td class="data-min-td"> {{ props.item.payrollType}} </td>
          <td class="data-min-td"> {{ props.item.year }} </td>
          <td class="data-min-td"> {{ props.item.month}} </td>
          <td class="data-min-td">
            <v-btn
              small
              class="px-1"
              color="primary"
              @click="downloadPayroll(props.item)"
              >
              <v-icon
                small>
                mdi-download
              </v-icon>
              {{ $t('enums.downloadPayroll') }}
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: APP_CONFIG.layout.mainPanelLayout,
  data () {
    return {
      pages: {},
      totalItems: 0,
      isLoading: false,
      payrollsList: [],
      userList: []
    }
  },
  computed: {
    ...mapGetters({
      userId: 'auth/userId',
      monthsArray: 'enums/monthsArray'
    }),
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
          text: this.$t('enums.headers.payrollType'),
          value: 'payrollType'
        },
        {
          text: this.$t('enums.headers.year'),
          value: 'year'
        },
        {
          text: this.$t('enums.headers.month'),
          value: 'month'
        },
        {
          text: this.$t('enums.headers.actions'),
          value: ''
        }
      ]
    },
    isMobile () {
      return window.innerWidth < 767
    }
  },
  created () {
    this.getUserPayrolls()
  },
  methods: {
    ...mapActions({
      getPayrolls: 'payrolls/getPayrolls',
      showToast: 'snackbar/showToastMessage',
      ticket: 'cdn/ticket',
      download: 'cdn/download',
      getExcel: 'cdn/getExcel'
    }),
    getUserPayrolls () {
      this.isLoading = true
      this.getPayrolls().then(response => {
        this.isLoading = false
        this.payrollsList = response.data
      })
    },
    downloadPayroll (item) {
      if (item.payrollType === 'Excel') {
        this.getExcelData(item)
      } else {
        this.downloadImage(item)
      }
    },
    getExcelData (item) {
      this.isLoading = true
      const payload = {
        year: item.year,
        month: this.getMonthNumber(item.month),
        contractId: item.contractId,
        userId: this.userId
      }
      this.getExcel(payload)
        .then(({ data }) => {
          this.downloadExcel(data, item).then(() => {
            this.isLoading = false
          })
        })
    },
    downloadExcel (row, item) {
      const htmlContent = this.generatePayroll(row, item)
      document.body.appendChild(htmlContent)
      return this.$html2canvas(htmlContent, {
        type: 'dataURL',
        allowTaint: true,
        useCORS: true,
        width: 745
      }).then((canvas) => {
        document.body.removeChild(htmlContent)
        const link = document.createElement('a')
        link.href = canvas
        link.download = `${this.userId}-${item.month}-${item.year}-${item.contractNumber}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    },
    generatePayroll (row, item) {
      const pays = []; const minuses = []; let collectedRows = ''
      let nn, wt, spaid, sminus, spure
      row.items.forEach((i) => {
        if (i.columnId === 1) {
          nn = i
        } else if (i.columnId === 5) {
          wt = i
        } else if (i.columnId === 18) {
          spaid = i
        } else if (i.columnId === 19) {
          sminus = i
        } else if (i.columnId === 20) {
          spure = i
        }
      })
      row.items.forEach(i => {
        if (i.columnId === 6) {
          pays.push(`
        <td>${i.columnTitle}</td>
        <td style="text-align:center">${wt.columnValue}:00:00</td>
        <td>${i.columnValue}</td>
          `)
        } else if (i.columnType === 'Pay') {
          pays.push(`
        <td>${i.columnTitle}</td>
        <td></td>
        <td>${i.columnValue}</td>
          `)
        } else if (i.columnType === 'Minus') {
          minuses.push(`
          <td>${i.columnTitle}</td>
          <td></td>
          <td>${i.columnValue}</td>
          <td></td>
        `)
        }
      })
      const maxLength = Math.max(pays.length, minuses.length)
      for (let i = 0; i < maxLength; i++) {
        collectedRows += '<tr>'
        if (pays[i]) {
          collectedRows += pays[i]
        } else {
          collectedRows += '<td></td><td></td><td></td>'
        }
        if (minuses[i]) {
          collectedRows += minuses[i]
        } else {
          collectedRows += '<td></td><td></td><td></td><td></td>'
        }
        collectedRows += '</tr>'
      }
      const payrollContent = document.createElement('div')
      payrollContent.id = 'payroll-content'
      payrollContent.innerHTML = `
<!doctype html><html lang="en-US"><head><meta charset="UTF-8"><title>Working with elements</title><style>.logo{width:300px;text-align:center;padding:10px;margin-right:auto}.payroll-body{width:793px!important;height:600px;font-size:13px!important;border:1px solid #000;direction:ltr}.title{width:250px;font-weight:700;text-align:center;margin-right:auto;padding-top:10px}.page{width:250px;padding-top:20px;padding-left:20px;padding-right:60px;text-align:right;margin-right:auto;direction:rtl!important}.desc{width:793px;padding-top:20px;direction:rtl;text-align:center}.payroll-col{text-align:right;direction:rtl;padding-right:10px;margin-right:0}table.payroll-content{margin:10px 0 10px 20px;direction:rtl;text-align:right;font-family:arial,sans-serif;border-collapse:collapse;width:700px;height:500px}.payroll-content th{background-color:#dce1dc;font-size:13px}.payroll-content td,.payroll-content th{border:1px solid #ddd;direction:rtl;padding:8px}.payroll-content td{text-align:right}.payroll-content th{text-align:center}.dir-rtl{direction:rtl}.payroll-content tr:nth-child(even){background-color:#f4f6f5}.sum td{background-color:#fbf4da}.text-left{text-align:left!important}</style></head><body class="payroll-body"><div style="display:flex;justify-content:space-between;width:793px"><div class="page"><div><span>تاریخ تهیه</span><span>:</span>&nbsp ${item.year}/${this.getMonthNumber(item.month)}/1</div><div><span style="padding-right:5px">صفحه</span><span>:</span>&nbsp 1/1</div></div><div class="title"><h3>شرکت قادر گستران آریا ۱<br>صورتحساب حقوق</h3><span>${item.month} ماه ${item.year}</span></div><div class="logo"><img src="img/Logo.png" height="150" alt="لوگو"></div></div><div class="desc"><div style="width:45%;display:inline-block"><div class="payroll-col"><span>نام و نام خانوادگی</span><span>:</span>&nbsp ${row.firstName} ${row.lastName}</div><div class="payroll-col"><span>شماره پرسنلی</span><span>:</span>&nbsp ${row.personnelNumber}</div></div><div style="width:35%;display:inline-block"><div class="payroll-col"><span>${nn.columnTitle}</span><span>:</span>&nbsp ${nn.columnValue}</div><div class="payroll-col"><span>حساب</span><span>:</span>&nbsp ${row.account}</div></div></div><table class="payroll-content"><tr><th>پرداختها</th><th>مدت<br>د &nbsp س &nbsp ر</th><th>ریال</th><th>کسور</th><th>مدت<br>د &nbsp س &nbsp ر</th><th>ریال</th><th>ملاحظات</th></tr>${collectedRows}<tr class="sum"><td colspan="2" class="text-left">${spaid.columnTitle}</td><td>${spaid.columnValue}</td><td colspan="2" class="text-left">${sminus.columnTitle}</td><td colspan="2">${sminus.columnValue}</td></tr><tr class="sum"><td class="text-left" colspan="5">${spure.columnTitle}</td><td colspan="2">${spure.columnValue}</td></tr></table><div style="height:30px"></div></body></html>
      `
      return payrollContent
    },
    getMonthNumber (text) {
      return this.monthsArray.find((month) => month.text === text).value
    },
    downloadImage ({ fileId }) {
      const payload = {
        fileid: fileId
      }
      this.ticket(payload).then(response => {
        const filePath = response.data
        const a = document.createElement('A')
        a.href = filePath
        a.download = filePath.substr(filePath.lastIndexOf('/') + 1)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
    }
  }
}
</script>

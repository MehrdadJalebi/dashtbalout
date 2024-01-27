<route>
{
  "name": "payrolls",
  "meta": {
    "order": 3,
    "isVisible": true,
    "iconName": "mdi-cash-multiple",
    "roles": ["Admin"]
  }
}
</route>
<template>
  <div class="mt-3">
    <page-title
      :title="$t('pages.payrolls.payrollsList')"
    >
    <div
       class="mb-3">
         <v-btn
           class="ml-2 mb-2 w-sm-100"
          color="error"
           @click="deleteGroupPayrollModal">
           <v-icon
             class="ml-2"
             small>
             mdi-delete
           </v-icon>
       {{ $t('pages.payrolls.deleteGroupPayrollBtn') }}
         </v-btn>
         <v-btn
          class="ml-2 mb-2 w-sm-100"
           to="/payrolls/add"
           color="success">
           <v-icon
             class="ml-2"
             small>
             mdi-plus
           </v-icon>
       {{ $t('pages.payrolls.add') }}
         </v-btn>
         <v-btn
          class="ml-2 mb-2 w-sm-100"
           to="/payrolls/addGroup"
           color="success">
           <v-icon
             class="ml-2"
             small>
             mdi-plus
           </v-icon>
       {{ $t('pages.payrolls.addGroup') }}
         </v-btn>
         <v-btn
          class="mb-2 w-sm-100"
           to="/payrolls/addExcelGroup"
           color="success">
           <v-icon
             class="ml-2"
             small>
             mdi-plus
           </v-icon>
       {{ $t('pages.payrolls.addExcelGroup') }}
         </v-btn>
    </div>
    </page-title>
    <v-card class="mt-5 mb-5">
        <v-row
          class="px-3"
          >
          <v-col
            :sm="6"
            >
            <form-item
              v-model="userid"
              type="autocomplete"
              :items="userList"
              icon="mdi-account-circle"
              :label="$t('enums.userList')"
              :placeholder="$t('enums.placeholders.userList')"
              ></form-item>
          </v-col>
          <v-col
            v-if="userListLoading"
            class="d-flex align-self-center mt-5"
            :sm="1"
            >
            <v-progress-circular
              indeterminate
              color="primary"
              :value="20"
              />
          </v-col>
          <v-col
            :sm="12"
            >
            <v-btn
              large
              class="px-5 ml-1 mr-auto"
              color="primary"
              @click="getUserPayrolls"
              >
              {{ $t('enums.getUserPayrolls') }}
            </v-btn>
          </v-col>
        </v-row>
    </v-card>
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
            <div class="d-flex justify-around">
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
            <v-btn
              small
              class="px-1 mr-1"
              color="error"
              @click="deletePayrollModal(props.item.fileId)"
              >
              <v-icon
                small>
                mdi-delete
              </v-icon>
              {{ $t('enums.tableActions.delete') }}
            </v-btn>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog
      v-model="deletePayrollDialog"
      width="800"
      >
      <v-card class="px-3 pb-3">
        <v-card-title class="headline">
          {{ $t('pages.payrolls.deletePayrollConfirmation.title') }}
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
                v-html="$t('confirms.deletePayrollConfirmation')"
                >
              </v-card-text>
            </div>
          </v-layout>
        </v-card>
      </v-card>
      <v-row class="mt-3">
        <v-col class="text-center" :sm="12">
          <v-btn
            class="mr-3"
            color="error"
            @click="deletePayrollDialog = false"
            >
            {{ $t('enums.cancel') }}
          </v-btn>
          <v-btn
            :loading="deleteLoading"
            class="mr-3"
            color="success"
            @click="deletePayroll"
            >
            {{ $t('pages.payrolls.deletePayrollBtn') }}
          </v-btn>
        </v-col>
      </v-row>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteGroupPayrollDialog"
      width="700"
      >
      <v-card class="px-3 pb-3">
        <v-card-title class="headline">
          {{ $t('pages.payrolls.deleteGroupPayrollConfirmation.title') }}
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
                v-html="$t('confirms.deleteGroupPayrollConfirmation')"
                >
              </v-card-text>
            </div>
          </v-layout>
        </v-card>
          <v-layout
            justify-right
            align-center
            class="pa-2"
            >
            <v-row
              class="px-3 mb-2"
              >
              <v-col :sm="4">
                <form-item
                  v-model="payrollToDelete.contractId"
                  type="autocomplete"
                  :items="contractsList"
                  :rules="[rules.required]"
                  icon="mdi-account-circle"
                  :label="$t('enums.contractTitle')"
                  :placeholder="$t('enums.placeholders.contractTitle')">
                </form-item>
              </v-col>
              <v-col
                :sm="4"
                >
                <form-item
                  v-model="payrollToDelete.month"
                  type="select"
                  :items="monthsArray"
                  :rules="[rules.required]"
                        icon="mdi-calendar"
                  :label="$t('enums.month')"
                  :placeholder="$t('enums.placeholders.month')"
                  ></form-item>
              </v-col>
                <v-col
                  :sm="4"
                  >
                  <form-item
                    v-model="payrollToDelete.year"
                    type="select"
                    :items="yearsArray"
                    :rules="[rules.required]"
                    icon="mdi-calendar"
                    :label="$t('enums.year')"
                    :placeholder="$t('enums.placeholders.year')"
                    ></form-item>
            </v-col>

          </v-row>
          </v-layout>
      </v-card>
      <v-row class="mt-3">
        <v-col class="text-center" :sm="12">
          <v-btn
            class="mr-3"
            color="error"
            @click="deleteGroupPayrollDialog = false"
            >
            {{ $t('enums.cancel') }}
          </v-btn>
          <v-btn
            :loading="deleteGroupLoading"
            class="mr-3"
            :disabled="!isDeleteGroupPayrollValid"
            color="success"
            @click="deleteGroupPayroll"
            >
            {{ $t('pages.payrolls.deleteGroupPayrollConfirmationBtn') }}
          </v-btn>
        </v-col>
      </v-row>
      </v-card>
    </v-dialog>
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
      contractsList: [],
      userList: [],
      payrollToDelete: {
        month: null,
        year: null,
        contractId: null
      },
      userid: null,
      fileId: null,
      deleteLoading: false,
      deleteGroupLoading: false,
      deletePayrollDialog: false,
      deleteGroupPayrollDialog: false,
      rules: {
        required: value => !!value || 'این فیلد اجباری است'
      },
      yearsArray: [1395, 1396, 1397, 1398, 1399, 1400, 1401, 1402, 1403, 1403, 1404, 1405, 1406,
        1407, 1408, 1409],
      imageSrc: ''
    }
  },
  computed: {
    ...mapGetters({
      monthsArray: 'enums/monthsArray',
      allUsers: 'users/users',
      config: 'auth/config',
      hasUsersSucceeded: 'users/hasUsersSucceeded'
    }),
    isDeleteGroupPayrollValid () {
      return Object.keys(this.payrollToDelete).filter(key => this.payrollToDelete[key] === null ||
         this.payrollToDelete[key] === undefined || this.payrollToDelete[key] === '').length === 0
    },
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
    userListLoading () {
      return !this.hasUsersSucceeded
    },
    isMobile () {
      return window.innerWidth < 767
    }
  },
  watch: {
    allUsers: {
      handler () {
        this.setUserList()
      },
      deep: true
    },
    config (val) {
      this.imageSrc = val.logo
    }
  },
  created () {
    if (this.allUsers.length) {
      this.setUserList()
    }
    this.getContractsLists()
  },
  methods: {
    ...mapActions({
      getPayrollByUserId: 'payrolls/getPayrollByUserId',
      delete: 'payrolls/delete',
      deleteGroupPayrolls: 'payrolls/deleteGroupPayrolls',
      showToast: 'snackbar/showToastMessage',
      ticket: 'cdn/ticket',
      getExcel: 'cdn/getExcel',
      getAllContracts: 'contracts/getAllContracts',
      download: 'cdn/download'
    }),
    getUserPayrolls () {
      this.isLoading = true
      const userIdPayload = {
        userid: this.userid
      }
      this.getPayrollByUserId(userIdPayload).then(response => {
        this.isLoading = false
        this.payrollsList = response.data
      })
    },
    getContractsLists () {
      const payload = {
        pageIndex: 1,
        pageSize: 1000
      }
      this.getAllContracts(payload)
        .then(({ data }) => {
          this.contractsList = data.map(contract => {
            return { text: contract.title, value: contract.id }
          })
          this.isLoading = false
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
        userId: this.userid
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
        useCORS: true
      }).then((canvas) => {
        document.body.removeChild(htmlContent)
        const link = document.createElement('a')
        link.href = canvas
        link.download = `${this.userid}-${item.month}-${item.year}-${item.contractNumber}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    },
    generatePayroll (row, item) {
      let nn, wt, sl, wy, cr, hc, cc, sc, ot, hv, hs, cm, iu, tx, spaid, sminus, spure
      row.items.forEach((i) => {
        if (i.columnId === 1) {
          nn = i
        // } else if (i.columnId === 4) {
        //   wp = i
        } else if (i.columnId === 5) {
          wt = i
        } else if (i.columnId === 6) {
          sl = i
        } else if (i.columnId === 7) {
          wy = i
        } else if (i.columnId === 8) {
          cr = i
        } else if (i.columnId === 9) {
          hc = i
        } else if (i.columnId === 10) {
          cc = i
        } else if (i.columnId === 11) {
          sc = i
        } else if (i.columnId === 12) {
          ot = i
        } else if (i.columnId === 13) {
          hv = i
        } else if (i.columnId === 14) {
          hs = i
        } else if (i.columnId === 15) {
          cm = i
        } else if (i.columnId === 16) {
          iu = i
        } else if (i.columnId === 17) {
          tx = i
        } else if (i.columnId === 18) {
          spaid = i
        } else if (i.columnId === 19) {
          sminus = i
        } else if (i.columnId === 20) {
          spure = i
        }
      })
      const payrollContent = document.createElement('div')
      payrollContent.id = 'payroll-content'
      payrollContent.innerHTML = `
      <!doctype html><html lang="en-US"><head><meta charset="UTF-8"><title>Working with elements</title><style>.logo{width:33%;text-align:center;padding:10px}.payroll-body{width:793px!important;height:600px;font-size:13px!important;border:1px solid #000}.title{width:33%;font-weight:700;text-align:center;margin-right:auto;margin-left:auto;padding-top:10px}.page{width:33%;padding-top:20px;padding-left:20px;text-align:right;margin-right:auto;direction:rtl!important}.desc{padding-top:20px;direction:rtl;text-align:center}.payroll-col{text-align:right;padding-right:40px;direction:rtl;margin-right:100px}@media screen and (max-width:1200px){.payroll-col{padding-right:10px;margin-right:0px}}table.payroll-content{margin:10px auto 40px;direction:rtl;text-align:right;font-family:arial,sans-serif;border-collapse:collapse;width:90vw;height:500px}.payroll-content th{background-color:#dce1dc;font-size:13px}.payroll-content td,.payroll-content th{border:1px solid #ddd;direction:rtl;padding:8px}.payroll-content td{text-align:right}.payroll-content th{text-align:center}.dir-rtl{direction:rtl}.payroll-content tr:nth-child(even){background-color:#f4f6f5}.sum td{background-color:#fbf4da}.text-left{text-align:left!important}</style></head><body class="payroll-body"><div style="display:flex;justify-content:space-between"><div class="page"><div><span>تاریخ تهیه</span><span>:</span>&nbsp ${item.year}/${this.getMonthNumber(item.month)}/1</div><div><span style="padding-right:5px">صفحه</span><span>:</span>&nbsp 1/1</div></div><div class="title"><h3>شرکت قادر گستران آریا ۱<br>صورتحساب حقوق</h3><span>${item.month} ماه ${item.year}</span></div><div class="logo"><img src="img/Logo.png" height="150" alt="لوگو"></div></div><div class="desc"><div style="width:40%;display:inline-block"><div class="payroll-col"><span>نام و نام خانوادگی</span><span>:</span>&nbsp ${row.firstName} ${row.lastName}</div><div class="payroll-col"><span>شماره پرسنلی</span><span>:</span>&nbsp ${row.personnelNumber}</div></div><div style="width:35%;display:inline-block"><div class="payroll-col"><span>${nn.columnTitle}</span><span>:</span>&nbsp ${nn.columnValue}</div><div class="payroll-col"><span>حساب</span><span>:</span>&nbsp ${row.account}</div></div></div><table class="payroll-content"><tr><th>پرداختها</th><th>مدت<br>د &nbsp س &nbsp ر</th><th>ریال</th><th>کسور</th><th>مدت<br>د &nbsp س &nbsp ر</th><th>ریال</th><th>ملاحظات</th></tr><tr><td>${sl.columnTitle}</td><td style="text-align:center">${wt.columnValue}:00:00</td><td>${sl.columnValue}</td><td>${iu.columnTitle}</td><td></td><td>${iu.columnValue}</td><td></td></tr><tr><td>${wy.columnTitle}</td><td></td><td>${wy.columnValue}</td><td>${cm.columnTitle}</td><td></td><td>${cm.columnValue}</td><td></td></tr><tr><td>${cr.columnTitle}</td><td></td><td>${cr.columnValue}</td><td>${tx.columnTitle}</td><td></td><td>${tx.columnValue}</td><td></td></tr><tr><td>${hc.columnTitle}</td><td></td><td>${hc.columnValue}</td><td></td><td></td><td></td><td></td></tr><tr><td>${cc.columnTitle}</td><td></td><td>${cc.columnValue}</td><td></td><td></td><td></td><td></td></tr><tr><td>${sc.columnTitle}</td><td></td><td>${sc.columnValue}</td><td></td><td></td><td></td><td></td></tr><tr><td>${ot.columnTitle}</td><td></td><td>${ot.columnValue}</td><td></td><td></td><td></td><td></td></tr><tr><td>${hv.columnTitle}</td><td></td><td>${hs.columnValue}</td><td></td><td></td><td></td><td></td></tr><tr><td>${cm.columnTitle}</td><td></td><td>${cm.columnValue}</td><td></td><td></td><td></td><td></td></tr><tr class="sum"><td colspan="2" class="text-left">${spaid.columnTitle}</td><td>${spaid.columnValue}</td><td colspan="2" class="text-left">${sminus.columnTitle}</td><td colspan="2">${sminus.columnValue}</td></tr><tr class="sum"><td class="text-left" colspan="5">${spure.columnTitle}</td><td colspan="2">${spure.columnValue}</td></tr></table><div style="height:30px"></div></body></html>`
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
    },
    deletePayrollModal (fileId) {
      this.fileId = fileId
      this.deletePayrollDialog = true
    },
    deleteGroupPayrollModal () {
      this.deleteGroupPayrollDialog = true
    },
    deletePayroll () {
      this.deleteLoading = true
      const payload = {
        fileid: this.fileId
      }
      this.delete(payload).then(response => {
        const successMessage = this.$t('pages.payrolls.payrollDeletedSuccessfully')
        this.showToast({ content: successMessage, color: 'success' })
        this.deleteLoading = false
        this.deletePayrollDialog = false
        this.getUserPayrolls()
      })
    },
    deleteGroupPayroll () {
      this.deleteGroupPayrollDialog = false
      this.isLoading = true
      this.deleteGroupPayrolls(this.payrollToDelete).then(response => {
        this.isLoading = false
        const successMessage = this.$t('pages.payrolls.payrollGroupDeletedSuccessfully')
        this.showToast({ content: successMessage, color: 'success' })
      })
    },
    setUserList () {
      this.userList = this.allUsers.map(user => {
        return { text: user.fullName, value: user.id }
      })
    }
  }
}
</script>
<style lang="scss">
.v-btn {
  letter-spacing: 0;
}
</style>

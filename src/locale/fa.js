import { fa } from 'vuetify/lib/locale'

export default {
  ...fa,

  components: {
    copyRight: {
      copyRight: 'تمامی حقوق برای دیما محفوظ است \u00A9 1399'
    },
    passwordVerification: {
      title: 'تایید کلمه عبور فعلی',
      password: 'کلمه عبور',
      passwordPlaceholder: '********',
      buttonTitle: 'تایید کلمه عبور',
      passwordRequired: 'کلمه عبور فعلی الزامی‌است',
      passwordValidation: 'حداقل تعداد کاراکتر مجاز کلمه عبور 8 کاراکتر می‌باشد'
    },
    formHelpBox: {
      send: 'ارسال'
    },
    login: {
      userName: 'نام کاربری',
      email: 'پست الکترونیک',
      password: 'کلمه عبور',
      login: 'ورود',
      rememberMe: 'مرا به خاطر بسپار',
      forgotPassword: 'کلمه عبور را فراموش کرده اید!',
      notRegister: 'هنوز ثبت نام نکرده اید!',
      register: 'ثبت نام کنید',
      emailPlaceholder: 'email@example.com',
      passwordPlaceholder: '********',
      passwordRequired: 'کلمه عبور الزامی است',
      emailRequired: 'پست الکترونیکی الزامی است',
      emailValidation: 'فرمت پست الکترونیکی صحیح نیست'
    },
    register: {
      title: 'ثبت نام',
      password: 'کلمه عبور',
      register: 'ثبت نام',
      userName: 'نام کاربری',
      login: 'وارد شوید',
      haveAccount: 'حساب کاربری دارید؟',
      legalPerson: 'شخص حقوقی',
      realPerson: 'شخص حقیقی',
      phoneNumber: 'شماره موبایل',
      nationalCode: 'شماره ملی',
      email: 'پست الکترونیک',
      emailPlaceholder: 'email@example.com',
      name: 'نام',
      nameRequired: 'نام الزامی است',
      lastName: 'نام خانوادگی',
      lastNameRequired: 'نام خانوادگی الزامی است',
      rules: 'با قوانین و مقررات موافقم',
      rulesRequired: 'پذیرش قوانین و مقررات الزامی است',
      passwordInvalid: 'حداقل تعداد کاراکتر برای کلمه عبور 8 کاراکتر است',
      passwordPlaceholder: '********',
      phoneNumberPlaceholder: '**** *** **09',
      passwordRequired: 'کلمه عبور الزامی است',
      phoneNumberRequired: 'شماره موبایل الزامی است',
      nationalCodeRequired: 'شماره ملی الزامی است',
      userNameRequired: 'نام کاربری الزامی است',
      emailRequired: 'پست الکترونیکی الزامی است',
      passwordValidation: 'حداقل تعداد کاراکتر برای کلمه عبور ۸ کاراکتر است',
      emailValidation: 'فرمت پست الکترونیکی اشتباه است',
      emailStatus: 'پست الکترونیکی شما به عنوان نام کاربری بوده و غیر قابل تغییر است',
      phoneNumberValidation: 'فرمت شماره موبایل اشتباه است',
      phoneNumberCountValidation: 'شماره موبایل باید 11 رقمی باشد',
      nationalCodeCountValidation: 'شماره ملی باید 10 رقمی باشد',
      nameValidation: 'لطفا نام را با حروف فارسی وارد کنید',
      lastNameValidation: 'لطفا نام خانوادگی را با حروف فارسی وارد کنید'
    },
    forgotPassword: {
      title: 'بازیابی کلمه عبور',
      email: 'پست الکترونیکی',
      password: 'کلمه عبور',
      newPassword: 'کلمه عبور جدید',
      phoneNumber: 'شماره موبایل',
      pin: 'پین کد',
      back: 'لغو',
      passwordRecovery: 'بازیابی کلمه عبور',
      notRegister: 'هنوز ثبت نام نکرده اید ! ',
      register: 'ثبت نام کنید',
      emailPlaceholder: 'email@example.com',
      passwordRecoveryDetails: 'لینک بازیابی کلمه عبور به پست الکترونیک شما ارسال شده است . برای تغییر کلمه عبور لطفا به توضیحاتی که در پست الکترونیک آمده است توجه کنید .',
      passwordValidation: 'حداقل تعداد کاراکتر برای کلمه عبور ۸ کاراکتر است',
      pinValidation: 'فقط اعداد برای پین کد قابل قبول است',
      passwordRequired: 'کلمه عبور الزامی است',
      changePassword: 'تغییر کلمه عبور',
      pinRequired: 'پین کد الزامی است',
      phoneNumberRequired: 'شماره موبایل الزامی است',
      phoneNumberValidation: 'فرمت شماره موبایل اشتباه است',
      repeatNewPassword: 'تکرار کلمه عبور جدید',
      passwordPlaceholder: '********',
      emailRequired: 'پست الکترونیکی الزامی است',
      emailValidation: 'فرمت پست الکترونیکی صحیح نیست'
    },
    changePassword: {
      title: 'تغییر گذرواژه',
      changePassword: 'تغییر کلمه عبور',
      newPassword: 'کلمه عبور جدید',
      repeatNewPassword: 'تکرار کلمه عبور جدید',
      passwordPlaceholder: '********',
      passwordRequired: 'کلمه عبور جدید الزامی است',
      newPasswordRequired: 'تکرار کلمه عبور جدید الزامی است',
      passwordValidation: 'حداقل تعداد کاراکتر برای کلمه عبور 8 کاراکتر است',
      newPasswordValidation: 'کلمه عبور با تکرار کلمه عبور یکسان نیست'
    },
    filterBox: {
      fromDate: 'از تاریخ',
      toDate: 'تا تاریخ',
      buttonText: 'فیلتر کردن',
      cancelButtonText: 'پاک کردن'
    },
    underConstruction: {
      title: 'در حال ساخت',
      description: 'این بخش در حال ساخت میباشد.'
    },
    formItem: {
      selectAllPlaceholder: 'انتخاب همه'
    },
    formItemFileInput: {
      selectLabel: 'انتخاب فایل'
    }
  },
  pages: {
    confirmModal: {
      title: 'مودال تایید اطلاعات',
      confirmTitle: 'آیا از حذف آیتم مورد نظر مطمئن می‌باشید؟',
      confirmMessage: 'با حذف این گزینه دیگر امکان دسترسی به اطلاعات حذف شده نمی باشد',
      confirm: 'بله، مطمئن هستم',
      cancel: 'انصراف',
      showModal: 'نمایش مودال'
    },
    admin: {
      title: 'صفحات مدیریت'
    },
    passwordVerification: {
      title: 'تایید گذر واژه فعلی'
    },
    formHelpBox: {
      title: 'صفحه راهنمایی'
    },
    portal: {
      title: 'پرتال'
    },
    server: {
      title: 'سرور'
    },
    stepper: {
      title: 'گام شمار',
      formNameLabel: 'نام کمپین',
      formNamePlaceholder: 'نام',
      formNameRuleRequired: 'نام الزامی می باشد',
      formNameRuleMaxLength: 'حداکثر تعداد کاراکتر مجاز ۱۰ می باشد',
      formDescLabel: 'شرح کمپین',
      formDescPlaceholder: 'توضیحات',
      formAgreeLabel: 'تایید',
      formAgreementRuleRequired: 'قبول شرایط الزامی است',
      startButtonText: 'ثبت کمپین',
      nextButtonText: 'ادامه',
      previousButtonText: 'مرحله قبل',
      finishButtonText: 'ثبت کمپین',
      step1: 'مرحله اول',
      step2: 'تکمیل مشخصات',
      step3: 'مرحله پایانی',
      tableHeader: {
        name: 'نام صفحه',
        cost: 'قیمت (تومان)',
        followers: 'تعداد دنبال کننده',
        userEngagement: 'نرخ مشارکت کاربران',
        select: ''
      },
      selectPage: 'انتخاب صفحه'
    },
    profile: {
      title: 'حساب کاربری'
    },
    logout: {
      title: 'خروج از حساب'
    },
    reports: {
      title: 'گزارش',
      tableHeader: {
        name: 'نام',
        email: 'ایمیل',
        amount: 'مقدار',
        phone: 'شماره تماس',
        startDate: 'تاریخ شروع',
        endDate: 'تاریخ پایان',
        actions: 'عملیات',
        show: ''
      },
      campaignTypes: {
        type1: 'نوع ۱',
        type2: 'نوع ۲',
        type3: 'نوع ۳',
        type4: 'نوع ۴',
        type5: 'نوع ۵',
        type6: 'نوع ۶'
      },
      show: 'نمایش جزییات',
      campaignTypePlaceholder: 'نوع کمپین',
      namePlaceholder: 'نام کمپین',
      genderPlaceholder: 'جنسیت',
      ageRangePlaceholder: 'بازه سنی',
      female: 'زن',
      male: 'مرد'
    },
    about: {
      title: 'درباره ما'
    },
    changes: {
      title: 'تغییرات'
    },
    dashboard: {
      title: 'داشبورد'
    },
    datepicker: {
      title: 'انتخابگر زمان'
    },
    forgotpass: {
      title: 'فراموشی رمز عبور'
    },
    index: {
      title: 'خانه'
    },
    login: {
      title: 'ورود'
    },
    register: {
      title: 'ثبت نام'
    },
    changePassword: {
      title: 'تغییر گذرواژه'
    },
    chat: {
      title: 'گفتگو ها',
      searchInChat: 'جستجو در گفتگوها',
      sendMessage: 'ارسال پیام',
      typeMessage: 'پیام خود را تایپ کنید',
      today: 'امروز',
      yesterday: 'دیروز'
    },
    starter: {
      title: 'شروع کننده'
    },
    forms: {
      title: 'فرم ها',
      typeSelectLabel: 'حالت فرم',
      nameTextLabel: 'v-text-field',
      nameTextPlaceholder: 'نام',
      nameTextRuleRequired: 'نام الزامی می باشد',
      nameTextRuleMaxLength: 'تعداد کاراکتر مجاز نام حداکثر ۱۰ می باشد',
      mailTextLabel: 'v-text-field (ltr)',
      mailTextPlaceholder: 'email',
      mailTextSlotLabel: 'v-text-field (slot)',
      shebaTextLabel: 'v-text-field (suffix)',
      shebaTextPlaceholder: '** **** **** **** **** **** **',
      shebaSuffix: 'IR',
      shebaRuleLength: 'شماره شبا باید دقیقا ۲۴ رقم باشد',
      shebaRuleOnlyNumber: 'شماره شبا باید مقدار عددی باشد',
      descTextareaLabel: 'v-textarea',
      descTextareaPlaceholder: 'توضیحات',
      itemSelectLabel: 'v-select',
      itemSelectPlaceholder: 'انتخاب کنید',
      itemSelectRuleRequired: 'انتخاب آیتم الزامی می باشد',
      itemSelectMultipleLabel: 'v-select (multiple)',
      itemSelectMultiplePlaceholder: 'انتخاب (چندتایی)',
      itemMultiselectLabel: 'Multiselect',
      itemMultiselectPlaceholder: 'انتخاب آیتم ها',
      datePickerLabel: 'date-picker',
      datetimePickerLabel: 'datetime-picker',
      timePickerLabel: 'time-picker',
      counterSliderLabel: 'v-slider',
      agreeCheckboxLabel: 'v-checkbox',
      agreeCheckboxRuleRequired: 'برای ادامه باید قبول کنید',
      agreeSwitchLabel: 'v-switch',
      agreeSwitchRuleRequired: 'برای ادامه لطفا فعال کنید',
      genderRadioLabel: 'v-radio',
      genderRadioOptionMale: 'مرد',
      genderRadioOptionFemale: 'زن',
      genderRadioRuleRequired: 'لطفا جنسیت خود را انتخاب کنید',
      docFileLabel: 'v-file-input',
      docFilePlaceholder: 'انتخاب تصویر',
      submitButtonText: 'ثبت',
      cancelButtonText: 'لغو',
      removeButtonText: 'حذف',
      sendButtonText: 'ارسال',
      returnButtonText: 'بازگشت',
      comboboxChipsLabel: 'combobox chips',
      autocompleteLabel: 'autoComplete'
    },
    forgotPass: {
      title: 'فراموشی رمز عبور',
      email: 'پست الکترونیک',
      submit: 'ارسال',
      cancel: 'بازگشت'
    },
    authenticationDetails: {
      title: 'پیام ها',
      registerTitle: 'اطلاعات شما با موفقیت ثبت شد',
      registerDescription: 'پیام تایید به پست الکترونیکی شما ارسال شد',
      registerDetails: 'مراحل تایید :',
      registerDetails1: '1. وارد پست الکترونیکی که در هنگام ثبت نام ثبت کرده اید شوید .',
      registerDetails2: '2. پیام تاییدی را که از دیما دریافت کردید باز کنید.',
      registerDetails3: '3. روی لینک کلیک کنید.',
      changePasswordTitle: 'تغییر کلمه عبور',
      changePasswordDescription: 'کلمه عبور شما با موفقیت تغییر یافت',
      login: 'ورود'
    },
    globalSnackbar: {
      title: 'ناتیفیکیشن',
      showSnackbar: 'نمایش پیام'
    },
    underConstruction: {
      title: 'در حال ساخت'
    },
    users: {
      title: 'کاربران',
      usersList: 'لیست کاربران',
      add: 'ثبت کاربر جدید',
      edit: 'ویرایش کاربر',
      excelAdd: 'ثبت  از فایل  اکسل',
      addUserBtn: 'ثبت کاربر',
      completeUserBtn: 'تکمیل اطلاعات کاربر',
      addBankInfoBtn: 'افزودن اطلاعات بانکی',
      editBankInfoBtn: 'ویرایش اطلاعات بانکی',
      excelAddUsers: {
        title: 'آپلود فایل اکسل کاربران',
        noticeText: '۱- جهت راهنمایی در مورد چگونگی پر کردن فایل اکسل لطفا قبل از شروع، راهنمای مورد را مطالعه فرمایید<br>۲- فرمت های صحیح فایل ورودی CSV, XSLX و XSL می باشند.<br>۳-خطاهای سامانه را در مورد فایل خود با دقت مطالعه و بررسی نمایید<br>۴- فیلدهای عددی را با اعداد انگلیسی پر کنید و اعداد فارسی قرار ندهید',
        sampleBtn: 'دریافت  فایل نمونه اکسل',
        chooseFile: 'انتخاب فایل جهت آپلود',
        uploadFile: 'آپلود فایل'
      },
      userRegisteredSuccessfully: 'کاربر با موفقیت ثبت نام شد',
      userCompletedSuccessfully: 'اطلاعات کاربر با موفقیت تکمیل  شد',
      bankInfoAddedSuccessfully: 'اطلاعات بانکی با موفقیت افزوده  شد',
      bankInfoEditedSuccessfully: 'اطلاعات بانکی با موفقیت ویرایش گریدی',
      roleChangedSuccessfully: 'نقش کاربر با موفقیت تغییر یافت',
      userDisabledSuccessfully: 'کاربر با موفقیت غیرفعال گردید',
      userEnabledSuccessfully: 'کاربر با موفقیت فعال گردید',
      userNameExist: 'نام کاربری تکراری است',
      mobileExist: 'شماره موبایل تکراری است',
      emailExist: 'ایمیل تکراری است',
      passwordRecoverdSuccessfully: ' کلمه عبور با موفقیت تغییر یافت'
    },
    payrolls: {
      title: 'فیش های حقوقی',
      payrollsList: 'لیست فیش های حقوقی',
      add: 'ثبت فیش حقوقی جدید',
      addGroup: 'ثبت فیش حقوقی گروهی',
      addPayrollBtn: 'ثبت فیش  جدید',
      addedSuccessfully: 'فیش حقوقی با موفقیت افزوده شد',
      noticeText: 'نام فایل اکسل وارد شده باید برابر با شماره پرسنلی باشد',
      payrollDeletedSuccessfully: 'فیش حقوقی با موفقیت حذف گردید'
    },
    userPayrolls: {
      title: 'فیش های حقوقی',
      payrollsList: 'لیست فیش های حقوقی'
    },
    contracts: {
      title: 'قرارداد ها',
      contractsList: 'لیست قرارداد ها',
      add: 'ثبت قرارداد جدید',
      edit: 'ویرایش قرارداد',
      addContractBtn: 'ثبت  قرارداد',
      noticeText: 'برای شروع کار نیاز است تا قرارداد خود را ثبت کنید',
      editedSuccessfully: 'قرارداد با موفقیت ویرایش شد',
      addedSuccessfully: 'قرارداد با موفقیت افزوده شد'
    },
    messages: {
      title: 'پیام ها',
      messageSendedSuccessfully: 'پیام با موفقیت ارسال شد'
    },
    userMessages: {
      title: 'پیام ها',
      readedMessageBtn: 'خوانده شد'
    }
  },
  enums: {
    firstName: 'نام',
    lastName: 'نام خانوادگی',
    nationalCode: 'کد ملی',
    userName: 'نام کاربری',
    phoneNumber: 'شماره موبایل',
    password: 'کلمه عبور',
    email: 'ایمیل',
    gender: 'جنسیت',
    maritalStatus: 'تاهل',
    childrensCount: 'تعداد فرزندان',
    underSupportPersonsCount: 'تعداد افراد تحت تکفل',
    personnelNumber: 'شماره پرسنلی',
    employeeStatus: 'وضعیت کارمند',
    devotion: 'جانبازی',
    lessDevelopedAreas: 'مناطق کمتر توسعه یافته',
    has: 'دارد',
    hasnt: 'ندارد',
    contractTitle: 'عنوان قرارداد',
    contractRegisterationNumber: 'شماره ثبت قرارداد',
    counterParty: 'شرکت طرف قرارداد',
    rowOfAgreement: 'ردیف پیمان',
    workshopCode: 'کد کارگاه',
    monthlyWorkTimeType: 'نوع زمان کار ماهانه',
    monthlyWorkAmount: 'میزان کارکرد ماهانه ( تعداد ساعت یا روز)',
    workshopPlace: 'محل کارگاه',
    details: 'جزییات',
    year: 'سال',
    month: 'ماه',
    payrollsType: 'نوع فیش های حقوقی',
    payrollType: 'نوع فیش  حقوقی',
    contractType: 'نوع قرارداد',
    fatherName: 'نام پدر',
    birthDate: 'تاریخ تولد',
    birthPlace: 'محل تولد',
    placeIssue: 'محل صدور',
    birthCertificateNumber: 'شماره شناسنامه',
    centerTopicName: 'نام مرکز هزینه',
    insuranceNumber: 'شماره بیمه',
    insuranceName: 'نام بیمه',
    telephone: 'تلفن ثابت',
    startWorkDate: 'تاریخ شروع به کار',
    endWorkDate: 'تاریخ پایان کار',
    experience: 'سابقه کار',
    employmentDate: 'تاریخ استخدام',
    return: 'بازگشت',
    bankName: 'نام بانک',
    bankBranch: 'شعبه بانک',
    accountNumber: 'شماره حساب',
    cardNumber: 'شماره کارت',
    shabaNumber: 'شماره شبا',
    addAnotherBankAccount: 'افزودن اطلاعات بانکی جدید',
    remove: 'حذف',
    messageTitle: 'عنوان پیام',
    messageBody: 'متن پیام',
    showMessage: 'نمایش  پیام',
    sendMessage: 'ارسال پیام',
    userList: 'لیست کاربران',
    getUserPayrolls: 'نمایش فیش های حقوقی',
    downloadPayroll: 'دانلود فیش  حقوقی',
    payrollFile: 'فایل فیش حقوقی',
    isRead: 'خوانده شده',
    isntRead: 'خوانده نشده',
    placeholders: {
      firstName: 'نام',
      lastName: 'نام خانوادگی',
      nationalCode: 'کد ملی',
      userName: 'نام کاربری',
      phoneNumber: 'شماره موبایل',
      password: 'کلمه عبور',
      email: 'ایمیل',
      gender: 'جنسیت',
      maritalStatus: 'تاهل',
      childrensCount: 'تعداد فرزندان',
      underSupportPersonsCount: 'تعداد افراد تحت تکفل',
      personnelNumber: 'شماره پرسنلی',
      fatherName: 'نام پدر',
      birthDate: 'تاریخ تولد',
      birthPlace: 'محل تولد',
      placeIssue: 'محل صدور',
      birthCertificateNumber: 'شماره شناسنامه',
      centerTopicName: 'نام مرکز هزینه',
      insuranceNumber: 'شماره بیمه',
      insuranceName: 'نام بیمه',
      telephone: 'تلفن ثابت',
      startWorkDate: 'تاریخ شروع به کار',
      endWorkDate: 'تاریخ پایان کار',
      experience: 'سابقه کار',
      employmentDate: 'تاریخ استخدام',
      employeeStatus: 'وضعیت کارمند',
      devotion: 'جانبازی',
      lessDevelopedAreas: 'مناطق کمتر توسعه یافته',
      contractTitle: 'عنوان قرارداد',
      contractRegisterationNumber: 'شماره ثبت قرارداد',
      counterParty: 'شرکت طرف قرارداد',
      rowOfAgreement: 'ردیف پیمان',
      workshopCode: 'کد کارگاه',
      monthlyWorkTimeType: 'نوع زمان کار ماهانه',
      monthlyWorkAmount: 'میزان کارکرد ماهانه ( تعداد ساعت یا روز)',
      workshopPlace: 'محل کارگاه',
      details: 'جزییات',
      year: 'سال',
      month: 'ماه',
      payrollsType: 'نوع فیش های حقوقی',
      contractType: 'نوع قرارداد',
      bankName: 'نام بانک',
      bankBranch: 'شعبه بانک',
      accountNumber: 'شماره حساب',
      cardNumber: 'شماره کارت',
      shabaNumber: 'شماره شبا',
      messageTitle: 'عنوان پیام',
      messageBody: 'متن پیام',
      userList: 'لیست کاربران',
      chooseFile: 'انتخاب فایل'
    },
    headers: {
      firstName: 'نام',
      lastName: 'نام خانوادگی',
      nationalCode: 'کد ملی',
      personnelNumber: 'شماره پرسنلی',
      adminAccess: 'دسترسی ادمین',
      actions: 'عملیات',
      contractTitle: 'عنوان قرارداد',
      contractNumber: 'شماره ثبت قرارداد',
      counterParty: 'شرکت طرف قرارداد',
      workshopCode: 'کد کارگاه',
      year: 'سال',
      month: 'ماه',
      income: 'دریافتی',
      type: 'نوع',
      description: 'توضیحات',
      payrollType: 'نوع فیش  حقوقی',
      userState: 'کاربر فعال',
      messageTitle: 'عنوان پیام',
      messageBody: 'متن پیام',
      status: 'وضعیت',
      sendingDate: 'تاریخ ارسال'
    },
    tableActions: {
      edit: 'ویرایش',
      delete: 'حذف'
    },
    userRoles: {
      admin: 'ادمین',
      user: 'کاربر'
    },
    genders: {
      male: 'مرد',
      female: 'زن'
    },
    maritalStatuses: {
      single: 'مجرد',
      married: 'متاهل'
    },
    employeeStatuses: {
      normal: 'عادی',
      devoted: 'جانباز',
      martyrChild: 'فرزند شهید',
      captive: 'آزاده',
      armedForces: 'نیروهای مسلح ـ نظامی یا انتظامی)',
      otherClause14: 'سایر مشمولین بند ۱۴ ماده ۹۱',
      taxExemptCitizens: 'اتباع خارجی مشمول قانون اجتناب از اخد مالیات مضاعف'
    },
    monthlyWorkTimeTypes: {
      daily: 'روز کارکرد',
      hourly: 'ساعت کارکرد'
    },
    months: {
      farvardin: 'فروردین',
      ordibehesht: 'اردییهشت',
      khordad: 'خرداد',
      tir: 'تیر',
      mordad: 'مرداد',
      shahrivar: 'شهریور',
      mehr: 'مهر',
      aban: 'آبان',
      azar: 'آذر',
      dey: 'دی',
      bahman: 'بهمن',
      esfand: 'اسفند'
    },
    payrollsTypes: {
      excel: 'فایل EXCEL',
      pdf: 'فایل PDF',
      image: 'فایل  عکس'
    },
    contractsTypes: {
      excel: 'فایل EXCEL',
      pdf: 'فایل PDF',
      image: 'فایل  عکس'
    }
  }
}

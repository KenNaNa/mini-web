import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 挂载主项目的 store 实例
Reflect.set(Vue, '__share_pool__', {
  store,
  router,
})

import { kRippleButton, kRippleLargeButton, toast } from '@cps/'
import storageUtil from '@bApi/storage/storageUtil.js'
import { commonRequest } from '@api/commonRequest.js'
import commonDataSetting from '@api/commonDataSetting.js'

Vue.component('fy-ripple-button', kRippleButton)
Vue.component('fy-ripple-large-button', kRippleLargeButton)
Vue.use(toast)

Vue.prototype.$_utils = {
  storageUtil,
}

// 按需引入element-ui 的组件
import {
  Carousel,
  CarouselItem,
  Slider,
  Image,
  Table,
  TableColumn,
  Tabs,
  Tag,
  TabPane,
  Pagination,
  Upload,
  Button,
  Loading,
  Dialog,
  Tree,
  Input,
  MessageBox,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Select,
  OptionGroup,
  Option,
  Transfer,
  Autocomplete,
  Cascader,
  Scrollbar,
  Switch,
  TimePicker,
  TimeSelect,
  Tooltip,
  Menu,
  Submenu,
  MenuItem,
  CascaderPanel,
  Collapse,
  CollapseItem,
  Progress,
  Steps,
  Step,
  InfiniteScroll,
  RadioButton,
  Popover,
  Drawer,
} from 'element-ui'

Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Slider)
Vue.use(Image)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(Tag)
Vue.use(TabPane)
Vue.use(Pagination)
Vue.use(Upload)
Vue.use(Button)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Tree)
Vue.use(Input)
Vue.use(MessageBox)
Vue.use(Select)
Vue.use(OptionGroup)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Transfer)
Vue.use(Autocomplete)
Vue.use(Cascader)
Vue.use(Scrollbar)
Vue.use(Switch)
Vue.use(TimePicker)
Vue.use(TimeSelect)
Vue.use(Tooltip)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(CascaderPanel)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Progress)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Popover)
Vue.use(InfiniteScroll)
Vue.use(RadioButton)
Vue.use(Drawer)



Vue.prototype.$_request = commonRequest
Vue.prototype.$_commonDataSetting = commonDataSetting

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

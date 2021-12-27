import Vue from 'vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
import flatpickr from 'flatpickr'

const Mandarin = require('flatpickr/dist/l10n/zh').default.zh

flatpickr.localize(Mandarin)
flatpickr.l10ns.default.firstDayOfWeek = 1
flatpickr.l10ns.default.time_24hr = true
Vue.component(FeatherIcon.name, FeatherIcon)

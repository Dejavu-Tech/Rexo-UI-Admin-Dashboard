<template>
  <li class="nav-item nav-search">

    <!-- 搜索图标 -->
    <a
      href="javascript:void(0)"
      class="nav-link nav-link-search"
      @click="showSearchBar = true"
    >
      <feather-icon
        icon="SearchIcon"
        size="21"
      />
    </a>

    <!-- 搜索输入框 -->
    <div
      class="search-input"
      :class="{'open': showSearchBar}"
    >
      <div class="search-input-icon">
        <feather-icon icon="SearchIcon" />
      </div>

      <b-form-input
        v-if="showSearchBar"
        v-model="searchQuery"
        placeholder="搜索"
        autofocus
        autocomplete="off"
        @keyup.up="increaseIndex(false)"
        @keyup.down="increaseIndex"
        @keyup.esc="showSearchBar = false; resetsearchQuery()"
        @keyup.enter="suggestionSelected"
        @blur.stop="showSearchBar = false; resetsearchQuery()"
      />
      <div
        class="search-input-close"
        @click="showSearchBar = false; resetsearchQuery()"
      >
        <feather-icon icon="XIcon" />
      </div>

      <!-- 自动补全列表 -->
      <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="search-list search-list-main scroll-area overflow-hidden"
        :class="{'show': searchQuery}"
        tagname="ul"
      >
        <ol
          v-for="(suggestion_list, grp_name, grp_index) in filteredData"
          :key="grp_index"
          class="suggestions-groups-list"
        >

          <!-- 组标题 -->
          <p class="suggestion-group-title">
            <span
              v-if="grp_name === 'pages'"
            >
              页面 / 组件
            </span>
            <span
              v-if="grp_name === 'files'"
            >
              文件
            </span>
            <span
              v-if="grp_name === 'contacts'"
            >
              联系人
            </span>
          </p>

          <!-- 分组自动补全列表 -->
          <ul>
            <li
              v-for="(suggestion, index) in suggestion_list"
              :key="index"
              class="suggestion-group-suggestion cursor-pointer"
              :class="{'suggestion-current-selected': currentSelected === `${grp_index}.${index}`}"
              @mouseenter="currentSelected = `${grp_index}.${index}`"
              @mousedown.prevent="suggestionSelected(grp_name, suggestion)"
            >
              <b-link
                v-if="grp_name === 'pages'"
                class="p-0"
              >
                <feather-icon
                  :icon="suggestion.icon"
                  class="mr-75"
                />
                <span class="align-middle">{{ suggestion.title }}</span>
              </b-link>
              <template v-else-if="grp_name === 'files'">
                <div class="d-flex align-items-center">
                  <b-img
                    :src="suggestion.icon"
                    class="mr-1"
                    height="32"
                  />
                  <div>
                    <p>{{ suggestion.file_name }}</p>
                    <small>by {{ suggestion.from }}</small>
                  </div>
                  <small class="ml-auto">{{ suggestion.size }}</small>
                </div>
              </template>
              <template v-else-if="grp_name === 'contacts'">
                <div class="d-flex align-items-center">
                  <b-avatar
                    :src="suggestion.img"
                    class="mr-1"
                    size="32"
                  />
                  <div>
                    <p>{{ suggestion.name }}</p>
                    <small>{{ suggestion.email }}</small>
                  </div>
                  <small class="ml-auto">{{ suggestion.time }}</small>
                </div>
              </template>
            </li>

            <li
              v-if="!suggestion_list.length && searchQuery"
              class="suggestion-group-suggestion no-results"
            >
              <p>未找到任何结果</p>
            </li>
          </ul>
        </ol>
      </vue-perfect-scrollbar>
    </div>
  </li>
</template>

<script>
import {
  BFormInput, BLink, BImg, BAvatar,
} from 'bootstrap-vue'
import { ref, watch } from '@vue/composition-api'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import useAutoSuggest from '@core/components/app-auto-suggest/useAutoSuggest'
import router from '@/router'
import store from '@/store'
import searchAndBookmarkData from '../search-and-bookmark-data'

export default {
  components: {
    BFormInput,
    BLink,
    BImg,
    BAvatar,
    VuePerfectScrollbar,
  },
  setup() {
    const showSearchBar = ref(false)

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
    }

    const suggestionSelected = (grpName, suggestion) => {
      // 如果未提供参数时使用当前选定的参数
      if (!suggestion) {
        // 如果currentSelected值为-1时则未选择任何值/项（防止错误）
        /* eslint-disable no-use-before-define, no-param-reassign */
        if (currentSelected.value !== -1) {
          /* eslint-disable no-use-before-define, no-param-reassign */
          const [grpIndex, itemIndex] = currentSelected.value.split('.')
          grpName = Object.keys(filteredData.value)[grpIndex]
          suggestion = filteredData.value[grpName][itemIndex]
          /* eslint-enable */
        }
      }
      if (grpName === 'pages') router.push(suggestion.route).catch(() => {})
      // eslint-disable-next-line no-use-before-define
      resetsearchQuery()
      showSearchBar.value = false
    }

    const {
      searchQuery,
      resetsearchQuery,
      filteredData,
    } = useAutoSuggest({ data: searchAndBookmarkData, searchLimit: 4 })

    watch(searchQuery, val => {
      store.commit('app/TOGGLE_OVERLAY', Boolean(val))
    })

    const currentSelected = ref(-1)
    watch(filteredData, val => {
      if (!Object.values(val).some(obj => obj.length)) {
        currentSelected.value = -1
      } else {
        // 自动选择第一个项目（除了404）
        let grpIndex = null

        // eslint-disable-next-line no-restricted-syntax
        for (const [index, grpSuggestions] of Object.values(val).entries()) {
          if (grpSuggestions.length) {
            grpIndex = index
            break
          }
        }

        if (grpIndex !== null) currentSelected.value = `${grpIndex}.0`
      }
    })

    const increaseIndex = (val = true) => {
      /* eslint-disable no-lonely-if, no-plusplus */

      // 如果没有匹配的项目
      if (!Object.values(filteredData.value).some(grpItems => grpItems.length)) return

      const [grpIndex, itemIndex] = currentSelected.value.split('.')

      const grpArr = Object.entries(filteredData.value)
      const activeGrpTotalItems = grpArr[grpIndex][1].length

      if (val) {
        // 如果激活项不是分组中的最后一项
        if (activeGrpTotalItems - 1 > itemIndex) {
          currentSelected.value = `${grpIndex}.${Number(itemIndex) + 1}`

        // 如果激活项不是分组列表中的最后一个
        } else if (grpIndex < grpArr.length - 1) {
          for (let i = Number(grpIndex) + 1; i < grpArr.length; i++) {
            // 如果导航组有项目则移动到该组中
            if (grpArr[i][1].length > 0) {
              currentSelected.value = `${Number(i)}.0`
              break
            }
          }
        }
      } else {
        // 如果激活项不是分组中的第一项
        if (Number(itemIndex)) {
          currentSelected.value = `${grpIndex}.${Number(itemIndex) - 1}`

        // 如果激活项不是分组列表中的第一个
        } else if (Number(grpIndex)) {
          for (let i = Number(grpIndex) - 1; i >= 0; i--) {
            // 如果导航组有项目则移动到该组中
            if (grpArr[i][1].length > 0) {
              currentSelected.value = `${i}.${grpArr[i][1].length - 1}`
              break
            }
          }
        }
      }
      /* eslint-enable no-lonely-if, no-plusplus */
    }

    return {
      showSearchBar,
      perfectScrollbarSettings,
      searchAndBookmarkData,
      suggestionSelected,
      currentSelected,
      increaseIndex,

      // 自动补全
      searchQuery,
      resetsearchQuery,
      filteredData,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

ul
{
  list-style: none;
  padding: 0;
  margin: 0;
}
p {
  margin: 0;
}

/* .app-auto-suggest {
  position: relative;
}

.auto-suggest-suggestions-list {
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  border-radius: 6px;
  position: absolute;
  top: calc(100% + 1rem);
  background-color: white;
  width: 100%;
} */

.suggestion-group-title {
  font-weight: 500;
  padding: .75rem 1rem .25rem;
}

.suggestion-group-suggestion {
  padding: .75rem 1rem
}

.suggestion-current-selected {
  background-color: $body-bg;

  .dark-layout & {
    background-color: $theme-dark-body-bg;
  }
}
</style>

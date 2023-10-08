<script setup lang="tsx">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useTheme } from 'vuetify'
import { staticPrimaryColor } from '@/plugins/vuetify/theme'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { RouteTransitions, Skins } from '@core/enums'
import { AppContentLayoutNav, ContentWidth, FooterType, NavbarType } from '@layouts/enums'
import { themeConfig } from '@themeConfig'

const isNavDrawerOpen = ref(false)

const {
  theme,
  skin,
  appRouteTransition,
  navbarType,
  appFootType,
  isVerticalNavCollapsed,
  isVerticalNavSemiDark,
  appContentWidth,
  appContentLayoutNav,
  isAppRtl,
  isNavbarBlurEnabled,
  isLessThanOverlayNavBreakpoint,
} = useThemeConfig()

// 主题
const vuetifyTheme = useTheme()

// const vuetifyThemesName = Object.keys(vuetifyTheme.themes.value)

const initialThemeColors = JSON.parse(JSON.stringify(vuetifyTheme.current.value.colors))
const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error']

const setPrimaryColor = (color: string) => {
  const currentThemeName = vuetifyTheme.name.value

  vuetifyTheme.themes.value[currentThemeName].colors.primary = color
  localStorage.setItem(`${themeConfig.app.title}-${currentThemeName}ThemePrimaryColor`, color)
  localStorage.setItem(`${themeConfig.app.title}-initial-loader-color`, color)
}

const getBoxColor = (color: string, index: number) => index ? color : staticPrimaryColor

const { width: windowWidth } = useWindowSize()

const headerValues = computed(() => {
  const entries = Object.entries(NavbarType)

  if (appContentLayoutNav.value === AppContentLayoutNav['水平导航栏'])
    return entries.filter(([_, val]) => val !== NavbarType['隐藏'])

  return entries
})
</script>

<template>
  <template v-if="!isLessThanOverlayNavBreakpoint(windowWidth)">
    <VBtn
      icon
      size="small"
      class="app-customizer-toggler rounded-s-lg rounded-0"
      style="z-index: 1001;"
      @click="isNavDrawerOpen = true"
    >
      <VIcon
        size="22"
        icon="tabler-settings"
      />
    </VBtn>

    <VNavigationDrawer
      v-model="isNavDrawerOpen"
      temporary
      border="0"
      location="end"
      width="400"
      :scrim="false"
      class="app-customizer"
    >
      <!-- 标题 -->
      <div class="customizer-heading d-flex align-center justify-space-between">
        <div>
          <h6 class="text-h6">
            界面主题定制
          </h6>
          <span class="text-body-1">实时预览定制主题</span>
        </div>
        <IconBtn @click="isNavDrawerOpen = false">
          <VIcon
            icon="tabler-x"
            size="20"
          />
        </IconBtn>
      </div>

      <VDivider />

      <PerfectScrollbar
        tag="ul"
        :options="{ wheelPropagation: false }"
      >
        <!-- 主题 -->
        <CustomizerSection
          title="主题"
          :divider="false"
        >
          <!-- 全局皮肤 -->
          <h6 class="text-base font-weight-regular">
            全局皮肤
          </h6>
          <VRadioGroup
            v-model="skin"
            inline
          >
            <VRadio
              v-for="[key, val] in Object.entries(Skins)"
              :key="key"
              :label="key"
              :value="val"
            />
          </VRadioGroup>

          <!-- 外观 -->
          <h6 class="mt-3 text-base font-weight-regular">
            外观
          </h6>
          <VRadioGroup
            v-model="theme"
            inline
          >
            <VRadio
              v-for="themeOption in [
                { label: '跟随系统', value: 'system' },
                { label: '浅色', value: 'light' },
                { label: '深色', value: 'dark' }
              ]"
              :key="themeOption.value"
              :label="themeOption.label"
              :value="themeOption.value"
              class="text-capitalize"
            />
          </VRadioGroup>

          <!-- 主颜色 -->
          <h6 class="mt-3 text-base font-weight-regular">
            主颜色
          </h6>
          <div class="d-flex gap-x-4 mt-2">
            <div
              v-for="(color, index) in colors"
              :key="color"
              style=" border-radius: 0.5rem; block-size: 2.5rem;inline-size: 2.5rem; transition: all 0.25s ease;"
              :style="{ backgroundColor: getBoxColor(initialThemeColors[color], index) }"
              class="cursor-pointer d-flex align-center justify-center"
              :class="{ 'elevation-4': vuetifyTheme.current.value.colors.primary === getBoxColor(initialThemeColors[color], index) }"
              @click="setPrimaryColor(getBoxColor(initialThemeColors[color], index))"
            >
              <VFadeTransition>
                <VIcon
                  v-show="vuetifyTheme.current.value.colors.primary === (getBoxColor(initialThemeColors[color], index))"
                  icon="tabler-check"
                  color="white"
                />
              </VFadeTransition>
            </div>
          </div>
        </CustomizerSection>

        <!-- 页面布局 -->
        <CustomizerSection title="页面布局">
          <!-- 内容宽度 -->
          <h6 class="text-base font-weight-regular">
            内容宽度
          </h6>
          <VRadioGroup
            v-model="appContentWidth"
            inline
          >
            <VRadio
              v-for="[key, val] in Object.entries(ContentWidth)"
              :key="key"
              :label="key"
              :value="val"
            />
          </VRadioGroup>
          <!-- 导航条样式 -->
          <h6 class="mt-3 text-base font-weight-regular">
            {{ appContentLayoutNav === AppContentLayoutNav['垂直导航栏'] ? '导航条' : '页头' }}样式
          </h6>
          <VRadioGroup
            v-model="navbarType"
            inline
          >
            <VRadio
              v-for="[key, val] in headerValues"
              :key="key"
              :label="key"
              :value="val"
            />
          </VRadioGroup>
          <!-- 页脚样式 -->
          <h6 class="mt-3 text-base font-weight-regular">
            页脚样式
          </h6>
          <VRadioGroup
            v-model="appFootType"
            inline
          >
            <VRadio
              v-for="[key, val] in Object.entries(FooterType)"
              :key="key"
              :label="key"
              :value="val"
            />
          </VRadioGroup>
          <!-- 导航条高斯模糊 -->
          <div class="mt-4 d-flex align-center justify-space-between">
            <VLabel
              for="customizer-navbar-blur"
              class="text-high-emphasis"
            >
              导航条高斯模糊
            </VLabel>
            <div>
              <VSwitch
                id="customizer-navbar-blur"
                v-model="isNavbarBlurEnabled"
                class="ms-2"
              />
            </div>
          </div>
        </CustomizerSection>

        <!-- 导航栏 -->
        <CustomizerSection title="导航栏">
          <!-- 导航栏布局 -->
          <h6 class="text-base font-weight-regular">
            导航栏布局
          </h6>
          <VRadioGroup
            v-model="appContentLayoutNav"
            inline
          >
            <VRadio
              v-for="[key, val] in Object.entries(AppContentLayoutNav)"
              :key="key"
              :label="key"
              :value="val"
            />
          </VRadioGroup>

          <!-- 折叠导航栏 -->
          <div
            v-if="appContentLayoutNav === AppContentLayoutNav['垂直导航栏']"
            class="mt-4 d-flex align-center justify-space-between"
          >
            <VLabel
              for="customizer-menu-collapsed"
              class="text-high-emphasis"
            >
              折叠导航栏
            </VLabel>
            <div>
              <VSwitch
                id="customizer-menu-collapsed"
                v-model="isVerticalNavCollapsed"
                class="ms-2"
              />
            </div>
          </div>

          <!-- 混合外观（深色导航栏 + 浅色内容） -->
          <div
            class="mt-4 align-center justify-space-between"
            :class="vuetifyTheme.global.name.value === 'light' && appContentLayoutNav === AppContentLayoutNav['垂直导航栏'] ? 'd-flex' : 'd-none'"
          >
            <VLabel
              for="customizer-menu-semi-dark"
              class="text-high-emphasis"
            >
              混合外观（深色导航栏 + 浅色内容）
            </VLabel>
            <div>
              <VSwitch
                id="customizer-menu-semi-dark"
                v-model="isVerticalNavSemiDark"
                class="ms-2"
              />
            </div>
          </div>
        </CustomizerSection>

        <!-- 其他 -->
        <CustomizerSection title="其他">
          <!-- RTL -->
          <div class="d-flex align-center justify-space-between">
            <VLabel
              for="customizer-rtl"
              class="text-high-emphasis"
            >
              RTL
            </VLabel>
            <div>
              <VSwitch
                id="customizer-rtl"
                v-model="isAppRtl"
                class="ms-2"
              />
            </div>
          </div>

          <!-- 路由转场 -->
          <div class="mt-6">
            <VRow>
              <VCol
                cols="5"
                class="d-flex align-center"
              >
                <VLabel
                  for="route-transition"
                  class="text-high-emphasis"
                >
                  路由转场效果
                </VLabel>
              </VCol>

              <VCol cols="7">
                <AppSelect
                  id="route-transition"
                  v-model="appRouteTransition"
                  :items="Object.entries(RouteTransitions).map(([key, value]) => ({ key, value }))"
                  item-title="key"
                  item-value="value"
                  single-line
                />
              </VCol>
            </VRow>
          </div>
        </CustomizerSection>
      </PerfectScrollbar>
    </VNavigationDrawer>
  </template>
</template>

<style lang="scss">
.app-customizer {
  .customizer-section {
    padding: 1.25rem;
  }

  .customizer-heading {
    padding-block: 0.875rem;
    padding-inline: 1.25rem;
  }

  .v-navigation-drawer__content {
    display: flex;
    flex-direction: column;
  }
}

.app-customizer-toggler {
  position: fixed !important;
  inset-block-start: 50%;
  inset-inline-end: 0;
}
</style>

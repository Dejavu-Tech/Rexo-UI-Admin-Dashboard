<template>
  <div
    class="customizer d-none d-md-block"
    :class="{'open': isCustomizerOpen}"
  >
    <!-- 定制器开关 -->
    <b-link
      class="customizer-toggle d-flex align-items-center justify-content-center"
      @click="isCustomizerOpen = !isCustomizerOpen"
    >
      <feather-icon
        icon="SettingsIcon"
        size="15"
        class="spinner"
      />
    </b-link>

    <!-- 标题 -->
    <div class="customizer-section d-flex justify-content-between align-items-center">
      <div>
        <h4 class="text-uppercase mb-0">
          界面主题定制器
        </h4>
        <small>定制主题实时预览</small>
      </div>
      <feather-icon
        icon="XIcon"
        size="18"
        class="cursor-pointer"
        @click="isCustomizerOpen = !isCustomizerOpen"
      />
    </div>

    <vue-perfect-scrollbar
      :settings="perfectScrollbarSettings"
      class="ps-customizer-area scroll-area"
    >
      <div class="customizer-section">

        <!-- 皮肤 -->
        <b-form-group label="全局皮肤">
          <b-form-radio-group
            id="skin-radio-group"
            v-model="skin"
            name="skin"
            :options="skinOptions"
          />
        </b-form-group>

        <!-- 内容宽度 -->
        <b-form-group label="内容宽度">
          <b-form-radio-group
            id="content-width-radio-group"
            v-model="contentWidth"
            name="content-width"
            :options="contentWidthOptions"
          />
        </b-form-group>

        <!-- 右侧导航模式 -->
        <b-form-group
          label="右侧导航模式"
          label-cols="10"
        >
          <b-form-checkbox
            v-model="isRTL"
            class="mr-0 mt-50"
            name="is-rtl"
            switch
            inline
          />
        </b-form-group>

        <!-- 路由转场 -->
        <b-form-group
          label="路由转场效果"
          label-cols="6"
        >
          <v-select
            v-model="routerTransition"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :clearable="false"
            label="title"
            :options="routerTransitionOptions"
            :reduce="option => option.value"
          />
        </b-form-group>
      </div>

      <!-- 导航 -->
      <div class="customizer-section">

        <!-- 导航布局 -->
        <b-form-group
          label="导航布局"
        >
          <b-form-radio-group
            v-model="layoutType"
            name="layout-type"
            :options="layoutTypeOptions"
          />
        </b-form-group>

        <!-- 折叠导航 -->
        <div
          v-if="layoutType === 'vertical'"
          class="d-flex justify-content-between align-items-center mt-2"
        >
          <span class="font-weight-bold">折叠导航布局</span>
          <b-form-checkbox
            v-model="isVerticalMenuCollapsed"
            name="is-vertical-menu-collapsed"
            class="mr-0"
            switch
            inline
          />
        </div>

        <!-- 导航显示 -->
        <div class="d-flex justify-content-between align-items-center mt-2">
          <span class="font-weight-bold">隐藏导航</span>
          <b-form-checkbox
            v-model="isNavMenuHidden"
            name="is-menu-visible"
            class="mr-0"
            switch
            inline
          />
        </div>

      </div>

      <!-- 副导航栏 -->
      <div class="customizer-section">

        <!-- 颜色 -->
        <b-form-group
          v-show="layoutType === 'vertical'"
          label="副导航栏颜色"
        >
          <div
            v-for="(color, index) in navbarColors"
            :key="color"
            class="p-1 d-inline-block rounded mr-1 cursor-pointer"
            :class="[`bg-${color}`, {'border border-light': !index}, {'mark-active': navbarBackgroundColor === color}]"
            @click="navbarBackgroundColor = color"
          />
        </b-form-group>

        <!-- 副导航栏样式 -->
        <b-form-group :label="layoutType === 'vertical' ? '副导航栏样式' : '水平导航样式'">
          <b-form-radio-group
            v-model="navbarType"
            name="navbar-type"
            :options="navbarTypes"
          />
        </b-form-group>
      </div>

      <!-- 页脚 -->
      <div class="customizer-section">

        <!-- 页脚样式 -->
        <b-form-group label="页脚样式">
          <b-form-radio-group
            v-model="footerType"
            name="footer-type"
            :options="footerTypes"
          />
        </b-form-group>
      </div>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
import {
  BLink, BFormRadioGroup, BFormGroup, BFormCheckbox,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import useAppCustomizer from './useAppCustomizer'

export default {
  components: {
    // BSVue
    BLink,
    BFormRadioGroup,
    BFormCheckbox,
    BFormGroup,

    // 第三方
    vSelect,
    VuePerfectScrollbar,

  },
  setup() {
    const {
      // 侧边导航
      isVerticalMenuCollapsed,

      // 定制器开
      isCustomizerOpen,

      // 皮肤
      skin,
      skinOptions,

      // 内容宽度
      contentWidth,
      contentWidthOptions,

      // 右侧导航
      isRTL,

      // 路由转场
      routerTransition,
      routerTransitionOptions,

      // 布局样式
      layoutType,
      layoutTypeOptions,

      // 导航隐藏
      isNavMenuHidden,

      // 副导航栏
      navbarColors,
      navbarTypes,
      navbarBackgroundColor,
      navbarType,

      // 页脚
      footerTypes,
      footerType,
    } = useAppCustomizer()

    if (layoutType.value === 'horizontal') {
      // 删除水平导航布局中的“混合布局”选项
      const skinSemiDarkIndex = skinOptions.findIndex(s => s.value === 'semi-dark')
      delete skinOptions[skinSemiDarkIndex]

      // 删除默认隐藏导航开关，水平导航布局设有独立的隐藏开关
      const menuHiddneIndex = navbarTypes.findIndex(t => t.value === 'hidden')
      delete navbarTypes[menuHiddneIndex]
    }

    // Perfect Scrollbar 滚动条
    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    }

    return {
      // 侧边导航
      isVerticalMenuCollapsed,

      // 定制器开
      isCustomizerOpen,

      // 皮肤
      skin,
      skinOptions,

      // 内容宽度
      contentWidth,
      contentWidthOptions,

      // 右侧导航
      isRTL,

      // 路由转场
      routerTransition,
      routerTransitionOptions,

      // 布局样式
      layoutType,
      layoutTypeOptions,

      // 导航隐藏
      isNavMenuHidden,

      // 副导航栏
      navbarColors,
      navbarTypes,
      navbarBackgroundColor,
      navbarType,

      // 页脚
      footerTypes,
      footerType,

      // Perfect Scrollbar 滚动条
      perfectScrollbarSettings,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

.customizer-section {
  padding: 1.5rem;
    border-bottom: 1px solid #ebe9f1;

  .dark-layout & {
    border-color: $theme-dark-border-color;
  }

  #skin-radio-group ::v-deep {
    .custom-control-inline {
      margin-right: 0.7rem;
    }
  }

  .form-group {
    margin-bottom: 1.5rem;;
    &:last-of-type {
    margin-bottom: 0;
    }
    ::v-deep legend {
      font-weight: 500;
    }
  }
}

.mark-active {
  box-shadow: 0 0 0 0.2rem rgba(38,143,255,.5);
}

.ps-customizer-area {
  height: calc(100% - 83px)
}
</style>

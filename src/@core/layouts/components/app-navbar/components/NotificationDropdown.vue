<template>
  <b-nav-item-dropdown
    class="dropdown-notification mr-25"
    menu-class="dropdown-menu-media"
    right
  >
    <template #button-content>
      <feather-icon
        badge="6"
        badge-classes="bg-danger"
        class="text-body"
        icon="BellIcon"
        size="21"
      />
    </template>

    <!-- 标题 -->
    <li class="dropdown-menu-header">
      <div class="dropdown-header d-flex">
        <h4 class="notification-title mb-0 mr-auto">
          通知
        </h4>
        <b-badge
          pill
          variant="light-primary"
        >
          6 个新通知
        </b-badge>
      </div>
    </li>

    <!-- 通知 -->
    <vue-perfect-scrollbar
      v-once
      :settings="perfectScrollbarSettings"
      class="scrollable-container media-list scroll-area"
      tagname="li"
    >
      <!-- 账户通知列表 -->
      <b-link
        v-for="notification in notifications"
        :key="notification.subtitle"
      >
        <b-media>
          <template #aside>
            <b-avatar
              size="32"
              :src="notification.avatar"
              :text="notification.avatar"
              :variant="notification.type"
            />
          </template>
          <p class="media-heading">
            <span class="font-weight-bolder">
              {{ notification.title }}
            </span>
          </p>
          <small class="notification-text">{{ notification.subtitle }}</small>
        </b-media>
      </b-link>

      <!-- 系统通知开关 -->
      <div class="media d-flex align-items-center">
        <h6 class="font-weight-bolder mr-auto mb-0">
          系统通知
        </h6>
        <b-form-checkbox
          :checked="true"
          switch
        />
      </div>

      <!-- 系统通知列表 -->
      <b-link
        v-for="notification in systemNotifications"
        :key="notification.subtitle"
      >
        <b-media>
          <template #aside>
            <b-avatar
              size="32"
              :variant="notification.type"
            >
              <feather-icon :icon="notification.icon" />
            </b-avatar>
          </template>
          <p class="media-heading">
            <span class="font-weight-bolder">
              {{ notification.title }}
            </span>
          </p>
          <small class="notification-text">{{ notification.subtitle }}</small>
        </b-media>
      </b-link>
    </vue-perfect-scrollbar>

    <!-- 下拉菜单页脚 -->
    <li class="dropdown-menu-footer"><b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      block
    >全部标记为已读</b-button>
    </li>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BBadge, BMedia, BLink, BAvatar, BButton, BFormCheckbox,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BNavItemDropdown,
    BBadge,
    BMedia,
    BLink,
    BAvatar,
    VuePerfectScrollbar,
    BButton,
    BFormCheckbox,
  },
  directives: {
    Ripple,
  },
  setup() {
    /* eslint-disable global-require */
    const notifications = [
      {
        title: '恭喜你！Albert 🎉',
        avatar: require('@/assets/images/avatars/6-small.png'),
        subtitle: '荣获月度销售冠军',
        type: 'light-success',
      },
      {
        title: '新消息',
        avatar: require('@/assets/images/avatars/9-small.png'),
        subtitle: '您有 10条未读消息',
        type: 'light-info',
      },
      {
        title: '订单状态',
        avatar: 'MD',
        subtitle: '您购买的 3 件商品已发货',
        type: 'light-danger',
      },
    ]
    /* eslint-disable global-require */

    const systemNotifications = [
      {
        title: '服务器关闭',
        subtitle: '应用实例服务器到期，已自动关闭',
        type: 'light-danger',
        icon: 'XIcon',
      },
      {
        title: '销售报表',
        subtitle: '上个月的报表已生成',
        type: 'light-success',
        icon: 'CheckIcon',
      },
      {
        title: '内存占用率过高',
        subtitle: '请拓展物理内存',
        type: 'light-warning',
        icon: 'AlertTriangleIcon',
      },
    ]

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    }

    return {
      notifications,
      systemNotifications,
      perfectScrollbarSettings,
    }
  },
}
</script>

<style>

</style>

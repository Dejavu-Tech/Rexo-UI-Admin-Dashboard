<template>
  <b-nav-item-dropdown
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <template #button-content>
      <div class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">
          {{ userData.fullName || userData.username }}
        </p>
        <span class="user-status">{{ userData.role }}</span>
      </div>
      <b-avatar
        size="40"
        :src="userData.avatar"
        variant="light-primary"
        badge
        class="badge-minimal"
        badge-variant="success"
      >
        <feather-icon
          v-if="!userData.fullName"
          icon="UserIcon"
          size="22"
        />
      </b-avatar>
    </template>

    <b-dropdown-item
      :to="{ name: 'pages-profile'}"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="UserIcon"
        class="mr-50"
      />
      <span>个人资料</span>
    </b-dropdown-item>
    <b-dropdown-item
      :to="{ name: 'apps-email' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="MailIcon"
        class="mr-50"
      />
      <span>收件箱</span>
    </b-dropdown-item>
    <b-dropdown-item
      :to="{ name: 'apps-todo' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="CheckSquareIcon"
        class="mr-50"
      />
      <span>任务清单</span>
    </b-dropdown-item>
    <b-dropdown-item
      :to="{ name: 'apps-chat' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="MessageSquareIcon"
        class="mr-50"
      />
      <span>聊天应用</span>
    </b-dropdown-item>

    <b-dropdown-divider />

    <b-dropdown-item
      :to="{ name: 'pages-account-setting' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="SettingsIcon"
        class="mr-50"
      />
      <span>用户设置</span>
    </b-dropdown-item>
    <b-dropdown-item
      :to="{ name: 'pages-pricing' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="CreditCardIcon"
        class="mr-50"
      />
      <span>产品定价</span>
    </b-dropdown-item>
    <b-dropdown-item
      :to="{ name: 'pages-faq' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="HelpCircleIcon"
        class="mr-50"
      />
      <span>常见问题</span>
    </b-dropdown-item>
    <b-dropdown-item
      link-class="d-flex align-items-center"
      @click="logout"
    >
      <feather-icon
        size="16"
        icon="LogOutIcon"
        class="mr-50"
      />
      <span>退出登录</span>
    </b-dropdown-item></b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import { initialAbility } from '@/libs/acl/config'
import useJwt from '@/auth/jwt/useJwt'
import { avatarText } from '@core/utils/filter'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      avatarText,
    }
  },
  methods: {
    logout() {
      // 从本地存储中删除 token，删除后亦可对后端调用 API，以将使用的 token 列入黑名单
      localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
      localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

      // 从本地存储中删除用户数据
      localStorage.removeItem('userData')

      // 重置
      this.$ability.update(initialAbility)

      // 重定向到登录页面
      this.$router.push({ name: 'auth-login' })
    },
  },
}
</script>

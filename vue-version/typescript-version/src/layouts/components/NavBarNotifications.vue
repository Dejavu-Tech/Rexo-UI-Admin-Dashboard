<script lang="ts" setup>
import type { Notification } from '@layouts/types'

import avatar3 from '@images/avatars/avatar-3.png'
import avatar5 from '@images/avatars/avatar-5.png'
import avatar17 from '@images/avatars/avatar-17.png'
import paypal from '@images/svg/paypal.svg'

const notifications = ref<Notification[]>([
  {
    id: 1,
    img: avatar17,
    title: '本月销售冠军：Albert！ 🎉',
    subtitle: '自立自强，再创辉煌',
    time: '今天',
    isSeen: true,
  },
  {
    id: 2,
    text: '马糖糖',
    title: '注册成功通知',
    subtitle: '吃货星球 SaaS 新用户',
    time: '昨天',
    isSeen: false,
  },
  {
    id: 3,
    img: avatar5,
    title: '新消息 👋🏻',
    subtitle: '您有 10 条未读消息',
    time: '6 月 11 日',
    isSeen: true,
  },
  {
    id: 4,
    img: paypal,
    title: '微信提醒',
    subtitle: '微信个人收款：300 元',
    time: '6 月 7 日',
    isSeen: false,
    color: 'error',
  },
  {
    id: 5,
    img: avatar3,
    title: '订单已发货 📦',
    subtitle: '您购买的 3 件商品已发货',
    time: '5 月 30 日',
    isSeen: true,
  },
])

const removeNotification = (notificationId: number) => {
  notifications.value.forEach((item, index) => {
    if (notificationId === item.id)
      notifications.value.splice(index, 1)
  })
}

const markRead = (notificationId: number[]) => {
  notifications.value.forEach(item => {
    notificationId.forEach(id => {
      if (id === item.id)
        item.isSeen = true
    })
  })
}

const markUnRead = (notificationId: number[]) => {
  notifications.value.forEach(item => {
    notificationId.forEach(id => {
      if (id === item.id)
        item.isSeen = false
    })
  })
}

const handleNotificationClick = (notification: Notification) => {
  if (!notification.isSeen)
    markRead([notification.id])
}
</script>

<template>
  <Notifications
    :notifications="notifications"
    @remove="removeNotification"
    @read="markRead"
    @unread="markUnRead"
    @click:notification="handleNotificationClick"
  />
</template>

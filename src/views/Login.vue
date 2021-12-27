<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <Rexo-logo />
        <h2 class="brand-text text-primary">
          Rexo-UI
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Login V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title
            class="mb-1 font-weight-bold"
            title-tag="h2"
          >
            欢迎使用 Rexo-UI - VueJS & HTML 网站/后台管理模板 👋
          </b-card-title>
          <b-card-text class="mb-2">
            请登录您的帐户开始体验
          </b-card-text>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent
            >
              <!-- email -->
              <b-form-group
                label="用户名 / 邮箱"
                label-for="login-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="邮箱"
                  rules="required|email"
                >
                  <b-form-input
                    id="login-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false:null"
                    name="login-email"
                    placeholder="abc@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">密码</label>
                  <b-link :to="{name:'auth-forgot-password-v2'}">
                    <small>忘记密码?</small>
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="密码"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  记住我
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                @click="validationForm"
              >
                登录
              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <span>没有帐号? </span>
            <b-link :to="{name:'page-auth-register-v2'}">
              <span>&nbsp;点此注册</span>
            </b-link>
          </b-card-text>

          <!-- divider -->
          <div class="divider my-2">
            <div class="divider-text">
              其他方式登录
            </div>
          </div>

          <!-- social buttons -->
          <div class="auth-footer-btn d-flex justify-content-center">
            <b-button
              variant="qq"
              href="javascript:void(0)"
            >
              <b-img
                :src="require('@/assets/images/icons/qq.svg')"
                height="14"
                class="qq"
              />
            </b-button>
            <b-button
              variant="wechat"
              href="javascript:void(0)"
            >
              <b-img
                :src="require('@/assets/images/icons/wechat.svg')"
                height="14"
                class="wechat"
              />
            </b-button>
            <b-button
              variant="google"
              href="javascript:void(0)"
            >
              <feather-icon icon="MailIcon" />
            </b-button>
            <b-button
              variant="github"
              href="javascript:void(0)"
            >
              <feather-icon icon="GithubIcon" />
            </b-button>
          </div>
        </b-col>
      </b-col>
    <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import RexoLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store/index'

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    RexoLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: '',
      userEmail: '',
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      // 验证规则 import store from '@/store/index'
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    validationForm() {
      this.$refs.loginValidation.validate().then(success => {
        if (success) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: '表单已提交',
              icon: 'EditIcon',
              variant: 'success',
            },
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>

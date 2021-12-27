<template>
  <v-tour
    name="RexoTour"
    :steps="steps"
  >
    <template slot-scope="tour">
      <transition name="fade">
        <!-- eslint-disable vue/no-use-v-if-with-v-for -->
        <v-step
          v-for="(step, index) of tour.steps"
          v-if="tour.currentStep === index"
          :key="index"
          :step="step"
          :previous-step="tour.previousStep"
          :next-step="tour.nextStep"
          :stop="tour.stop"
          :is-first="tour.isFirst"
          :is-last="tour.isLast"
          :labels="tour.labels"
        >

          <div
            slot="actions"
            class="tour-actions d-flex justify-content-between"
          >
            <!-- 跳过按钮 -->
            <b-button
              v-if="tour.currentStep != tour.steps.length - 1"
              size="sm"
              variant="outline-primary"
              class="btn-tour-skip mr-1"
              @click="tour.stop"
            >
              <span class="mr-25 align-middle">跳过</span>
              <feather-icon
                icon="XIcon"
                size="12"
              />
            </b-button>

            <!-- 上一步按钮 -->
            <b-button
              v-if="tour.currentStep"
              size="sm"
              variant="outline-primary mr-1"
              @click="tour.previousStep"
            >
              <feather-icon
                icon="ChevronLeftIcon"
                size="12"
              />
              <span class="ml-25 align-middle">上一步</span>
            </b-button>

            <!-- 下一步按钮 -->
            <b-button
              v-if="tour.currentStep != tour.steps.length - 1"
              size="sm"
              variant="primary"
              class="btn-tour-next"
              @click="tour.nextStep"
            >
              <span class="mr-25 align-middle">下一步</span>
              <feather-icon
                icon="ChevronRightIcon"
                size="12"
              />
            </b-button>

            <!-- 结束按钮 -->
            <b-button
              v-if="tour.currentStep == tour.steps.length - 1"
              size="sm"
              variant="primary"
              class="btn-tour-finish"
              @click="tour.stop"
            >
              <span class="mr-25 align-middle">结束</span>
              <feather-icon
                icon="CheckCircleIcon"
                size="12"
              />
            </b-button>
          </div>

        </v-step>
        <!-- eslint-enable vue/no-use-v-if-with-v-for -->
      </transition>
    </template>
  </v-tour>
</template>

<script>
import { BButton } from 'bootstrap-vue'

export default {
  name: 'VxTour',
  components: {
    BButton,
  },
  props: {
    steps: {
      required: true,
      type: Array,
    },
  },
}
</script>

<template>
  <div
    class="tutorial fixed flex justify-center items-center w-full h-full text-center select-none cursor-default"
  >
    <v-document-event @click="next" @keydown.space="next" />
    <v-press-enter-key
      class="fixed bottom-0 mb-2 text-xs"
      :class="{ blink, 'opacity-50': !blink }"
      @enter="next"
    />
    <transition v-if="page" mode="out-in">
      <div class="page" :key="page" v-if="page === 1">
        <vue-typer :text="lines" :repeat="0" @completed="next(3000)" />
      </div>
      <div class="page text-6xl font-cinzel text-shadow-1" :key="page" v-else-if="page === 2">
        <vue-typer :repeat="0" text="Digital Shift Sisisin" @completed="blink = true" />
      </div>
      <div class="page" :key="page" v-else-if="page === 3">
        <img class="max-h-screen object-contain" src="@/assets/images/keyboard.jpg" />
        <vue-typer
          :repeat="0"
          :text="
            '左右の Shift キーを両方とも使用します。\nその他のキーやマウスは、ゲーム中においては使用しません。'
          "
          @completed="blink = true"
        />
      </div>
      <div class="page" :key="page" v-else-if="page === 4">
        <video src="@/assets/videos/1.mp4" autoplay loop />
        <vue-typer
          :repeat="0"
          :text="
            'Shift キーを押すと、変化の時代に求められる\n本質的なデジタルシフトを sisisin が実践します。'
          "
          @completed="blink = true"
        />
      </div>
      <div class="page" :key="page" v-else-if="page === 5">
        <video src="@/assets/videos/2.mp4" autoplay loop />
        <vue-typer
          :repeat="0"
          text="その大きな変革に失敗した時点でゲームオーバーです。"
          @completed="blink = true"
        />
      </div>
      <div class="page" :key="page" v-else-if="page === 6">
        <vue-typer
          :repeat="0"
          :text="
            '日本企業の変革を進めると、ホールディングスは\n“デジタルシフトカンパニー” として発展します。'
          "
          @completed="blink = true"
        />
        <table class="m-auto mt-8">
          <tr>
            <td>
              <img
                src="@/assets/images/noboru.png"
                class="inline-block bg-white rounded-full object-contain"
                style="width: 8vmin; height: 8vmin;"
              />
            </td>
            <td class="text-right" style="padding-left: 4vmin;">x 2</td>
          </tr>
          <tr>
            <td>
              <img
                src="@/assets/images/daisuke.png"
                class="inline-block bg-white rounded-full object-contain"
                style="width: 8vmin; height: 8vmin;"
              />
            </td>
            <td class="text-right" style="padding-left: 4vmin;">10 pt</td>
          </tr>
          <tr>
            <td>
              <img
                src="@/assets/images/opt.png"
                class="inline-block bg-white rounded-full object-contain"
                style="width: 8vmin; height: 8vmin;"
              />
            </td>
            <td class="text-right" style="padding-left: 4vmin;">1 pt</td>
          </tr>
        </table>
      </div>
      <div class="page" :key="page" v-else ref="end">
        <vue-typer :repeat="0" text="デジタルシフトを実現し続ける sisisin となって事業を拡大し、" />
        <vue-typer
          :repeat="0"
          text="企業価値 1 兆円をめざせ！！"
          style="font-size: 1.5em;"
          :pre-type-delay="4000"
          @completed="blink = true"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import { events } from '@/lib/events'

export default Vue.extend({
  data: () => ({
    page: 0,
    blink: false,
    lines: [
      'デジタライゼーションによる変革が本格的なうねりとなり、\n急速なスピードでボーダレス化が進んでいます。',
      '国と国、産業と産業、\nリアルとデジタルの境が消えていく瞬間に\n私たちは直面しています。',
      '官民一体で着々とデジタルシフトを遂行している中国やアメリカは、\n今、世界経済において\n圧倒的なプレゼンスを手に入れています。',
      'デジタルシフトを成し遂げたものだけが、\n次の未来に行けるのです。',
      '日本が置かれている危機的状況をしっかり見据え、\n一刻も早くデジタルシフトを進めたいと、\n強い使命感を抱いている\nsisisin-games ユーザーは\n少なくありません。',
      '変化の時代に求められる、本質的なデジタルシフト。',
      'それが',
    ],
  }),
  mounted() {
    setTimeout(() => {
      this.page++
    }, 1000)
  },
  methods: {
    async next(delay) {
      if (typeof delay === 'number') {
        await new Promise(resolve => setTimeout(resolve, delay))
      }

      this.blink = false

      if (this.$refs.end) {
        events.$emit('tutorialCompleted')
      } else {
        this.page++
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.tutorial {
  background-color: #0009;
  font: 4vmin 'Hiragino Kaku Gothic StdN', sans-serif;
}

.page {
  display: flex;
  flex-direction: column;
  transition-duration: 0.2s;
  transition-property: transform, opacity;
  will-change: transform, opacity;

  &.v-enter {
    opacity: 0;
    transform: translateY(50%);
  }

  &.v-leave-to {
    opacity: 0;
    transform: translateY(-50%);
  }

  video {
    max-height: 50vmin;
    margin: auto;
    border: 2vmin solid #000;
  }
}

.vue-typer ::v-deep {
  .custom.char {
    color: unset;
  }

  .custom.caret {
    background-color: #fff;
  }
}
</style>

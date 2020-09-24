<template>
  <div class="cg-withdraw">
    <div class="cg-withdraw__list">
      <div
        v-for="(item, i) in data"
        :key="i"
        class="cg-withdraw__list__item"
        :class="{
          'cg-withdraw__list__item--disabled': item.alreadyWithdrew || !item.enough,
          'cg-withdraw__list__item--active': value === item.type
        }"
        @click="select(item)"
      >
        <div class="cg-withdraw__list__item__brand">{{ i === 0 ? '新人专享' : '还款减负活动' }}</div>
        <div class="cg-withdraw__list__item__content">¥{{ item.amount / 10000 }}元</div>
      </div>
    </div>
    <div class="cg-withdraw__intro">
      <div class="cg-withdraw__intro__text1">还款减负活动提现额度说明：</div>
      <div class="cg-withdraw__intro__text2">活动提现限时开放，每额度限提现一次~</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.cg-withdraw {
  &__list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &__item {
      &__brand {
        width: 86*2px;
        height: 48px;
        line-height: 48px;
        font-size: 20px;
        text-align: center;
        background:linear-gradient(270deg,rgba(228,28,52,1) 0%,rgba(244,121,50,1) 100%);
        border-radius:200px 200px 0px 200px;
        position: relative;
        transform: translateY(50%);
      }
      &__content {
        background-color: #3e404b;
        width: 220px;
        height: 128px;
        border-radius: 12px;
        color: #fff;
        font-size: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      margin-bottom: 10px;

      &--disabled {
        opacity: .5;
      }

      &--active {
        .cg-withdraw__list__item__content {
          box-sizing: border-box;
          border: 2px solid #DDB67F;
        }
      }
    }
  }
  &__intro {
    background: #FFFFFF1A;
    padding: 30px 16px;
    margin-top: 30px;
    border-radius: 12px;
    &__text1 {
      line-height: 1;
      margin-bottom: 25px;
    }
    &__text2 {
      line-height: 1;
      opacity: .6;
    }
  }
}
</style>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    }
  },
  methods: {
    select(item) {
      if (item.alreadyWithdrew || !item.enough) {
        return;
      }
      this.$emit('input', item.type);
    },
  },
};
</script>

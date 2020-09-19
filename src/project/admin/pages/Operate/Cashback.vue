<template>
  <div class="container">
    <div class="card">
      <div class="card__header">
        <div class="tabs">
          <router-link tag="div" class="tabs__item" active-class="active" :to="{ name: 'CashbackStep', params: { step: '1' } }">第一步</router-link>
          <router-link tag="div" class="tabs__item" active-class="active" :to="{ name: 'CashbackStep', params: { step: '2' } }">第二步</router-link>
          <router-link tag="div" class="tabs__item" active-class="active" :to="{ name: 'CashbackStep', params: { step: '3' } }">第三步</router-link>
          <router-link tag="div" class="tabs__item" active-class="active" :to="{ name: 'CashbackStep', params: { step: '4' } }">第四步</router-link>
          <router-link tag="div" class="tabs__item" active-class="active" :to="{ name: 'CashbackStep', params: { step: '5' } }">第五步</router-link>
          <router-link tag="div" class="tabs__item" active-class="active" :to="{ name: 'CashbackStep', params: { step: '6' } }">第六步</router-link>
        </div>
      </div>
      <div class="card__body"><router-view :key="$route.fullPath"/></div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.container {
  margin: 24px auto;
  width: 1152px;
  background: #fff;
  border-radius: 4px;
}

.card {
}

.card__header {
  font-size: 16px;
}

.card__body {
  padding: 18px 20px;
}

.tabs {
  display: flex;
}

.tabs__item {
  color: rgba(0, 0, 0, .65);
  font-size: 16px;
  padding: 18px 20px;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}

.tabs__item.active {
  border-bottom-color: rgba(24, 144, 255, .85);
}
</style>

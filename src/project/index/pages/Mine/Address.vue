<template>
  <div @click="backMyInfo()">
    地址地址
  </div>
</template>

<script>
    export default {
        name: "Address",
      methods:{
          backMyInfo(){
            this.$router.push({
              path: '/myInfo',
              name:'MyInfo',
              query: {
                addressInfo: '天津市南开区'
              }
            })
          }
      }
    }
</script>

<style lang="css" scoped>

</style>

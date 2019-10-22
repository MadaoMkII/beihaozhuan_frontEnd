<template>
  <div class="toastMessageBox" v-if="messageType === 'text' && show">
    {{message}}
  </div>
  <div class="iconMessageBox" v-else-if="messageType === 'success' && show">
    <div class="messageIcon success"></div>
    <div class="message">{{message}}</div>
  </div>
  <div class="iconMessageBox" v-else-if="messageType === 'error' && show">
    <div class="messageIcon error"></div>
    <div class="message">{{message}}</div>
  </div>
  <div class="iconMessageBox" v-else-if="messageType === 'loading' && show">
    <div class="messageIcon loading"></div>
    <div class="message">{{message}}</div>
  </div>
</template>

<script>
    export default {
      name: "Toast",
      data () {
        return {
          message: '',
          show: false,
          messageType : ''
        }
      }
    }
</script>

<style lang="less" scoped>
  .toastMessageBox{
    max-width: 444px;
    min-height: 36*2px;
    line-height: 36*2px;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: rgba(21, 22, 29, .6);
    color: #fff;
    padding: 16px 24px;
    font-size: 28px;
    border-radius: 16px;
    text-align: center;
    /*overflow: hidden;*/
  }
  .iconMessageBox{
    width: 88*2px;
    height: 88*2px;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: rgba(21, 22, 29, .6);
    border-radius: 16px;
  }
  .messageIcon{
    width: 36*2px;
    height: 36*2px;
    margin: auto;
    margin-top: 24px;
  }
  .message{
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-top: 16px;
    text-align: center;
    font-size: 28px;
  }
  .success{
    .bg-image("~index/assets/toast/success");
  }
  .error{
    .bg-image("~index/assets/toast/error");
  }
  .loading{
    .bg-image("~index/assets/toast/loading");
  }
</style>

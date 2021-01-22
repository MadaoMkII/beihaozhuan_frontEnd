<template>
  <div class="normalBox">
    <div class="backIcon" @click="prev()"></div>
    <div class="title">玩法引导</div>
    <div class="introduceCon">
      <div class="introduceTitle">核心内容：</div>
      <div class="introduceItem">平台收益来自三部分：任务、邀请和英雄榜，其中任务分成两大类，一个是简单的看视频赚金币+日常任务体系，一个是相对复杂的app下载试用体系，可以同时做收益累加。</div>
      <div class="introduceTitle">1.注册平台</div>
      <div class="introduceItem">首先，还没有账号的小伙伴，需要先注册一个账号（也可选择使用微信直接登录，再绑定手机号码）。</div>
      <div class="imgCon">
        <img src="../../assets/guide/1.注册平台.jpg" alt="">
      </div>
      <div class="introduceTitle">2.首页</div>
      <div class="introduceItem">注册好的小伙伴，登陆后即可看到首页界面啦：</div>
      <div class="imgCon">
        <img src="../../assets/guide/2.首页.jpg" alt="">
      </div>
      <div class="introduceTitle">2.1赚金币</div>
      <div class="introduceItem">定义为简单任务模式，任务极其简单，对应的收益也不高。适合简单重复操作的用户或者刚上手的用户。</div>
      <div class="imgCon">
        <img src="../../assets/guide/2.1赚金币.png" alt="">
      </div>
      <div class="introduceTitle">2.1.1介绍日常任务和进阶任务</div>
      <div class="imgCon">
        <img src="../../assets/guide/2.1.1介绍日常任务和进阶任务.jpg" alt="">
      </div>
      <div class="introduceTitle">2.2看视频广告赚金币</div>
      <div class="introduceItem">和首页同步，点哪个都行</div>
      <div class="introduceItem">广告任务的完成方法为观看视频广告，直到屏幕右上角出现关闭按钮，点击即可关闭并完成此次任务，配合日常任务收益最大化。</div>
      <div class="imgCon">
        <img src="../../assets/guide/2.2看视频广告赚金币.jpg" alt="">
      </div>
      <div class="introduceTitle">3.任务</div>
      <div class="introduceItem">还款减负计划，任务方式为app的试玩试用及推广，收益高任务难度有稍微增加，适合熟练使用手机用户或时间充裕用户。</div>
      <div class="imgCon">
        <img src="../../assets/guide/3.任务.png" alt="">
      </div>
      <div class="introduceTitle">3.1+3.2进度条与活动规则</div>
      <div class="introduceItem">此处显示您在当前自然月的总收益情况（包括任务、邀请以及英雄榜单收益）</div>
      <div class="imgCon">
        <img src="../../assets/guide/3.1+3.2进度条和活动规则.......png" alt="">
      </div>
      <div class="introduceTitle">3.3以第一步下载环节为例，介绍如何下载、根据平台要求试玩试用并上传相应截图、审核时效及公众号审核结果推送</div>
      <div class="introduceItem">a.点击进入任务界面，点击下载按钮开始任务</div>
      <div class="imgCon">
        <img src="../../assets/guide/3.3a点击进入任务界面，点击下载按钮开始任务.jpg" alt="">
      </div>
      <div class="introduceItem">b.根据文字提示下载app</div>
      <div class="imgCon">
        <img src="../../assets/guide/3.3b.根据文字提示下载app.jpg" alt="">
      </div>
      <div class="introduceItem">c.注册b站</div>
      <div class="imgCon">
        <img src="../../assets/guide/3.3c注册B站.jpg" alt="">
      </div>
      <div class="introduceItem">d. 完成注册后回到任务页点击加号按示例图上传截图</div>
      <div class="imgCon">
        <img src="../../assets/guide/3.3d点击加号按示例图上传截图.jpg" alt="">
      </div>
      <div class="introduceItem">e. 审核通过后会有微信公众号推送通知</div>
      <div class="imgCon">
        <img src="../../assets/guide/3.3e.审核通过后会有微信公众号推送通知.jpg" alt="">
      </div>
      <div class="introduceTitle">3.4提现按钮</div>
      <div class="introduceItem">提现规则介绍及提现演示</div>
      <div class="imgCon">
        <img src="../../assets/guide/3.4提现按钮.jpg" alt="">
      </div>
      <div class="imgCon">
        <img src="../../assets/guide/3.4-1提现规则及提现演示.jpg" alt="">
      </div>
      <div class="introduceTitle">4.商城</div>
      <div class="imgCon">
        <img src="../../assets/guide/4.商城.jpg" alt="">
      </div>
      <div class="introduceTitle">5.我的</div>
      <div class="introduceTitle">5.1当前余额：金币汇率</div>
      <div class="imgCon">
        <img src="../../assets/guide/5.1当前余额：金币汇率.jpg" alt="">
      </div>
      <div class="introduceTitle">5.2立即提现：提现门槛及规则，跟3.4一样</div>
      <div class="introduceTitle">5.3我的任务：与2.1.1相同</div>
      <div class="introduceTitle">5.4我的订单：商城的订单在这里显示</div>
      <div class="imgCon">
        <img src="../../assets/guide/5.4我的订单：商城的，暂时用不到.jpg" alt="">
      </div>
      <div class="introduceTitle">5.5我的团队：</div>
      <div class="introduceItem">累计收益为团队累计为您带来的总收益，下方为每个成员的自身累计收益和注册时间</div>
      <div class="imgCon">
        <img src="../../assets/guide/5.5我的团队：这个着重说一下，有关于推荐结果查询的，包括人员和收益.jpg" alt="">
      </div>
      <div class="introduceTitle">5.6账户明细：收益明细</div>
      <div class="imgCon">
        <img src="../../assets/guide/5.6账户明细：收益明细.jpg" alt="">
      </div>
      <div class="introduceTitle">5.7个人信息</div>
      <div class="imgCon">
        <img src="../../assets/guide/5.7个人信息.jpg" alt="">
      </div>
      <div class="introduceTitle">5.8账户安全：修改密码的</div>
      <div class="introduceTitle">5.9公司介绍：各种条款说明</div>
      <div class="introduceTitle">5.10邀请好友：</div>
      <div class="introduceItem">生成个人唯一的邀请二维码，是您邀请的最主要途径。请保留好，遗失可再次申请。</div>
      <div class="imgCon">
        <img src="../../assets/guide/5.10邀请好友：与我的团队一起，着重说明.jpg" alt="">
      </div>
      <div class="introduceTitle">5.11客服电话</div>
      <div class="introduceTitle">6.其他-公众号</div>
      <div class="introduceTitle">6.1平台入口按钮</div>
      <div class="imgCon">
        <img src="../../assets/guide/6.1平台入口所有按钮.jpg" alt="">
      </div>
      <div class="introduceTitle">6.2英雄榜：每日、每月或活动日根据排名发放奖励金，重要收入来源。</div>
      <div class="imgCon">
        <img src="../../assets/guide/6.2英雄榜：重点介绍，收益的重要组成部分.png" alt="">
      </div>
      <div class="introduceTitle">6.3客服：</div>
      <div class="introduceTitle">6.3.1公众号客服按钮，直接打字 </div>
      <div class="introduceTitle">6.3.2客服群，公众号内下方按钮：客服群组 </div>
      <div class="introduceTitle">6.3.3直播客服 </div>
      <div class="introduceItem">我们的直播时间为： </div>
      <div class="introduceItem">每个工作日的中午12:00~13:00 </div>
      <div class="introduceItem">每周周五、六、日的晚上20：00-21:30 </div>
      <div class="introduceItem">周末直播有抽奖 </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Introduce"
    }
</script>

<style lang="less" scoped>
  .backIcon{
    width: 48px;
    height: 48px;
    position: absolute;
    top: 26px;
    left: 24px;
    .bg-image("~index/assets/back");
    z-index: 99;
  }
  .title{
    width: 100%;
    height: 68px;
    margin:auto;
    padding-top: 24px;
    font-size: 17*2px;
    line-height: 48px;
    text-align: center;
    position: absolute;
    background: #313340;
    top: 0;
  }
  .introduceCon{
    width: 90%;
    margin: auto;
    overflow: auto;
    margin-top: 100px;
    margin-bottom: 40px;
  }
  .introduceTitle{
    //height: 40px;
    //line-height: 40px;
    //text-align: center;
    font-size: 28px;
    //margin: 20px 0;
    margin-bottom: 20px;
    font-weight: bold;
    color: #fff;
  }
  .introduceItem{
    font-size: 28px;
    //line-height: 45px;
    //text-indent:.8rem;
    margin-bottom: 20px;
    color: #eee;
  }
  .boldIntroduce{
    font-size: 35px;
    font-weight: bold;
  }
  .imgCon{
    width: 80%;
    //margin-top: 20px;
    //margin-bottom: 20px;
    margin: 20px auto;
  }
  .imgCon img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .tips{
    color: #d8271c;
    text-align: right;
  }
  .normalBox {
    background-color: #3e4051;
  }
</style>

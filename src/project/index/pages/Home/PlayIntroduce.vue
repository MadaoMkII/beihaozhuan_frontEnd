<template>
  <div class="normalBox">
    <div class="backIcon" @click="prev()"></div>
    <div class="title">玩法引导</div>
    <div class="introduceCon">
      <div class="introduceItem">
        首先，还没有账号的小伙伴，需要先注册一个账号（也可选择使用微信直接登录，再绑定手机号码）。
      </div>
      <div class="imgCon">
        <img src="../../assets/introduce/1.jpg" alt="">
      </div>
      <div class="introduceItem">
        注册好的小伙伴，登录后即可看到首页界面啦：
      </div>
      <div class="imgCon">
        <img src="../../assets/introduce/2.jpg" alt="">
      </div>
      <div class="introduceItem">
        点击页面下方第二项：<span class="tips">“任务”</span>进入任务大厅：
      </div>
      <div class="imgCon">
        <img src="../../assets/introduce/3.jpg" alt="">
      </div>
      <div class="introduceItem">
        首先点击<span class="tips">“日常任务”</span>，完成简单粗暴、金币丰厚的新手任务：
        几个简单的小任务，完善个人信息就送1000金币，体验一下看广告等赚金币的玩法，看完第一条广告就送200金币，做完任务后记得要点“交任务”哦，新手任务轻松搞定！
      </div>
      <div class="imgCon">
        <img src="../../assets/introduce/4.jpg" alt="">
      </div>
      <div class="introduceItem">
        完成新手任务后，按照难易程度，可以继续完成收益稳定的<span class="tips">每日任务</span>，每日任务顾名思义，每天都可以完成一次，闲暇时间动动手指，快乐地挣点小钱。
      </div>
      <div class="imgCon">
        <img src="../../assets/introduce/7.jpg" alt="">
      </div>
      <div class="introduceItem">
        每日的收益与你的坚持息息相关，只要投入耐心，就会有收获！只要你够活跃，就能获得一份不错的收入！
      </div>
      <div class="introduceItem">
        对于有时间、有精力、对收益有一定追求的朋友，一定不能错过任务大厅中的<span class="tips">进阶任务</span>！进阶任务难度比日常任务要高，需要付出的时间精力也相对会多一点点，当然啦，所能获得的金币也要比简单任务多一些，每周把进阶任务完成，才算是圆满啦~
      </div>
      <div class="introduceItem">
        有了网薪怎么能不知道查呢？让小编来教教你吧——
      </div>
      <div class="imgCon">
        <img src="../../assets/introduce/8.jpg" alt="">
      </div>
      <div class="introduceItem">
        点击页面下方“<span class="tips">我的</span>”，那就是你的  {个人中心}  入口。右上方有账户明细，可以看到你的网薪数目哦。
      </div>
      <div class="imgCon">
        <img src="../../assets/introduce/9.png" alt="">
      </div>
      <div class="introduceItem">
        点击 “<span class="tips">全部</span>”更能看到详细获得数目，积累到一定数量的金币后，将有现金红包和丰富的奖品等着你！
      </div>
      <div class="imgCon">
        <img src="../../assets/introduce/10.png" alt="">
      </div>
      <div class="introduceItem">
        最后点击页面下方的“<span class="tips">商城</span>”，这将是大家最爱的页面啦！进入商城，可以选择金币的兑换方式，我们将陆续上线各种可兑换的商品和服务，比如一种有意义的商品——保险。
      </div>
      <div class="imgCon">
        <img src="../../assets/introduce/11.png" alt="">
      </div>
      <div class="introduceItem">
        很多人觉得自己还年轻，身体很健康，不需要保险。可是，谁能保证自己一辈子不生病呢？现在没病，不能代表以后不会生病。如果我们生病了，当下没有治疗的方法，那是老天爷和医生的事情；但如果因为没钱而导致我们不得不放弃治疗，那将是我们一辈子的遗憾。
      </div>
      <div class="introduceItem">
        当你在身体健康的时候拒绝保险，等到你生病了保险也会拒绝你，所以，上保险也要提前规划，未雨绸缪！
      </div>
      <div class="imgCon">
        <img src="../../assets/introduce/12.png" alt="">
      </div>
      <div class="introduceItem">
        用金币来换取保险，不用心疼现金，也不会给家庭开销造成任何负担，当你通过努力为自己、为家人都准备上了一份合适的保险的时候，也许你会发现，自己日夜为之奋斗的目标，似乎已经完成了一半！
      </div>
      <div class="introduceItem">
        微信提现目前也正在与官方洽谈中，不日即将推出，满足注册时长和提现额度的要求后，亲们就可以把金币换成现金领出来了，天凉啦，喝再多的热水，也比不上一个实实在在的红包更暖心！
      </div>
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
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 40px;
    margin: 20px 0;
  }
  .introduceItem{
    font-size: 28px;
    line-height: 45px;
    text-indent:.8rem;
  }
  .boldIntroduce{
    font-size: 35px;
    font-weight: bold;
  }
  .imgCon{
    width: 80%;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .imgCon img{
    width: 100%;
    height: 100%;
  }
  .tips{
    color: #d8271c;
    text-align: right;
  }

</style>

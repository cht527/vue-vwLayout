<!-- 首页页面 -->
<template>
  <div>
      <mt-navbar v-model="tabIndex" >
          <mt-tab-item v-for="(item,index) in tabList" :id="item.id" :key="index" class="index-tab-item">
            {{item.val}}
          </mt-tab-item>
      </mt-navbar>
      <div class="tab-swiper">
        <!-- 排名 -->
          <div class="summary-container">
            <div class="summary-rank">
              <span v-if="rank&&allRank">您在竞争对手中排<span class="rank-num">{{rank}}</span>名/总数{{allRank}}名</span>
              <span v-else style="display: inline-block;padding-top: 15px;" >{{noRankDes}}</span>
            </div>
          </div>

        <!-- 分析 -->
          <div class="analysis-container">
              <div class="analysis-title">
                  <div class="analysis-title-text bbOnepx">推广管家帮您分析</div>
              </div>
              <div class="analysis-content">
                  <div v-for="(item, index) in analysisList" :key="index" @click="handleAnalysisiLink(item.buttonJumpType,index)" class="analysis-item">
                      <img class="analysis-img" :src="item.imgSrc" alt="">
                      <span class="analysis-result">
                        <img class="analysis-icon" :src="segmentClass(item.status)" />
                        <span class="analysis-text">{{item.copyWriterContent}}</span>
                      </span>
                  </div>
              </div>
          </div>

          <!-- 主营商圈 -->
          <div class="main-business-container">
              <div class="main-business-header">
                    <div class="header-title">主营商圈</div>
                    <div class="header-set" @click="handleBusinessSet">{{businessSetText}}</div>
              </div>
              <div class="main-business-des">
                  这是您的重点经营商圈，系统会为您量身定制该商圈推广方案并进行数据分析
              </div>
              <div class="main-business-content">
                  <div class="main-business-item ballOnepx"  v-for="item in mainBusinessList" :key="item.businessId" >
                      <span class="business-name">{{item.businessName}}</span>
                      <span class="business-delte" v-if="businessSetText=='完成'" @click="handleDeleteBus(item.businessId)" >×</span>
                  </div>
              </div>
              <div :class="mainBusinessList.length>=8?'add-business-container disabled-bus':'add-business-container'" @click="handleShowSelectLink" v-show="businessSetText=='完成'" >
                <span class="add-business-test">添加商圈</span>
                <span class="add-business-mark">+</span>
              </div>
          </div>
          <SelectLink v-if="linkShow"
                       @showHideLink="showHideLink"
                       @addBusiness="addBusiness"
                       :cateId="tabIndex"
                       :mainBusinessList="mainBusinessList"
          />
          <!-- 一键优化 -->

          <sticky-btn @handleClick="handleOptimization" class="optimization-btn" >一键优化</sticky-btn>

      </div>
  </div>
</template>

<script>

/* 页面所需组件 */
import { Toast,MessageBox  } from 'mint-ui';
import SelectLink from '../../components/select-link/index';
import StickyBtn from '../../components/sticky-footer-btn/index';


// 推广管家帮您分析 四张静态图片
const analysisImgList=[
  "//img.58cdn.com.cn/fangrs/img/8e977675bdef6f689b55694655c61fc5.png",
  "//img.58cdn.com.cn/fangrs/img/aaa5ecd067ce1e4ee93e429fb1fdaa54.png",
  "//pic1.58cdn.com.cn/nowater/fangfe/n_v2e3b79152b99c40a98234672bda6c460a.png",
  "//pic6.58cdn.com.cn/nowater/fangfe/n_v29faa9c277b32473c8f9aff8ce6723bc5.png"
];

// 推广管家帮您分析 icon图片
const analysisIconObj={
  "0":"//img.58cdn.com.cn/fangrs/img/f8e5ac3311c1f7726a7a504ea5a62e37.png",//绿色
  "1":"//img.58cdn.com.cn/fangrs/img/6ee7db95e2783077fc2c41ec4a3f51f3.png",//黄色
};

export default {
  //mixins: [BaseMixin],
  components: {
      SelectLink,StickyBtn
  },
  data () {
    return {
      tabIndex: 12,             // cateId,租房or二手房
      tabList: [],             // tab切换

      rank:'',                 // 排名及总数
      allRank:'',
      noRankDes:'',

      analysisList:[],         // 推广管家帮您分析分析结果：
      businessSetText:'设置',  // 保存主营商圈设置/完成文字
      businessOldHouseText:"设置",  // 主营商圈二手房设置or完成
      businessRentHouseText:'设置', //主营商圈租房设置or完成

      defaultMainBusiList:[],  // 默认主营商圈 用于设置完成时的数据埋点
      mainBusinessList:[],     // 主营商圈list
      linkShow:false,          // 添加商圈控件显示隐藏状态
    }
  },

  watch: {
    // 监听tab切换
    tabIndex: function (val, oldVal) {
      if(this.tabList.length>1){
         // 保存当前tab 商圈设置状态
         if(oldVal==12){ // 二手房
           this.businessOldHouseText=this.businessSetText;
         }else{          // 租房
           this.businessRentHouseText=this.businessSetText;
         }
         // 获取跳转tab 商圈设置状态
         if(val==12){
           this.businessSetText=this.businessOldHouseText;
         }else{
           this.businessSetText=this.businessRentHouseText
         }
         this.tabIndex=val;
         this.fetchGetSubregionVppvRankData(this.tabIndex);//获取排名信息
         this.fetchGetPromotionAndHouseKeeperInfoData(this.tabIndex);//获取推广管家信息
         this.fetchGetMainBusinessData(this.tabIndex); //获取商圈信息
      }

    }
  },
  created() {
    //根据brokerId,，修改tab
    this.fetchGetCateListData();
  },
  methods: {
      
      /**
       * 修改tab
       * 根据brokerId
       */
      fetchGetCateListData() {
        //alert(this.$api.apiGetCateList);
        this.$http.get(this.$api.apiGetCateList, {
          //brokerId: this.brokerId,
        }).then(res => {
            if (res && res.code == 0 && res.data) {
              var cateArr = res.data;
              if(cateArr instanceof Array && cateArr.length>0){
                if(cateArr.length>1){
                  this.tabIndex=12;
                  this.tabList=[{val:'二手房',id:12},{val:'租房',id:1}];
                }else if(cateArr.length===1){
                    if(cateArr[0]==1){
                      this.tabIndex=1;
                      this.tabList=[{val:'租房',id:1}];
                    }else if(cateArr[0]==12){
                      this.tabIndex=12;
                      this.tabList=[{val:'二手房',id:12}];
                    }
                }
                this.fetchGetSubregionVppvRankData(this.tabList[0].id);//获取排名信息
                this.fetchGetPromotionAndHouseKeeperInfoData(this.tabList[0].id);//获取推广管家信息
                this.fetchGetMainBusinessData(this.tabList[0].id); //获取商圈信息

              }else if(cateArr instanceof Array && cateArr.length==0){
                  Toast("请购买58二手房/租房端口");
              }

            } else {
              Toast(res.msg);
            }
        }).catch(err => {
            Toast('服务器异常请稍后再试！');
        })
      },

      /*
       获取排名
       */
      fetchGetSubregionVppvRankData(cateId){
          this.$http.post(this.$api.apiGetSubregionVppvRank, {
            //brokerId: this.brokerId,
            cateId:cateId
          }).then(res => {
            if (res && res.code == 0 && res.data) {
                var subregionVppvRankData=res.data;
                this.allRank=subregionVppvRankData.subregionSum;
                this.rank=subregionVppvRankData.subregionVppvRank;
                this.noRankDes=subregionVppvRankData.defautCopywriter;
            }else{
              Toast(res.data.msg);
            }
          }).catch(err => {
            Toast(err);
          })
      },

       /**
       * 获取推广管家信息
       * brokerId,cateId
       */
        fetchGetPromotionAndHouseKeeperInfoData(cateId){
          this.$http.post(this.$api.apiGetPromotionAndHouseKeeperInfo, {
            //brokerId: this.brokerId,
            cateId:cateId
          }).then(res => {
            //console.log(res);
            if (res && res.code == 0 && res.data) {
                var analysisData=res.data;
                this.analysisList=analysisData.map((item,index)=>{
                  item.imgSrc=analysisImgList[index];
                  return item;
                });
            }else{
              this.analysisList=[];
              Toast('当前没有推广数据，多推广多获客哦');
            }
          }).catch(err => {
            Toast(err);
          })
      },

      /*
        管家推荐 点击跳转页面
      */
      handleAnalysisiLink(buttonJumpType,positionIndex){
       
        // 推广管家跳转链接
        if(buttonJumpType=='5001'||buttonJumpType=="5003"){ // 跳转到相应的发房页面（二手房和租房）
          if(this.tabIndex===1){      // 租房
            window.location.href="openbroker2://vip.anjuke.com/newbroker/houseing/58_zf_list";
          }else{                    // 二手房
            window.location.href="openbroker2://vip.anjuke.com/newbroker/houseing/58_esf_list";
          }
        }else{                      // "跳转新建计划聚合页"
            window.location.href= `${this.$api.apiPageAddPlan}?defaultCateId=${this.tabIndex}`;
        }

      },

       /**
       * 根据类别获取用户主营商圈
       * brokerId,cateId
       */
      fetchGetMainBusinessData(cateId){
          this.$http.post(this.$api.apiGetMainBusiness, {
            //brokerId: this.brokerId,
            cateId:cateId
          }).then(res => {
            console.log(res);
            if (res && res.code == 0 && res.data) {
                this.defaultMainBusiList=res.data;
                this.mainBusinessList=res.data;
            }else{
              this.defaultMainBusiList=[];
              this.mainBusinessList=[];
              Toast("请设置主营商圈")
            }
          }).catch(err => {
            Toast(err);
          })
      },

       /**
       * 根据status 返回推广管家分析 icon
       */
      segmentClass(status){
        return  analysisIconObj[status]
      },

       /**
       * 点击切换主营商圈设置/完成
       */
      handleBusinessSet(){
        if(this.businessSetText=="设置"){
          this.businessSetText="完成";
        }else{
          var businessIds=this.mainBusinessList.map((item,index)=>{
            return item.businessId;
          });
          this.$http.post(this.$api.apiSaveMainBusiness, {
              //brokerId: this.brokerId,
              cateId:this.tabIndex,
              businessIds:businessIds
            }).then(res => {
              if (res && res.code == 0) {
                  Toast({
                    message: res.msg
                  })
                  this.businessSetText="设置";
                  //this.businessSetStatus=0;
              }else{
                Toast({
                  message: res.msg
                })
              }
            }).catch(err => {
              Toast(err);
            });

          }
      },

       /**
       * 删除商圈item
       */
      handleDeleteBus(businessId){
        if(this.mainBusinessList.length<=1){
          Toast('至少设置一个主营商圈');
          return false;
        }
          this.mainBusinessList=this.mainBusinessList.filter((item,index)=>{
            return item.businessId!==businessId
          })
      },

       /**
       * 显示添加商圈控件
       */
      handleShowSelectLink(){
        if(this.mainBusinessList.length>=8){
          Toast('最多只能设置8个主营商圈');
          return false;
        }
        this.linkShow=true;
      },

       /**
       * 商圈控件内点击取消or确定
       */
      showHideLink(linkShow){

        this.linkShow=linkShow
      },

       /**
       * 商圈控件内点击确定添加商圈
       */
      addBusiness(businessId,businessName){
        var obj={};
        obj.businessId=businessId;
        obj.businessName=businessName;
        this.mainBusinessList.push(obj);
      },

      /*
        一键优化
      */
     handleOptimization(){
       // 跳转页面
       
     }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  @import '../../assets/css/base.less';
  @import './index.less';

</style>

<template>
    <div class="select-link-wrapper">
        <div class="select-link-container">
            <div class="select-link-header">
                <div class="header-cancel header-tab" @click="handleCancel">取消</div>
                <div class="header-confirm header-tab" @click="handleConfirm">确定</div>
            </div>
            <div class="select-link-content">
                <ul class="select-item">
                <li :class="selectedCityId===item.cityId?'tab-selected':'tab-li-item'" @click="selectCity(item.cityId,item.cityName)" v-for="(item,index) in cityList" :key="item.cityId+index" >
                    {{item.cityName}}
                </li>
                </ul>
                <ul class="select-item">
                <li :class="selectedAreaId===item.areaId?'tab-selected':'tab-li-item'" @click="selectArea(item.areaId,item.areaName)" v-for="(item,index) in areaList" :key="item.areaId+index" >
                    {{item.areaName}}
                </li>
                </ul>
                <ul class="select-item">
                <li :class="businessStyle(+item.businessId)" @click="selectBusiness(+item.businessId,item.businessName)" v-for="(item,index) in businessList" :key="item.businessId+index" >
                    {{item.businessName}}
                </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
let showBusName='';
let areaNull=false;
let businessNull=false;
import FixModalScroll from '../../plugins/utils/fixModalScroll.js'
import isEmptyObj from '../../plugins/utils/isEmptyObj.js'
export default {
  name: 'SelectLink',
  data () {
    return {
      brokerId:this.$utils.getUrlParam('brokerId'),
      cityList:[],
      areaList:[],
      businessList:[],
      selectedCityId:-1,
      selectedAreaId:'',
      selectedBusinessId:'',
      selectedCityName:'',
      selectedAreaName:'',
      selectedBusinessName:'',

    }
  },
  props: {
    cateId:[String,Number],
    mainBusinessList:Array,
  },
  created(){
    // FixModalScroll.afterOpen()
    this.fetchCityData(this.brokerId, this.cateId);
  },
  destroyed(){
    // FixModalScroll.beforeClose();
  },
  computed:{

  },
  methods:{
    checkIds(businessId){
      let hasIdList=this.businessIds().filter((item,index)=>{
          return item===businessId;
      });
      return hasIdList.length>0

    },
    handleCancel(){
      this.$emit("showHideLink",false)
    },
    handleConfirm(){
      // 校验
      if(this.selectedCityId<0){
          this.$toast('请选择城市!');
          return false;
      }
      if(this.selectedAreaId<0){
          this.$toast('请选择区域!');
          return false;
      }
      if(this.businessList.length>0&&this.selectedBusinessId<0){
          this.$toast('请选择商圈!');
          return false;
      }
      if(this.checkIds()){
          this.$toast('不能选择重复商圈');
          return false;
      }
      // 若区域或商圈为空
      if(areaNull||businessNull){
          showBusName=this.selectedCityName+'-'+this.selectedAreaName;
      }else {
          showBusName=this.selectedAreaName+'-'+this.selectedBusinessName;
      }

      this.$emit("addBusiness",this.selectedBusinessId,showBusName);
      this.$emit("showHideLink",false);
    },
    fetchCityData(brokerId,cateId){
        this.$http.post(this.$api.apiGetCityList, {
            cateId:cateId
        }).then(res => {
            if (res.code == 0 && res.data) {
                var getCityListData=res.data;
                if(!isEmptyObj(getCityListData)){
                    //--处理返回数据
                    this.cityList=Object.keys(getCityListData).map((item,index)=>{
                        var tempObj={};
                        tempObj.cityId=item;
                        tempObj.cityName=getCityListData[item];
                        return tempObj
                    });
                }else{
                    this.cityList=[];
                    this.$toast('没有查询到开通城市');
                }
            }else{
                this.$toast(res.msg)
            }
        }).catch(err => {
            this.$toast(err);
        })
    },
    // 点击选择城市
    selectCity(cityId,cityName){
      this.selectedCityId=cityId;
      this.selectedCityName=cityName;
      this.selectedAreaId=this.selectedBusinessId=-1;
      this.fetchAreaData(cityId,cityName);
    },
    fetchAreaData(cityId,cityName){
        this.$http.post(this.$api.apiGetAreaList, {
            cityId:cityId,
            cityName:cityName
        }).then(res => {
            if (res.code == 0 && res.data) {
                var getAreaListData=res.data;
                if(!isEmptyObj(getAreaListData)){
                    //--处理返回数据
                    this.areaList=Object.keys(getAreaListData).map((item,index)=>{
                        var tempObj={};
                        tempObj.areaId=item;
                        tempObj.areaName=getAreaListData[item];
                        return tempObj
                    });
                    areaNull=businessNull=false;
                }else{
                    areaNull=true;
                    this.areaList=[{areaId:cityId,areaName:cityName}]
                }
                this.businessList=[]; // 清空当前商圈list
            }else{
                this.$toast(res.msg)
            }
        }).catch(err => {
            this.$toast(err);
        });

    },
    // 选择区域
    selectArea(areaId,areaName){
      // 修改选中样式
      this.selectedAreaId=areaId;
      this.selectedAreaName=areaName;
      this.selectedBusinessId=-1;
      if(areaNull){
        this.businessList=[{businessId:areaId,businessName:areaName}]
      }else{
        this.fetchBusinessData(areaId,areaName);
      }

    },
    fetchBusinessData(areaId,areaName){
        this.$http.post(this.$api.apiGetBusinessList, {
            areaId:areaId,
            areaName:areaName
        }).then(res => {
            if (res.code == 0 && res.data) {
                var getBusinessListData=res.data;
                if(!isEmptyObj(getBusinessListData)){
                    //--处理返回数据
                    this.businessList=Object.keys(getBusinessListData).map((item,index)=>{
                        var tempObj={};
                        tempObj.businessId=item;
                        tempObj.businessName=getBusinessListData[item];
                        return tempObj
                    });
                    areaNull=businessNull=false;
                }else{
                    businessNull=true;
                    this.businessList=[{businessId:areaId,businessName:areaName}]
                }
            }else{
                this.$toast(res.msg)
            }
        }).catch(err => {
            this.$toast(err);
        });
    },
    // 选择商圈
    selectBusiness(businessId,businessName){
      this.selectedBusinessId=businessId;
      this.selectedBusinessName=businessName;
    },
    businessStyle(businessId){
        //console.log(businessId);
        let busIdsList=this.businessIds();
        var hasIdList=busIdsList.filter((item,index)=>{
             return item===businessId
        });
        if(hasIdList.length>0){
          return 'business-disable'
        }
        // if(busIdsList.includes(businessId)){
        //     return 'business-disable';
        // }
        if(this.selectedBusinessId===businessId){
            return 'tab-selected';
        }else{
            return 'tab-li-item';
        }
    },
    businessIds(){
        // let idsList= this.mainBusinessList.map((item,index)=>{
        //     return item.businessId;
        // });
        let idsList = [];
        this.mainBusinessList.map((item,index)=>{
            console.log(item.businessId)
            idsList.push(item.businessId);
        });
        console.log(idsList);
        return idsList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.select-link-wrapper{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background:rgba(0, 0, 0, 0.6);
    z-index: 9;
}
.select-link-container{
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  opacity:1;  /*非IE浏览器下设置透明度为60%*/
  background-color:#fff;
  z-index: 99;
}
.select-link-content{
  display: flex;
  justify-content: center;
  align-items: center
}
.select-item {
  flex: 0.9;
  height:300px;
  overflow: auto;
  list-style-type: none;
  margin: 0;
  padding: 0;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc
}
.select-item:last-child{
    border-right:none;
}
.select-item li {
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  padding:20px 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 28px;
  text-align: center;
}

.select-item li:first-child{
  border-top: none;
}

.select-link-header{
  display: flex;
  justify-content: center
}
.header-tab{
  flex:1;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-right:1px solid #ccc;
  text-align: center;
  padding:20px 12px;
  font-size: 30px;
}
.header-tab:last-child{
  border-right:none;
}
.tab-selected{
  color: #0DA5F1;
}
.business-disable{
  background-color:#ccc;
  color:#aaa;
}
</style>

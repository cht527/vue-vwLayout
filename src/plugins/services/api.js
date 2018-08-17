/**
 * Created by lunachi on 2018/4/19.
 * API 接口配置
 */

let host = '';

let extension = '.html';
if (process.env.NODE_ENV == 'development') {
  extension = ''
}

export default {
  /* pageIndex:`${host}/index${extension}`,//首页
  pageAddPlan:`${host}/add_plan${extension}`,//新建计划页面
  pagePlanDetail:`${host}/plan_detail${extension}`,//计划详情页面
  pageSuccess:`${host}/put_success${extension}`,//投放成功页面 */

  // 
  apiPageIndex:`${host}/intelligentapp/toindex`, //首页接口（为了解决版本号同步的问题）
  apiPageAddPlan: `${host}/intelligentapp/toaddplan`,//新建计划页面接口（为了解决版本号同步的问题）
  apiPlanDetail: `${host}/intelligentapp/toplandetail`,//计划详情页面(为了解决版本号同步的问题)
  apiPageSuccess: `${host}/intelligentapp/toputsuccess`,//投放成功页面（为了解决版本号同步的问题）
  /**
   * 说明: 示例接口 获取列表数据
   * 参数:
   *    pageSize: 每页多少条
   *    pageNum: 第几页
   *    keyword: 关键字
   * 返回:
   *    {
   *      code: 0,
   *      data: {
   *        list: []
   *      },
   *      message: ''
   *    }
   */
  apiDemoList: `${host}/api_demo_list`,
  apiGetCateList:`${host}/intelligentapp/getCateList`,
  apiCateList: `${host}/intelligentapp/getCateList`,
  // 获取排名
  apiGetSubregionVppvRank:`${host}/intelligentapp/getSubregionVppvRank`,
  // 获取推广管家信息
  apiGetPromotionAndHouseKeeperInfo:`${host}/intelligentapp/getPromotionAndHouseKeeperInfo`,
  // 获取商圈信息
  apiGetMainBusiness:`${host}/intelligentapp/getMainBusiness`,
  // 获取城市列表
  apiGetCityList:`${host}/intelligentapp/getCityList`,
  // 获取区域列表
  apiGetAreaList:`${host}/intelligentapp/getAreaList`,
  // 获取商圈列表
  apiGetBusinessList:`${host}/intelligentapp/getBusList`,
  // 保存商圈
  apiSaveMainBusiness:`${host}/intelligentapp/saveMainBusiness`,
  // 获取新建推广计划信息
  apiCreateCombo:`${host}/intelligentapp/createCombo`,
  // 修改计划
  apiUpdateComboPlan:`${host}/intelligentapp/updateComboPlan`,
  // 获取更换房源的推荐房源列表
  apiGetHouseRecomList:`${host}/intelligentapp/getHouseRecomList`,
  // 获取占领商圈更换房源的推荐房源列表
  apiGetJGHouseRecomList:`${host}/intelligentapp/getJGHouseRecomList`,
  // 获取产品是否可以更换投放
  apiGetIsCanDelivery:`${host}/intelligentapp/isCanDelivery`,
  // 获取优惠券信息
  apiGetCalOptimizedCouponCombination:`${host}/intelligentapp/calOptimizedCouponCombination`,
  // 获取余额
  apiGetAccountBalance:`${host}/intelligentapp/queryAccountBalance`,
  // 投放计划
  apiSaveDeliveryComboPlan:`${host}/intelligentapp/deliveryComboPlan`,
}

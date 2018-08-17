const fs = require('fs')
const path = require('path')
const Mock = require('mockjs')
const BodyParser = require('body-parser')
const CookieParser = require('cookie-parser')

const mockRootPath = `./`;

const getMockFile = (fileName) => {
  const _jsonFilePath = path.resolve(__dirname, mockRootPath, `${fileName}`);
  let _jsonFile = '{}';
  if (fs.existsSync(_jsonFilePath)) {
    _jsonFile = fs.readFileSync(_jsonFilePath, 'utf-8');
  } else {
    throw new Error(`[${_jsonFilePath}] is not found!`);
  }
  return JSON.parse(_jsonFile);
};

function randomNum(min = 0, max = 1) {
  return Math.round(min + Math.random() * (max - min));
}

module.exports = {
  //模拟接口调用
  before(app) {
    app.use(BodyParser.json());
    app.use(BodyParser.urlencoded({extended: false}));
    app.use(CookieParser());
    app.set('jsonp callback name', 'jsoncallback');

    app.get('/api_demo_list', function (req, res) {
      const query = req.query;
      let {pageSize = 10, pageNum = 1, keyword} = query;

      let _codeNum = randomNum();
      const _mockData = getMockFile(`api_demo_list_code_${_codeNum}.json`);

      res.json(Mock.mock(_mockData));
    });

    app.get('/intelligentapp/apiGetCateList', function (req, res) {
      const query = req.query;
      //let {pageSize = 10, pageNum = 1, keyword} = query;
      const _mockData = getMockFile(`api_cate_list.json`);
      res.json(_mockData);
    });

    // 获取排名
    app.post('/intelligentapp/getSubregionVppvRank', function (req, res) {
      //const query = req.query;
      //let {pageSize = 10, pageNum = 1, keyword} = query;
      const _mockData = getMockFile(`api_get_subregion_vppvrank.json`);
      res.json(_mockData);
    });


    // 获取推广管家信息
    app.post('/intelligentapp/getPromotionAndHouseKeeperInfo', function (req, res) {
      //const query = req.query;
      //let {pageSize = 10, pageNum = 1, keyword} = query;
      const _mockData = getMockFile(`api_get_promotion_and_house_keeper_info.json`);
      res.json(_mockData);
    });

    //获取商圈信息
    app.post('/intelligentapp/getMainBusiness', function (req, res) {
        //const query = req.query;
        //let {pageSize = 10, pageNum = 1, keyword} = query;
        const _mockData = getMockFile(`api_get_main_business.json`);
        res.json(_mockData);
    });

    // 获取城市列表
    app.post('/intelligentapp/getCityList', function (req, res) {
      //const query = req.query;
      //let {pageSize = 10, pageNum = 1, keyword} = query;
      const _mockData = getMockFile(`api_get_city_list.json`);
      res.json(_mockData);
    });

    // 获取区域列表
    app.post('/intelligentapp/getAreaList', function (req, res) {
      //const query = req.query;
      //let {pageSize = 10, pageNum = 1, keyword} = query;
      const _mockData = getMockFile(`api_get_area_list.json`);
      res.json(_mockData);
    });

    // 获取商圈列表
    app.post('/intelligentapp/getBusList', function (req, res) {
      //const query = req.query;
      //let {pageSize = 10, pageNum = 1, keyword} = query;
      const _mockData = getMockFile(`api_get_business_list.json`);
      res.json(_mockData);
    });

    // 保存商圈
    app.post('/intelligentapp/saveMainBusiness', function (req, res) {
      //const query = req.query;
      //let {pageSize = 10, pageNum = 1, keyword} = query;
      const _mockData = getMockFile(`api_save_main_business.json`);
      res.json(_mockData);
    });

    app.get('/intelligentapp/getCateList', function (req, res) {
      const _mockData = getMockFile(`api_cate_list.json`);
      res.json(Mock.mock(_mockData));
    });
    //查询创建计划接口
    app.get('/intelligentapp/createCombo', function (req, res) {
      const _mockData = getMockFile(`api_creat_combo.json`);
      res.json(Mock.mock(_mockData));
    });
    //查询更换房源推荐接口
    app.get('/intelligentapp/getHouseRecomList', function (req, res) {
      const _mockData = getMockFile(`api_get_house_recomlist.json`);
      res.json(Mock.mock(_mockData));
    });
    // app.get('/intelligentapp/getHouseRecomList', function (req, res) {
    //   const _mockData = getMockFile(`api_get_house_recomlist.json`);
    //   res.json(Mock.mock(_mockData));
    // });
    //查询占领商圈更换房源推荐接口
    app.get('/intelligentapp/getJGHouseRecomList', function (req, res) {
      const _mockData = getMockFile(`api_get_getJGHouseRecomList.json`);
      res.json(Mock.mock(_mockData));
    });
    //查询更换产品可否更换接口
    app.get('/intelligentapp/isCanDelivery', function (req, res) {
      const _mockData = getMockFile(`api_get_isCanDelivery.json`);
      res.json(Mock.mock(_mockData));
    });
    // 修改计划
    app.post('/intelligentapp/updateComboPlan', function (req, res) {
      const _mockData = getMockFile(`api_update_combo_plan.json`);
      res.json(_mockData);
    });
    // 获取优惠券信息
    app.post('/intelligentapp/calOptimizedCouponCombination', function (req, res) {
      const _mockData = getMockFile(`api_get_calOptimizedCouponCombination.json`);
      res.json(_mockData);
    });
    // 获取余额
    app.post('/intelligentapp/queryAccountBalance', function (req, res) {
      const _mockData = getMockFile(`api_get_accountBalance.json`);
      res.json(_mockData);
    });
    // 投放计划
    app.post('/intelligentapp/deliveryComboPlan', function (req, res) {
      const _mockData = getMockFile(`api_save_deliveryComboPlan.json`);
      res.json(_mockData);
    });
  }
}

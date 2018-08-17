/* 页面混入 */
export default {
  methods: {
    /**
     * @desc 根据cateid翻译成中文
     * @param  {String} cateId
     * @return {String}
     */
    parseCate: function(cateId) {
      let cate = '';
      switch (cateId) {
        case 0:
        case '0':
          cate = '全部';
          break;
        case 1:
        case '1':
          cate = '租房';
          break;
        case 12:
        case '12':
          cate = '二手房';
          break;
        default:
          cate = '';
          break;
      }
      return cate;
    },
    /**
     * @desc 根据cateid翻译成中文
     * @param  {String} cateId
     * @return {String}
     */
    parseProductType: function(productType) {
      let product = '';
      switch (productType) {
        case 0:
        case '0':
          product = '精选';
          break;
        case 1:
        case '1':
          product = '置顶';
          break;
        case 2:
        case '2':
          product = '占领商圈';
          break;
        default:
          product = '';
          break;
      }
      return product;
    },
    /**
     * @desc 将分改为元
     * @param {Number} 单位分
     * @return {Number} 单元元
     */
    parsePrice: function (price) {
      let priceYuan;
      if (typeof(price) == 'number') {
        priceYuan = (price / 100).toFixed(2);
      }
      if (typeof(price) == 'String') {
        priceYuan = (+price / 100).toFixed(2);
      }
      return priceYuan;
    }
  }
}
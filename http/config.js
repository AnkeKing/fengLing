

// const baseUrl="https://web-gateway.hivescm.com/ms-web" //开发环境
// const baseUrl ="https://web-gateway.beehivescm.com/ms-web" //测试环境
//  const baseUrl ="https://pre-web-gateway.newbeescm.com/ms-web" //预发布环境
 const baseUrl ="https://web-gateway.newbeescm.com/ms-web"// 正式环境


module.exports={
    in_theaters:baseUrl+"in_theaters",
    baseUrl,
    order: baseUrl + "/orderShoppingCart/getShoppingCartGroup", //购物车接口
    minus: baseUrl + "/orderShoppingCart/subtractShoppingCart", //购物车商品数量减
    collect: baseUrl + "/shopInfoController/getGoodsListByConditions",//收藏接口
    regularlist: baseUrl + "/order/alwaysBuyList",//常购清单
    delCartGoods: baseUrl + '/orderShoppingCart/deleteShoppingCart',//删除购物车商品
    shoppingQuantity: baseUrl + '/orderShoppingCart/getShoppingCartQuantity'
}
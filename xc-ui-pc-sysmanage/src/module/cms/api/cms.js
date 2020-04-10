import http from './../../../base/api/public'
import querystring from 'querystring'

let sysConfig = require('@/../config/sysConfig');
let apiUrl = sysConfig.xcApiUrlPre;
//public是对axios的工具类封装，定义了http请求方法

//查询page列表
export const page_list = (page,size,params) => {
  let stringify = querystring.stringify(params);
  return http.requestQuickGet(apiUrl+'/cms/page/list/'+page+'/'+size+"?"+stringify);
};
//查询站点列表
export const sit_list = () => {
  return http.requestQuickGet(apiUrl+'/cms/site/list');
};
//新增页面
export const page_add= params =>{
  return http.requestPost(apiUrl+'/cms/page/add',params)
}
//通过id查询页面信息
export const page_getById= id =>{
  return http.requestQuickGet(apiUrl+'/cms/page/get/'+id)
}
//修改页面
export const page_edit= (id,params) =>{
  return http.requestPut(apiUrl+'/cms/page/edit/'+id,params)
}
//删除页面
export const page_delete= (id,params) =>{
  return http.requestDelete(apiUrl+'/cms/page/delete/'+id)
}
//发布页面
export const post_page= (pageId) =>{
  return http.requestPost(apiUrl+'/cms/page/postPage/'+pageId)
}


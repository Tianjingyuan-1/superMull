import axios from 'axios'

export function request(config) {
  return new Promise((resolve, reject) =>{
    //1.创建axios实例
    const instance = axios.create({
      baseURL:'http://152.136.185.210:8000/api/h3',
      timeout:5000
    })
    //axios 拦截器
   // axios.interceptors  全局拦截
    //请求拦截的作用  拦截发送的请求 做一些相应的操作
    instance.interceptors.request.use(config =>{  // 成功
     // console.log(config.url);
      //1.config中的一些信息不符合服务器的要求
      //2.每次发送网络请求时，都希望在页面中显示一个请求图标。
      //3.某些网络请求（比如登录（token）），必须携带一些特殊的信息。
      return config // 一定要返回 config
    },err =>{ //失败
     // console.log(err);
    })


    //响应拦截  拦截数据 最主要的就是res.data
    instance.interceptors.response.use(res =>{
      //console.log(res);
      //console.log(res.data);
      return res.data   // 一定要返回
    },err =>{
      console.log(err);
    })
    //发送真正的网络请求
    instance(config)
      .then(res =>{
        resolve(res)
      })
      .catch(err =>{
        reject(err)
      })
   // return instance(config)
  })
}

import  axios from 'axios'

const service = axios.create({
  baseURL:'http://www.beihaozhuan.com',
  // baseURL:'http://192.168.1.183:3000',
  withCredentials:true,
  headers:{
    'Content-Type' : 'application/json;charset=utf-8',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': 'http://localhost:8080'
  }
})
const formService = axios.create({
  baseURL:'http://www.beihaozhuan.com',
  // baseURL:'http://39.100.32.180',
  withCredentials:true,
  headers:{
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': 'http://localhost:8080'
  }
});

const MUtil = {
  request(url,data={},method='post') {
    return new Promise((resolve, reject) => {
      const options = {
        url,
        method
      }
      if(method.toLowerCase() === 'get'){
        options.params = data
      }else {
        options.data = data
      }
      service(options)
        .then(res => {
          console.log('返回数据',res)
          if(res.data.code === '403'){   //判断登录是否过期，如果过期跳转到登录页
            this.$router.push({
              path: '/login',
              name:'Login'
            })
          }else {
            resolve(res.data);
          }
        })
        .catch(error => {
          reject(error);
          console.log('操作失败',error)

        })
    });
  },
  //表单提交方法
  formRequest(url,data={},method='post'){
    return new Promise((resolve, reject) => {
      const options = {
        url,
        method
      }
      if(method.toLowerCase() === 'get'){
        options.params = data
      }else {
        options.data = data
      }
      formService(options)
        .then(res => {
          console.log('返回数据',res)
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
          console.log('操作失败111',error)
        })
    });
  }
}

export default MUtil

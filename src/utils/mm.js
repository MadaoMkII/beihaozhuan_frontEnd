import axios from 'axios'
import qs from 'qs'


const service = axios.create({
  // baseURL:'http://192.168.1.183:3000',
  // baseURL:'https://www.beihaozhuan.com',
  // baseURL:'http://39.100.32.180',
  baseURL: '/api/',
  withCredentials: true,
  headers: {
    // 'Content-Type' : 'application/json;charset=utf-8',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Credentials': true
  }
});
const formService = axios.create({
  // baseURL:'http://192.168.1.183:3000',
  // baseURL:'https://www.beihaozhuan.com',
  // baseURL:'http://39.100.32.180',
  baseURL: '/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Credentials': true
  }
});
const formServiceios = axios.create({
  // baseURL:'http://192.168.1.183:3000',
  // baseURL:'https://www.beihaozhuan.com',
  // baseURL:'http://39.100.32.180',
  baseURL: '/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Credentials': true
  }
});

const MUtil = {
  request(url, data = {}, method = 'post') {
    return new Promise((resolve, reject) => {
      const options = {
        url,
        method
      }
      // if(method.toLowerCase() === 'get'){
      //     options.params = data
      // }else {
      //     options.data = data
      // }
      if (method.toLowerCase() === 'get') {
        options.params = qs.stringify(data)
      } else {
        options.data = qs.stringify(data)
      }
      service(options)
        .then(res => {
          // console.log('返回数据',res)
          resolve(res.data);
        })
        .catch(error => {
          if (error.response) {
            if (error.response.data && error.response.data.message) {
              alert(error.response.data.message)
              return;
            }
            if (error.response.data.msg) {
              alert(error.response.data.msg)
            } else {
              alert('服务器忙');
            }
          } else {
            alert('服务器忙');
          }
        })
    });
  },
  //表单提交方法
  formRequest(url, data = {}, method = 'post') {
    return new Promise((resolve, reject) => {
      const options = {
        url,
        method
      }
      if (method.toLowerCase() === 'get') {
        options.params = data
      } else {
        options.data = data
      }
      formService(options)
        .then(res => {
          // console.log('返回数据',res)
          resolve(res.data);
        })
        .catch(error => {
          if (error.response) {
            if (error.response.data && error.response.data.message) {
              alert(error.response.data.message)
              return;
            }
            if (error.response.data.msg) {
              alert(error.response.data.msg)
            } else {
              alert('服务器忙');
            }
          } else {
            alert('服务器忙');
          }
        })
    });
  },
  //表单提交方法
  formRequestios(url, data = {}, method = 'post') {
    let that = this;
    return new Promise((resolve, reject) => {
      const options = {
        url,
        method
      }
      if (method.toLowerCase() === 'get') {
        options.params = qs.stringify(data)
      } else {
        options.data = qs.stringify(data)
      }
      formServiceios(options)
        .then(res => {
          // console.log('返回数据',res)
          resolve(res.data);
        })
        .catch(error => {
          if (error.response) {
            if (error.response.data && error.response.data.message) {
              alert(error.response.data.message)
              return;
            }
            if (error.response.data.msg) {
              alert(error.response.data.msg)
            } else {
              alert('服务器忙');
            }
          } else {
            alert('服务器忙');
          }
        })
    });
  }
}

export default MUtil

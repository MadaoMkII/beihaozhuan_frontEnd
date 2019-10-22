import  axios from 'axios'

const urlToFile = {
//将服务器上的图片本地化转换为base64
  async readFile(url){
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url,
        responseType: 'blob'
      })
        .then(function (blob) {
          let reader = new FileReader();
          let base = '';
          reader.onloadend = function () {
            // console.log('base64', reader.result); // 转换后的base64图片编码
            base =  reader.result;
            resolve(reader.result);
          };
          reader.readAsDataURL(blob.data);
        })
        .catch(console.error);
    });
  },
  // 将base64转换成file
  base64toFile(base, name){
    let arr = base.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    //转换成file对象
    return new File([u8arr], name, {
      type: mime
    });
  },
  //图片转换公共方法
  async imgUrlToFile(url, name = 'file'){
    let fileObj = {};
    await urlToFile.readFile(url).then(base => {
      fileObj = urlToFile.base64toFile(base, name);
    });
    return fileObj;
  }

}

export default urlToFile

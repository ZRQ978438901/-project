/*
* 发送ajx请求的模块
* 函数返回值是promise对象
* */
import axios from 'axios'

export default function ajax(url,data={},type='GET') {
 if(type==='GET'){
   const dataStr=getDataStr(data)
  return axios.get(url+'?'+dataStr)
 }else {

  return axios.post(url,data)
 }

}

function getDataStr(data) {
  let ret=''
  let key=''
  let value=''
  for(let i=0;i<Object.keys(data).length;++i)
  {
    key=Object.keys(data)[i]
    value=data[key]
    ret+=key+'='+value+'&'
  }
  ret=ret.substring(0,ret.length-1)

  return ret
}

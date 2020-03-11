//工具函数
export function getRedirect(type,header){
  let path=''
  //type

  if(type==='老板')
  {
    path='/laoban'
  }else if(type==='求职者'){
    path='/qiuzhizhe'
  }
  if(!header){//返回完善信息界面
    path+='info'
  }
  console.log(path)
  return path
}
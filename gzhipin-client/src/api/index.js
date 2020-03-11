/*
* 包含N个接口的函数
* */
//注册接口
import ajax from './ajax'
export const reqRegister=(user)=> ajax('/register',user,'POST')

export const reqLogin=(user)=> ajax('/login',user,'POST')

export const reqUpdate=(user)=> ajax('/update',user,'POST')

//根据cookie获取用户信息
export const reqUser=()=> ajax('/user')

//获取对应的用户列表
export const reqGetUser=(type)=> ajax('/userlist',{type})

//获取用户聊天信息列表
export const reqChatMsgList = () => ajax('/msglist')
//修改指定消息为已读
export const reqReadMsg=(from)=>ajax('/readmsg',{from},'POST')


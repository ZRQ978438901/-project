/*
包含N个action
* */

import {reqRegister, reqLogin,reqUpdate,reqUser,reqGetUser,reqChatMsgList,reqReadMsg} from '../api/index'

import {AUTH_SUCCESS, ERROR_MSG,UPDATE_SUCCESS,RESET_USER,RECEIVE_USERLIST,RECEIVE_CHATMSGLIST,RECEIVE_CHATMSG,READ_MESSAGE} from './action-types'
//引入聊天
import io from 'socket.io-client'

const auto_SUCCESS=(user)=>({type:AUTH_SUCCESS,data:user})
const error_MSG=(msg)=>({type:ERROR_MSG,data:msg})
const update_MSG=(user)=>({type:UPDATE_SUCCESS,data:user})
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
const receive_USERLIST=(users)=>({type:RECEIVE_USERLIST,data:users})

const receive_CHATMSGLIST=({users,chatMsgs,userid})=>({type:RECEIVE_CHATMSGLIST,data:{users,chatMsgs,userid}})
//接收一条消息
const receive_CHATMSG=(chatmsg,userid)=>({type:RECEIVE_CHATMSG,data:{chatmsg,userid}})
//修改已读消息
const read_MESSAGE=(count)=>({type:READ_MESSAGE,data:count})



export const readMsg=(from,to)=> {
  return async dispatch => {
    const response = await reqReadMsg(from)
    const result = response.data
    if (result.code === 0) {
      const count= result.data
      //分发同步action
      console.log(count)
      dispatch(read_MESSAGE({from, to, count}))
    }
  }
}

function initIO(dispatch,userid) {
  if(!io.socket){
    io.socket= io('ws://localhost:4000')
  }
  io.socket.on('SeverToB',function (chatmsg) {
    if(userid===chatmsg.from||userid===chatmsg.to){
      dispatch(receive_CHATMSG(chatmsg,userid))
    }
  })
}
//获取用户的消息列表
async function getUserMsgList(dispatch,userid) {
  initIO(dispatch,userid)
  const response=await reqChatMsgList()
  const result=response.data
  if(result.code===0){
    const {users,chatMsgs}=result.data
    //分发同步action
    dispatch(receive_CHATMSGLIST({users,chatMsgs,userid}))
  }
}


//发送消息的异步action
export const sendMsg=({from,to,content})=>{
  return async dispatch=>{
    io.socket.emit("BToServer",{from,to,content})
  }
}




//注册异步action
export const  register=(user)=>{
  //前台的注册认证
  var {username,password1,password2,type}=user

  if(!username){
    return error_MSG('用户名不能为空')
  }else if(!password1||!password2||!type){
    return error_MSG('请填写完整信息')
  }
  else if((password1)!==password2){

    return error_MSG('密码要一致')
  }
  return async dispatch=>{
    //发送请求
    // const promise= reqRegister(user)
    // promise.then(response=>{
    //   const result=response.data  //{服务端返回的data对象}
    // })

    const user={username:username,password:password1,type:type}

    const response=await reqRegister(user)
    const result=response.data
    console.log(result)
    if(result.code===0){
      //分发成功action
      getUserMsgList(dispatch,result.data._id)
      dispatch(auto_SUCCESS(result.data))
    }else{
      //分发错误信息action
      console.log(result)
      dispatch(error_MSG(result.msg))
    }
  }
}

//登录异步action
export const  login=(user)=>{
  //前台的登录认证
  const {username,password}=user
  if(!username){
    return error_MSG('用户名不能为空')
  }else if(!password){
    return error_MSG('密码不能为空')
  }
  return async dispatch=>{
    const response=await reqLogin(user)
    const result=response.data
    if(result.code===0){
      //获取用户的消息列表
      getUserMsgList(dispatch,result.data._id)
      //分发成功action
      dispatch(auto_SUCCESS(result.data))
    }else{
      //分发错误信息action

      dispatch(error_MSG(result.data))
    }
  }
}

//更新老板Action
export const  requpdateBoss=(user)=>{

  //前台的登录认证
  const {header,info, post,company,salary}=user
  //console.log(user)
  if(!header||!info||!post||!company||!salary){
    //分发错误信息action
    return(error_MSG("请完善信息"))
  }
  return async dispatch=>{
    const response=await reqUpdate(user)
    const result=response.data
    if(result.code===0){
      //获取用户的消息列表
      getUserMsgList(dispatch,result.data._id)
      //分发成功action
      dispatch(update_MSG(result.data))
    }else{
      //分发错误信息action
      dispatch(update_MSG(result.data))
    }
  }
}

//更新求职者Action
export const requpdateJober=(user)=>{
  //前台的登录认证
  const {header,info}=user
  if(!header||!info){
    //分发错误信息action
    return(error_MSG("请完善信息"))
  }
  return async dispatch=>{
    const response=await reqUpdate(user)
    const result=response.data

    if(result.code===0){
      //分发成功action
      getUserMsgList(dispatch,result.data._id)
      dispatch(update_MSG(result.data))
    }else{
      //分发错误信息action
      dispatch(update_MSG(result.data))
    }
  }
}

//根据cookie获取用户信息的action
export const requser=()=>{
    return async dispatch=>{
        //执行异步action
        const response=await reqUser()
        const result=response.data
        if(result.code===0){
          getUserMsgList(dispatch,result.data._id)
            dispatch(update_MSG(result.data))
        }else {
            dispatch(resetUser(result.data))
        }
    }
}

export const reqgetuserlist=(type)=>{
  return async dispatch=>{
    const response=await reqGetUser(type)
    const result=response.data
    if(result.code===0){
      dispatch(receive_USERLIST(result.data))
    }
  }
}


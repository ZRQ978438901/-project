/*
*
* */

import {combineReducers} from 'redux'

import {AUTH_SUCCESS, ERROR_MSG,UPDATE_SUCCESS,RESET_USER,RECEIVE_USERLIST,RECEIVE_CHATMSG,RECEIVE_CHATMSGLIST,READ_MESSAGE} from './action-types'
import {getRedirect} from '../utils/index'


const initUser={
  username:'',
  type:'',
  msg:'',//错误提示信息
  header:'',
  info:'',
  post:'',
  company:'',
  salary:'',
  redirect:''//需要重定向路由器
}
//产生user状态的redux
function user(state=initUser,action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const {type, header} = action.data
      return {...action.data, redirect: getRedirect(type, header)}
    case ERROR_MSG:
      return {...state,msg:action.data}
    case UPDATE_SUCCESS:
      return {...action.data}
    case RESET_USER: // data是msg
      return {...initUser, msg: action.data}
    default: return state
  }
}
const initUserList=[]
function userlist(state=initUserList,action){
  switch (action.type) {
    case RECEIVE_USERLIST:
      return action.data
    default:
      return state
  }
}

var initChat={
  users:{},
  chatMsgs:[],
  unReadCount:0
}
function chat(state=initChat,action) {
  switch (action.type) {
    case RECEIVE_CHATMSGLIST:
      const {users,chatMsgs,userid}=action.data
      return {
        users:users,
        chatMsgs:chatMsgs,
        unReadCount: chatMsgs.reduce((prototal,msg)=>{
          return prototal+(!msg.read&&msg.to===userid?1:0)
        },0)
      }
    case RECEIVE_CHATMSG:
      const {chatmsg}=action.data
      return {
        users:state.users,
        chatMsgs:[...state.chatMsgs,chatmsg],
        unReadCount: state.unReadCount+ (!chatmsg.read&&chatmsg.to===action.data.userid?1:0)
      }
    case READ_MESSAGE:
      const {from, to, count} = action.data
      return{
        users:state.users,
        chatMsgs:state.chatMsgs.map(msg=>{
          if(msg.from===from&&msg.to===to&&!msg.read){
            return {...msg,read:true}
          }
          else{
            return msg
          }
        }),
        unReadCount: state.unReadCount-count
      }
    default:
      return state
  }
}
// 产生聊天状态的reducer
export default combineReducers(
  {user,userlist,chat}
  )


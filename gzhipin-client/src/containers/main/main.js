/*
* 主页面路由
* */
import React,{Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {requser} from "../../redux/actions";

import Laoban_info from '../laoban-info/laoban-info'
import Qiuzhizhe_info from '../qiuzhizhe-info/qiuzhizhe-info'
import Qiuzhizhe from '../qiuzhizhe/qiuzhizhe'
import Laoban from '../laoban/laoban'
import Personal from '../personal/personal'
import Message from '../message/message'
import Not_found from '../../components/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import {getRedirect} from '../../utils'
import Chat from '../chat/chat'

import './main.css'

 class Main extends Component
{
  // 组件类和组件对象
// 给组件对象添加属性
   navList = [
     {
       path: '/laoban', // 路由路径
       component: Laoban,
       title: ' 求职者列表',
       icon: 'dashen',
       text: ' 大神',
     },
     {
       path: '/qiuzhizhe', // 路由路径
       component: Qiuzhizhe,
       title: ' 老板列表',
       icon: 'laoban',
       text: ' 老板',
     },
     {
       path: '/message', // 路由路径
       component: Message,
       title: ' 消息列表',
       icon: 'message',
       text: ' 消息',
 },
{
  path: '/personal', // 路由路径
    component: Personal,
  title: ' 用户中心',
  icon: 'personal',
  text: ' 个人',
}
]
    componentDidMount() {
        const userid=Cookies.get('userid')
        const {_id}=this.props.user
        if(userid&&!_id){
            this.props.requser()
        }
    }


    render() {




      //读取cookie中的userid
      const userid=Cookies.get('userid')
      if(!userid){
          return <Redirect to='/login'/>
      }
      const {user}=this.props
      if(!user._id){
          return null
      }else {
          let {pathname}=this.props.location
          if(pathname==='/'){
              pathname=getRedirect(user.type,user.header)
              return <Redirect to={pathname}/>
          }
      }
          let navlist=this.navList
          const pathname=this.props.location.pathname
          const currentNav=navlist.find(nav=> nav.path===pathname)
          if(navlist){
            if(user.type==='老板'){
              navlist[1].hide=true
            }
            else {
              navlist[0].hide=true
            }
          }





    return (
      <div>
        {currentNav?<NavBar className='NavTop'>{currentNav.title}</NavBar>:null}
          <Switch>
            {
              navlist.map((nav,index)=><Route path={nav.path} component={nav.component} key={index}></Route>)
            }
            <Route path='/laobaninfo' component={Laoban_info}></Route>
            <Route path='/qiuzhizheinfo' component={Qiuzhizhe_info}></Route>
            <Route path='/chat/:userid' component={Chat}></Route>

            <Route  component={Not_found}></Route>
          </Switch>
        {
          currentNav?<NavFooter navlist={this.navList} ></NavFooter>:null
        }
      </div>
    )
  }
}

export default connect(
    state=>({user:state.user,chat:state.chat}),
    {requser}
)(Main)
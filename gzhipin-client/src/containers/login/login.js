/*
* 登录路由
* */
import React,{Component} from 'react'
import {NavBar,
  Button,
  List,
  WingBlank,
  InputItem,
  WhiteSpace,
  Toast,

} from 'antd-mobile'
import Logo from '../../components/login'

import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from "../../redux/actions"


class Login extends Component
{
  state={
    username:'',
    password:'',
  }
  //登录
  login=()=>{

    this.props.login(this.state)
  }
//处理输入
  handleChange=(name,val)=>{
    this.setState({
      [name]:val
    })
  }
  //跳转到登录界面
  toRegister=()=>{
    this.props.history.push('./register')
  }
  //登录信息提示
  toastMsg=()=> {
    setTimeout(()=>{
      const msg=this.props.user.msg
      if(msg) {
        Toast.fail(msg,2)
      }},500)
  }
  render() {
   // const type=this.state.type
    const {redirect}=this.props.user
    if(redirect){
      Toast.hide()
      return <Redirect to={redirect}/>
    }
    return (
      <div>
        <NavBar className='NavT'>硅&nbsp;谷&nbsp;直&nbsp;聘
        </NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <InputItem placeholder='请输入用户名' onChange={val=>{this.handleChange('username',val)}}>用户名:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='请输入密码' type='password' onChange={val=>{this.handleChange('password',val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={(event)=>{this.login();this.toastMsg()}}>登&nbsp;&nbsp;&nbsp;录</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegister}>还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
export default connect(
  state=>({user:state.user}),
  {login}
)(Login)
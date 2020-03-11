/*
* 注册路由
* */
import React,{Component} from 'react'

import {NavBar,
  Button,
  List,
  WingBlank,
  InputItem,
  WhiteSpace,
  Radio,
  Toast
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {register} from "../../redux/actions";
import Logo from '../../components/login'


const ListItem=List.Item



class Register extends Component
{
  state={
    username:'',
    password1:'',
    password2:'',
    type:'老板',
  }
  //注册
  register=()=>{
    this.props.register(this.state)
}
//处理输入
  handleChange=(name,val)=>{

    this.setState({
      [name]:val
    })
  }
  //跳转到登录界面
  toLogin=()=>{
    this.props.history.push('./login')
  }
//注册信息提示
  toastMsg=()=> {
    setTimeout(()=>{
      const msg=this.props.user.msg
      if(msg) {
      Toast.fail(msg, 2)
    }},1000)
}



  render() {
    const type=this.state.type
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
             {/*{msg?<div className='toast-Msg'>{msg}</div>:null}*/}
                <WingBlank>
                  <List>
                    <InputItem placeholder='请输入用户名'
                               onChange={val=>{this.handleChange('username',val)}}>用户名:</InputItem>
                    <WhiteSpace/>
                    <InputItem placeholder='请输入密码' type='password' onChange={val=>{this.handleChange('password1',val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                    <WhiteSpace/>
                    <InputItem placeholder='请确认密码' type='password' onChange={val=>{this.handleChange('password2',val)}}>确认密码:</InputItem>
                    <WhiteSpace/>
                    <ListItem>
                      <span >用户类型:</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Radio checked={type==='求职者'}  onChange={()=>{this.handleChange('type','求职者')}}>求职者</Radio>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Radio checked={type==='老板'}  onChange={()=>{this.handleChange('type','老板')}}>老板</Radio>
                    </ListItem>
                    <Button id='btn' type='primary' onClick={() => {this.register();this.toastMsg()} }>注&nbsp;&nbsp;&nbsp;册</Button>
                    <WhiteSpace/>
                    <Button onClick={this.toLogin}>已有账户</Button>
                  </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
  state=>({user:state.user}),
  {register}
)(Register)


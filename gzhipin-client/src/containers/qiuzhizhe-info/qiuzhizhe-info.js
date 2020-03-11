import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Button,NavBar,InputItem,TextareaItem,Toast} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import Header_selector from '../../components/header-selector'
import {requpdateJober} from "../../redux/actions";

class Qiuzhizhe_info extends Component
{
  state={
    header: '', // 头像名称
    post:  '', // 职位
    info:  '', // 个人或职位简介
  }
  //更改头像
  setHeader=(header)=>{
    this.setState({
      header
    })
  }
  handleChange(name,val){
    this.setState({
      [name]:val
    })
  }
  handleSave=()=>{
    this.props.requpdateJober(this.state)
  }
  //更新信息提示
  toastMsg=()=> {
    setTimeout(()=>{
      const msg=this.props.user.msg
      console.log(this.props.user)
      if(msg) {
        Toast.fail(msg,2)
      }},500)
  }
  render() {
    const {header,type}=this.props.user
    if(header){//说明信息已经完善
      const path=(type==='老板'?'/laoban':'/qiuzhizhe')
      return <Redirect to={path}/>
    }
    return (
      <div>
        <NavBar className='NavT'>求职者信息完善</NavBar>
        <Header_selector setHeader={this.setHeader}></Header_selector>
        <InputItem placeholder='请输入求职岗位' onChange={(val)=>{this.handleChange('post',val)}}>求职岗位</InputItem>
        <TextareaItem title='个人介绍' row={3}  onChange={(val)=>{this.handleChange('info',val)}}>个人介绍</TextareaItem>
        <Button type='primary' className='NavT' onClick={()=>{this.handleSave();this.toastMsg()}}>保&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    )
  }
}


export default connect(
  state=>({user:state.user}),
  {requpdateJober}
)(Qiuzhizhe_info)
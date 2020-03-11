import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Button,NavBar,Toast,InputItem,TextareaItem} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import Header_selector from '../../components/header-selector'
import {requpdateBoss} from "../../redux/actions"
class Labn_info extends Component
{
  state={
    header: '', // 头像名称
    post:  '', // 职位
    info:  '', // 个人或职位简介
    company:  '', // 公司名称
    salary:  '' // 工资
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
  //更新信息提示
  toastMsg=()=> {

    setTimeout(()=>{
          const msg=this.props.user.msg
          if(msg) {

            Toast.fail(msg,2)
          }},500)

  }

  handleSave=()=>{
    this.props.requpdateBoss(this.state)
  }
    render() {
      const {header,type}=this.props.user
        if(header){//说明信息已经完善
        const path=(type==='老板'?'/laoban':'/qiuzhizhe')
            return <Redirect to={path}/>
        }
        return (
            <div>
                <NavBar className='NavT' >老板信息完善</NavBar>
                <Header_selector setHeader={this.setHeader}/>
                <InputItem placeholder='请输入职位' onChange={(val)=>{this.handleChange('post',val)}}>职位招聘</InputItem>
                <InputItem placeholder='请输入公司名称' onChange={(val)=>{this.handleChange('company',val)}}>公司名称</InputItem>
                <InputItem placeholder='请输入职位薪酬' onChange={(val)=>{this.handleChange('salary',val)}}> 职位薪酬</InputItem>
                <TextareaItem title='职业要求' row={3} onChange={(val)=>{this.handleChange('info',val)}}>职业要求</TextareaItem>
                <Button type='primary' className='NavT' onClick={()=>{this.handleSave();this.toastMsg()}}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}


export default connect(
  state=>({user:state.user}),
  {requpdateBoss}
)(Labn_info)
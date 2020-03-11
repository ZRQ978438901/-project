//个人路由容器界面

import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Button,List,Result,WhiteSpace,Modal} from 'antd-mobile'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

class Personal extends Component{
  logoOut=()=>{
    Modal.alert('退出', '确定需要退出？', [
      {
        text: '取消',
        onPress: () => console.log('cancel'),
        style: 'cancel',
      },
      { text: '确定', onPress: () => {this.props.resetUser('退出');Cookies.remove('userid')}},
    ]);
  }
  render() {
    const {user}=this.props
    return (
      <div style={{marginTop:50,marginBottom:50}}>
        <Result img={<img src={require(`../../assets/headers/${user.header}.png`)}/>}
                title={user.username}
                message={user.company}
        ></Result>
        <List renderHeader={()=>'相关信息'}>
        <List.Item multipleLine>
          <List.Item.Brief>职位:{user.post}</List.Item.Brief>
          <List.Item.Brief>简介：{user.info}</List.Item.Brief>
          {user.salary?<List.Item.Brief>薪资:{user.salary}</List.Item.Brief>:null}

        </List.Item>
        </List>
        <WhiteSpace/>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={this.logoOut}>退&nbsp;&nbsp;&nbsp;出&nbsp;&nbsp;&nbsp;登&nbsp;&nbsp;&nbsp;陆</Button>
        </List>

      </div>
    )
  }
}
export default connect(
  state=>({user:state.user}),
  {resetUser}
)(Personal)
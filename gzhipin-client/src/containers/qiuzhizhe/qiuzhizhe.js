//求职者路由容器界面

import React,{Component} from 'react'
import {connect} from 'react-redux'
import {reqgetuserlist} from '../../redux/actions'


import Userlist from '../../components/userlist/userlist'
class Qiuzhizhe extends Component{
  componentDidMount() {
    this.props.reqgetuserlist('老板')
  }
  render() {
    return (
      <div>
        <Userlist userlist={this.props.userlist}></Userlist>
      </div>
    )
  }
}
export default connect(
  state=>({userlist:state.userlist}),
  {reqgetuserlist}
)(Qiuzhizhe)
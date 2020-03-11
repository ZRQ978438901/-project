//老板路由容器界面

import React,{Component} from 'react'
import {connect} from 'react-redux'
import {reqgetuserlist} from '../../redux/actions'

import Userlist from '../../components/userlist/userlist'
class Laoban extends Component{


  componentDidMount() {
    this.props.reqgetuserlist('求职者')
  }

  render() {
    return (
      <div>
      <Userlist  userlist={this.props.userlist}></Userlist>
      </div>

    )
  }
}
export default connect(
  state=>({userlist:state.userlist}),
  {reqgetuserlist}
)(Laoban)
import React,{Component} from 'react'
import {Grid,List} from 'antd-mobile'
import Protypes from 'prop-types'

export default class Header_selector extends Component
{

   static propTypes = {
       setHeader: Protypes.func.isRequired
    }
    state = {
      icon: null //图片对象, 默认没有值
    }
  handeChange = ({text, icon}) => {
    // 更新当前组件状态
    this.setState({icon})
    // 调用函数更新父组件状态
    this.props.setHeader(text)
  }
  getHeaderImg(){
    var arr=[]
    for(var i=0;i<20;++i){
      var obj={text:`头像`+(i+1),
        icon:require(`../assets/headers/头像${i+1}.png`)}
        arr.push(obj)
    }
    return arr
  }
    render() {
    const {icon}=this.state
      let listHeader=!icon?'请选择头像':(<div>已选择头像：<img src={icon}/></div>)
        return (
          <div>

            <List   renderHeader={() => listHeader}>
              <Grid columnNum={5} data={this.getHeaderImg()} onClick={this.handeChange} >
              </Grid>
            </List>
          </div>
        )
    }
}
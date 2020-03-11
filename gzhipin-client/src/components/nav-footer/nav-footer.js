import React,{Component} from 'react'
import {Badge, TabBar} from 'antd-mobile'
import Protypes from 'prop-types'
import {withRouter} from 'react-router-dom'

import './nav-footer.css'
import {connect} from "react-redux";
const Item=TabBar.Item

 class Nav_footer extends Component{
  static protypes={
    navlist:Protypes.array.isRequired
  }
  render() {
    let navlist=this.props.navlist
    navlist=navlist.filter((nav)=>!nav.hide)
    const path=this.props.location.pathname

    return (
      <div className='TaBarBottom'>
      <TabBar >
        {
            navlist.map(nav=>(
              <Item key={nav.path}
                    badge={
                     nav.path==='/message'?this.props.chat.unReadCount:0
                    }
                    title={nav.text}
                    icon={{uri:require(`./images/${nav.icon}.png`)}}
                    selectedIcon={{uri:require(`./images/${nav.icon}-selected.png`)}}
                    selected={nav.path===path}
                    onPress={()=>this.props.history.replace(nav.path)}
              >
              </Item>
          ))
        }
      </TabBar>
      </div>
    )
  }
}

// export default withRouter(Nav_footer) //向外暴露withrouter包装的非路由组件


export default connect(
  state=>({user:state.user,chat:state.chat}),
  {}
)(withRouter(Nav_footer))

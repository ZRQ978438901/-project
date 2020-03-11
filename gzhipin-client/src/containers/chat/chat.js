/*
对话聊天的路由组件
*/
import React, {Component} from 'react'
import {NavBar, List, InputItem,Grid,Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg,readMsg} from "../../redux/actions";
import QueueAnim from 'rc-queue-anim'

import './chat.css'

const Item = List.Item



class Chat extends Component {
  state={
    content:'',
    isShow:false,
  }


  componentWillMount() {
    const emojis=['😃','😄','😁','😆','😅','😂','🙃','😇',
               '😷','☹','😳','😖','😩','😿','👌','👏',
      '👐','👀','👨‍','🙋‍♂️','💆‍♂️','👩‍👩‍👦‍👦','👔','👟',
      '😃','😄','😁','😆','😅','😂','🙃','😇',
      '😃','😄','😁','😆','😅','😂','🙃','😇']
    this.emojis=emojis.map(emoji=>({text:emoji}))
    document.addEventListener("keydown", this.onKeyDown)
  }


  componentDidMount(){

    window.scrollTo(0,document.body.scrollHeight)


  }
  componentWillUnmount() {
    //发送请求修改已读数据
    const path=this.props.location.pathname
    const to=this.props.user._id
    const from=path.slice(6)

    this.props.readMsg(from,to)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    window.scrollTo(0,document.body.scrollHeight)
  }

  onKeyDown = (e) => {
    switch( e.keyCode) {
      case 13://回车事件
        this.handlesendMsg()
        document.querySelector('#context').focus()
        break

    }
  }


  // 切换表情列表的显示
  toggleShow = () => {
    const isShow = !this.state.isShow

    this.setState({isShow})
    if(isShow) {
// 异步手动派发 resize 事件,解决表情列表显示的 bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }




  handlesendMsg=()=>{
    //收集数据
    const from=this.props.user._id
    let path=this.props.location.pathname
    const to=path.slice(6)
    const content=this.state.content.trim()
    //发送请求
    if(content){
      this.props.sendMsg({from,to,content})
    }
    this.setState({content:'',isShow:false})
  }
  render() {
    let path=this.props.location.pathname
    const target=path.slice(6)
    const {user}=this.props
    const {users,chatMsgs}=this.props.chat
    if(!users[user._id]){
      return null
    }
    //跟当前用户相关的msgs
    const msgs= chatMsgs.filter(msg=>
      (
        msg.chat_id===[user._id,target].sort().join('_')
      )
    )
    const targetHeader=users[target].header
    const targetIcon=
    targetHeader?require(`../../assets/headers/${targetHeader}.png`):null
    return (
      <div id='chat-page' >
        <NavBar  className='header-Nav'
          icon={<Icon type='left' onClick={
          ()=>{
            this.props.history.goBack()
          }
        }
        />}>{users[target].username}</NavBar>
        <List className='content-list'
          style={
            this.state.isShow?
                  {
                    marginBottom:244
                  }
              :
                    {
                      marginBottom:44
                    }
          }
        >
          <QueueAnim delay={300} className="queue-simple">
          {
            msgs.map((msg,index)=>{
            if(user._id!=msg.to){ //我发的消息
              return   <Item className='chat-me'
                             key={msg._id}
                             extra='我'
              >{msg.content}</Item>
            }
            else{
              return  (
                <Item
                  key={index}
                thumb={targetIcon}
                >{msg.content}</Item>
              )
            }
          })
          }
          </QueueAnim>
        </List>
        <div className='footerButton' id='footBTN'>
          <InputItem id='context'
            onFocus={()=>{
              this.setState({isShow:false})
            }}
            value={this.state.content}
           onChange={val=>this.setState({content:val})}

            placeholder=" 请输入"
            extra={
              <span>
                  <span style={{marginRight:5}}
                    onClick={this.toggleShow}
                  >😃</span>
                 <span id='button'
                   onClick={
                   ()=>{
                     this.handlesendMsg();
                   }
                 }
                 >发送</span>
              </span>

            }
          />
          {
            this.state.isShow ? (
              <Grid id='grid'
                data={this.emojis}
                columnNum={8}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={(item) => {
                  this.setState({content: this.state.content + item.text})

                }}
              />
            ) : null
          }
        </div>
      </div>
    )
  }
}




export default connect(
  state=>({user:state.user,chat:state.chat}),
  {sendMsg,readMsg}
)(Chat)
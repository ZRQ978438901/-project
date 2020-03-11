import React,{Component} from 'react'
import Protypes from 'prop-types'
import {WingBlank, WhiteSpace, Card, List} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

const Header=Card.Header
const Body=Card.Body


class UserList extends Component{
  static protypes={
    userlist:Protypes.array.isRequired
  }
// </QueueAnim>

  render(){
    const userlist=this.props.userlist

    return (
      <WingBlank style={{marginTop:50,marginBottom:50}}>
        <QueueAnim delay={200}>
        {
          userlist.map((user)=>(
            <div key={user._id}>
              <div>
                <WhiteSpace/>
                <Card onClick={()=>this.props.history.push(`/chat/${user._id}`)}>
                  <Header thumb={require(`../../assets/headers/${user.header}.png`)}
                          extra={user.username}

                  ></Header>
                  <Body>
                  {user.post?<div>职位:{user.post}</div>:null}
                  {user.info?<div>描述:{user.info}</div>:null}
                  {user.company?<div>公司:{user.company}</div>:null}
                  {user.salary?<div>月薪:{user.salary}</div>:null}
                  </Body>
                </Card>
              </div>
            </div>
          ))
        }
        </QueueAnim>
      </WingBlank>
    )
  }
}
export default withRouter(UserList)
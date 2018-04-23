import React from 'react';
import { connect } from 'react-redux';
import { List } from 'antd-mobile';

@connect(
    state => state
)
class Msg extends React.Component {
    getLastMsg(arr) {
        return arr[arr.length - 1];
    }

    handleClick(targetId) {
        this.props.history.push(`/chat/${targetId}`);
        // const userid = this.props.user.user; 
        // console.log('to', toId);
        // console.log('to', fromId);
        // console.log('to', userid);
        // if(toId === userid){
        //     this.props.history.push(`/chat/${fromId}`)
        // }else{
        //     this.props.history.push(`/chat/${toId}`)
        // }
    }

    render() {
        console.log(this.props)
        let msgGroup = {};
        const userid = this.props.user._id;
        const Item = List.Item;
        const Brief = Item.Brief;

        this.props.chat.chatmsg.map((res, index) => {
            msgGroup[res.chatid] = msgGroup[res.chatid] || [];
            msgGroup[res.chatid].push(res);
        })

        let chatMsgList = Object.values(msgGroup) || [];
        return <div style={{ marginTop: '50px', marginBottom: '60px' }}>
            {chatMsgList && chatMsgList.map((v, index) => {
                let lastMsg = this.getLastMsg(v);
                let targetId = lastMsg.from === userid ? lastMsg.to : lastMsg.from;
                return <div onClick={this.handleClick.bind(this, targetId)} style={{background: '#fff', marginBottom: '10px', padding: '6px'}} key={index}>
                    <img style={{width: '56px'}} src={require(`../img/${this.props.chat.users[targetId].avatar}.png`)} alt="" />
                    <div style={{display: 'inline-block'}}>
                        <div>{this.props.chat.users[targetId].name}</div>
                        <div style={{marginTop: '14px'}}>{lastMsg.content}</div>
                    </div>
                </div>
            })}
        </div>
    }
}

export default Msg;
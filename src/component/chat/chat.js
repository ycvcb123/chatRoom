import React from 'react';
import { InputItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chatList.redux';
import { getChatId } from '../../redux/util';
import { NavBar, List, Grid } from 'antd-mobile';
import './chat.css';

@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component {

    static defaultProps = {
        text: 'yezhiwei',
        msg: []
    };

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: [],
            showEmoji: false
        }
    }

    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }

        setTimeout(function() {
            window.dispatchEvent(new Event('resize'));
        }, 0)
    }

    submitContent() {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        let content = this.state.text;

        if(content === ''){
            return false
        }

        this.props.sendMsg({ from, to, content });
        this.setState({ text: '' });
    }

    render() {
        let toUser = this.props.match.params.user;
        let { avatar, _id } = this.props.user;
        let users = this.props.chat.users || {};
        let chatmsgs = this.props.chat.chatmsg || [];
        chatmsgs = chatmsgs.filter(v => v.chatid === getChatId(_id, toUser));
        if(!users[toUser]){
            return false;
        }
        const emoji = '😃 🐻 🍔 ⚽ 🌇 💡 ❤ 😂 ♡ 😍 🤔 🔥 😊 🙄 🐦 🙅‍ 😏 📚 📲 ♿️ 😂'.split(' ').filter(v => v)
                      .map(v => ({text: v}))
        return <div id='chat-page'>
            {/* 头部信息 */}
            <div style={{ position: 'fixed', width: '100%', top: '0' }}>
                <NavBar model='dark'>
                    {users[toUser].name}
                </NavBar>
            </div>

            <div style={{ marginTop: '60px', marginBottom: this.state.showEmoji ? '260px' : '60px' }}>
                { chatmsgs && chatmsgs.map((res, index) => {
                    return <div key={`${res._id}+${res.index}`}>
                        {res.from !== toUser ?
                            (<div>

                                <div style={{ float: 'right' }}>
                                    <img src={require(`../img/${avatar}.png`)} style={{ marginRight: '10px' }} width='40px' alt={res.avatar} />
                                </div>
                                <div className='chat_right'>
                                    {`${res.content}`}
                                </div>

                                <div style={{
                                    clear: 'both',
                                    float: 'none',
                                    height: '0',
                                    overflow: 'hidden'
                                }}></div>
                            </div>
                            )
                            :
                            (
                                <div>
                                    <div style={{ marginLeft: '10px', float: 'left' }}>
                                        <img src={require(`../img/${users[toUser].avatar}.png`)} style={{ marginRight: '10px' }} width='40px' alt={res.avatar} />
                                    </div>
                                    <div className='chat_left'>
                                        {`${res.content}`}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                })}
            </div>

            <div style={{ position: 'fixed', width: '100%', bottom: '0' }}>
                <List>
                    <InputItem
                        placeholder='请输入'
                        value={this.state.text}
                        onChange={v => {
                            this.setState({
                                text: v
                            })
                        }}
                        extra={
                            <span>
                                <span onClick={() => {
                                    this.setState({
                                        showEmoji: !this.state.showEmoji
                                    }, () => {
                                        if(this.state.showEmoji === true){
                                            setTimeout(function() {
                                                window.dispatchEvent(new Event('resize'));
                                            }, 0)
                                        }
                                    })
                                }} style={{marginRight: '15px'}}>😃</span>
                                <span onClick={() => this.submitContent()}>发送</span>
                            </span>
                        }
                    ></InputItem>
                </List>
                {this.state.showEmoji ? (<Grid 
                 data={emoji}
                 columnNum={6}
                 isCarousel={true}
                 carouselMaxRow={3}
                 onClick={el => {
                     this.setState({
                         text: this.state.text + el.text
                     })
                 }}
                ></Grid>) : null} 
                
            </div>
        </div>
    }
}

export default Chat;
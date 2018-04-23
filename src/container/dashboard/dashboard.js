import React from 'react';
import { NavBar } from 'antd-mobile';
import NavLinkBar from '../../component/navlink/navlink';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Boss from '../../component/boss/boss';
import Genius from '../../component/genius/genius';
import Msg from '../../component/msg/msg';
import Me from '../../component/me/me';
import { getMsgList } from '../../redux/chatList.redux';

@connect(
    state => state,
    { getMsgList }
)
class Dashboard extends React.Component{
    componentDidMount(){
        this.props.getMsgList()
    }

    render(){
        const pathname = this.props.location.pathname || '';
        const user = this.props.user;
        const navList = [
            {
                path: '/boss',
                //text: 'genius',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type !== 'boss'
            },
            {
                path: '/genius',
                //text: 'boss',
                icon: 'genius',
                title: 'Boss列表',
                component: Genius,
                hide: user.type !== 'genius'
            },
            {
                path: '/msg',
                //text: 'boss',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                //text: 'boss',
                icon: 'user',
                title: '个人中心',
                component: Me
            }
        ]
        return <div>
            {/* 头部导航 */}
            <NavBar style={{top: '0', position: 'fixed', width: '100%', zIndex: '2'}}>{navList.find(v => v.path === pathname).title}</NavBar>
            <div style={{marginTop: '50px'}}>
                <Switch>
                    {navList.map(v => (
                        <Route key={`${v.icon}key`} path={v.path} component={v.component}></Route>   
                    ))}
                </Switch>
            </div>
            {/* 底部导航 */}
            <NavLinkBar style={{zIndex: '2'}} data={navList}/>
        </div>
    }
}

export default Dashboard;
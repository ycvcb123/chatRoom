import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies';
import { logoutSubmit }  from '../../redux/user.redux';

@connect(
    state => state.user,
    { logoutSubmit }
)
class Me extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    logout() {
        const alert = Modal.alert;
        alert('注销', '确认退出?', [
            { text: '取消', onPress: () => {}, style: 'default' },
            { text: '确认', onPress: () => {
                browserCookie.erase('userid');
                this.props.logoutSubmit();
            } },
        ]);
    }

    render() {
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        return props.user ? (<div>
            <Result
                img={<img style={{ width: '64px' }} src={require(`../img/${this.props.avatar}.png`)} alt="touxiang" />}
                title={props.title}
                message={props.type === 'boss' ? props.company : null}
            />

            <List renderHeader={'简介'}>
                <Item multipleLine>
                    {props.title}
                    <Brief>{props.desc}</Brief>
                    {props.money ? <Brief>薪资：{props.money}</Brief> : null}
                </Item>
            </List>
            <WhiteSpace></WhiteSpace>

            <List>
                <Item onClick={this.logout.bind(this)}>退出登录</Item>
            </List>
        </div>) : props.redirectTo ? (<Redirect to={props.redirectTo}></Redirect>) : null
    }
}

export default Me;
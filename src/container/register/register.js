import React from 'react';
import { Button, WingBlank, WhiteSpace, List, InputItem, Radio } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Logo from '../../component/logo/logo';
import { register } from '../../redux/user.redux';
import '../common/common.css';

@connect(
    state => state.user,
    { register }
)
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        }
    }

    handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }

    submitRegister() {
        this.props.register(this.state);
    }

    render() {
        let RadioItem = Radio.RadioItem;
        return <div>
            <WingBlank>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo />
                    <List>
                        {this.props.msg ? <p className='err-msg'>{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v => { this.handleChange('user', v) }}>用户名</InputItem>
                        <InputItem
                            type='password'
                            onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                        <InputItem
                            type='password'
                            onChange={v => this.handleChange('repeatpwd', v)}>确认密码</InputItem>
                        <RadioItem
                            checked={this.state.type === 'genius'}
                            onChange={() => { this.handleChange('type', 'genius') }}
                        >技术牛人</RadioItem>
                        <RadioItem
                            checked={this.state.type === 'boss'}
                            onChange={() => this.handleChange('type', 'boss')}
                        >企业老板</RadioItem>
                    </List>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.submitRegister.bind(this)}>注册</Button>
            </WingBlank>
        </div>
    }
}

export default Register;
import React from 'react';
import Logo from '../../component/logo/logo';
import { WingBlank, WhiteSpace, Button, List, InputItem } from 'antd-mobile';
import { Redirect } from 'react-router-dom';
import { login } from '../../redux/user.redux';
import { connect } from 'react-redux';
import '../common/common.css';

@connect(
    state => state.user,
    { login }
)
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            pwd: ''
        }
    }

    login() {
        this.props.login(this.state);
    }

    register() {
        this.props.history.push('/register');
    }

    handleChange(type, value) {
        this.setState({
            [type]: value
        })
    }

    render(){
        return <div className='logo-container'>
            <WingBlank>
                {(this.props.redirectTo && this.props.redirectTo !== './login') ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo/>
                <List>
                    {this.props.msg ? <p style={{textAlign: 'left',marginLeft: '8px'}} className='err-msg'>{this.props.msg}</p> : null}
                    <InputItem onChange={v => this.handleChange('user', v)}>用户</InputItem>
                    <InputItem onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                </List>
                <WhiteSpace/>
                <Button onClick={this.login.bind(this)} type="primary">登录</Button>
                <WhiteSpace/>
                <Button onClick={this.register.bind(this)} type="primary">注册</Button>
            </WingBlank>
        </div>
    }
}

export default Login;
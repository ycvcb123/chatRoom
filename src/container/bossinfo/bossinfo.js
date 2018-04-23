import React from 'react';
import { NavBar, List, InputItem, TextareaItem, Button, WingBlank, WhiteSpace } from 'antd-mobile';
import { Redirect } from 'react-router-dom';
import AvatarSelect from '../../component/avatarselect/avatar-select';
import { connect } from 'react-redux';
import { update } from '../../redux/user.redux';

@connect(
    state => state.user,
    { update }
)
class BossInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            company: '',
            money: '',
            desc: '',
            avatar: ''
        }
    }

    handleChange(key, value){
        this.setState({
            [key]: value
        })
    }

    selectAvatar(name) {
        this.setState({
            avatar: name
        })
    }

    saveBossInfo() {
        this.props.update(this.state);
    }

    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return <div>
            {(redirect && (path !== redirect)) ? <Redirect to={this.props.redirectTo}/> : null}
            <NavBar>boss完善信息页</NavBar>
            <AvatarSelect selectAvatar={this.selectAvatar.bind(this)} />
            <List>
                <InputItem onChange={v => this.handleChange('title', v)}>招聘职位</InputItem>
                <InputItem onChange={v => this.handleChange('company', v)}>公司名称</InputItem>
                <InputItem onChange={v => this.handleChange('money', v)}>职位薪资</InputItem>
                {/* <InputItem onChange={v => this.handleChange('desc', v)}>职位要求</InputItem> */}
                <TextareaItem title='职位要求' rows={3} autoHeight onChange={v => this.handleChange('desc', v)}></TextareaItem>
            </List>
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                <Button onClick={this.saveBossInfo.bind(this)} type='primary'>保存</Button>
            </WingBlank>
        </div>
    }
}

export default BossInfo;
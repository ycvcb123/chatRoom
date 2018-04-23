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
class GeniusInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
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

    saveGeniusInfo() {
        this.props.update(this.state);
    }

    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return <div>
            {(redirect && (path !== redirect)) ? <Redirect to={this.props.redirectTo}/> : null}
            <NavBar>技术大神完善信息页</NavBar>
            <AvatarSelect selectAvatar={this.selectAvatar.bind(this)} />
            <List>
                <InputItem onChange={v => this.handleChange('title', v)}>应聘岗位</InputItem>
                <TextareaItem title='自我简介' rows={3} autoHeight onChange={v => this.handleChange('desc', v)}></TextareaItem>
            </List>
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                <Button onClick={this.saveGeniusInfo.bind(this)} type='primary'>保存</Button>
            </WingBlank>
        </div>
    }
}

export default GeniusInfo;
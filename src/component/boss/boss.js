import React from 'react';
import { getUserList } from '../../redux/chat.redux.js';
import UserCard from '../usercard/usercard';
import { connect } from 'react-redux';

@connect(
    state => state.chatuser,
    { getUserList }
)
class Boss extends React.Component {
    componentDidMount() {
        this.props.getUserList('genius');
    }

    render() {

        return <UserCard userlist={this.props.userlist}></UserCard>

    }
}

export default Boss;
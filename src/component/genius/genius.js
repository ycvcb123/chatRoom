import React from 'react';
import { getUserList } from '../../redux/chat.redux.js';
import UserCard from '../usercard/usercard';
import { connect } from 'react-redux';

@connect(
    state => state.chatuser,
    { getUserList }
)

class Genius extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getUserList('boss');
    }

    render() {
        return <UserCard userlist={this.props.userlist}></UserCard>
    }
}

export default Genius;
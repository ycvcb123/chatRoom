import React from 'react';
import { WhiteSpace, WingBlank, Card } from 'antd-mobile';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

@withRouter
class UserCard extends React.Component {
    static propTypes = {
        userlist: propTypes.array.isRequired
    }

    handleClick(v) {
        this.props.history.push(`./chat/${v._id}`);
    }

    render() {
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v => (
                    <div key={`${v.user}+${v.title}`}>
                        {v.avatar ? (<Card onClick={() => this.handleClick(v)}>
                            <Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                thumbStyle={{ width: '40px' }}
                                extra={<span>{v.title}</span>}
                            ></Header>
                            <Body>
                                {v.desc}
                                {v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
                            </Body>
                        </Card>) : null}
                        <WhiteSpace />
                    </div>
                ))}
            </WingBlank>
        )
    }
}

export default UserCard;
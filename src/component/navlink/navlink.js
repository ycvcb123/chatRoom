import React from 'react';
import propTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

@withRouter
@connect(
    state => state
)
class NavLinkBar extends React.Component{
    static propTypes = {
        data: propTypes.array.isRequired
    }

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        const navlist = this.props.data.filter(v => !v.hide);
        const Item = TabBar.Item;
        const { pathname } = this.props.location;
        let { unread } = this.props.chat;
        return <div style={{position: 'fixed', bottom: '0px', width: '100%'}}>
            <TabBar>
                {navlist.map(v => (
                    <Item
                        badge={v.icon === 'msg' ? unread : 0}
                        key={v.path}
                        title={v.title}
                        icon={{uri: require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri: require(`./img/${v.icon}Selected.png`)}}
                        selected={pathname === v.path}
                        onPress={
                            () => {this.props.history.push(v.path)}
                        }
                    />
                ))}
            </TabBar>
        </div>
    }
}

export default NavLinkBar;
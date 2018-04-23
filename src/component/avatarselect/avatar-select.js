import React from 'react';
import { Grid, List } from 'antd-mobile';
import propTypes from 'prop-types';

class AvatarSelect extends React.Component{
    static propTypes = {
        selectAvatar: propTypes.func.isRequired
    }

    constructor(props){
        super(props);
        this.state = {
            text: ''
        }
    }

    render(){
        const avatarList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(v => ({
            icon: require(`../img/${v}.png`),
            text: v
        }))
        const yourChoice = this.state.text ? (<div>您已选择头像：<img alt={this.state.text} style={{width: '50px'}} src={require(`../img/${this.state.text}.png`)}/> </div>) : (<div>请选择您的头像：</div>)
            
        return <div>
            <List renderHeader={() => yourChoice}>
                <Grid 
                data={avatarList} 
                hasLine={true} 
                columnNum={4} 
                onClick={elm => {
                    this.setState({
                        text: elm.text
                    },() => {
                        this.props.selectAvatar(elm.text);
                    })
                }}
                />
            </List>
        </div>
    }
}

export default AvatarSelect;
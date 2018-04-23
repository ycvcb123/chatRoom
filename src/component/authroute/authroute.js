import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loadDataSuccess } from '../../redux/user.redux';
import { connect } from 'react-redux';
//非路由组件需要通过withRouter进行包裹,connect要包裹在withRouter中
@withRouter
@connect(
    state => state.user,
    { loadDataSuccess }
)
class Authroute extends React.Component{
    componentDidMount() {
        const publicList = ['/login', '/register'];
        const currPathName = this.props.history.location.pathname;
        if(publicList.indexOf(currPathName) > -1){
            return false;
        }
        axios.get('/user/info')
        .then(res => {
            //已登录
            if(res.status === 200 && res.data.code === 0){
                this.props.loadDataSuccess(res.data.data);
            }
            //未登录
            else{
                this.props.history.push('/login');
            }
        })
    }
    render(){
        return <div>
            
        </div>
    }
}

export default Authroute;
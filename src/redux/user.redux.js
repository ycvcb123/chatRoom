import axios from 'axios';
import { getRedirectPath } from './util';

const AUTH_SUCCESS = 'auth_success';
const ERRMSG = 'errmsg';
const LOAD_DATA = 'load_data';
const LOGOUT = 'logout';
const initState = {
    //注册成功后往哪里跳转
    redirectTo: '',
    isAuth: false,
    msg: '',
    user: '',
    type: '',
    avatar: ''
}

//reducer
export function user(state=initState, action) {
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload};
        case LOAD_DATA:
            return {...state, ...action.payload};
        case LOGOUT:
            return {...initState, redirectTo: './login'};
        case ERRMSG:
            return {...state, msg: action.msg, isAuth: false};
        default:
            return state;
    }
}

//注册start
function authSuccess(obj) {
    const {pwd, ...data} = obj;
    return {type: AUTH_SUCCESS, payload: data};
}

function errMsg(msg) {
    return { type: ERRMSG, msg };
}

export function register({ user, pwd, repeatpwd, type }) {
    if (!user || !pwd) {
        return errMsg('用户名和密码不能为空！');
    }
    if (pwd !== repeatpwd) {
        return errMsg('两次输入的密码不一致，请检查！');
    }

    return dispatch => {
        axios.post('/user/register', { user, pwd, type })
        .then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess({user, pwd, type}));
            } else {
                dispatch(errMsg(res.data.msg));
            }
        })
    }
}
//注册  end

//登录start
export function login({user, pwd}){
    if(!user || !pwd){
        return errMsg('用户名和密码不能为空！');
    }

    return dispatch => {
        axios.post('/user/login', {user, pwd})
         .then(res => {
             if(res.status === 200 && res.data.code === 0){
                dispatch(authSuccess(res.data.data))
             }else{
                 dispatch(errMsg(res.data.msg));
             }
         })
    }
}
//登录  end

//刷新重新获取用户数据
export function loadDataSuccess(data){
    return {type: LOAD_DATA, payload: data}
}

//完善用户详细信息页
export function update(data){
    return dispatch => {
        axios.post('/user/update', data)
        .then(res => {
            if(res.status === 200 && res.data.code === 0){
                dispatch(authSuccess(res.data.data));
            }else{
                dispatch(errMsg(res.data.msg));
            }
        })
    }
}

//退出登录的操作
export function logoutSubmit(){
    return {type: LOGOUT}
}
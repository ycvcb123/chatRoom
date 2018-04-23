import axios from 'axios';
import io from 'socket.io-client';
const MSG_LIST = 'msg_list';
const MSG_RECV = 'msg_recv';
const socket = io();

const initState = {
    chatmsg: [],
    unread: 0,
    users: {}
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state,users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length};
        case MSG_RECV:        
            return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + 1};
        default:
            return state;
    }
}

export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getMsgList')
            .then(res => {
                let userid = getState().user._id;
                if (res.status === 200 && res.data.code === 0) {
                    res.data['userid'] = userid;
                    dispatch(msgList(res.data))
                }
            })
    }
}

function msgList(data) {
    return { type: MSG_LIST, payload: data };
}

export function sendMsg(data) {
    //返回的必须是一个对象或者函数
    return dispatch => {
        socket.emit('sendMsg', data);
    }
};

export function recvMsg(data) {
    return dispatch => {
        socket.on('recvmsg', data => {
            dispatch(reviceMsg(data));
        })
    }
}

function reviceMsg(data) {
    return {type: MSG_RECV, payload: data};
}

// (function(doc, win){
//     var html = doc.documentElement;
//     var resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
//     var reSize = function(){
//         var clienWidth = html.clientWidth;
//         if(!clienWidth) return ;
//         html.style.fontSize = 20*(clienWidth / 320) + 'px';
//     };
//     if(!doc.addEventListener) return ;
//     win.addEventListener(resizeEvent, reSize, false);
//     doc.addEventListener('DOMContentLoaded', reSize, false);
// })(document, window)

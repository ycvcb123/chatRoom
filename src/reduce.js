import { combineReducers } from 'redux';
import { user } from './redux/user.redux';
import { chatuser } from './redux/chat.redux.js';
import { chat } from './redux/chatList.redux.js';
export default combineReducers({ user, chatuser, chat });
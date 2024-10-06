// store/index.js
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./reducers/authReducer";
import authSignInReducer from "./reducers/authSignInReducer";
import commentReducer from "./reducers/commentReducer";
import postReducer from "./reducers/postReducers";
import userDetailsReducer from "./reducers/selfUserReducer";
import commentsDataReducer from "./reducers/commentDataReducer";
import postCreateReducer from "./reducers/createPostReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  signAuth: authSignInReducer,
  post: postReducer,
  addComment: commentReducer,
  user: userDetailsReducer,
  commentData: commentsDataReducer,
  cerate: postCreateReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer } from '../reducers/productReducer'
import { productDetailsReducer } from '../reducers/productDetailsReducer'
import { themeReducer } from '../reducers/themeReducer'
import { userReducer } from '../reducers/userReducer'
import { profileReducer } from '../reducers/profileReducer'

// Combining all the reducers
export const rootReducer = combineReducers({
  productReducer: productReducer,
  productDetailsReducer: productDetailsReducer,
  themeReducer: themeReducer,
  userReducer: userReducer,
  profileReducer: profileReducer,
})
let initialState = {}
const middleware = [thunk]
const reduxStore = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default reduxStore

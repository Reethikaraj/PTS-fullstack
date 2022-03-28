import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer } from '../reducers/productReducer'
import { productDetailsReducer } from '../reducers/productDetailsReducer'
import { themeReducer } from '../reducers/themeReducer'
import { userReducer } from '../reducers/userReducer'

// Combining all the reducers
export const reducer = combineReducers({
  productReducer,
  productDetailsReducer,
  themeReducer,
  userReducer,
})
// let initailState = {}
const middleware = [thunk]

// Creating store
const reduxStore = createStore(
  reducer,
  // initailState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default reduxStore

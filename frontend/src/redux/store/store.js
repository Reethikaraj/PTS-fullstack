import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer, newProductReducer } from '../reducers/productReducer'
import { productDetailsReducer } from '../reducers/productDetailsReducer'
import { themeReducer } from '../reducers/themeReducer'
import { userReducer } from '../reducers/userReducer'
import {
  profileReducer,
  forgotPasswordReducer,
} from '../reducers/profileReducer'
import { cartReducer } from '../reducers/cartReducer'
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
} from '../reducers/orderReducer'
import { wishListReducer } from '../reducers/wishListReducer'
import {
  newReviewReducer,
  productReviewsReducer,
  reviewReducer,
} from '../reducers/reviewReducer'

// Combining all the reducers
export const rootReducer = combineReducers({
  productReducer: productReducer,
  newProductReducer: newProductReducer,
  productDetailsReducer: productDetailsReducer,
  themeReducer: themeReducer,
  userReducer: userReducer,
  profileReducer: profileReducer,
  cartReducer: cartReducer,
  wishListReducer: wishListReducer,
  newOrderReducer: newOrderReducer,
  myOrdersReducer: myOrdersReducer,
  orderDetailsReducer: orderDetailsReducer,
  newReviewReducer: newReviewReducer,
  productReviewsReducer: productReviewsReducer,
  reviewReducer: reviewReducer,
  forgotPasswordReducer: forgotPasswordReducer,
})
function saveToLocalStorage(state) {
  const localStorageState = JSON.stringify(state)
  localStorage.setItem('state', localStorageState)
}
function loadFromLocalStorage() {
  const localStorageState = localStorage.getItem('state')
  if (localStorageState === null) return undefined
  return JSON.parse(localStorageState)
}
const storeFactory = () => {
  const middleware = [thunk]
  const reduxStore = createStore(
    rootReducer,
    loadFromLocalStorage(),
    composeWithDevTools(applyMiddleware(...middleware))
  )
  reduxStore.subscribe(() => saveToLocalStorage(reduxStore.getState()))
  return reduxStore
}

export default storeFactory

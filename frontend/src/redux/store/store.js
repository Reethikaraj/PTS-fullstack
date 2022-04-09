import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer } from '../reducers/productReducer'
import { productDetailsReducer } from '../reducers/productDetailsReducer'
import { themeReducer } from '../reducers/themeReducer'
import { userReducer } from '../reducers/userReducer'
import { profileReducer } from '../reducers/profileReducer'
import { cartReducer } from '../reducers/cartReducer'
import { orderReducer } from '../reducers/orderReducer'

// Combining all the reducers
export const rootReducer = combineReducers({
  productReducer: productReducer,
  productDetailsReducer: productDetailsReducer,
  themeReducer: themeReducer,
  userReducer: userReducer,
  profileReducer: profileReducer,
  cartReducer: cartReducer,
  orderReducer: orderReducer,
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
// const tokenFromStorage = localStorage.getItem('token')
//   ? JSON.parse(localStorage.getItem('token'))
//   : null

// const initialState = {
//   userLogin: { token: tokenFromStorage },
// }

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

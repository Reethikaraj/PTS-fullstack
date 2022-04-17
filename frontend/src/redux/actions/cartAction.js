import axios from 'axios'

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:5000/api/v1/product/${id}`)
  dispatch({
    type: 'ADD_TO_CART',
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.quantity,
      quantity,
    },
  })
}
// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: 'REMOVE_CART_ITEM',
    payload: id,
  })
}
// Clear cart
export function clearCart() {
  return {
    type: 'CLEAR_CART',
  }
}
// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: 'SAVE_SHIPPING_INFO',
    payload: data,
  })
}

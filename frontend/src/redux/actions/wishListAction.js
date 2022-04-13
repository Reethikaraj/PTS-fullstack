import axios from 'axios'
// export function addToWishList(item) {
//   return {
//     type: 'ADD_TO_WISHLIST',
//     payload: { item },
//   }
// }
export const addToWishList = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:5000/api/v1/product/${id}`)
  console.log('dispatching from wish action')
  dispatch({
    type: 'ADD_TO_WISHLIST',
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
    },
  })
}
export const removeFromWishList = (id) => async (dispatch, getState) => {
  dispatch({
    type: 'REMOVE_WISHLIST_ITEM',
    payload: id,
  })
}
export function ClearWishList() {
  return {
    type: 'CLEAR_WISHLIST',
  }
}

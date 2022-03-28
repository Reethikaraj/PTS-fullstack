import axios from 'axios'

// Get data from backend
export const getProduct =
  (keyword = '', currentPage = 1, price = [0, 500], category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: 'ALL_PRODUCT_REQUESTS',
      })
      let link = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`
      if (category) {
        link = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`
      }
      const { data } = await axios.get(link)
      dispatch({
        type: 'ALL_PRODUCT_SUCCESS',
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: 'ALL_PRODUCT_FAIL',
        payload: error.response.data.message,
      })
    }
  }

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: 'CLEAR_ERRORS' })
}

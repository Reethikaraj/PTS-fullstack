import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import Navbar from '../../navbar/Navbar'
import {
  clearErrors,
  getProduct,
} from '../../../../redux/actions/productAction'
import MetaData from '../../../MetaData'
import { useAlert } from 'react-alert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import './ProductList.css'

const ProductList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, products } = useSelector((state) => state.productReducer)
  console.log('products', products)
  // const { error: deleteError, isDeleted } = useSelector(
  //     (state) => state.product
  //   );
  // const deleteProductHandler = (id) => {
  //     dispatch(deleteProduct(id));
  //   };
  // useEffect(() => {
  //     if (error) {
  //       alert.error(error);
  //       dispatch(clearErrors());
  //     }
  // if (deleteError) {
  //       alert.error(deleteError);
  //       dispatch(clearErrors());
  //     }
  // if (isDeleted) {
  //       alert.success("Product Deleted Successfully");
  //      navigate("/admin/dashboard");
  //       dispatch({ type: 'DELETE_PRODUCT_RESET' });
  //     }
  // dispatch(getProduct());
  //   }, [dispatch, alert, error, deleteError, history, isDeleted]);
  const columns = [
    {
      field: 'id',
      headerName: 'Product ID',
      mixWidth: 50,
      justifyContent: 'flex-start',
      flex: 0.5,
    },

    {
      field: 'name',
      headerName: 'Name',
      flex: 0.5,
      justifyContent: 'flex-start',
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      flex: 0.5,
      justifyContent: 'flex-start',
    },

    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      flex: 0.5,
      justifyContent: 'flex-start',
    },

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      justifyContent: 'flex-start',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}>
              <EditIcon />
            </Link>
            <DeleteForeverIcon />
            {/* onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))} */}
          </Fragment>
        )
      },
    },
  ]
  const rows = []
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.quantity,
        price: item.price,
        name: item.name,
      })
    })

  return (
    <Box
      sx={{
        height: '120%',
        position: 'relative',
        top: '9.3vh',
        paddingBottom: '10%',
        width: '100%',
      }}
    >
      <Navbar />
      <Typography variant='h6' sx={{ textAlign: 'center' }}>
        Products List
      </Typography>

      <Box sx={{ padding: '5px 20px 5px 5px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableSelectionOnClick
          className='productListTable'
          autoHeight
        />
      </Box>
    </Box>
  )
}

export default ProductList

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Box, Typography, Grid } from '@mui/material'
import Navbar from '../navbar/Navbar'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getProduct } from '../../../redux/actions/productAction'
import './Dashboard.css'

const Dashboard = () => {
  ChartJS.register(...registerables)
  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.productReducer)
  // const { orders } = useSelector((state) => state.allOrders)
  // const { users } = useSelector((state) => state.allUsers)
  let outOfStock = 0
  products &&
    products.forEach((item) => {
      if (item.quantity === 0) {
        outOfStock += 1
      }
    })

  useEffect(() => {
    dispatch(getProduct())
    // dispatch(getAllOrders());
    // dispatch(getAllUsers());
  }, [dispatch])

  // let totalAmount = 0
  // orders &&
  //   orders.forEach((item) => {
  //     totalAmount += item.totalPrice
  //   })
  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'TOTAL AMOUNT',
        hoverBackgroundColor: ['rgb(197, 72, 49)'],
        data: [0, 4000],
      },
    ],
  }
  const doughnutState = {
    labels: ['Out of Stock', 'InStock'],
    datasets: [
      {
        backgroundColor: ['#00A6B4', '#6800B4'],
        hoverBackgroundColor: ['#4B5000', '#35014F'],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  }
  return (
    <Box
      className='dashboardContainer'
      sx={{
        height: '120%',
        position: 'relative',
        top: '9.3vh',
        paddingBottom: '10%',
        width: '100%',
      }}
    >
      <Navbar />
      <Typography variant='h6' sx={{ textAlign: 'center', padding: '15px 0' }}>
        Admin's dashboard
      </Typography>

      <div className='dashboardSummary'>
        <div>
          <p>
            Total Amount <br /> ₹4000
          </p>
        </div>
        <div className='dashboardSummaryBox2'>
          <Link to='/admin/products'>
            <p>Products</p>
            <p>{products && products.length}</p>
          </Link>
          <Link to='/admin/orders'>
            <p>Orders</p>
            {/* <p>{orders && orders.length}</p> */}
          </Link>
          <Link to='/admin/users'>
            <p>Users</p>
            {/* <p>{users && users.length}</p> */}
          </Link>
        </div>
      </div>

      <div className='lineChart'>
        <Line data={lineState} />
      </div>
      <div className='doughnutChart'>
        <Doughnut data={doughnutState} />
      </div>
    </Box>
  )
}

export default Dashboard

import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { Box, Button } from '@mui/material'
import Navbar from '../../navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createProduct } from '../../../../redux/actions/productAction'
import DescriptionIcon from '@mui/icons-material/Description'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import StorageIcon from '@mui/icons-material/Storage'
import SpellcheckIcon from '@mui/icons-material/Spellcheck'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { clearErrors } from '../../../../redux/actions/productAction'
import { Formik, Form, Field, FieldArray } from 'formik'
import './CreateProduct.css'
const CreateProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()
  const { loading, error, success } = useSelector(
    (state) => state.newProductReducer
  )
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [Stock, setStock] = useState(0)
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const categories = ['Hair Accessories', 'Kids Accessories ']
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (success) {
      alert.success('Product Created Successfully')
      navigate('/admin/dashboard')
      dispatch({ type: 'NEW_PRODUCT_RESET' })
    }
  }, [dispatch, alert, error, navigate, success])
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files)
    setImages([])
    setImagesPreview([])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result])
          setImages((old) => [...old, reader.result])
        }
      }
      reader.readAsDataURL(file)
    })
  }
  const initialValues = {
    name: '',
    category: '',
    price: '',
    description: {
      skus: [...''],
      material: '',
      numOfPieces: '',
      about: '',
    },
    images: [...''],
    quantity: '',
  }
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
      Create Product
      <div className='newProductContainer'>
        <h1>Create Product</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => console.log(values)}
        >
          {({ values }) => (
            <Form className='createProductForm' encType='multipart/form-data'>
              <div>
                <SpellcheckIcon />
                <Field type='text' name='name' placeholder='Product Name' />
              </div>
              <div>
                <SpellcheckIcon />
                <Field type='text' name='category' placeholder='Category' />
              </div>
              <div>
                <AttachMoneyIcon />
                <Field type='number' name='price' placeholder='Price' />
              </div>
              <div>
                <DescriptionIcon />
                <FieldArray name='description.skus'>
                  {() => (
                    <>
                      <p>Colors</p>
                      {values.description.skus.map((color, index) => (
                        <Field type='number' name='price' placeholder='Price' />
                      ))}
                    </>
                  )}
                </FieldArray>
                <Field type='text' name='category' placeholder='Category' />
              </div>
              {/* <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value=''>Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div> */}
              <div>
                <StorageIcon />
                <Field
                  type='number'
                  name='quantity'
                  placeholder='Stock'
                  required
                />
              </div>
              <div id='createProductFormFile'>
                <Field type='file' name='avatar' accept='image/*' multiple />
              </div>
              <div id='createProductFormImage'>
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt='Product Preview' />
                ))}
              </div>
              <Button
                id='createProductBtn'
                type='submit'
                disabled={loading ? true : false}
              >
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Box>
  )
}

export default CreateProduct

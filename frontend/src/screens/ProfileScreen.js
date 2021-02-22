import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Table,
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  Image,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Alert from '../components/Message'
import Loader from '../components/Loader'
import Rating from '../components/Rating'
import {
  getUserDetails,
  updateUserProfile,
  addToCart,
  removeFromCart
} from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector((state) => state.productDetails)
  const { product } = productDetails

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId))
    }
  }, [dispatch, productId])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <Row>
      <Col md={3}>
        <h2>Профиль</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant='danger'>{error}</Alert>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type='name'
                placeholder='Введите имя'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Введите email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type='password'
                placeholder='Введите пароль'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Подтвердить пароль</Form.Label>
              <Form.Control
                type='password'
                placeholder='Подтвердите пароль'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Обновить
            </Button>
          </Form>
        )}
      </Col>
      {user.isSeller ? (
        <Col md={3}>
          <h2>Отзывы</h2>

          {user.reviews &&
            user.reviews.map((review) => (
              <ListGroup.Item key={review._id} className='list-group-item-dark'>
                <strong>{review.name}</strong>
                <div className='my-2'>
                  <Rating value={review.rating} />
                </div>
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
        </Col>
      ) : null}
      {user.isBuyer ? (
        <Col md={8}>
          <h1>Избранное</h1>
          {cartItems.length === 0 ? (
            <Alert>
              Список избранного пуст
              <Link to='/' className='text-warning'>
                <br />Найти любимца
              </Link>
            </Alert>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item.product}
                  className='list-group-item-dark my-1'
                >
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3} className='cart-product-name'>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2} className='cart-product-price'>
                      ${item.price}
                    </Col>
                    <Col md={2} className='cart-product-price'>
                      <Rating
                    value={item.rating}
                    text={`${item.userLogin}`}
                  />
                    </Col>
                    <Col md={2} sm={3} className='cart-remove-btn col-3'>
                      <Button
                        className='btn-light-custom'
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                    
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      ) : null}
      
    </Row>
  )
}

export default ProfileScreen

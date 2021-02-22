import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../components/Message'
import Rating from '../components/Rating'
import {
  addToCart,
  removeFromCart
} from '../actions/userActions'

const WishlistScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId))
    }
  }, [dispatch, productId])

const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <Row>
      <div className='text-center '>
        <Col md={12}>
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
        </div>
      
    </Row>
  )
}

export default WishlistScreen

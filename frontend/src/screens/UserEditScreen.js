import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSeller, setIsSeller] = useState(false)
  const [isBuyer, setIsBuyer] = useState(false)
  const [isVerifyed, setIsVerifyed] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
        setIsSeller(user.isSeller)
        setIsBuyer(user.isBuyer)
        setIsVerifyed(user.isVerifyed)
      }
    }
  }, [dispatch, history, userId, user, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isAdmin,
        isSeller,
        isBuyer,
        isVerifyed,
      })
    )
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Alert variant='danger'>{errorUpdate}</Alert>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant='danger'>{error}</Alert>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email addres</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='isseller'>
              <Form.Check
                type='checkbox'
                label='Is Seller'
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='isbuyer'>
              <Form.Check
                type='checkbox'
                label='Is Buyer'
                checked={isBuyer}
                onChange={(e) => setIsBuyer(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='isverifyed'>
              <Form.Check
                type='checkbox'
                label='Is Verifyed'
                checked={isVerifyed}
                onChange={(e) => setIsVerifyed(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen

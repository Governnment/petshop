import React from 'react'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Carousel,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import aboutUs from '../Images/about-us.png'
import insurance from '../Images/insurance.png'
import check from '../Images/check.png'
import star from '../Images/star.png'
import wishList from '../Images/wish-list.png'

const AboutUs = () => {
  return (
    <div className='about-us'>
      <Row>
        <Col md={7}>
          <h1>Petshop</h1>
          <h3>
            Petshop — диджитал онлайн питомник, где продаются питомцы только от
            проверенных продавцов.
          </h3>
          <h4>
            Покупатели могут найти питомца любой породы — от бритов до бенгалов
          </h4>
          <LinkContainer to='/seller-register'>
            <button className='btn my-3 mr-3 btn-about-us'>
              <i className='fas fa-user mr-1'></i>Стать продавцом
            </button>
          </LinkContainer>
          <LinkContainer to='/'>
            <button className='btn my-3 btn-about-us'>
              <i className='fas fa-shopping-cart mr-1'></i> Купить питомца
            </button>
          </LinkContainer>
        </Col>
        <Col md={5}>
          <div className='text-center'>
            <img src={aboutUs} className='' alt='Petshop' />
          </div>
        </Col>
      </Row>
      <h3>Почему стоит покупать у нас</h3>
      <Row>
        <Col md={3}>
          <img src={insurance} alt='insurance' className='how-it-works-img' />
          <h4 className='how-it-works-header '>Безопасная сделка</h4>
          <p className='how-it-works-p'>
            Сделки проводяться через нашу площадку, которая является доверенным
            лицом
          </p>
        </Col>
        <Col md={3}>
          <img src={check} alt='check' className='how-it-works-img' />
          <h4 className='how-it-works-header'>Только проверенные продавцы</h4>
          <p>Перед регистрацией все продавцы проходят верефикацию данных</p>
        </Col>
        <Col md={3}>
          <img src={star} alt='check' className='how-it-works-img' />
          <h4 className='how-it-works-header'>
            Возможность оценивать продавца
          </h4>
          <p>
            Вы можете посмотреть рейтинг продавца или оставить свой, после
            покупки
          </p>
        </Col>
        <Col md={3}>
          <img src={wishList} alt='check' className='how-it-works-img' />
          <h4 className='how-it-works-header'>
            Добавление питомца в избранное
          </h4>
          <p>
            Добавьте любимца в избранное, чтобы отслеживать все информацию о нем
            и не пропустить ничего нового
          </p>
        </Col>
      </Row>
    </div>
  )
}

export default AboutUs

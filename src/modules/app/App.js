import './App.css'
import React from 'react'
import Header from './header/Header'
import Main from './main/Main'
import Footer from './footer/Footer'
import Flash from './flash/Flash'
import Categories from '../category/Categories'

const App = props => {
  return (
    <div id='app'>
      <Header active_link={props.currentController === 'index' ? 'home' : props.currentController} />
      { props.flash &&
        <Flash message={props.flash} flash_type={props.flash_type} />
      }
      <Categories categories={props.categories} currentCategory={props.currentCategory} />
      <Main content={props.content} />
    </div>
  )
}

export default App
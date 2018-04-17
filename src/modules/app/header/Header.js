import React from 'react';
import LinkContainer from '../link/LinkContainer'
import './Header.css'
import { capitalize, getCurrentUser } from '../appHelpers'

const Header = props => {
  let links = ['posts', 'categories', 'user']
  let href_aliases = {
    'home': ''
  }
  let text_aliases = {
    'user': `User #${getCurrentUser().id}`
  }
  return (
    <header>
      <nav>
        <LinkContainer className='logo' href='/'>Readable</LinkContainer>
        { links.map(link => {
          return <LinkContainer
                  key={link}
                  className={link + (props.active_link === link ? ' active' : '') }
                  href={'/' + (link in href_aliases ? href_aliases[link] : link)} >
            { (link in text_aliases ? text_aliases[link] : capitalize(link)) }
          </LinkContainer>
          })
        }
      </nav>
    </header>
  )
}

export default Header
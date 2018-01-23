import React from 'react';
import LinkContainer from '../link/LinkContainer'
import './Header.css'
import { capitalize } from '../appHelpers'

const Header = props => {
  let links = ['home', 'posts']
  let href_aliases = {
    'home': ''
  }
  return (
    <header>
      <nav>
        { links.map(link => {
          return <LinkContainer
                  className={link + (props.active_link === link ? ' active' : '') }
                  href={'/' + (link in href_aliases ? href_aliases[link] : link)} >
            { capitalize(link) }
          </LinkContainer>
          })
        }
      </nav>
    </header>
  )
}

export default Header
import React from 'react'

import logo from '../../assets/header-logo.svg';

export const Header: React.FC = () => {
  return (
    <header className="p-5 m-5">
        <nav className="top-menu">
            <img src={logo}/>
        </nav>
    </header>
  )
}
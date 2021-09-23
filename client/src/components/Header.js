import React from 'react'
import { Link } from 'react-router-dom'
import GoogleAuth from './GoogleAuth'

const Header = () => {
    return (
        <div className='ui secondary pointing menu py-1'>
                <Link to='/' className='item'>Twitchie</Link>
            <div className="right menu">
                <Link to='/' className='item'>All Streams</Link>
            </div>
            <GoogleAuth />
        </div>
    )
}

export default Header

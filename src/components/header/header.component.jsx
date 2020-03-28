import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from "../../firebase/firebase.util";
import './header.styles.scss';
import { connect } from 'react-redux';

const Header = ({currentUser}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/'>
                CONTACT
            </Link>
            {currentUser?(
                <Link className='option' to='/signin' onClick={() => auth.signOut()}>
                    SIGN OUT
                </Link>
            ) :(
                <Link to='/signin' className='option'>
                    SIGN IN
                </Link>
            )
            }
        </div>
    </div>
);

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);
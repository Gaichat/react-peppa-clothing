import React from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/download.svg';
import './cart-icon.styles.scss';
import { connect } from 'react-redux';
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { cartItemsCountSelector } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon'>
        <ShoppingIcon className='shopping-icon' onClick={toggleCartHidden}/>
        <span className='item-count'>{itemCount}</span>
    </div>
);

const mapStateToProps = createStructuredSelector({
    itemCount: cartItemsCountSelector
});

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

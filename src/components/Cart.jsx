import { useContext } from 'react';
import Modal from './UI/Modal';
import CartContext from '../store/CartContext';
import {CurrencyFormatter} from '../util/Formatting'
import Button from '../components/UI/Button'
import UserProgressContext from '../store/UserProgressContext';
import CartItem from './CartItem';

export default function Cart(){
    const cartCtx = useContext(CartContext);
    const UserProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    );

    function handleCloseCart(){
        UserProgressCtx.hideCart();
    }

    function handleGoToCheckout(){
        UserProgressCtx.showCheckout();
    }

    return <Modal className='cart' open={UserProgressCtx.progress === 'cart'} onClose={UserProgressCtx.progress === 'cart' ? handleCloseCart : null}>
        <h2>Your Cart</h2>
        <ul>
            { cartCtx.items.map(item => 
                <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} onIncrease={() => cartCtx.addItem(item)} onDecrease={() => cartCtx.removeItem(item.id)} />
            )};
        </ul>
        <p className='cart-total'>{CurrencyFormatter.format(cartTotal)}</p>
        <p className='modal-actions'>
            <Button onClick={handleCloseCart} textOnly>Close</Button>
            {cartCtx.items.length > 0 && (
                <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
            )}
        </p>
    </Modal>
}
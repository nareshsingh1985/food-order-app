import { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext';
import Button from './UI/Button'
export default function Header(){
    const cartCtx = useContext(CartContext);
    const UserProgressCtx = useContext(UserProgressContext);
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0)

    function handleShowCart(){
        UserProgressCtx.showCart();
    }

    return(
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="Food shop" />
                <h1>Foodshop</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}
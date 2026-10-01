import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'

function CartTotal() {
    const { currency, delivery_fee, cartItem, products } = useContext(shopDataContext);

    
    let subtotal = 0;
    for (const productId in cartItem) {
        const product = products.find(p => p._id === productId);
        if (product) {
            for (const size in cartItem[productId]) {
                subtotal += product.price * cartItem[productId][size];
            }
        }
    }

    return (
        <div className='w-full'>
            <div className='text-xl py-[10px]'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>
            <div className='flex flex-col gap-2 mt-2 text-sm p-4 sm:p-6 border-2 border-[#4d8890]'>
                <div className='flex justify-between text-white text-base sm:text-lg p-2'>
                    <p>Subtotal</p>
                    <p>{currency} {subtotal.toFixed(2)}</p>
                </div>
                <hr />
                <div className='flex justify-between text-white text-base sm:text-lg p-2'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee}</p>
                </div>
                <hr />
                <div className='flex justify-between text-white text-base sm:text-lg p-2'>
                    <b>Total</b>
                    <b>{currency} {subtotal === 0 ? 0 : (subtotal + delivery_fee).toFixed(2)}</b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal

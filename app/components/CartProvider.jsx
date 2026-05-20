'use client'

import { CartProvider as Provider } from '../context/CartContext'

export default function CartProvider({ children, userId = null }) {
  return <Provider userId={userId}>{children}</Provider>
}

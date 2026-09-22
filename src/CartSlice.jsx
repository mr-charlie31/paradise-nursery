import { createSlice } from '@reduxjs/toolkit'

/**
 * Redux slice for the shopping cart.
 * Reducers: addItem(), removeItem(), and updateQuantity().
 */
const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    // addItem(): add a plant to the cart, or increase its quantity if already present
    addItem(state, action) {
      const plant = action.payload
      const existing = state.items.find((item) => item.id === plant.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({
          id: plant.id,
          name: plant.name,
          price: plant.price,
          image: plant.image,
          quantity: 1,
        })
      }
    },

    // removeItem(): remove a plant entirely from the cart
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },

    // updateQuantity(): change the quantity of a cart item
    // payload: { id, amount } where amount is +1 (increase) or -1 (decrease)
    // Removing the item when quantity would drop to 0
    updateQuantity(state, action) {
      const { id, amount } = action.payload
      const item = state.items.find((item) => item.id === id)
      if (!item) {
        return
      }
      const newQuantity = item.quantity + amount
      if (newQuantity <= 0) {
        state.items = state.items.filter((i) => i.id !== id)
      } else {
        item.quantity = newQuantity
      }
    },
  },
})

export const { addItem, removeItem, updateQuantity } = CartSlice.actions

// Convenience helpers that dispatch updateQuantity under the hood
export const increaseQuantity = (id) => updateQuantity({ id, amount: 1 })
export const decreaseQuantity = (id) => updateQuantity({ id, amount: -1 })

// calculateTotalAmount(): sum of (price * quantity) for every cart item
export const calculateTotalAmount = (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)

export const selectCartItems = (state) => state.cart.items

export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)

export const selectTotalCost = (state) => calculateTotalAmount(state.cart.items)

function cartReducer(state, action) {
  return CartSlice.reducer(state, action)
}

export default cartReducer

import { createSlice } from '@reduxjs/toolkit'

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
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
    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    increaseQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) {
        item.quantity += 1
      }
    },
    decreaseQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload)
        }
      }
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart } =
  CartSlice.actions

export const selectCartItems = (state) => state.cart.items

export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0)

export const selectTotalCost = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

function cartReducer(state, action) {
  return CartSlice.reducer(state, action)
}

export default cartReducer

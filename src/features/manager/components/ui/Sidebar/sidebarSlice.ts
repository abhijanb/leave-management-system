import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: { collapsed: true },
  reducers: {
    setCollapsed(state, action: PayloadAction<boolean>) {
      state.collapsed = action.payload
    },
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed
    },
  },
})

export const { setCollapsed, toggleCollapsed } = sidebarSlice.actions
export default sidebarSlice.reducer

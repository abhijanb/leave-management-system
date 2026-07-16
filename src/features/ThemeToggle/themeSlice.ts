import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Theme = 'light' | 'dark'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: 'dark' as Theme,
  reducers: {
    setTheme(_, action: PayloadAction<Theme>) {
      return action.payload
    },
    toggleTheme(state) {
      return state === 'dark' ? 'light' : 'dark'
    },
  },
})

export const { setTheme, toggleTheme } = themeSlice.actions
export default themeSlice.reducer

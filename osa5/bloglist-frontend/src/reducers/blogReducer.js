import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlogs(state, action) {
      const sortedBlogs = action.payload.sort((a, b) => b.likes - a.likes)
      state.push(sortedBlogs)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateLikes(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    }
  }
})

export const { addBlogs, setBlogs, updateLikes } = blogSlice.actions
export default blogSlice.reducer

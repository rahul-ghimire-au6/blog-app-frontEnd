import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogData: [],
    userBlogData:[],
    loading: false,
    error: "",
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    fetchAllBlogs: (state, action) => {
      state.blogData = action.payload;
      state.loading = false;
    },
    fetchBlogsByUserId:(state,action)=>{
        state.userBlogData = action.payload;
        state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload.errMessage;
      state.loading = false;
    },
  },
});

const blogReducer = blogSlice.reducer;
const blogActions = blogSlice.actions;

export { blogReducer, blogActions };
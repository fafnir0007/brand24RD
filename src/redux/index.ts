import {configureStore} from '@reduxjs/toolkit'
import searchSlice from './slices/search'
import  articlesSlice from './slices/articles'

export const store = configureStore({
    reducer:{
        search: searchSlice,
        article: articlesSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
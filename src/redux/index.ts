import {configureStore} from '@reduxjs/toolkit'
import searchSlice from './slices/search'
import articlesSlice from './slices/articles'
import newspaperOptionsSlice from './slices/newspaper-options'
import sentimentOptions from './slices/sentiment-options'
export const store = configureStore({
    reducer:{
        search: searchSlice,
        article: articlesSlice,
        newspaperOptions: newspaperOptionsSlice,
        sentimentsOptions: sentimentOptions
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
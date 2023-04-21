import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    articles:[],
}

export const articlesSlice = createSlice({
    name: 'article',
    initialState,
    reducers:{
        addArticles: (state, action) => {
            state.articles = action.payload
        }
    }
})

export const {addArticles} = articlesSlice.actions

export default articlesSlice.reducer




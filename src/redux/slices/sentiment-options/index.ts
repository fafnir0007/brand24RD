import {createSlice} from '@reduxjs/toolkit'

const initialState = [
        {id:1, label:'positive', checked:false},
        {id:2, label:'negative', checked: false},
        {id:3, label:'neutral', checked: false},
]

export const sentimentOptions = createSlice({
    name: 'sentiments_options',
    initialState,
    reducers:{
        updateSentimentOptions: (state, action) => {
            state[action.payload ].checked = !state[action.payload].checked 
        }
    }
})

export const {updateSentimentOptions} = sentimentOptions.actions

export default sentimentOptions.reducer




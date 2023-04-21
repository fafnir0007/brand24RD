import {createSlice} from '@reduxjs/toolkit'

const initialState = [
        {id:1, label:'Listin Diario', checked:false},
        {id:2, label:'Diario Libre', checked: false}
]



export const newsPaperOptions = createSlice({
    name: 'news_paper_options',
    initialState,
    reducers:{
        updateNewsPaperOptions: (state, action) => {
            state[action.payload - 1].checked = !state[action.payload-1].checked 
        }
    }
})

export const {updateNewsPaperOptions} = newsPaperOptions.actions

export default newsPaperOptions.reducer




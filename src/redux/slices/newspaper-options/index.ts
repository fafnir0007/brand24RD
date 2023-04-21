import {createSlice} from '@reduxjs/toolkit'

const initialState = [
        {id:'listin_diario', label:'Listin Diario', checked:false},
        {id:'diario_libre', label:'Diario Libre', checked: false}
]

export const newsPaperOptions = createSlice({
    name: 'news_paper_options',
    initialState,
    reducers:{
        updateNewsPaperOptions: (state, action) => {
            console.log(action,'state')
            state = action.payload
        }
    }
})

export const {updateNewsPaperOptions} = newsPaperOptions.actions

export default newsPaperOptions.reducer




import {createSlice} from '@reduxjs/toolkit'

const initialState = [
        {id:1, label:'Listin Diario', checked:false},
        {id:2, label:'Diario Libre', checked: false},
        {id:3, label:'El Nacional', checked: false},
        {id:2, label:'Hoy', checked: false}
]

export const newsPaperOptions = createSlice({
    name: 'news_paper_options',
    initialState,
    reducers:{
        updateNewsPaperOptions: (state, action) => {
            state[action.payload ].checked = !state[action.payload].checked 
        }
    }
})

export const {updateNewsPaperOptions} = newsPaperOptions.actions

export default newsPaperOptions.reducer




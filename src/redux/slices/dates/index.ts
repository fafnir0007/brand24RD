import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    initialDate: '',
    endDate: ''
}

export const dateFilter = createSlice({
    name: 'date',
    initialState: initialState,
    reducers: {
        updateFilteredDates: (state, action) => {
            state.initialDate = action.payload.initialDate
            state.endDate = action.payload.endDate
        }
    }
})

export const { updateFilteredDates } = dateFilter.actions

export default dateFilter.reducer




import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        name: 'classic Pokemon',
        type: 'Any Type',
        height: 'tall',
        weight: 'jumbo',
        moveset: ['move', 'move', 'move', 'move']
    },

    reducers: {
        chooseName: (state, action) => {state.name = action.payload},
        chooseType: (state, action) => {state.type = action.payload},
        chooseHeight: (state, action) => {state.height = action.payload},
        chooseWeight: (state, action) => {state.weight = action.payload},
        chooseMoveset: (state, action) => {state.moveset = action.payload}
    }
})

export const reducer = rootSlice.reducer;
export const {chooseName, chooseType, chooseHeight, chooseWeight, chooseMoveset} = rootSlice.actions;
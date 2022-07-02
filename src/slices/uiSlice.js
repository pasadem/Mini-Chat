import { createSlice } from "@reduxjs/toolkit";

import { actions as channelsActions } from './channelsSlice.js';

const initialState = {
    currentChannelId: '',
}

const uiSlices = createSlice({
   name: 'currChannel',
   initialState,
   reducers: {
       setCurrentChannelId: (state, action) => {
           state.setCurrentChannelId = action.payload;
       },
   },
   extraReducers: (builder) => {
       builder
         .addCase(channelsActions.removeChannel, (state, action) => {
             if(state.currentChannelId === action.payload) {
                 state.currentChannelId = 1;
             }
         });
   },
});

export const { actions } = uiSlices;
export default uiSlices.reducer;
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

export const fetchInitialData = createAsyncThunk(
  'channels/fetchAll',
  async (token) => {
    const { data } = await axios.get(routes.channelsPath(), { headers: { Autorization: `Bearer ${token}` }});
    return data;
  }
)

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({ currentChannelId:null, loading: 'idle', error: null });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.setOne,
    setChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extrareducers: (builder) => {
    builder
    .addCase(fetchInitialData.pending, (state) => {
      state.loading = 'loading';
      state.error = null;
    })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.error = null;
        const { currentChannelId, channels} = action.payload;
        channelsAdapter.addMany(state, channels);
        if (state.currentChannelId === null) {
          state.currentChannelId = currentChannelId;
        }
      })
      .addCase(fetchInitialData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.code;
      })
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors(state => state.channels);
export default channelsSlice.reducer;
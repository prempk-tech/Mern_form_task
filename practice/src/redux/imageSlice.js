
import { createSlice } from '@reduxjs/toolkit';

const imagesSlice = createSlice({
  name: 'images',
  initialState: {},
  reducers: {
    addImage: (state, action) => {
      state.push(action.payload);
    },
    setImages: (state, action) => {
      return action.payload;
    },
  },
});

export const { addImage, setImages } = imagesSlice.actions;
export default imagesSlice.reducer;

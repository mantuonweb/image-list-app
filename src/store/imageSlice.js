import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  searchText: '',
  currentImage: '',
  imageList: [],
};

export const counterSliece = createSlice({
  name: 'image-management',
  initialState,
  reducers: {
    setSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
        return state;
      },
    },
    setStoreImage: {
      reducer: (state, action) => {
        state.currentImage = action.payload;
        return state;
      },
    },
    addImageItem: {
      reducer: (state, action) => {
        state.imageList.push(action.payload);
        console.log(state);
        return state;
      },
    },
  },
});

export const { setStoreImage, setSearchText, addImageItem } =
  counterSliece.actions;
export default counterSliece.reducer;

import { createEntityAdapter, createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface LibraryImage {
  id: string;
  name: string;
  mimeType: string;
  base64: string;
  createdAt: number;
  updatedAt: number;
  order: number;
}

const imagesAdapter = createEntityAdapter<LibraryImage>();

const initialState = imagesAdapter.getInitialState();

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImage: imagesAdapter.addOne,
    addImages: imagesAdapter.addMany,
    removeImage: imagesAdapter.removeOne,
    updateImage: (
      state,
      action: PayloadAction<{
        id: string;
        changes: Partial<LibraryImage>;
      }>
    ) => {
      imagesAdapter.updateOne(state, action.payload);
    },
  },
});

export const { addImage, addImages, removeImage, updateImage } = imagesSlice.actions;

export default imagesSlice.reducer;
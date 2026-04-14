import { createSlice, createEntityAdapter, type PayloadAction } from "@reduxjs/toolkit";

export interface CustomBlock {
  id: string;
  name: string;
  content: string;
  shortcut?: string;
}

const blocksAdapter = createEntityAdapter<CustomBlock>();

const initialState = blocksAdapter.getInitialState();

export const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    addBlock: blocksAdapter.addOne,
    removeBlock: blocksAdapter.removeOne,
    updateBlock: (state, action: PayloadAction<{ id: string; changes: Partial<CustomBlock> }>) => {
      blocksAdapter.updateOne(state, action.payload);
    },
  },
});

export const { addBlock, removeBlock, updateBlock } = blocksSlice.actions;

export default blocksSlice.reducer;

import { createSlice, createEntityAdapter, type PayloadAction } from "@reduxjs/toolkit";
import type { Block } from "../../types/Explorer";

const blocksAdapter = createEntityAdapter<Block>();

const initialState = blocksAdapter.getInitialState();

export const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    addBlock: (state, action: PayloadAction<Block>) => {
      blocksAdapter.addOne(state, action.payload);
    },
    removeBlock: (state, action: PayloadAction<string>) => {
      blocksAdapter.removeOne(state, action.payload);
    },
    updateBlock: (state, action: PayloadAction<{ id: string; name: string; content: string }>) => {
      blocksAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { name: action.payload.name, content: action.payload.content },
      });
    },
  },
});

export const { addBlock, removeBlock, updateBlock } = blocksSlice.actions;

export default blocksSlice.reducer;

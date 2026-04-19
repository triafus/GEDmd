import { createSlice, createEntityAdapter, type PayloadAction } from "@reduxjs/toolkit";
import type { Folder } from "../../types/Explorer";

const foldersAdapter = createEntityAdapter<Folder>();

const initialState = foldersAdapter.getInitialState();

export const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolder: (state, action: PayloadAction<Folder>) => {
      foldersAdapter.addOne(state, action.payload);
    },
    removeFolder: (state, action: PayloadAction<string>) => {
      foldersAdapter.removeOne(state, action.payload);
    },
    renameFolder: (state, action: PayloadAction<{ id: string; name: string }>) => {
      foldersAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { name: action.payload.name },
      });
    },
    moveFolder: (
      state,
      action: PayloadAction<{ id: string; newParentId: string | null }>
    ) => {
      foldersAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { parentId: action.payload.newParentId },
      });
    },
  },
});

export const { addFolder, removeFolder, renameFolder, moveFolder } = foldersSlice.actions;


export default foldersSlice.reducer;

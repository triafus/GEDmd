import { createSlice, createEntityAdapter, type PayloadAction } from "@reduxjs/toolkit";
import type { File } from "../../types/Explorer";

const filesAdapter = createEntityAdapter<File>();

const initialState = {
  ...filesAdapter.getInitialState(),
  selectedFileId: null as string | null,
};

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<File>) => {
      filesAdapter.addOne(state, action.payload);
    },
    removeFile: (state, action: PayloadAction<string>) => {
      filesAdapter.removeOne(state, action.payload);
      if (state.selectedFileId === action.payload) {
        state.selectedFileId = null;
      }
    },
    updateFileContent: (state, action: PayloadAction<{ id: string; content: string }>) => {
      filesAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { content: action.payload.content, updatedAt: Date.now() },
      });
    },
    renameFile: (state, action: PayloadAction<{ id: string; name: string }>) => {
      filesAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { name: action.payload.name },
      });
    },
    moveFile: (state, action: PayloadAction<{ id: string; newParentId: string | null }>) => {
      filesAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { parentId: action.payload.newParentId },
      });
    },
    selectFile: (state, action: PayloadAction<string | null>) => {
      state.selectedFileId = action.payload;
    },
  },
});

export const {
  addFile,
  removeFile,
  updateFileContent,
  renameFile,
  moveFile,
  selectFile,
} = filesSlice.actions;

export default filesSlice.reducer;

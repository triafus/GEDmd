import { createSlice, createEntityAdapter, type PayloadAction } from "@reduxjs/toolkit";

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
}

export interface File {
  id: string;
  name: string;
  parentId: string | null;
  content: string;
  updatedAt: number;
}

const foldersAdapter = createEntityAdapter<Folder>();
const filesAdapter = createEntityAdapter<File>();

const initialState = {
  folders: foldersAdapter.getInitialState(),
  files: filesAdapter.getInitialState(),
  selectedFileId: null as string | null,
};

export const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    addFolder: (state, action: PayloadAction<Folder>) => {
      foldersAdapter.addOne(state.folders, action.payload);
    },
    removeFolder: (state, action: PayloadAction<string>) => {
      foldersAdapter.removeOne(state.folders, action.payload);
      // Recursively remove children (simplified for now, ideally handled via selector cleanup or recursive action)
    },
    renameFolder: (state, action: PayloadAction<{ id: string; name: string }>) => {
      foldersAdapter.updateOne(state.folders, {
        id: action.payload.id,
        changes: { name: action.payload.name },
      });
    },
    addFile: (state, action: PayloadAction<File>) => {
      filesAdapter.addOne(state.files, action.payload);
    },
    removeFile: (state, action: PayloadAction<string>) => {
      filesAdapter.removeOne(state.files, action.payload);
      if (state.selectedFileId === action.payload) {
        state.selectedFileId = null;
      }
    },
    updateFileContent: (state, action: PayloadAction<{ id: string; content: string }>) => {
      filesAdapter.updateOne(state.files, {
        id: action.payload.id,
        changes: { content: action.payload.content, updatedAt: Date.now() },
      });
    },
    renameFile: (state, action: PayloadAction<{ id: string; name: string }>) => {
      filesAdapter.updateOne(state.files, {
        id: action.payload.id,
        changes: { name: action.payload.name },
      });
    },
    moveFile: (state, action: PayloadAction<{ id: string; newParentId: string | null }>) => {
      filesAdapter.updateOne(state.files, {
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
  addFolder,
  removeFolder,
  renameFolder,
  addFile,
  removeFile,
  updateFileContent,
  renameFile,
  moveFile,
  selectFile,
} = documentsSlice.actions;

export default documentsSlice.reducer;

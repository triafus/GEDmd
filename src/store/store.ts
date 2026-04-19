import { configureStore, combineReducers } from "@reduxjs/toolkit";
import filesReducer from "./files/filesSlice";
import foldersReducer from "./folders/foldersSlice";
import blocksReducer from "./blocks/blocksSlice";
import { loadState, saveState } from "./persistence";
import imagesReducer from "./images/imagesSlice";

const rootReducer = combineReducers({
  folders: foldersReducer,
  files: filesReducer,
  blocks: blocksReducer,
  images: imagesReducer
});

const preloadedState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  saveState({
    folders: store.getState().folders,
    files: store.getState().files,
    blocks: store.getState().blocks,
    images: store.getState().images,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


import { configureStore, combineReducers } from "@reduxjs/toolkit";
import documentsReducer from "./documents/documentsSlice";
import blocksReducer from "./blocks/blocksSlice";
import { loadState, saveState } from "./persistence";

const rootReducer = combineReducers({
  documents: documentsReducer,
  blocks: blocksReducer,
});

const preloadedState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  saveState({
    documents: store.getState().documents,
    blocks: store.getState().blocks,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

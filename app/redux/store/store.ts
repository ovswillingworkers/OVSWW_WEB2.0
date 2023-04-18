import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer/rootReducer";
import { createWrapper } from "next-redux-wrapper";
import { useDispatch } from "react-redux";
import rootApplyReducer from "../reducer/rootApplyReducer";

const store = configureStore({
  reducer: rootReducer,
});

const applystore = configureStore({
  reducer: rootApplyReducer,
})

export const wrapper = createWrapper(() => store);
export const appStore = store;
export type AppState = ReturnType<typeof store.getState>;

export const wrapper1 = createWrapper(() => applystore);
export const applyStore = applystore;
export type ApplyState = ReturnType<typeof applyStore.getState>;
export const useAppDispatch = () => useDispatch();

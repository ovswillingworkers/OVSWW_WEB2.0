import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer/rootReducer";
import { createWrapper } from "next-redux-wrapper";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: rootReducer,
});

export const wrapper = createWrapper(() => store);
export const appStore = store;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch();

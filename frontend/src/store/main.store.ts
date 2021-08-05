import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const main = createSlice({
  name: "main",
  initialState: {
    login: false,
    token: "",
    userName: "",
    candidates: [],
    candidate: { id: "", name: "", email: "", address: "", phone: "" },
  },
  reducers: {
    setLogin(state, action: PayloadAction<any>) {
      if (action.payload === false) {
        state.userName = "";
      }
      state.login = action.payload;
    },
    setUser(state, action: PayloadAction<any>) {
      state.userName = action.payload;
    },
    setToken(state, action: PayloadAction<any>) {
      state.token = action.payload;
    },
    setCandidates(state, action: PayloadAction<any>) {
      state.candidates = action.payload;
    },

    setCandidate(state, action: PayloadAction<any>) {
      state.candidate = action.payload;
    },
  },
});

export const { setLogin, setUser, setToken, setCandidates, setCandidate } =
  main.actions;

export default main.reducer;

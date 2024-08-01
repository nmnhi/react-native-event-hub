import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  id: string;
  email: string;
  accessToken: string;
  photoUrl: string;
}

const initialStates: AuthState = {
  id: '',
  email: '',
  accessToken: '',
  photoUrl: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {authData: initialStates},
  reducers: {
    addAuth: (state, action) => {
      state.authData = action.payload;
    },
    removeAuth: (state, action) => {
      state.authData = initialStates;
    }
  }
});

export const authReducer = authSlice.reducer;
export const {addAuth, removeAuth} = authSlice.actions;

export const authSelector = (state: any) => state.authReducer.authData;

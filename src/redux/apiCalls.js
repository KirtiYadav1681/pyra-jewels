import axios from "axios";
import { loginStart, loginFailure, loginSuccess,logout,registerStart,registerSuccess } from "./userRedux"

const BASE_URL = "http://localhost:8000/api";
const publicRequest = axios.create({
  baseUrl: BASE_URL
})

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("http://localhost:8000/api/user/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try{
    const res = await publicRequest.post("http://localhost:8000/api/user/register" , user);
    dispatch(registerSuccess(res.data));
  }catch (err) {
    dispatch(loginFailure());
  }
}

export const Logout = (dispatch) =>{
  dispatch(logout());
}
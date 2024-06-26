import {  adddataerror, adddatarequest, adddatasucces, updatedatarequest, updatedatasucces } from "./action";
import {
  getdataerror,
  getdatareq,
  getdatasucces,
  updatedataerror
} from "./action";

const initialState = {
  tasks: [],
  loading: false,
  error: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case adddatarequest:
    case getdatareq:
    case updatedatarequest:
      return { ...state, loading: true };
    case getdatasucces:
      return { ...state, tasks: action.payload, loading: false };
    case updatedatasucces:
      const updatedTasks = state.tasks.map((task) =>
        task._id === action.payload.id ? action.payload : task
      );
      return { ...state, tasks: updatedTasks, loading: false };
    case adddatasucces:  return{...state,tasks:[...state.tasks,action.payload],loading:false,error:""}
    case getdataerror:
    case updatedataerror:
    case adddataerror:
   
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


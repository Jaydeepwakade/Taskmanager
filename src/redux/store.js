import { applyMiddleware, combineReducers, createStore } from "redux";
import { reducer } from "./reducer";
import{
    thunk
}from "redux-thunk"; 
import { logger } from "redux-logger";



const rootreducer = combineReducers(
    {
        tasks: reducer
    }
)

export const store = createStore(
    rootreducer,
    applyMiddleware(thunk)
)
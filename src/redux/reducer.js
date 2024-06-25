import { getdataerror, getdatareq, getdatasucces } from "./action";


const intialstate ={
    tasks:[],
    loading:false,
    error:""
    
}

  export const reducer = (state=intialstate,action)=>{

    switch (action.type) {
        case getdatareq: return {...state, loading:true}
        case getdatasucces: return {...state, tasks:action.payload,loading:false}
        case getdataerror:return {...state, loading:false, error:action.payload}
            
        default: return state
           
    }
 }
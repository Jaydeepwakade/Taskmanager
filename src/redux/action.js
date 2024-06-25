
  export const url = "http://localhost:3000/tasks"
  export const getdatarequest = "GETDATAREQUEST"
  export const getdatasucces = "GETDATA"
  export const getdataerror = "GETERROR"


 export const getdatareq = (payload1) => {
    return { type: getdatarequest, payload: payload1 }
}
 export const getdatasuccesres = (payload2) => {
    return { type: getdatasucces, payload: payload2 }
}
 export const geterordata = (payload3) => {
    return { type: getdataerror, payload: payload3 }
}



export const fetchdata = (id) => {
    return (dispatch) => {
      dispatch(getdatareq());
      const data=localStorage.getItem('id')
      console.log("id",data)
      fetch(`${url}/fetchTask/${data}`,{method:'GET',headers:{"Content-Type":"application/json"}})
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
            console.log("Data",data)
            dispatch(getdatasuccesres(data.data))
        })
        .catch((error) => dispatch(geterordata(error.message)));
    };
  };
fetchdata()
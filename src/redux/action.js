
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



export const fetchdata = () => {
    return (dispatch) => {
      dispatch(getdatareq());
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
            dispatch(getdatasuccesres(data)),console.log(data)
        })
        .catch((error) => dispatch(geterordata(error.message)));
    };
  };
fetchdata()
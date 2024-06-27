export const url ="http://172.20.10.5:3200";
export const getdatarequest = "GETDATAREQUEST";
export const getdatasucces = "GETDATA";
export const getdataerror = "GETERROR";

export const updatedatarequest = "UPDATEDATAREQUEST";
export const updatedatasucces = "UPDATEDATA";
export const updatedataerror = "UPDATERROR";

export const adddatarequest = "addatarequest";
export const adddatasucces = "adddatasucces";
export const adddataerror = "adddataerror";


export const getdatareq = (payload1) => {
  return { type: getdatarequest, payload: payload1 };
};

export const getdatasuccesres = (payload2) => {
  return { type: getdatasucces, payload: payload2 };
};

export const geterordata = (payload3) => {
  return { type: getdataerror, payload: payload3 };
};

export const updateTaskRequest = () => {
  return { type: updatedatarequest };
};

export const updateTaskSuccess = (updatedTask) => {
  return { type: updatedatasucces, payload: updatedTask };
};

export const updateTaskError = (error) => {
  return { type: updatedataerror, payload: error };
};

export const addTaskRequest = (newTaskData) => ({
  type: adddatarequest,
  payload: newTaskData,
});

export const addTaskSuccess = (newTask) => ({
  type: adddatasucces,
  payload: newTask,
});

export const addTaskError = (error) => ({
  type: adddataerror,
  payload: error,
});


export const fetchdata = (id) => {
  return (dispatch) => {
    dispatch(getdatareq());
    const data = localStorage.getItem('id');
    console.log("id", data);
    fetch(`${url}/fetchTask/${data}`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data", data);
        dispatch(getdatasuccesres(data.data));
      })
      .catch((error) => dispatch(geterordata(error.message)));
  };
};

export const updateTaskStatus = (taskId,newStatus) => {
  return (dispatch) => {
    dispatch(updateTaskRequest());
    console.log("Status", newStatus, taskId);

    fetch(`${url}/updateTask/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("New Data:", data.data);
        console.log("hi jaydeep")
        dispatch(updateTaskSuccess(data.data));
        fetchdata()
      })
      .catch((error) => dispatch(updateTaskError(error.message)));
  };
};

export const addTask = (payload, id) => {
  return async (dispatch) => {
    dispatch(addTaskRequest());
    try {
      const response = await fetch(`${url}/saveTask/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newTask = await response.json();
      dispatch(addTaskSuccess(newTask));
    } catch (error) {
      dispatch(addTaskError(error.message));
    }
  };
};

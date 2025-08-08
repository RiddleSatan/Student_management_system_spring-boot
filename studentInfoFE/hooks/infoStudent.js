import { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8085/students/";

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 const sendRequest = async ({ url, method = "GET", body = null }) => {
  setLoading(true);
  setError(null);

  try {
    const response = await axios({
      url: `${BASE_URL}${url}`,
      method,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    setData(response.data);
    return response.data; 
  }catch (err) {
  if (err.response && err.response.status === 400) {
    console.log("Add student error response:", err.response.data);
    setError(err.response.data); 
  } else {
    setError({ general: "Something went wrong" }); 
  }
  return null;
}
 finally {
    setLoading(false);
  }
};


  return { data, loading, error, sendRequest };
};

export default useApi;

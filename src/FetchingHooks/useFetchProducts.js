import { useEffect, useState } from "react";
import { API } from "../Services/api";

export default function useFetchProducts() {
  const [data, setData] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        setisLoading(true);
        const response = await API.get("/products/");
        // console.log('response',response)
        setisLoading(false);
        setData(response?.data);
      } catch (error) {
        console.log(error);
        setisLoading(false);
       setError(error.message)
      }
    };
    fetch();
  }, []);
  return [data, isLoading, error];
}

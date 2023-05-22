import React, { useEffect, useState } from "react";
import { DUMMy_API } from "../Services/api";
export default function useFetchProducts() {
  const [data, setData] = useState();
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setisLoading(true);
        const response = await DUMMy_API.get("products/");
        setisLoading(false);
        setData(response?.data?.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  return [data, isLoading];
}

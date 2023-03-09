import React, { useEffect, useState } from "react";
import { API } from "../Services/api";
export default function useCart() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response = await API.get("/Cart");
        setLoading(false);
        // console.log(response?.data);
        setData(response?.data);
      } catch (error) {}
    };
    fetch();
  }, []);
  const handleDelete = async (id) => {
    await API.delete("/Cart/" + id);

    const newCart = data?.filter((cart) => cart.id !== id);
    setData(newCart);
  };
  return [data, loading, handleDelete];
}

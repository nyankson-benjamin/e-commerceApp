import React, { useEffect, useState } from "react";
import { API } from "../Services/api";
import { useNavigate } from "react-router-dom";
export default function useCart() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
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

  const handleBuy = async (id, price) => {
    const data = { price };
    const response = await API.post("/Sales", { ...data });

    
    await API.delete("/Cart/" + id);
    const newCart = data?.filter((cart) => cart.id !== id);
    setData(newCart);

    // setTimeout(() => {
    if (response) {
      alert("woer");
    }

    navigate("/cart");
    // }, 3000);
  };
  return [data, loading, handleDelete, handleBuy];
}

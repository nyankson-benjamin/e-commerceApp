import React, { useEffect, useState } from "react";
import { API } from "../Services/api";
import { useNavigate } from "react-router-dom";
export default function useCart() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState({
    open: false,
    message: "",
    severity: "",
  });
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

    setAlerts({
      open: true,
      message: "Item deleted successfully",
      severity: "info",
    });
  };

  const handleBuy = async (id, price, item, image, quantity) => {
    const data = { price, item, image, quantity };

    try {
      await API.post("/Sales", { ...data });
      setAlerts({
        open: true,
        message: "You have successfully buy the product",
        severity: "info",
      });

      setTimeout(() => {
        navigate("/cart");
      }, 5000);

      await API.delete("/Cart/" + id);
      const newCart = data?.filter((cart) => cart.id !== id);
      setData(newCart);
    } catch (error) {}
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    // setOpenAlert(false);
    setAlerts({
      open: false,
      message: "",
      severity: "",
    });
  };
  return [data, loading, handleDelete, handleBuy, alerts, handleCloseAlert];
}

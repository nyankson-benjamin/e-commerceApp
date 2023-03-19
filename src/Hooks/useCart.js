import React, { useEffect, useState } from "react";
import { API } from "../Services/api";
import { useNavigate } from "react-router-dom";
export default function useCart() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [salesData, setSalesData] = useState();
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

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await API.get("/Sales");
        setSalesData(response?.data);
      } catch (error) {}
    };
    fetch();
  }, []);

  const handleBuy = async (id, price, item, image, quantity) => {
    const buyDate = new Date();
    const year = buyDate.getFullYear();
    const month = buyDate.getMonth() + 1;
    const day = buyDate.getDate();
    const date = `${day}-${month}-${year}`;

    const sales = { price, item, image, quantity, date };

    const salesItem = salesData?.find((items) => items.item === item);

    if (salesItem) {
      const price1 = salesItem.price + price;
      const item1 = salesItem.item;
      const image1 = salesItem.image;
      const quantity = salesItem.quantity;
      const existData = {
        price: price1,
        item: item1,
        image: image1,
        quantity: quantity,
        date: date,
      };
      await API.put(`/Sales/${salesItem.id}`, { ...existData });
      await API.delete("/Cart/" + id);
      const newCart = data?.filter((cart) => cart.id !== id);
      setData(newCart);
    } else {
      try {
        await API.post("/Sales", { ...sales });
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
    }
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

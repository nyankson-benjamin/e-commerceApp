import React, { useEffect, useState } from "react";
import useCart from "../../Hooks/useCart";
import AppsBar from "../../TopBar/AppBar";
import CartTable from "./CartTable";
import { Alert } from "@mui/material";
import Alerts from "../Alert/Alerts";
export default function Cart() {
  const [data, loading, handleDelete, handleBuy, alerts, handleCloseAlert] =
    useCart();

  const [filt, setFilter] = useState("");
  const [cart, setCart] = useState(data);
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    setCart(data);

    if (filt) {
      setCart(
        data?.filter((filter) =>
          filter.title.toLowerCase().includes(filt.toLowerCase())
        )
      );
    }
  }, [data, filt]);
  console.log("carting");
  return (
    <div>
      <Alerts alert={alerts} handleCloseAlert={handleCloseAlert} />
      <AppsBar search={filt} handleChange={handleChange} />
      <CartTable cart={cart} handleDelete={handleDelete} />
    </div>
  );
}

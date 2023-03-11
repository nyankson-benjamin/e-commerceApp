import React, { useEffect } from "react";
import useCart from "../../Hooks/useCart";
import { useParams } from "react-router-dom";
import AppsBar from "../../TopBar/AppBar";
import { Button } from "@mui/material";
export default function Buy() {
  const { id } = useParams();
  const [data, loading, handleDelete, handleBuy] = useCart();

  const cartitem = data?.find((cart) => cart.id === Number(id));
  useEffect(() => {
    if (data) {
      // console.log(data);
    }
  });
  return (
    <div>
      <AppsBar />
      {cartitem && (
        <div>
          <p>{cartitem.item}</p>
          <p>{cartitem.totalPrice}</p>
          <Button onClick={() => handleBuy(cartitem.id, cartitem.totalPrice)}>
            Buy
          </Button>
        </div>
      )}
    </div>
  );
}

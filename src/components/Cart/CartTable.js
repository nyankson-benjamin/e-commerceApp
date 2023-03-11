import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableCell,
  Button,
  ButtonGroup,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { API } from "../../Services/api";
export default function CartTable({ data, cart, handleDelete }) {
  const [filt, setFilter] = useState("");
  // const [cart, setCart] = useState(data);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setCart(data);

  //   if (filt) {
  //     setCart(
  //       data?.filter((filter) =>
  //         filter.title.toLowerCase().includes(filt.toLowerCase())
  //       )
  //     );
  //   }
  // });

  // useEffect(() => {
  //   console.log(data);
  // });

  // const handleDelete = async () => {};

  const totalAmount = [];

  cart?.forEach((element) => {
    totalAmount.push(element.totalPrice);
  });
  // console.log(totalAmount);
  return (
    <div>
      {/* <TextField
        placeholder="search"
        value={filt}
        onChange={(e) => setFilter(e.target.value)}
      /> */}
      <br />
      <TableContainer
        component={Paper}
        sx={{ textAlign: "center", margin: "10px" }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{ fontSize: "3px", fontWeight: "bold", textAlign: "center" }}
            >
              <TableCell>ID</TableCell>
              <TableCell></TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price ($)</TableCell>
              <TableCell>Total Price ($)</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          {cart?.length >= 1 ? (
            <TableBody>
              {cart?.map((cart) => (
                <TableRow key={cart.id}>
                  <TableCell>{cart.id}</TableCell>
                  <TableCell>
                    <img src={cart.img_link} style={{ width: "30px" }} />
                  </TableCell>
                  <TableCell>{cart.item}</TableCell>
                  <TableCell>{cart.quantity}</TableCell>
                  <TableCell>{cart.unitPrice}</TableCell>
                  <TableCell>{cart.totalPrice}</TableCell>

                  <TableCell>
                    <ButtonGroup variant="contained" fullWidth>
                      <Button
                        variant="contained"
                        onClick={() => navigate(`/cartItem/buy/${cart.id}`)}
                      >
                        BUY
                      </Button>
                      <IconButton onClick={() => handleDelete(cart.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ButtonGroup>
                  </TableCell>
                  <TableRow></TableRow>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell>No result found</TableCell>
              </TableRow>
            </TableBody>
          )}
          {/* <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <b>Total Amount</b>
              </TableCell>
              {totalAmount.length >= 1 && (
                <TableCell>
                  {totalAmount
                    .reduce((total, currentValue) => total + currentValue)
                    .toFixed(2)}
                </TableCell>
              )}
            </TableRow>
          </TableBody> */}
        </Table>
      </TableContainer>
    </div>
  );
}

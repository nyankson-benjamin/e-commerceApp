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
  return (
    <div>
      {/* <TextField
        placeholder="search"
        value={filt}
        onChange={(e) => setFilter(e.target.value)}
      /> */}
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ fontSize: "3px", fontWeight: "bold" }}>
              <TableCell>ID</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price ($)</TableCell>
              <TableCell>Total Price ($)</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {cart?.length >= 1 ? (
            <TableBody>
              {cart?.map((cart) => (
                <TableRow key={cart.id}>
                  <TableCell>{cart.id}</TableCell>
                  <TableCell>{cart.item}</TableCell>
                  <TableCell>{cart.quantity}</TableCell>
                  <TableCell>{cart.unitPrice}</TableCell>
                  <TableCell>{cart.totalPrice}</TableCell>

                  <TableCell>
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        onClick={() => navigate(`/cartItem/buy/${cart.item}`)}
                      >
                        BUY
                      </Button>
                      <IconButton onClick={handleDelete}>
                        <DeleteIcon />
                      </IconButton>
                    </ButtonGroup>
                  </TableCell>
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
        </Table>
      </TableContainer>
    </div>
  );
}

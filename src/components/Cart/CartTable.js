import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Tablecell,
  Paper,
  TableCell,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Send, FilterList } from "@mui/icons-material";
import { useState, useEffect } from "react";
// import { user } from "../Constants/User/User";

export default function CartTable({ data }) {
  const [filt, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("sort");
  const [cart, setCart] = useState();
  const navigate = useNavigate();
  const me = data?.filter((cart) =>
    cart.item.toLowerCase().includes("item".toLowerCase())
  );
  console.log("me", me);
  useEffect(() => {
    setCart(data);

    if (filt) {
      if (filt === "gender") {
        setCart(data);
      } else {
        setCart(
          data?.filter(
            (cart) => cart.item.toLowerCase().includes(filt.toLowerCase())
            //   ||
            //   user.email.toLowerCase().includes(filt.toLowerCase()) ||
            //   user.fname.toLowerCase().includes(filt.toLowerCase()) ||
            //   user.lname.toLowerCase().includes(filt.toLowerCase()) ||
            //   user.contact.includes(filt)
          )
        );
      }
    }

    // switch (sortBy) {
    // case "sort":
    //   setData(user);
    //   break;
    // case "asc":
    //   setData(data.sort((a, b) => a.id - b.id));
    //   break;
    // case "dsc":
    //   setData(data.sort((a, b) => b.id - a.id));
    //   break;
    // }
  });

  const handleFilter = () => {
    // if (user) {
    //   if (user.gender === "male" && user.gender === "female") {
    //     setData(user.filter((user) => user.gender === "male"));
    //   }
    // }
  };

  useEffect(() => {
    console.log(data);
  });
  return (
    <div>
      <TextField
        placeholder="search"
        value={filt}
        onChange={(e) => setFilter(e.target.value)}
      />
      {/* <Select onChange={(e) => setFilter(e.target.value)} value={filt}>
        <MenuItem value="gender">Filter By</MenuItem>
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
      </Select>
      <Select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
        <MenuItem value="sort">Sort By</MenuItem>
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="dsc">Descending</MenuItem>
      </Select> */}
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
                  <TableCell>{cart.unitPrice.toFixed(2)}</TableCell>
                  <TableCell>{cart.totalPrice}</TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/cartItem/buy/${cart.item}`)}
                    >
                      BUY
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell>0 matching results</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}

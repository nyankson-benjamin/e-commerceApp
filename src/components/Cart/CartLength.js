import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useCart from "../../Hooks/useCart";
import { useNavigate } from "react-router-dom";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    ml: 20,
  },
}));

export default function CartLength({ user }) {
  const navigate = useNavigate();
  const [data] = useCart();
  return (
    <IconButton
      aria-label="cart"
      onClick={() => navigate("/cart")}
      sx={{ marginLeft: "30px" }}
      title={`${data?.length} items`}
    >
      <StyledBadge badgeContent={data?.length} color="secondary">
        <ShoppingCartIcon sx={{ color: "white" }} />
      </StyledBadge>
    </IconButton>
  );
}

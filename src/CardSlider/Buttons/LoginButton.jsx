import React from "react";
import { Button } from "@mui/material";
export default function LoginButton({ disable, handleSubmit }) {
  return (
    <div>
      <Button
        variant="contained"
        fullWidth
        disabled={disable}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </div>
  );
}

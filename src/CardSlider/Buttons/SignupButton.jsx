import React from "react";
import { Button } from "@mui/material";
export default function SignupButton({ handleSubmit, disable }) {
  return (
    <Button onClick={handleSubmit} variant="contained" disabled={disable}>
      signup
    </Button>
  );
}

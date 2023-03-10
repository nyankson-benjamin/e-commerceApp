import React from "react";
import { Button } from "@mui/material";
export default function VerifyEmailButton({ handleSubmit, disable }) {
  return (
    <Button
      onClick={handleSubmit}
      variant="contained"
      disabled={disable}
      fullWidth
    >
      Verify Email
    </Button>
  );
}

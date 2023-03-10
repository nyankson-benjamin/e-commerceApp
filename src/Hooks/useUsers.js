import React, { useEffect, useState } from "react";
import { API } from "../Services/api";
export default function useUsers() {
  const [users, setUsers] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await API.get("/Users");
        // console.log(response);
        setUsers(response?.data);
      } catch (error) {}
    };
    fetch();
  });
  return [users];
}

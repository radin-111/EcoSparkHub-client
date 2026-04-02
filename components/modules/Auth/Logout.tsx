"use client";

import { logout } from "@/Actions/auth.action";
import { Button } from "@/components/ui/button";
import { ApiResponse } from "@/types&enums&interfaces/api.types";

import Swal from "sweetalert2";

export default function Logout() {
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const response = (await logout()) as ApiResponse<string>;

      if (response.success) {
        Swal.fire("Logged out!", "You have been logged out.", "success");
        window.location.reload();
      }
    }
  };

  return (
    <>
      <Button onClick={handleLogout} className="p-5" variant={"destructive"}>
        Logout
      </Button>
    </>
  );
}

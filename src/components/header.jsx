import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Typography, Box, Button } from "@mui/material";
import Logo from "../assets/images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice"; // Replace with your actual slice/action
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state) => state.auth.userInfo?.access_token);

  const [authStatus, setAuthStatus] = useState(false);
  useEffect(() => {
    if (token) {
      setAuthStatus(true);
    } else {
      setAuthStatus(false);
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/"); // Redirect to home page using Next.js router
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      className="px-2 sm:px-4 md:px-10"
    >
      <Box display="flex" alignItems="center">
        <Image
          src={Logo}
          alt="Logo"
          height={"auto"}
          width={200}
          className="w-[125px] sm:w-[160px] md:w-[200px] h-auto"
          priority={true}
        />
      </Box>

      {!authStatus ? (
        <Link href={"/"}>
          <Button
            variant="h6"
            color="inherit"
            className="font-Kodchasan text-[20px] font-semibold cursor-pointer"
          >
            home
          </Button>
        </Link>
      ) : (
        <Link href={"/"}>
          <Button
            variant="h6"
            color="inherit"
            className="font-Kodchasan text-[20px] font-semibold cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default Header;

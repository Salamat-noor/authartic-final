"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function CustomButton({ title, whereFrom, navigateTo }) {
  const [redirectionURL, setRedirectionURL] = useState('');
  const { userInfo } = useSelector(state => state?.auth)

  useEffect(() => {
    const dynamicURL = userInfo?.user?.subscriptionStatus?.subscriptionPlan?.name;
    setRedirectionURL(dynamicURL)
  }, [])
  return (
    <Link href={title === "Register" ? "/registration" : redirectionURL === "Pro" ? "/pro-plan-vendor" : redirectionURL === "Standard" ? "/standard-plan" : ''}>
      <Button
        variant="contained"
        className={`w-300 cursor-pointer font-kodchasan text-md md:text-lg xl:text-xl  rounded-[7px] text-white font-normal  py-1 px-5 md:px-9 bg-[#22477F]`}
        sx={{
          textTransform: "none",
          "&:hover": {
            backgroundColor: `bg-[#22477F]`,
          },
        }}
      >
        {title}
      </Button>
    </Link>
  );
}
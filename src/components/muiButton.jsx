"use client";
import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";

export default function CustomButton({ title, fromWhere }) {
  return (
    <Link href={title === "Register" ? "/registration" : ""}>
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

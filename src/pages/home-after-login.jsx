import React, { useEffect, useState } from "react";
import CustomButton from "@/components/muiButton";
import { Box } from "@mui/material";
import SampleCard from "@/components/certificateCards";
import Header from "@/components/header";
import { Button } from "@mui/material";
import Footer from "@/components/footer";
import { useGetMyCertificateInfoQuery } from "@/slices/certificateInfoApiSlice";

const index = () => {
  const {
    data: certificateData,
    error,
    isError,
    isLoading,
  } = useGetMyCertificateInfoQuery();

  return (
    <>
      <Box className="min-h-screen flex flex-col justify-between">
        <Box className={`w-full`}>
          <Header />
          <Box className="w-full max-w-[962px]  relative mx-auto mt-1">
            <Box className="flex flex-col items-center w-full">
              <Box className="flex flex-col items-end gap-1">
                <CustomButton title={"New order"} />
                <Button className={`bg-white text-black hover:bg-white`}>
                  drafts
                </Button>
              </Box>
            </Box>
            <div className="w-full my-8 flex flex-col justify-start items-center gap-[70px]">
              {isLoading && (
                <h1 className="text-green-700 font-bold text-xl">Loading...</h1>
              )}
              {certificateData?.data?.map((data, index) => (
                <SampleCard data={data} key={index} />
              ))}
              {isError && (
                <h1 className="text-red-700 font-bold text-xl">
                  {error?.error}
                </h1>
              )}
              {certificateData?.total === 0 && (
                <h1 className="text-red-700 font-bold text-xl">
                  No Certificates Available
                </h1>
              )}
            </div>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};
export default index;

import React from "react";
import RegistrationPlans from "@/assets/jsonData/registrationAsset";
import { Box } from "@mui/material";
import PackageCard from "@/components/packageCards";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useGetsubscrptionPlanQuery } from "@/slices/packageDataApiSlice";

const index = () => {
  const {
    data: subcriptionData,
    error,
    isError,
    isLoading,
  } = useGetsubscrptionPlanQuery();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <Box className="min-h-screen">
        <Box className=" max-w-[1440px] mx-auto bg-white relative">
          <Box className="w-full min-h-[100vh] flex items-center  justify-center pt-[10%] md:pt-0  pb-[150px]">
            {isLoading && (
              <h1 className="font-KoHo font-bold text-blue-600 text-[14px] sm:text-[18px] md:text-[24px]">
                Loading! Please wait...
              </h1>
            )}
            {subcriptionData && (
              <Box className="grid items-end justify-items-center gap-7 md:gap-1 lg:gap-7 grid-cols-1 md:grid-cols-3 px-2">
                {subcriptionData.map((data) => (
                  <PackageCard data={data} key={data.id} />
                ))}
              </Box>
            )}
            {isError && (
              <h1 className="font-KoHo font-bold text-red-600 text-[14px] sm:text-[18px] md:text-[24px]">
                {error?.error}
              </h1>
            )}
          </Box>
        </Box>
      </Box>

      <Footer />
    </div>
  );
};

export default index;

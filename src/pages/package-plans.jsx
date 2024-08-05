import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import PackageCard from "@/components/packageCards";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useGetsubscrptionPlanQuery } from "@/slices/packageDataApiSlice";

const index = () => {
  const [validationStatus, setValidationStatus] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo?.user?.validation_code) {
      setValidationStatus(true);
    } else {
      setValidationStatus(false); // Reset the message if validation code is present
    }
  }, [userInfo]);

  console.log("userinfooo", userInfo);
  const {
    data: subcriptionData,
    error,
    isError,
    isLoading,
  } = useGetsubscrptionPlanQuery();

  const validateObject = {
    color: "red",
    showAlert: true,
    disable: true,
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <Box className="min-h-screen">
        <Box className=" max-w-[1440px] mx-auto bg-white relative">
          {validationStatus ? (
            <h1 className="text-center my-12 text-[20px] font-KoHo font-[400]">
              You will not be charged until after we validate your account.{" "}
              <br /> You will receive an email notification
            </h1>
          ) : (
            ""
          )}

          <Box className="w-full min-h-[100vh] flex items-center  justify-center pt-[10%] md:pt-0  pb-[150px]">
            {isLoading && (
              <h1 className="font-KoHo font-bold text-blue-600 text-[14px] sm:text-[18px] md:text-[24px]">
                Loading! Please wait...
              </h1>
            )}
            {subcriptionData && (
              <Box className="grid items-end justify-items-center gap-7 md:gap-1 lg:gap-7 grid-cols-1 md:grid-cols-3 px-2">
                {subcriptionData.map((data) => (
                  <PackageCard
                    data={data}
                    key={data.id}
                    validationStatus={validationStatus}
                  />
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

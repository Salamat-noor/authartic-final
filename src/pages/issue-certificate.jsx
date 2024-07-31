import React, { useState } from "react";
import { Typography, Button, TextField, Box, Checkbox } from "@mui/material";
import Image from "next/image";
import image from "../assets/images/image.png";
import Header from "@/components/header";
import Footer from "@/components/footer";
function IssueMore() {
  const [issueState, setIssueState] = useState("issueMore");

  return (
    <>
      <Header />
      <Box className="min-h-screen">
        <Box className="flex items-center justify-center flex-col sm:flex-row gap-[1vw] ">
          <Box>
            <Image src={image} alt="sample" width={168} height={126} />
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography className="font-koho text-[#080808] font-light text-[20px]">
              Certificate Name
            </Typography>
            <Typography className="font-koho text-[#080808] font-light text-[20px]">
              Date Certificates were issued
            </Typography>
            <Typography className="font-koho text-[#080808] font-light text-[20px]">
              Number of certificates issued
            </Typography>
          </Box>

          <Box className="flex flex-col pl-[5vw] gap-5">
            <Button
              type="submit"
              variant="contained"
              className={`rounded-[7px] font-kodchasan  float-end py-0 ${
                issueState === "issueMore" ? "bg-[#C2C3CE]" : "bg-[#22477F]"
              }`}
              onClick={() => {
                setIssueState("issueMore");
              }}
            >
              Issue More
            </Button>
            <Button
              type="submit"
              variant="contained"
              className={`rounded-[7px] font-kodchasan  float-end py-0 ${
                issueState === "reissueExisting"
                  ? "bg-[#C2C3CE]"
                  : "bg-[#22477F]"
              }`}
              onClick={() => {
                setIssueState("reissueExisting");
              }}
            >
              Reissue existing
            </Button>
            <Button
              type="submit"
              variant="contained"
              className={`rounded-[7px] font-kodchasan  float-end py-0 ${
                issueState === "reportIssue" ? "bg-[#C2C3CE]" : "bg-[#22477F]"
              }`}
              onClick={() => {
                setIssueState("reportIssue");
              }}
            >
              Report issue
            </Button>
          </Box>
        </Box>
        {issueState === "issueMore" ? (
          <Box className="max-w-[602px] w-full mx-auto  bg-[#22477F] py-6 my-6 rounded-[30px]">
            <Box className="flex items-center justify-center flex-col mx-20 my-4">
              <Typography className="font-koho text-[#fff] font-light text-[20px]">
                You currently have #X certificates issued for <br />{" "}
                “Certificate Name”.
                <br />
                How many more would you like to issue?
              </Typography>

              <Box>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter text here"
                  className="my-6"
                  sx={{
                    backgroundColor: "#fff",
                    width: "225px",
                    color: "black",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#606060",
                        borderWidth: "2px",
                      },
                      "&:hover fieldset": {
                        borderColor: "#606060",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#606060",
                      },
                    },
                  }}
                />
              </Box>
              <Typography>
                The issues you are ordering right now will have all the same
                exact information as the previously ordered certificates for
                “Certificate Name”
              </Typography>

              <Box className="flex items-center">
                <Checkbox
                  sx={{
                    color: "#fff",
                    "&.Mui-checked": {
                      color: "green",
                    },
                  }}
                />
                <Typography variant="body1" sx={{ marginRight: 2 }}>
                  I aknowledge
                </Typography>
              </Box>

              <Button
                variant="contained"
                className="bg-[#27A213] rounded-[7px] font-kodchasan w-[189px]"
                sx={{ fontFamily: "Kodchasan, sans-serif" }}
              >
                Place Order
              </Button>
              <Button
                variant="contained"
                className="bg-[#A21313] rounded-[7px] font-kodchasan mt-5 w-[189px]"
                sx={{ fontFamily: "Kodchasan, sans-serif" }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : issueState === "reissueExisting" ? (
          <Box className="max-w-[602px] w-full mx-auto  bg-[#22477F] py-6 my-6 rounded-[30px]">
            <Box className="mx-10 my-4">
              <Typography className="font-koho text-[#fff] font-light text-[20px]">
                Certificate number to be reissued:
              </Typography>

              <Box>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter text here"
                  className="my-6"
                  sx={{
                    backgroundColor: "#fff",
                    maxWidth: "508px",
                    width: "100%",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#606060",
                        borderWidth: "2px",
                      },
                      "&:hover fieldset": {
                        borderColor: "#606060",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#606060",
                      },
                    },
                  }}
                />
              </Box>
              <Typography className="font-koho text-[#fff] font-light text-[20px]">
                Reason for request:
              </Typography>

              <Box>
                <TextField
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  name="description"
                  sx={{
                    backgroundColor: "#fff",
                    maxWidth: "508px",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                  className="mt-4 lg:mt-0 md:mt-0"
                />
              </Box>
            </Box>
            <Box className="flex justify-center items-center flex-col">
              <Button
                variant="contained"
                className="bg-[#27A213] rounded-[7px] font-kodchasan w-[189px]"
                sx={{ fontFamily: "Kodchasan, sans-serif" }}
              >
                Place Order
              </Button>
              <Button
                variant="contained"
                className="bg-[#A21313] rounded-[7px] font-kodchasan mt-5 w-[189px]"
                sx={{ fontFamily: "Kodchasan, sans-serif" }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Box className="max-w-[602px] w-full mx-auto  bg-[#22477F] py-6 my-6 rounded-[30px]">
            <Box className="mx-10 my-4">
              <Box>
                <TextField
                  multiline
                  rows={12}
                  variant="outlined"
                  fullWidth
                  name="description"
                  sx={{
                    backgroundColor: "#fff",
                    maxWidth: "508px",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                  className="mt-4 lg:mt-0 md:mt-0"
                />
              </Box>
            </Box>
            <Box className="flex justify-center items-center flex-col">
              <Button
                variant="contained"
                className="bg-[#27A213] rounded-[7px] font-kodchasan w-[189px]"
                sx={{ fontFamily: "Kodchasan, sans-serif" }}
              >
                Place Order
              </Button>
              <Button
                variant="contained"
                className="bg-[#A21313] rounded-[7px] font-kodchasan mt-5 w-[189px]"
                sx={{ fontFamily: "Kodchasan, sans-serif" }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <Footer />
    </>
  );
}

export default IssueMore;

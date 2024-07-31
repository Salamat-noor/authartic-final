import React, { useRef, useState } from "react";
import { usePostCertificateInfoMutation } from "@/slices/certificateInfoApiSlice";
import { useUploadAttachmentMutation } from "@/slices/uploadAttachmentApiSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  Typography,
  Button,
  Box,
  TextField,
  MenuItem,
  Radio,
  Checkbox,
} from "@mui/material";
import Image from "next/image";
import Icon from "../assets/images/elements.svg";
import Header from "@/components/header";
import Footer from "@/components/footer";

const initialData = {
  name: "",
  description: "",
  number_of_certificate: 1,
  font: "Arial",
  font_color: "#000000",
  bg_color: "#FFFFFF",
  saved_draft: false,
  product_sell: "",
  product_image_id: null,
};

function index() {
  const Router = useRouter();
  const [uploadAttachment] = useUploadAttachmentMutation();
  const [createCertificate] = usePostCertificateInfoMutation();
  const uploadFileRef = useRef(null);
  const [data2Send, setData2Send] = useState(initialData);
  const [acceptCertificate, setAcceptCertificate] = useState(false);
  const [file, setFile] = useState(null);

  const handleInputFileClick = () => uploadFileRef.current.click();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      toast.success(selectedFile.name);
      setFile(selectedFile);
    }
  };

  const handleUploadFile = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "text/photo");
        const response = await uploadAttachment(formData).unwrap();
        toast.success("File uploaded successfully!");
        setData2Send((prev) => ({ ...prev, product_image_id: response?.id }));
      } catch (error) {
        toast.error("File upload failed");
      }
    } else {
      toast.error("No Image file Choosen");
    }
  };

  const handleSubmit = async (toggleDraft) => {
    if (acceptCertificate) {
      const updatedData = { ...data2Send, saved_draft: toggleDraft };
      setData2Send(updatedData);

      if (
        !updatedData.name ||
        !updatedData.description ||
        updatedData.product_image_id === null
      ) {
        toast.error("Please fill all required fields and upload an image.");
        return;
      }

      try {
        await createCertificate(updatedData).unwrap();
        toast.success("Certificate created!");
        setData2Send(initialData);
        setFile(null);
        setAcceptCertificate(false);
      } catch (error) {
        toast.error("Certificate creation failed");
      }
    } else {
      toast.error("You must acknowledge the certificate");
    }
  };

  const handleCancelSubmit = () => {
    setData2Send(initialData);
    setFile(null);
    setAcceptCertificate(false);
    toast.success("Certificate Cleared!");
  };

  return (
    <>
      <Header />
      <Box className="min-h-screen">
        <Box className="max-w-[602px] w-full  mx-auto bg-[#22477F] py-6 my-6 rounded-[30px] px-[20px]">
          <Box className="bg-[#ADA8A8] rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] p-4 max-w-[518px] w-full mx-auto ">
            <TextField
              value={data2Send.name}
              onChange={(e) =>
                setData2Send((prev) => {
                  return { ...prev, name: e.target.value };
                })
              }
              label="Item Name"
              name="name"
              type="text"
              variant="outlined"
              fullWidth
              sx={{
                marginBottom: 2,
                backgroundColor: "#fff",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#606060",
                    borderWidth: "2px",
                    borderRadius: "10px",
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
            <TextField
              value={data2Send.description}
              onChange={(e) =>
                setData2Send((prev) => {
                  return { ...prev, description: e.target.value };
                })
              }
              name="description"
              type="text"
              label="Item Description"
              variant="outlined"
              fullWidth
              sx={{
                marginBottom: 2,
                backgroundColor: "#fff",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#606060",
                    borderWidth: "2px",
                    borderRadius: "10px",
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

          <Box className="flex flex-col md:flex-row md:justify-around items-center mb-6">
            {/* ---------<<<IMAGE UPLOAD BUTTONS>>>-------- */}
            <Box className="md:bg-[#ADA8A8] bg-transparent rounded-br-[20px] rounded-bl-[20px] p-8 max-w-[280px] w-full mb-4 md:mb-0">
              <Button
                className="flex text-black bg-[#fff] rounded-[41.47px] px-4 py-4 hover:bg-green-700 hover:text-white"
                onClick={handleInputFileClick}
              >
                <Image
                  src={Icon}
                  alt="Icon"
                  width={30}
                  height={30}
                  style={{ height: "auto" }}
                  className="h-auto"
                />
                <input
                  type="file"
                  name=""
                  id=""
                  className="hidden"
                  onChange={handleFileChange}
                  ref={uploadFileRef}
                />
                <Typography className="font-DMSans">Product Image</Typography>
              </Button>
              <Button
                className=" bg-[#3276E8] hover:bg-green-700 text-white rounded-[41.47px] w-full px-4 py-2 mt-3"
                onClick={handleUploadFile}
              >
                Upload Now
              </Button>
            </Box>

            {/* ---------<<<HANDLE NUMBER OF CERTIFICATES>>>-------- */}
            <Box className="flex justify-center w-full md:w-auto">
              <fieldset className="max-w-[193px] h-[80px] bg-white rounded-[10px] border-2 border-[#606060] px-2 flex flex-col">
                <legend>Number of Certificates</legend>
                <input
                  value={data2Send.number_of_certificate}
                  onChange={(e) =>
                    setData2Send((prev) => {
                      return { ...prev, number_of_certificate: e.target.value };
                    })
                  }
                  type="number"
                  name="number_of_certificate"
                  className="w-full border-none outline-none h-[60px]"
                  min={1}
                />
              </fieldset>
            </Box>
          </Box>

          <Box className="relative max-w-[518px] w-full mx-auto my-2 border-2 border-[#606060] rounded-[30px] flex flex-col items-center py-4 px-2">
            <TextField
              select
              label="Fonts"
              variant="outlined"
              fullWidth
              name="fonts"
              value=""
              sx={{
                width: "100%", // Full width on all screens
                maxWidth: "335px", // Maximum width for larger screens
                backgroundColor: "#fff",
                marginTop: "10px",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#606060",
                    borderWidth: "2px",
                    borderRadius: "10px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#606060",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#606060",
                  },
                },
              }}
            >
              <MenuItem value="Kodchansan">Kodchansan</MenuItem>
              <MenuItem value="KoHO">KoHO</MenuItem>
              <MenuItem value="Dm Sans">Dm Sans</MenuItem>
              <MenuItem value="San sarif">San sarif</MenuItem>
            </TextField>

            {/* DISABLED CONTENT */}
            <Box className="flex items-center mt-4">
              <Typography className="mr-2 text-[#fff]">Font Color:</Typography>
              <span className="bg-[#FAF000] w-[34px] h-[30px] inline-block relative cursor-pointer">
                <span className="absolute inset-0 flex justify-center items-center text-transparent">
                  Content
                </span>
              </span>
            </Box>
            <Box className="flex my-6 w-full justify-around">
              <Box className="flex flex-col justify-center items-center">
                <Box className="flex items-center justify-around">
                  <Radio
                    sx={{
                      color: "#fff",
                    }}
                  />
                  <Typography className="text-[#fff]">
                    Background Color
                  </Typography>
                </Box>
                <span className="bg-[#FA0000] w-[47px] h-[41px] inline-block relative cursor-pointer">
                  <span className="absolute inset-0 flex justify-center items-center text-transparent">
                    Content
                  </span>
                </span>
              </Box>

              <Box className="flex flex-col justify-center items-center border-xl">
                <Box className="flex items-center">
                  <Radio
                    sx={{
                      color: "#fff",
                    }}
                  />
                  <Typography className="text-[#fff]">
                    Custom Background
                  </Typography>
                </Box>
                <Box className="flex justify-around items-center">
                  <Box className="flex flex-col justify-center items-center text-black bg-[#fff] rounded-[12px] ml-5">
                    <Image
                      src={Icon}
                      alt="Icon"
                      width={20}
                      height={20}
                      style={{ height: "auto" }}
                      className="h-auto"
                    />
                    <Typography className="font-DMSans">
                      Click to upload
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center rounded-[30px] p-2 cursor-pointer select-none hover:shadow-lg hover:shadow-blue-500 hover:scale-[.99] tracking-tighter"
              onClick={() => Router.push("package-plans")}
            >
              <Typography className="text-white text-center text-[24px]">
                Upgrade plan from <br /> account settings to <br /> unlock
                customization <br />
                features
              </Typography>
            </Box>
            {/* DISABLED CONTENT */}
          </Box>

          {/* Product Sell Content */}
          <Box className="max-w-[476px] w-full mx-auto mb-6">
            <Box>
              <Typography
                sx={{
                  color: "#fff",
                }}
              >
                Where will this product primarily sell?
              </Typography>
              <TextField
                value={data2Send.product_sell}
                onChange={(e) =>
                  setData2Send((prev) => {
                    return { ...prev, product_sell: e.target.value };
                  })
                }
                name="product_sell"
                variant="outlined"
                placeholder="Enter text"
                multiline
                rows={4}
                InputLabelProps={{ shrink: false }}
                sx={{
                  width: {
                    xs: "100%", // 100% width on extra-small screens
                    sm: "80%", // 80% width on small screens
                    md: "70%", // 70% width on medium screens
                    lg: "60%", // 60% width on large screens
                    xl: "476px", // 476px width on extra-large screens
                  },
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  margin: "0 auto", // Center the TextField
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#606060",
                      borderWidth: "2px",
                      borderRadius: "10px",
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
          </Box>
          {/* Product Sell Content */}

          {/* ACCEPT CERTIFICATE  */}
          <Box className="flex flex-col md:flex-row justify-between items-center mx-10 my-8">
            <Box className="flex flex-col justify-center items-center mb-4 md:mb-0">
              <Typography
                sx={{
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                The certificate QR codes will be delivered to <br /> the email
                associated with your account.
              </Typography>

              <Box className="flex items-center mt-2">
                <Checkbox
                  checked={acceptCertificate}
                  onChange={(e) => setAcceptCertificate(e.target.checked)}
                />
                <Typography
                  sx={{
                    color: "#fff",
                  }}
                >
                  I acknowledge
                </Typography>
              </Box>
            </Box>

            <Box display="flex" flexDirection="column" alignItems="end" gap={2}>
              <Button
                onClick={() => handleSubmit(false)}
                variant="contained"
                className="bg-[#27A213] rounded-[7px] font-kodchasan px-4"
              >
                Place Order
              </Button>
              <Button
                onClick={() => handleSubmit(true)}
                variant="contained"
                className="bg-[#81ACF3] rounded-[7px] font-kodchasan px-4"
              >
                Save Draft
              </Button>
              <Button
                onClick={handleCancelSubmit}
                variant="contained"
                className="bg-[#A21313] rounded-[7px] font-kodchasan px-4"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default index;

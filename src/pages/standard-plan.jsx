import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePostCertificateInfoMutation } from "@/slices/certificateInfoApiSlice";
import { useUploadAttachmentMutation } from "@/slices/uploadAttachmentApiSlice";
import { toast } from "react-toastify";
import {
  Typography,
  Button,
  Box,
  TextField,
  MenuItem,
  Radio,
  Checkbox,
  Avatar,
} from "@mui/material";
import Icon from "@/assets/images/elements.svg";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/router";
import ColorPicker from "@/components/colorPicker";
import { Check, Close } from "@mui/icons-material";

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
  const router = useRouter();
  const uploadFileRef = useRef(null);
  const [productImagePreview, setProductImagePreview] = useState(null);
  const [uploadAttachment] = useUploadAttachmentMutation();
  const [createCertificate] = usePostCertificateInfoMutation();
  const [toggleColorPicker, setToggleColorPicker] = useState({
    isOpenFontColorpicker: false,
    isOpenBgColorPicker: false,
  });
  const [data2Send, setData2Send] = useState(initialData);
  const [acceptCertificate, setAcceptCertificate] = useState(false);
  const [file, setFile] = useState("");

  const handleInputFileClick = () => uploadFileRef.current.click();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      toast.success(selectedFile);
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
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
        const response = await createCertificate(updatedData).unwrap();
        toast.success("Certificate created!");
        setData2Send(initialData);
        setFile(null);
        setAcceptCertificate(false);
        setProductImagePreview(null);
      } catch (error) {
        console.error(error);
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
    setProductImagePreview(null);
    toast.success("Certificate Cleared!");
  };

  useEffect(() => {
    if (data2Send.font_color === data2Send.bg_color) {
      toast.info(
        "Hint: You have choose same colors check 'Background color' and 'Font color'"
      );
    }
  }, [data2Send.font_color, data2Send.bg_color]);

  return (
    <>
      <Header />
      <Box className="min-h-screen">
        <Box className="max-w-[602px] w-full  mx-auto bg-[#22477F] py-6 my-6 rounded-[30px] px-[20px]">
          {/* NAME AND DESCRIPTION */}
          <Box className="bg-[#ADA8A8] rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] p-4 max-w-[518px] w-full mx-auto ">
            <TextField
              value={data2Send.name}
              onChange={(e) =>
                setData2Send((prev) => {
                  return { ...prev, name: e.target.value };
                })
              }
              label="Item Name"
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
            {/* HANDLE PRODUCT IMAGE UPLOAD  */}
            <Box className="md:bg-[#ADA8A8] bg-transparent rounded-br-[20px] rounded-bl-[20px] p-8 max-w-[280px] w-full mb-4 md:mb-0">
              <Button
                className="flex text-black bg-[#fff] rounded-[41.47px] px-4 py-4 gap-2"
                onClick={handleInputFileClick}
              >
                {productImagePreview ? (
                  <Avatar
                    alt="Remy Sharp"
                    src={productImagePreview}
                    sx={{ width: 46, height: 46 }}
                  />
                ) : (
                  <Image src={Icon} alt="Icon" width={40} height={40} />
                )}

                <Typography className="font-DMSans">Product Image</Typography>
                <input
                  type="file"
                  className="hidden"
                  ref={uploadFileRef}
                  onChange={handleFileChange}
                />
              </Button>
              <Button
                className=" bg-[#3276E8] text-white rounded-[41.47px] w-full px-4 py-2 mt-3"
                onClick={handleUploadFile}
              >
                Upload Now
              </Button>
            </Box>

            {/* HANDLE NUMBER OF CERTIFICATES */}
            <Box className="flex justify-center w-full md:w-auto">
              <fieldset className="max-w-[193px] h-[80px] bg-white rounded-[10px] border-2 border-[#606060] px-2 flex flex-col">
                <legend className="bg-white text-sm text-black px-[3px] pb-[3pxpx] tracking-tighter">
                  Number of Certificates
                </legend>
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
          <Box className="max-w-[518px] w-full mx-auto my-2 border-2 border-[#606060] rounded-[30px] flex flex-col items-center py-4 px-2">
            {/* FONT SELECT BOX */}
            <fieldset className="max-w-[335px] w-full bg-white mt-[10px] rounded-[10px] border-[#606060] border-2 flex flex-col outline-none overflow-hidden">
              <legend className="text-sm md:text-base font-normal bg-white px-[3px] pb-[3px] tracking-tighter">
                Fonts
              </legend>
              <select
                onChange={(e) =>
                  setData2Send((prev) => {
                    return { ...prev, font: e.target.value };
                  })
                }
                name="fonts"
                id="fonts"
                className="w-full border-none outline-none h-[40px]"
              >
                <option value="Arial">Arial</option>
                <option value="kodchasan">kodchasan</option>
                <option value="KoHo">KoHo</option>
                <option value="Roboto">Roboto</option>
              </select>
            </fieldset>

            {/* TOGGLE FONT COLOR PICKER */}
            <Box className="flex items-center mt-4 relative">
              <Typography className="mr-2 text-[#fff]">Font Color:</Typography>
              <span
                style={{ backgroundColor: data2Send.font_color }}
                className="w-[35px] h-[35px] inline-block relative cursor-pointer rounded-sm hover:shadow-xl hover:scale-[1.1] transition-all"
                onClick={() => {
                  setToggleColorPicker((prev) => {
                    return { ...prev, isOpenFontColorpicker: true };
                  });
                }}
              ></span>

              <div
                className={`absolute left-0 top-0 z-10 flex flex-col bg-slate-300 gap-3 py-1 px-3 rounded-lg transition-all ${
                  toggleColorPicker.isOpenFontColorpicker
                    ? "block opacity-1 scale-1"
                    : "hidden opacity-0 scale-0"
                }`}
              >
                <h1
                  style={{ color: data2Send.font_color }}
                  className="text-base font-medium"
                >
                  Font Color
                </h1>
                <ColorPicker
                  initialColor={data2Send.font_color}
                  setInitialColor={setData2Send}
                />
                <div className="flex items-center justify-between">
                  <Button
                    className="bg-red-600 hover:bg-red-700 rounded-lg text-white"
                    onClick={() => {
                      setToggleColorPicker((prev) => {
                        return { ...prev, isOpenFontColorpicker: false };
                      });
                      setData2Send((prev) => {
                        return { ...prev, font_color: initialData.font_color };
                      });
                    }}
                  >
                    <Close />
                  </Button>

                  <Button
                    className="bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                    onClick={() => {
                      setToggleColorPicker((prev) => {
                        return { ...prev, isOpenFontColorpicker: false };
                      });
                    }}
                  >
                    <Check />
                  </Button>
                </div>
              </div>
            </Box>

            <Box className="flex my-6 w-full justify-around">
              {/* TOGGLE BACKGROUND COLOR PICKER */}
              <Box className="flex flex-col justify-center items-center relative">
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

                <span
                  style={{ backgroundColor: data2Send.bg_color }}
                  className="w-[47px] h-[41px] rounded-sm inline-block relative cursor-pointer"
                  onClick={() => {
                    setToggleColorPicker((prev) => {
                      return {
                        ...prev,
                        isOpenBgColorPicker: true,
                      };
                    });
                  }}
                ></span>

                <div
                  className={`absolute left-0 top-0 z-10 flex flex-col bg-slate-300 gap-3 py-1 px-3 rounded-lg transition-all ${
                    toggleColorPicker.isOpenBgColorPicker
                      ? "block opacity-1 scale-1"
                      : "hidden opacity-0 scale-0"
                  }`}
                >
                  <h1
                    style={{ backgroundColor: data2Send.bg_color }}
                    className="text-base font-medium w-full h-[30px] text-white"
                  >
                    BG Color
                  </h1>
                  <ColorPicker
                    initialBGColor={data2Send.bg_color}
                    setInitialColor={setData2Send}
                  />
                  <div className="flex items-center justify-between">
                    <Button
                      className="bg-red-600 hover:bg-red-700 rounded-lg text-white"
                      onClick={() => {
                        setToggleColorPicker((prev) => {
                          return { ...prev, isOpenBgColorPicker: false };
                        });
                        setData2Send((prev) => {
                          return {
                            ...prev,
                            bg_color: initialData.bg_color,
                          };
                        });
                      }}
                    >
                      <Close />
                    </Button>

                    <Button
                      className="bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                      onClick={() => {
                        setToggleColorPicker((prev) => {
                          return { ...prev, isOpenBgColorPicker: false };
                        });
                      }}
                    >
                      <Check />
                    </Button>
                  </div>
                </div>
              </Box>
              <Box className="flex flex-col justify-center items-center border-xl relative mt-4">
                <Box className="flex items-center">
                  <Radio
                    disabled
                    sx={{
                      color: "#fff",
                    }}
                  />
                  <Typography className="text-[#fff]">
                    Custom Background
                  </Typography>
                </Box>
                <Box className="flex justify-around items-center opacity-50 pointer-events-none">
                  <Box className="flex flex-col justify-center items-center text-black bg-[#fff] rounded-[12px] ml-5">
                    <Image src={Icon} alt="Icon" />
                    <Typography className="font-DMSans">
                      Click to upload
                    </Typography>
                  </Box>
                </Box>

                <Box
                  className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-[28px] max-w-[300px] w-full ml-2 p-2 select-none cursor-pointer hover:shadow-lg "
                  onClick={() => router.push("package-plans")}
                >
                  <Typography className="text-white text-center text-[12px]">
                    Upgrade plan from account <br /> settings to upload custom{" "}
                    <br /> background image
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
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
                  sx={{
                    color: "#fff",
                    "&.Mui-checked": {
                      color: "green",
                    },
                  }}
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
                variant="contained"
                className="bg-[#27A213] rounded-[7px] font-kodchasan px-4"
                onClick={() => handleSubmit(false)}
              >
                Place Order
              </Button>
              <Button
                variant="contained"
                className="bg-[#81ACF3] rounded-[7px] font-kodchasan px-4"
                onClick={() => handleSubmit(true)}
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

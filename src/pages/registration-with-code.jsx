import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Checkbox,
  Typography,
  InputAdornment,
} from "@mui/material";
import Icon from "../assets/images/elements.svg";
import Image from "next/image";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useRouter } from "next/router";
import { useGetActiveCountriesQuery } from "@/slices/activeCountryApiSlice";
import { useUploadAttachmentMutation } from "@/slices/uploadAttachmentApiSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "@/slices/userApiSlice";

const CodeRegistration = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [emailValid, setEmailValid] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [brandName, setBrandName] = useState("");
  const [primaryContent, setPrimaryContent] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  // const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [otherLinks, setOtherLinks] = useState([]);
  const [validation_code_id, setValidationCodeId] = useState(0);
  const [attachment_id, setAttachmentId] = useState(0);

  const router = useRouter();
  const [uploadAttachment] = useUploadAttachmentMutation();
  const [register, { isLoading }] = useRegisterMutation();

  const {
    data: countries = [],
    error: countryError,
    isLoading: isCountryLoading,
  } = useGetActiveCountriesQuery();

  useEffect(() => {
    setValidationCodeId(localStorage.getItem("validCodeId"));
  }, []);

  const handleBrandNameChange = (e) => {
    setBrandName(e.target.value);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    toast.info(`Selected file: ${file.name}`);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsUploading(true);
      const response = await uploadAttachment(formData).unwrap();
      setUploadResult(response);
      toast.success("File uploaded successfully!");
      console.log(response);

      setAttachmentId(response.data.id);
    } catch (error) {
      // Ensure response contains the correct id
      toast.error("Error uploading file. Please try again later.");
    } finally {
      setIsUploading(false);
      setSelectedFile(null);
    }
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  // Handle changes for each TextField
  const handlesocialMediaLinksChange = (index, value) => {
    const updatedLinks = [...socialMediaLinks];
    updatedLinks[index] = value;
    setSocialMediaLinks(updatedLinks);
  };

  // Handle changes for each TextField
  const handleOtherLinkChange = (index, value) => {
    const updatedLinks = [...otherLinks];
    updatedLinks[index] = value;
    setOtherLinks(updatedLinks);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // Define the validation rules and error messages
    const validationRules = [
      { condition: !brandName, message: "brandName is required" },
      { condition: !primaryContent, message: "primaryContent is required" },
      { condition: !email, message: "E-mail is required" },
      {
        condition: !selectedCountry.name,
        message: "selectedCountry is required",
      },
      { condition: !phone, message: "Phone is required" },
      { condition: !password, message: "Password is required" },
      { condition: !confirmPassword, message: "Confirm password is required" },
      {
        condition: password !== confirmPassword,
        message: "Passwords do not match",
      },
      { condition: !description, message: "description is required" },
    ];

    // Check each validation rule
    for (const rule of validationRules) {
      if (rule.condition) {
        toast.error(rule.message);
        return; // Exit the function if any validation fails
      }
    }

    try {
      const registerData = {
        user_name: brandName,
        primary_content: primaryContent,
        email: email,
        phone: phone,
        password: password,
        about_brand: description,
        website_url: website,
        social_media: socialMediaLinks,
        other_links: otherLinks,
        country_id: selectedCountry.id,
        validation_code_id: validation_code_id,
        attachment_id: attachment_id,
        role: "VENDOR",
      };

      const response = await register(registerData).unwrap();
      toast.success("Registration successful!");
      console.log("response", response);
      router.push("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // const handleCheckboxChange = (e) => {
  //   setIsChecked(e.target.checked);
  // };
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <Box className="min-h-screen p-4">
        <Box className="max-w-[1091px] w-full mx-auto">
          <Box className="flex justify-center items-center flex-wrap gap-5 mb-6">
            <TextField
              label="Brand Name"
              variant="outlined"
              value={brandName}
              onChange={handleBrandNameChange}
              error={Boolean(errors.brandName)}
              helperText={errors.brandName}
              sx={{
                width: "335px",
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

            <Button
              className="flex m-4 text-black"
              fontFamily="font-DMSans"
              component="label"
              role={undefined}
              tabIndex={-1}
              startIcon={<Image alt="brand-icon" src={Icon} />}
            >
              Brand logo
              <input
                style={{
                  clip: "rect(0 0 0 0)",
                  clipPath: "inset(50%)",
                  height: 1,
                  overflow: "hidden",
                  position: "absolute",
                  width: 1,
                  whiteSpace: "nowrap",
                }}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </Button>

            <Button
              variant="contained"
              className="bg-[#3276E8] rounded-[41.47px] font-kodchasan"
              sx={{ fontFamily: "Kodchasan, sans-serif", mt: 2 }}
              onClick={handleFileUpload}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload now"}
            </Button>
          </Box>

          <Box className="flex justify-center mb-6">
            <div className="w-[50%] h-[1px] bg-black"></div>
          </Box>

          <Box className="sm:none md:flex flex-col sm:flex-col md:flex-row sm:flex-wrap md:flex-wrap lg:flex-nowrap sm:gap-2 md:gap-2 lg:gap-52">
            <Box className="min-w-[400px] w-full">
              <TextField
                label="Name of Primary Content"
                variant="outlined"
                fullWidth
                name="primaryContent"
                value={primaryContent}
                onChange={(e) => setPrimaryContent(e.target.value)}
                sx={textFieldStyles}
                className="mb-10"
              />

              <TextField
                label="E-mail"
                variant="outlined"
                fullWidth
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={textFieldStyles}
                className=""
              />
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  fontSize: {
                    xs: "1rem",
                    sm: "1.2rem",
                    md: "1.5rem",
                  },
                  textAlign: "center",
                }}
              >
                This email will be used for login and <br /> certificates will
                be sent to this email
              </Typography>

              <TextField
                select
                label="Country"
                variant="outlined"
                fullWidth
                name="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                sx={textFieldStyles}
                className="my-12"
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Phone"
                type="number"
                variant="outlined"
                fullWidth
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ ...textFieldStyles, marginBottom: "1rem" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {selectedCountry.code}
                    </InputAdornment>
                  ),
                }}
              />
              <Typography
                variant="body2"
                color="textSecondary"
                className="text-[20px]"
              >
                We will never call you
              </Typography>

              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={textFieldStyles}
                className="my-9"
              />

              <TextField
                label="Confirm password"
                variant="outlined"
                fullWidth
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={textFieldStyles}
                className="mb-9"
              />
            </Box>

            <Box className="min-w-[400px] w-full">
              <TextField
                label="Tell Us About Your Brand"
                multiline
                rows={7}
                variant="outlined"
                fullWidth
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={textFieldStyles}
                className="mb-12"
              />
              <TextField
                label="Website"
                variant="outlined"
                fullWidth
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                sx={textFieldStyles}
                className="mb-2"
              />
              <TextField
                label="socialmedia"
                variant="outlined"
                fullWidth
                value={socialMediaLinks[0]}
                onChange={(e) =>
                  handlesocialMediaLinksChange(0, e.target.value)
                }
                sx={textFieldStyles}
                className="mb-2"
              />
              <TextField
                label="socialmedia"
                variant="outlined"
                fullWidth
                value={socialMediaLinks[1]}
                onChange={(e) =>
                  handlesocialMediaLinksChange(1, e.target.value)
                }
                sx={textFieldStyles}
                className="mb-2"
              />
              <TextField
                label="socialmedia"
                variant="outlined"
                fullWidth
                value={socialMediaLinks[2]}
                onChange={(e) =>
                  handlesocialMediaLinksChange(2, e.target.value)
                }
                sx={textFieldStyles}
                className="mb-2"
              />
              <TextField
                label="Other Link 1"
                variant="outlined"
                fullWidth
                value={otherLinks[0]}
                onChange={(e) => handleOtherLinkChange(0, e.target.value)}
                sx={textFieldStyles}
                className="mb-2"
              />
              <TextField
                label="Other Link 2"
                variant="outlined"
                fullWidth
                value={otherLinks[1]}
                onChange={(e) => handleOtherLinkChange(1, e.target.value)}
                sx={textFieldStyles}
                className="mb-2"
              />
              <TextField
                label="Other Link 3"
                variant="outlined"
                fullWidth
                value={otherLinks[2]}
                onChange={(e) => handleOtherLinkChange(2, e.target.value)}
                sx={textFieldStyles}
                className="mb-2"
              />
            </Box>
          </Box>

          <Box className="md:flex sm:flex-row md:justify-center md:items-center my-12">
            <Checkbox
              sx={{
                color: "green",
                "&.Mui-checked": {
                  color: "green",
                },
              }}
              // checked={isChecked}
              // onChange={handleCheckboxChange}
            />
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              I have the authority to make this account on behalf of the brand
              and I agree to the{" "}
              <span className="font-bold">terms and services</span>
            </Typography>

            <Button
              variant="contained"
              className="bg-[#22477F] rounded-[7px] font-kodchasan"
              sx={{
                fontFamily: "Kodchasan, sans-serif",
                // opacity: isFormValid ? 1 : 0.5,
              }}
              onClick={submitHandler}
              // disabled={!isFormValid || !isChecked}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default CodeRegistration;

const textFieldStyles = {
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
};

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import RegisterBTN from "@/components/muiButton";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/slices/userApiSlice";
import { setCredentials } from "@/slices/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router"; // Import useRouter from next/router
const LoginForm = ({ title }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Track the selected role
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize useRouter hook
  const [login] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  // Effect hook to handle redirect on login success
  React.useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "ADMIN") {
        router.push("/admin-dashboard");
      } else if (userInfo.role === "VENDOR") {
        // Redirect vendors based on plan
        const hasPlan = userInfo.plan === "pro"; // Replace with actual plan check logic
        if (hasPlan) {
          router.push("/issue-certificate");
        } else {
          router.push("/package-plans");
        }
      }
    }
  }, [userInfo, router]);
  const submitHandler = async (selectedRole) => {
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }
    if (!selectedRole) {
      toast.error("Role is required");
      return;
    }
    try {
      const res = await login({ email, password, role: selectedRole }).unwrap();
      console.log(res);
      if (res.user) {
        if (res.user.role !== selectedRole) {
          toast.error("Access denied. Invalid role.");
          return; // Stop further processing
        }
        toast.success("Login successful!");
        dispatch(setCredentials({ ...res }));
        // Set the redirection based on role
        if (res.user.role === "ADMIN") {
          router.push("/admin-dashboard");
        } else if (res.user.role === "VENDOR") {
          const hasPlan = res.user.plan === "pro"; // Replace with actual logic
          if (hasPlan) {
            router.push("/issue-certificate");
          } else {
            router.push("/package-plans");
          }
        }
        // Clear the input fields and role selection after successful login
        setEmail("");
        setPassword("");
        setRole("");
      }
    } catch (err) {
      const errorMessage =
        err?.data?.message || err.error || "An error occurred";
      toast.error(errorMessage);
    }
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": {
          m: 1,
        },
      }}
      noValidate
      autoComplete="off"
      className="w-full sm:w-3/4 md:max-w-[336px] lg:max-w-[336px] flex flex-col gap-2 p-4 sm:p-0"
    >
      <h1
        className={`text-center text-[20px] xl:text-[1vw] text-[#080808] font-light Koho-light`}
      >
        {title}
      </h1>
      {/* Email TextField */}
      <TextField
        id="outlined-email"
        label="Email"
        fullWidth
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{
          borderRadius: "10px",
          "& .MuiInputLabel-root": {
            color: "#606060",
            fontWeight: "semi-bold",
            mx: "3px",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            "& fieldset": {
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
        className="mb-10"
      />
      {/* Password TextField */}
      <TextField
        id="outlined-password"
        label="Password"
        fullWidth
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          borderRadius: "10px",
          "& .MuiInputLabel-root": {
            color: "#606060",
            fontWeight: "semi-bold",
            mx: "3px",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            "& fieldset": {
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
        className="mb-10"
      />
      <div className="flex items-center justify-between md:justify-center px-3 md:p-0">
        <div className="flex items-center justify-start rounded-[50px] overflow-hidden bg-[#22477F] p-[1px]">
          <Button
            className="cursor-pointer rounded-br-[50px] rounded-tr-[50px] font-kodchasan text-md md:text-lg xl:text-xl rounded-[7px]  rounded-l-[50px] rounded-r-[50px] text-white hover:bg-[#22477F] font-normal py-1 px-5 md:px-9 bg-[#22477F]"
            onClick={() => submitHandler("ADMIN")}
          >
            ADMIN
          </Button>
          <Button
            className="cursor-pointer  font-kodchasan text-md md:text-lg xl:text-xl rounded-[7px] rounded-l-[50px] rounded-r-[50px] text-white hover:bg-[#22477F] font-normal py-1 px-5 md:px-9 bg-[#22477F]  border-2 border-slate-300 border-solid"
            onClick={() => submitHandler("VENDOR")}
          >
            VENDOR
          </Button>
        </div>
        <div className="hidden sm:block md:hidden">
          <RegisterBTN title={"Register"} />
        </div>
      </div>
      <div className="flex flex-col items-end justify-start my-3">
        <Link
          href={"/"}
          className={`text-black font-bold text-[15px] font-kodchasan`}
        >
          Recover Lost Account
        </Link>

        <div className="flex items-center justify-center sm:hidden w-full my-3">
          <RegisterBTN title={"Register"} />
        </div>
      </div>
    </Box>
  );
};
export default LoginForm;

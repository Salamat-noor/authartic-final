import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const withAuth = (WrappedComponent, roleRequired) => {
  return (props) => {
    const router = useRouter();
    const userInfo = useSelector((state) => state.auth.userInfo);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasRequiredRole, setHasRequiredRole] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
      const checkAuth = () => {
        if (userInfo?.access_token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setShouldRedirect(true); // Flag to trigger redirection
        }
        setIsLoading(false); // Always set loading to false after check
      };

      checkAuth();
    }, [userInfo]);

    useEffect(() => {
      if (!isLoading && shouldRedirect) {
        router.push("/");
      }
    }, [isLoading, shouldRedirect, router]);

    if (isLoading || shouldRedirect) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

import { useState } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Head from "next/head";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Link from "next/link";
import { IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const cards = [
  {
    id: 1,
    title: "Users",
    count: 12,
    icon: <PeopleOutlineIcon fontSize="large" />,
  },
  {
    id: 2,
    title: "Vendor",
    count: 12,
    icon: <ShoppingBagIcon fontSize="large" />,
  },
  {
    id: 3,
    title: "Validation Codes",
    count: 122,
    icon: <VerifiedUserIcon fontSize="large" />,
  },
];

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      <div className="flex h-screen overflow-hidden">
        {/* Drawer */}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 bg-gray-100 overflow-auto">
            <div className="mb-6 flex items-center justify-between">
              <Typography
                variant="h4"
                component="h1"
                className="font-bold text-gray-900"
              >
                Admin Dashboard
              </Typography>
              {isMobile && (
                <div className="ml-auto">
                  <IconButton
                    onClick={toggleDrawer(!open)}
                    className="lg:hidden"
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cards.map((specs) => (
                <Link
                  href={
                    specs.title === "Users"
                      ? "/users"
                      : specs.title === "Vendor"
                      ? "/vendors"
                      : specs.title === "Validation Codes"
                      ? "/validation-codes"
                      : ""
                  }
                  key={specs.id}
                >
                  <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 hover:shadow-lg transition-shadow">
                    <div className="flex-shrink-0">{specs.icon}</div>
                    <div>
                      <Typography variant="h6" className="text-gray-900">
                        {specs.title}
                      </Typography>
                      <Typography variant="body1" className="text-gray-600">
                        {specs.count}
                      </Typography>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

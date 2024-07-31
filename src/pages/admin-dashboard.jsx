import Footer from "@/components/footer";
import Header from "@/components/header";
import Head from "next/head";
import React from "react";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Link from "next/link";

const cards = [
  {
    id: 1,
    title: "Users",
    count: 12,
  },
  {
    id: 2,
    title: "Vendor",
    count: 12,
  },
];
const AdminDashboard = () => {
  return (
    <>
      <Head>
        <title>AdminDashboard</title>
      </Head>

      <div className="w-full h-screen flex flex-col justify-between overflow-auto">
        <Header />

        <div className="w-full h-full mx-auto my-7 px-2 sm:px-4 md:px-10">
          <div className="w-full text-left">
            <h1 className="font-Poppins font-semibold text-1xl md:text-[27px] xl:text-[1vw]">
              ADMIN DASHBOARD
            </h1>
          </div>

          <div className="w-full h-auto flex items-start justify-start gap-3 flex-wrap py-3">
            {cards &&
              cards.map((specs) => (
                <Link
                  href={
                    specs.title === "Users"
                      ? "/users"
                      : specs.title === "Vendor"
                      ? "/vendors"
                      : ""
                  }
                  key={specs.id}
                >
                  <div className="flex items-center gap-5 xl:gap-[.5vw] bg-slate-600 px-4 xl:px-[1vw] py-1 xl:py-[.5vw] rounded-lg text-white transition-all hover:shadow-lg hover:scale-105 cursor-pointer">
                    <div className="w-full h-full">
                      {specs.title === "Users" ? (
                        <PeopleOutlineIcon
                          fontSize="large"
                          className="xl:text-[1.8vw]"
                        />
                      ) : specs.title === "Vendor" ? (
                        <ShoppingBagIcon
                          fontSize="large"
                          className="xl:text-[1.8vw]"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="flex flex-col w-full h-full xl:gap-[.8vw]">
                      <h2 className="text-right font-KoHo text-base xl:text-[.8vw]">
                        {specs.title}
                      </h2>
                      <h3 className="text-right font-KoHo text-2xl xl:text-[.8vw]">
                        {specs.count}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AdminDashboard;

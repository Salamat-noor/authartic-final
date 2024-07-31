import Footer from "@/components/footer";
import Header from "@/components/header";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import sample from "@/assets/images/sample.svg";
import { useGetProfileQuery } from "@/slices/userApiSlice";

const AccountSettings = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [links, setLinks] = useState(true);
  const uploadPic = useRef(null);



  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetProfileQuery();
  

  const changeProfilePic = () => {
    uploadPic.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Head>
        <title>Account-Settings</title>
      </Head>

      <div className="w-full min-h-screen flex flex-col justify-between items-center">
        <Header />
        <>
          <div className="max-w-[730px] md:w-[730px] h-auto bg-[#273F7C] text-white rounded-[30px] overflow-hidden my-16 md:my-20 mx-3">
            <div className="w-full h-full flex flex-col items-center justify-center px-12 py-7 font-koHo text-base gap-4">
              <div className="w-full h-auto flex justify-center gap-5 md:gap-3 flex-col md:flex-row">
                <div className="w-full md:max-w-[215px] h-auto flex flex-col items-center justify-start gap-2 text-black bg-[#ADA8A8] p-5 md:p-3 rounded-[28px]">
                  <figure className="block  w-full">
                    <Image
                      src={imageUrl || sample}
                      alt="profile-img"
                      width={153}
                      height={100}
                      className="h-auto md:mx-auto"
                    />
                    <figcaption className="md:text-right font-extralight italic text-sm ml-3 md:ml-0 md:mr-7">
                      <input
                        type="file"
                        name=""
                        id=""
                        hidden
                        ref={uploadPic}
                        onChange={handleFileChange} // Handle file change
                      />
                      <button type="button" onClick={changeProfilePic}>
                        Change Logo
                      </button>
                    </figcaption>
                  </figure>

                  <div className="w-full h-[205px]">
                    <label htmlFor="brandDesc">Brand Description:</label>
                    <textarea
                      name="brandDesc"
                      id="brandDesc"
                      className="block font-bold bg-inherit text-black w-full h-full outline-none"
                      style={{ overflow: "hidden", resize: "none" }}
                      value={`This brand is blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah`}
                    ></textarea>
                    <div className="text-right font-extralight italic text-sm mx-3">
                      <button>Edit</button>
                    </div>
                  </div>
                </div>

                <form className="md:w-auto h-auto flex flex-col justify-between gap-2 sm:gap-3 py-3">
                  {/* Sample Name... */}
                  <div className="form-field w-full h-auto flex flex-col items-start">
                    <label
                      htmlFor="primaryContact"
                      className="font-normal text-base"
                    >
                      Name of Primart Contact:
                    </label>
                    <div className="flex gap-3 justify-between w-full flex-col sm:flex-row items-end sm:items-center">
                      <input
                        id="primaryContact"
                        name="primaryContact"
                        type="text"
                        max={100}
                        value={"Sample Name"}
                        className="bg-inherit border-none outline-none text-base font-bold sm:ml-3 w-full"
                        readOnly
                      />
                      <Link
                        href={""}
                        className="font-extralight italic text-sm"
                      >
                        change
                      </Link>
                    </div>
                  </div>

                  {/* Sample Email... */}
                  <div className="form-field w-full h-auto flex flex-col items-start">
                    <label htmlFor="email" className="font-normal text-base">
                      E-mail:
                    </label>
                    <div className="flex gap-3 justify-between  w-full flex-col sm:flex-row items-end sm:items-center">
                      <input
                        readOnly
                        type="email"
                        id="email"
                        name="email"
                        value={"SampleEmail@gmail.com"}
                        className="bg-inherit border-none outline-none  text-base  font-bold ml-3 w-full"
                      />
                      <Link
                        href={""}
                        className="font-extralight italic text-sm"
                      >
                        change
                      </Link>
                    </div>
                  </div>

                  {/* Sample Password... */}
                  <div className="form-field w-full h-auto flex flex-col items-start">
                    <label htmlFor="password" className="font-normal text-base">
                      Password:
                    </label>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 justify-between  w-full">
                      <input
                        readOnly
                        type="password"
                        id="password"
                        name="password"
                        value={"SampleEmail@gmail.com"}
                        className="bg-inherit border-none outline-none w-full text-base  font-bold ml-3"
                      />
                      <Link
                        href={""}
                        className="font-extralight italic text-sm"
                      >
                        change
                      </Link>
                    </div>
                  </div>

                  {/* Sample Phone... */}
                  <div className="form-field w-full h-auto flex flex-col items-start">
                    <label htmlFor="tel" className="font-normal text-base">
                      Phone:
                    </label>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 justify-between  w-full">
                      <input
                        readOnly
                        type="tel"
                        id="tel"
                        name="tel"
                        value={"+923000000000"}
                        className="bg-inherit border-none outline-none w-full text-base  font-bold ml-3"
                      />
                      <Link
                        href={""}
                        className="font-extralight italic text-sm"
                      >
                        change
                      </Link>
                    </div>
                  </div>

                  {/* Sample Country... */}
                  <div className="form-field w-full h-auto flex flex-col items-start">
                    <label htmlFor="country" className="font-normal text-base">
                      Country:
                    </label>
                    <div className="w-full flex flex-col sm:flex-row items-end sm:items-center gap-3 justify-between">
                      <select
                        id="country"
                        name="country"
                        className="bg-inherit border-none outline-none  w-full text-base  font-bold ml-3"
                        disabled
                      >
                        <option value="Example Country">Example Country</option>
                      </select>
                      <Link
                        href={""}
                        className="font-extralight italic text-sm"
                      >
                        change
                      </Link>
                    </div>
                  </div>

                  {/* Sample Links... */}
                  <div className="form-field w-full h-auto flex flex-col items-start">
                    <label htmlFor="links" className="font-normal text-base">
                      Links:
                    </label>
                    <div className="flex flex-col gap-2 w-full">
                      {links ? (
                        <>
                          <input
                            type="text"
                            name=""
                            id=""
                            className="bg-inherit border-none outline-none w-full text-base  font-bold ml-3"
                            value={"www.google.com"}
                            readOnly
                          />
                          <input
                            type="text"
                            name=""
                            id=""
                            className="bg-inherit border-none outline-none  w-full text-sm font-bold ml-3"
                            value={"www.google.com"}
                            readOnly
                          />
                          <input
                            type="text"
                            name=""
                            id=""
                            className="bg-inherit border-none outline-none  w-full text-sm font-bold ml-3"
                            value={"www.google.com"}
                            readOnly
                          />
                        </>
                      ) : (
                        <>
                          <Link
                            href={"https://www.google.com"}
                            target="_blank"
                            className="text-sm font-bold ml-3"
                          >
                            www.google.com
                          </Link>
                          <Link
                            href={"https://www.facebook.com"}
                            target="_blank"
                            className="text-sm font-bold ml-3"
                          >
                            www.facebook.com
                          </Link>
                          <Link
                            href={"https://www.linkedIn.com"}
                            target="_blank"
                            className="text-sm font-bold ml-3"
                          >
                            www.linkedIn.com
                          </Link>
                        </>
                      )}

                      <div className="text-right font-extralight italic text-sm">
                        <Link href={""} onClick={() => setLinks(!links)}>
                          {links ? "save links" : "edit link"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="w-full flex items-start justify-center">
                <div className="w-full md:w-[500px] flex flex-col items-center justify-start gap-3 border-t-2 border-white py-3 font-KoHo text-base font-normal">
                  <h3>Current plan:</h3>
                  <div className="flex items-center justify-center gap-7 pl-16">
                    <h2 className=" text-[24px] font-bold">Pro</h2>
                    <Link href={""} className="text-[12px] italic font-normal">
                      change
                    </Link>
                  </div>
                  <div className="mt-2">
                    <Link href={""} className="italic font-normal text-base">
                      Change Billing Information
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-end w-full">
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    className="bg-[#27A213] w-[89px] h-[24px] rounded-[7px] font-kodchasan text-[20px] font-bold"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-[#A21313] w-[89px] h-[26px] rounded-[7px] font-kodchasan text-[20px] font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
        <Footer />
      </div>
    </>
  );
};

export default AccountSettings;

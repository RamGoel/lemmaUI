"use client";
import UIAction from "@/components/actions";
import { axiosInstance } from "@/lib/axios";
import { isJSON } from "@/utils/handler";
import { Editor } from "@monaco-editor/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsArrowUpLeftCircle, BsArrowUpRight } from "react-icons/bs";
import { GiArmorUpgrade, GiUpgrade } from "react-icons/gi";
import { MdUpgrade } from "react-icons/md";

export default function Dashboard() {
  const [json, setJSON] = useState("");
  const [ui, setUI] = useState("");
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const handleGenerateUI = () => {
    if (!isJSON(json)) {
      toast.error("Invalid JSON");
      return;
    }
    setLoading(true);
    axiosInstance
      .post("/create", { json })
      .then((res) => {
        setUI(res.data.text);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error while generating UI");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="flex h-screen items-center gap-[2rem] justify-between">
      <div className=" flex items-center justify-between px-[200px] absolute top-[30px] w-full text-center">
        <p className="text-2xl font-bold tracking-[10px] bg-gradient-to-r from-gray-50 to-gray-500 text-transparent bg-clip-text">
          LEMMAUI
        </p>
      
        <div className="flex items-center justify-end gap-[1rem]">
            <div>
                Current Plan: <span className="underline">
                    BASIC
                </span>
            </div>
            <div className="flex items-center justify-center h-[50px] gap-[.5rem] border-[1px] border-[#1e1e1e] rounded-lg min-w-[100px] px-4  hover:bg-[#1e1e1e] cursor-pointer">
                Upgrade <BsArrowUpRight />
            </div>
        <button
          onClick={() => {
            router.push("/");
          }}
          className="bg-white text-black uppercase tracking-widest font-semibold min-w-[100px] py-3 px-4 rounded-lg ml-auto"
        >
          Log out
        </button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-[2rem]">
        <div className="flex items-start justify-between w-10/12 mx-auto gap-[3rem]">
          <h1 className="text-4xl font-semibold text-center">
            Generate Frontend from API Response
          </h1>
          <UIAction />
        </div>
        <div className="flex items-start justify-center w-10/12 mx-auto gap-[3rem]">
          <div className="flex flex-col mx-auto gap-[1rem]">
            <Editor
              onChange={(value) => setJSON(value || "")}
              height="60vh"
              width={"700px"}
              theme="vs-dark"
              defaultLanguage="json"
              className="overflow-hidden rounded-lg"
              defaultValue="// Paste your JSON"
            />
            
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html:ui,
            }}
            className="text-black bg-white w-full"
          ></div>
        </div>
      </div>
    </div>
  );
}

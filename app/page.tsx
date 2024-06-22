'use client'
import { axiosInstance } from "@/lib/axios";
import { isJSON } from "@/utils/handler";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [json, setJSON]=useState('')
  const [ui, setUI]=useState('')
  const [isLoading, setLoading]=useState(false)

  const handleGenerateUI=()=>{
    if(!isJSON(json)){
      toast.error('Invalid JSON')
      return
    }
    setLoading(true)
    axiosInstance.post('/create',{json}).then((res)=>{
      setUI(res.data.text)
    }).catch((err)=>{
      console.log(err)
      toast.error('Error while generating UI')
    }).finally(()=>{
      setLoading(false)
    })
  }
  return (
    <div className="flex h-screen items-center gap-[2rem] justify-between p-24">
      <div className="flex flex-col gap-[1rem]">
        <h1 className="text-4xl font-semibold text-center">Generate Frontend from API</h1>
        <Editor onChange={(value)=>setJSON(value||"")}  height="60vh" width={'700px'} defaultLanguage="json" className="overflow-hidden" defaultValue="// some comment" />
        <button onClick={handleGenerateUI} className="text-black font-semibold w-full hover:opacity-80 bg-white h-[50px] rounded-lg flex items-center justify-center">
          {isLoading?'Loading...':'Generate UI'}
        </button>
      </div>


      <div dangerouslySetInnerHTML={{__html:ui}} className="text-black w-full">
      </div>
    </div>
  );
}

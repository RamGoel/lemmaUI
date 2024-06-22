'use client'
import { axiosInstance } from "@/lib/axios";
import { isJSON } from "@/utils/handler";
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
    <div className="flex h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-[1rem]">
        <h1 className="text-4xl font-semibold text-center">Generate Frontend from API</h1>
        <textarea onChange={(e)=>setJSON(e.target.value)} rows={16} placeholder="Paste your API Response" className="w-[700px] bg-slate-900 resize-none focus-visible:outline-0 p-4 rounded-lg" />
        <button onClick={handleGenerateUI} className="text-black font-semibold w-full hover:opacity-80 bg-white h-[50px] rounded-lg flex items-center justify-center">
          {isLoading?'Loading...':'Generate UI'}
        </button>
      </div>


      <div dangerouslySetInnerHTML={{__html:ui}} className="text-black">
      </div>
    </div>
  );
}

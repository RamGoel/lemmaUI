import React from 'react'
import { BsArrowRight, BsCode, BsEraser } from 'react-icons/bs'
import { LuRepeat } from 'react-icons/lu'

const UIAction = () => {
  return (
    <div className='flex items-center justify-start gap-[1rem]'>
        <button className='flex items-center justify-center h-[40px] gap-[.5rem] border-[1px] border-[#1e1e1e] rounded-lg min-w-[100px] px-4  hover:bg-[#1e1e1e]'>
            Convert <BsArrowRight />
        </button>
        <button className='flex items-center justify-center h-[40px] gap-[.5rem] border-[1px] border-[#1e1e1e] rounded-lg min-w-[100px] px-4  hover:bg-[#1e1e1e]'>
            Generate Again <LuRepeat />
        </button>

        <button className='flex items-center justify-center h-[40px] gap-[.5rem] border-[1px] border-[#1e1e1e] rounded-lg min-w-[100px] px-4  hover:bg-[#1e1e1e]'>
            Copy Code <BsCode />
        </button>

        <select className='flex items-center justify-center bg-transparent gap-[.5rem] border-[1px] border-[#1e1e1e] rounded-lg min-w-[100px] px-4 h-[40px] hover:bg-[#1e1e1e]'>
           <option value="chakra">Chakra UI</option>
           <option value="mui">Material UI</option>
           <option selected value="tailwind">Tailwind</option>
        </select>

        <button className='flex items-center justify-center h-[40px] gap-[.5rem] border-[1px] border-[#1e1e1e] rounded-lg min-w-[100px] px-4  hover:bg-[#1e1e1e]'>
            Clear <BsEraser />
        </button>
    </div>
  )
}

export default UIAction
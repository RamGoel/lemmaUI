import React from 'react'

const ResultUI = ({htmlCode}:{htmlCode:string}) => {
  return (
    <div className='flex items-center justify-center flex-1 h-[600px]'><div
    dangerouslySetInnerHTML={{
      __html:htmlCode,
    }}
    className="text-black bg-white w-full"
  ></div></div>
  )
}

export default ResultUI
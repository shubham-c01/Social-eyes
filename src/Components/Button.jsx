import React from 'react'

export  const   Button=({label})=> {
  return (
    <button className="bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 transition duration-300">{label}</button>
  )
}


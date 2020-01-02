import React from "react"

const SinGraph = () => {
  return(
    <g>
      <g className="Move">
        <path 
          className="Graph"
          d="M 0 99 C 36.42 99, 63.58 1 100 1, 
          S 163.58 99 200 99 
          c 36.42 1, 63.58 -99 100 -99"
        /> 
      </g>
      <rect x="-2" y="50.2" height="5" width="5" style={{fill:"#282c34"}}/>
    </g>
  )
}

const CosGraph = ()=>{
  return (
    <path
      className="Graph"
      stroke="white"
      fill="none"
      d="M 0 1 c36.42 1, 63.58 99, 100 98 S 163.58 1 200 1"
    />
  );
}

export {SinGraph, CosGraph}
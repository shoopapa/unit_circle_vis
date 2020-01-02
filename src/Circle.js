import React from "react"
//2.5*Math.sin(props.angle)*(props.l/Math.abs(props.l))+

const cos = Math.cos;
const sin = Math.sin;
const π = Math.PI;

const f_matrix_times = (( [[a,b], [c,d]], [x,y]) => [ a * x + b * y, c * x + d * y]);
const f_rotate_matrix = ((x) => [[cos(x),-sin(x)], [sin(x), cos(x)]]);
const f_vec_add = (([a1, a2], [b1, b2]) => [a1 + b1, a2 + b2]);

function f_svg_ellipse_arc([cx,cy],[rx,ry], [t1, Δ], φ ) {
  
  /* [
  returns a SVG path element that represent a ellipse.
  cx,cy → center of ellipse
  rx,ry → major minor radius
  t1 → start angle, in radian.
  Δ → angle to sweep, in radian. positive.
  φ → rotation on the whole, in radian
  url: SVG Circle Arc http://xahlee.info/js/svg_circle_arc.html
  Version 2019-06-19
  ] */
  Δ = Δ % (2*π);
  const rotMatrix = f_rotate_matrix (φ);
  const [sX, sY] = ( f_vec_add ( f_matrix_times ( rotMatrix, [rx * cos(t1), ry * sin(t1)] ), [cx,cy] ) );
  const [eX, eY] = ( f_vec_add ( f_matrix_times ( rotMatrix, [rx * cos(t1+Δ), ry * sin(t1+Δ)] ), [cx,cy] ) );
  const fA = ( (  Δ > π ) ? 1 : 0 );
  const fS = ( (  Δ > 0 ) ? 1 : 0 );
  return (
    <path 
      d={"M " + sX + " " + sY + " A " + [ rx , ry , φ / (2*π) *360, fA, fS, eX, eY ].join(" ")}
      className="Arc"
    />
  )
}

export default function Circle(props) {

  return (
    <div>
      <svg id="svg" width="30vw"  viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg ">
        <g> 
          <path className="Axis" d={"M "+(300-props.r)+" 300 h"+ 2*props.r}/> 
          <path className="Axis" d={"M300 "+ (300-props.r) +"  v" + 2*props.r}/>   
           {f_svg_ellipse_arc([300,300],[props.r*1/7,props.r*1/7],[0,-props.angle],0)}
        </g>
        <g >
          <path className="Sin" d={"M"+ (-2.5*Math.cos(props.angle)+props.l + 300 ) +" 302.5 v"+ -props.h+2}/> 
          <path className="Cos" d={"M 300 300 h"+ (2.5*(Math.sin(props.angle))*((Math.tan(props.angle))/(Math.abs(Math.tan(props.angle))))+ props.l)}/> 
        </g>
        <g id="Rot" style={{transform: "rotate("+ Math.atan2(-props.h,props.l) +"rad)"}} >
          <path className="Rad" d={"M300 300 h"+props.r}/> 
        </g>
        <g>
          <circle className="Circle" cx="300" cy="300" r={props.r} />
          <circle className="Pin" cx="300" cy="300" r={props.r*(1/40)}/>
        </g>
        <g>
        
        </g>
      </svg>
      
    </div>

  )
}
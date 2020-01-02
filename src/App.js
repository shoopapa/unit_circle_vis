import React from 'react';
import './App.css';
import Circle from "./Circle.js"
import {SinGraph, CosGraph} from "./Graph.js"
  
function getPos(el) {
  // yay readability
  for (var lx=0, ly=0;
       el != null;
       lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
  return {x: lx,y: ly};
}
const r = 295
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      x: 0, 
      y: 0, 
      angle: 0,
      angle2:0,
      h: 0,
      l: 0
    };

  }
  
  _onMouseMove(e) {
    const O = [document.documentElement.clientWidth/6, document.documentElement.clientHeight/2]
    this.setState({ 
      x: e.screenX-O[0], 
      y: O[1]-e.screenY+134 ,
      angle: Math.atan2( O[1]-e.screenY+134, e.screenX-O[0] ),
      angle2: Math.atan2( O[1]-e.screenY+134, e.screenX-O[0] ) > 0 ? Math.atan2( O[1]-e.screenY+134, e.screenX-O[0] ) : 2*Math.PI +Math.atan2( O[1]-e.screenY+134, e.screenX-O[0] )
    });
    this.getLength()
  }

  getLength() {
   const h = (r-2.25)*Math.sin(this.state.angle)
   const l = (r-2.25)*Math.cos(this.state.angle)
   this.setState({
     h: h,
     l: l
   })
  }

  renderSin() {
    return (
      <svg width="60vw" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <path className="Bar-sin" d={"M"+ this.state.angle2*100/Math.PI +" 50 v"+ -49*Math.sin(this.state.angle)}/>
        
        <path strokeWidth=".25" stroke="rgb(219, 102, 102)" d={"M 0 50 h200"}/>  
        <SinGraph />
        <rect x={this.state.angle2*100/Math.PI+.6} height="100" style={{fill:"#282c34"}} width="200"/>
      </svg>
    )
  }

  renderCos() {
    return (
      <svg width="60vw" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" >       
        <path className="Bar-cos" d={"M"+ ((this.state.angle2*100/Math.PI)) +" 50 v"+ -49*Math.cos(this.state.angle)}/>
       
        <path strokeWidth=".25" stroke="rgb(219, 102, 102)" d={"M 0 50 h200"}/>  
        <CosGraph />
        <rect x={this.state.angle2*100/Math.PI+.6} height="100" style={{fill:"#282c34"}} width="200"/>
      
      </svg>
    )
  }

  render() {
    return(
      <div className="App-header" onMouseMove={this._onMouseMove.bind(this)}>
        <Circle r={r} angle={this.state.angle} h={this.state.h} l={this.state.l}/>
        <div style={{padding:"3%"}}>
          {this.renderSin()}
        </div>
      </div>
    )
  }
}

export default App;
//<path style={{strokeWidth:1.5}}stroke = "white" fill = "none" d="M 0 1 c36.42 1, 65.38 99, 100 98 S 163.58 1 200 1" /> 
//<rect x={this.state.angle2*100/Math.PI+.6} height="100" style={{fill:"#282c34"}} width="200"/>
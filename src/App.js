import React from 'react';
import './App.css';
import Circle from "./Circle.js"
import {SinGraph, CosGraph} from "./Graph.js"
  
const r = 295
class TrigVis extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      angle: 0,
      angle2:0,
      h: 0,
      l: 0,
      cos:true
    };
  }
  
  _onMouseMove(e) {
    const data = this.getData(e);
    this.setState({ 
      angle: data.angle,
      angle2: data.angle2,
      h: data.h,
      l: data.l
    });
  }

  _onMouseClick(e) {
     const data = this.getData(e);
    this.setState(() => ({ 
      angle: data.angle,
      angle2: data.angle2,
      h: data.h,
      l: data.l,
     
    }));
  }

  getData(e) {
    const O = [document.documentElement.clientWidth/6, document.documentElement.clientHeight/2]
    const pos = [e.clientX-O[0],O[1]-e.clientY]
    const h = (r-2.25)*(pos[1]/(Math.sqrt(pos[1]**2 + pos[0]**2)))
    const l = (r-2.25)*(pos[0]/(Math.sqrt(pos[1]**2 + pos[0]**2)))
    const angle = Math.atan2( pos[1], pos[0] )
    const anglePos = Math.atan2( pos[1], pos[0] ) > 0 ? Math.atan2( pos[1], pos[0] ) : 2*Math.PI + Math.atan2( pos[1], pos[0] )
    return({
      h: h,
      l: l,
      angle: angle,
      angle2: anglePos
   
    })
  }

  renderSin() {
    return (
      <div >
      <svg  width="100%" viewBox="0 0 200 100" >
        <path className="Bar-sin" d={"M"+ this.state.angle2*100/Math.PI +" 50 v"+ -49*Math.sin(this.state.angle)}/>  
        <path strokeWidth=".25" stroke="rgb(219, 102, 102)" d={"M 0 50 h200"}/>  
        <SinGraph />
        <rect x={this.state.angle2*100/Math.PI+.6} height="100" style={{fill:"#282c34"}} width="200"/>
      </svg>
    </div>
    )
  }

  renderCos() {
    return (
      <div>
        <svg  width="100%"viewBox="0 0 200 100" >       
          <path className="Bar-cos" d={"M"+ ((this.state.angle2*100/Math.PI)) +" 50 v"+ -49*Math.cos(this.state.angle)}/>
          <path strokeWidth=".25" stroke="rgb(219, 102, 102)" d={"M 0 50 h200"}/>  
          <CosGraph />
          <rect x={this.state.angle2*100/Math.PI+.6} height="100" style={{fill:"#282c34"}} width="200"/>
        </svg>
      </div>
    )
  }

  render() {
    return(
      <div className="App-header" 
        onMouseMove={this._onMouseMove.bind(this)}
        onClick={this._onMouseClick.bind(this)}
      >
        <Circle r={r} angle={this.state.angle} h={this.state.h} l={this.state.l}/>
        <div className="Graph-div">
          {this.state.cos ? this.renderSin() : this.renderCos()}
        </div>
      </div>
    )
  }
}

export default TrigVis;
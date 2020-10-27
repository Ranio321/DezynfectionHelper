import { Line } from "react-konva";
import Konva from "konva";
import React, {useEffect, useRef, useState } from "react";
import params from "../Grid/GridConstants";
import { Line as LineType } from "konva/types/shapes/Line";
import { snapToGrid } from "../../Helpers/snapToGrid";

interface LineProps extends Konva.LineConfig {
  snapToGrid?: Boolean;
  setCurrentItemId?: (id: number) => any;
  onMouseOverColor?: string;
  type?: string
  uniqueId:number
  shouldSetItem?: boolean
  isSelected?: boolean
  stroke?: string
  currentItemId?: number

}
export default function CustomLine(props: LineProps) {
  const {onMouseOverColor, stroke} = props;
  const lineRef = useRef<LineType>(null);
  const [color, setColor] = useState(stroke);

  function onClick() {
    if(props.setCurrentItemId && props.shouldSetItem){ 
    props.setCurrentItemId(props.uniqueId);
    }
  }

  function onMouseOver() {   
   if(!props.isSelected)
   {
    setColor(onMouseOverColor);
   }
  }

  function onMouseLeave() {

   if(!props.isSelected)
   {
      setColor(stroke);
   }
  }
useEffect(()=>{
  if(!props.isSelected)
  {
    setColor(stroke);
  }

},[props.isSelected])

  return (
    <Line
      key={props.uniqueId}
      points={props.snapToGrid ? snapToGrid(props.points) : props.points}
      stroke={color}
      strokeWidth={params.width / 8}
      ref={lineRef}
      onClick={() => onClick()}
      onMouseOver = {() => onMouseOver()}
      onMouseLeave = {() => onMouseLeave()}
    />
  );
}



import { Layer, Line, Stage, Text } from "react-konva";
import Konva from 'konva'
import React, { useEffect, useMemo } from 'react';
import params from '../Grid/GridConstants'
import { snapSize } from "../../Constants/SnapConstatns";

interface LineProps extends Konva.LineConfig{
    snapToGrid: Boolean

}
function CustomLine(props: LineProps)
{

function snapToGrid(points: number[]) : number[]
{
    let startX = Math.round(points[0] / snapSize) * snapSize;
    let startY = Math.round(points[1] / snapSize) * snapSize;
    let endX = Math.round(points[2] / snapSize) * snapSize;
    let endY = Math.round(points[3] / snapSize) * snapSize;
    return [startX, startY, endX, endY];
}

return (<Line key = {props.key} points = {props.snapToGrid? snapToGrid(props.points): props.points} stroke = {props.stroke}  strokeWidth = {params.width/10} />);
}

export default React.memo(CustomLine);
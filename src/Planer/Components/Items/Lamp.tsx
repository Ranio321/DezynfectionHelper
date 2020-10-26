import React, { useEffect, useState } from 'react'
import { Rect } from 'react-konva'
import { MousePosition, Point } from '../../PlanerTypes'
interface LampProps
{
mousePosition: MousePosition
height: number;
width: number;
}

export default function Lamp(props: LampProps): JSX.Element
{
    const [lampPosition, setLampPosition] = useState<Point>({x:0, y: 0});
    const {mousePosition, height, width} = props;

    useEffect(()=>{
        let x = mousePosition.x - width/2;
        let y = mousePosition.y - height/2;
        setLampPosition({x:x, y:y});
    },[mousePosition]);

return <Rect fill = "#03cffc"  height = {height} width = {width} x = {lampPosition.x} y = {lampPosition.y} stroke = "black"/>
}
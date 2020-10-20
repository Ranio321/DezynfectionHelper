import React from 'react'
import { Layer, Rect } from 'react-konva';
import params from './GridConstants'

interface GridProps{
    width: number,
    height: number

}
export default function Grid(props:GridProps):JSX.Element
{
    const {width, height} = props;

        const squares  = [];
        for(var x = 0; x < width; x = x + 50)
        {
            for(var y = 0; y < height; y = y + 50)
            {
            squares.push(
                <Rect x = {x} y = {y} {...params}/>
            )
            }
        }

    return <Layer >{squares}</Layer>
}
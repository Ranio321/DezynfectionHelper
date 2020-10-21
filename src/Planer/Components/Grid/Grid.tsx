import { strict } from 'assert';
import React from 'react'
import { Layer, Line, Rect } from 'react-konva';
import params from './GridConstants'

interface GridProps{
    width: number,
    height: number

}
function Grid(props:GridProps):JSX.Element
{
    const {width, height} = props;

        
        function generateGrid()
        {
            let gridParams = params;
            const squares  = [];
            
            for(let x = 0; x < width; x = x + params.width)
            {
                
                for(var y = 0; y < height; y = y + params.height)
                {

                squares.push(
                    <Rect key = {squares.length} x = {x} y = {y} {...gridParams}/>
                )
                }
            }
            return squares;
        }
        

        

    return <Layer>{generateGrid()}</ Layer>
}
export default React.memo(Grid);
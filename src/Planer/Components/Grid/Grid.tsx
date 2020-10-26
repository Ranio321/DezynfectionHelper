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
        

        function generateGrid2()
        {
            const lines = []
            let position = 0;
            for(let x = 0; x < width/params.height; x++ )
            {
                let strokeWidth = params.strokeWidth
                if(x % 5 === 0)
                {
                    strokeWidth = strokeWidth * 4;
                }
                lines.push(<Line points = {[position, 0, position, height]} stroke = "black" strokeWidth = {strokeWidth}/>)
                position = position + params.height;
            }
            position = 0;
            for(let x = 0; x < width/params.height; x++ )
            {
                let strokeWidth = params.strokeWidth
                if(x % 5 === 0)
                {
                    strokeWidth = strokeWidth * 4;
                }
                lines.push(<Line points = {[0, position, width, position]} stroke = "black" strokeWidth = {strokeWidth} />)
                position = position + params.height;
            }
            return lines;
        }
        

    return <Layer>{generateGrid2()}</ Layer>
}
export default React.memo(Grid);
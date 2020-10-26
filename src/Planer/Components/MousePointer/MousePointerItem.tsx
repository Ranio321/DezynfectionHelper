import React from 'react'
import { MousePosition } from '../../pointsModels'
import { itemList } from '../Sidebar/SidebarItems/Items';
import CirclePointer from './CirclePointer'
import { PointerType } from './PointerType';
interface MousePointerItemProps{
mousePosition : MousePosition
mouseItem: string
}

export default function MousePointerItem(props:MousePointerItemProps): JSX.Element
{
    const {mousePosition, mouseItem} = props;
    let pointer = <></>;
    switch (mouseItem){
        case itemList.wall :
        pointer =  <CirclePointer mousePosition = {mousePosition}/>

    }

return pointer;
}
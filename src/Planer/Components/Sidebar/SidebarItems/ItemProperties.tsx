import React from 'react'
import { Item } from '../../../pointsModels'
import './ItemProperties.scss'
import '../Sidebar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
interface ItemPropertiesProps{
    item?: Item
    onWallDelete: (id: number) => any
}

export default function ItemProperties(props:ItemPropertiesProps): JSX.Element
{
    const {item} = props;
return (<><div
    id = "sidebarButton">
      Item properties</div>
<div id = "itemProperties">
    <div id = "text"> X1</div>
    <input id = "input" value = {item?.position.start.x}></input>
    <div id = "text" > Y1</div>
    <input id = "input" value = {item?.position.start.y}></input>
    <div id = "text"> X2</div>
    <input id = "input" value = {item?.position.end.x}></input>
    <div id = "text"> Y2</div>
    <input id = "input" value = {item?.position.end.y}></input>
    <br/>
    <FontAwesomeIcon className = "trash" icon={faTrashAlt} size="lg" onClick = {() => {props.onWallDelete(props.item?.id!)}}/>
</div>
</>)
}
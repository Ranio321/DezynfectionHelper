import React from 'react'
import Icon from './Items/Icon'
import { icons } from './Items/Icons'
import './OptionsSidebar.scss'
interface OptionsSidebarProps{
undo?:() => any,
delete?:() => any
}

export default function OptionsSidebar(props:OptionsSidebarProps){

    return <div id = "optionsBar"><Icon icon={icons.newFile} onClick ={props.delete}/>
    <Icon icon={icons.delete} />
    <Icon icon={icons.undo} onClick = {props.undo} /></div>
}
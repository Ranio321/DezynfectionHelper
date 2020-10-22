import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Icon.scss'
interface IconProps{
icon:IconProp
}

export default function(props:IconProps) : JSX.Element
{
    const {icon} = props;
    return  <div className = "OptionsIconDiv"><FontAwesomeIcon className = "OptionsIcon" icon={icon} size="2x"/></div>
}
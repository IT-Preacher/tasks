import React from "react"; 
import { Input } from "antd"; 
 
export const TextAreaField = (props) => { 
    const { TextArea } = Input; 
    return <TextArea rows={4} {...props.input} placeholder={props.placeholder}/>   
}
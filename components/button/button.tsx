import styles from "./button.module.scss";
import { FC, ReactNode } from 'react';

interface ButtonProps {
    title?:string,
    width?:string,
    height?:string,
    color?:string,
    background?:string,
    callBack?:() => void,
    border?:string,
    children?:ReactNode,
    padding?:string,
    position?: 'absolute' | 'fixed' | 'relative'
    bottom?:string,
    right?:string,
    margin?:string,
    fontWeight?:string,
    fontSize?:string,
    lineHeight?:string,
    letterSpacing?:string,
    zIndex?:number,
}

const Button:FC<ButtonProps> = ({title,width,height,callBack,color,background,border,children,padding,position,bottom,right,margin,fontWeight,fontSize,lineHeight,letterSpacing,zIndex}) => {
    return(
        <button className={styles.button} onClick={callBack ? () => callBack() : () => {}} style={{width,height,color,background,border,padding,position,bottom,right,margin,zIndex,fontWeight,fontSize,lineHeight,letterSpacing}}>
            {children}
        </button>
    )
}

export default Button;
import styles from "./button.module.scss";
import { FC } from 'react';
import { ButtonProps } from '@/types'


const Button:FC<ButtonProps> = (props) => {
    const { title,callBack,children,...styleCSS} = props;
    return(
        <button className={styles.button} onClick={callBack ? () => callBack() : () => {}} style={styleCSS}>
            {children}
        </button>
    )
}

export default Button;

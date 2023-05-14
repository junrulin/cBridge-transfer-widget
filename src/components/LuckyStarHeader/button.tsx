import { ReactNode } from 'react';
import styles from './button.module.scss';

type ButtonType =
  | 'round'
  | 'hollow'
  | 'solid'
  | 'pointed'
  | 'transparent'
  | 'small'
  | 'disabled'
  | 'invalid'
  | 'light';

/* eslint-disable-next-line */
export interface ButtonProps {
  className?: string;
  style?: object;
  children?: ReactNode;
  /**
   * @description Options: 'round' 'hollow' 'solid' 'pointed' 'transparent' 'small' 'invalid'
   */
  types?: ButtonType | Array<ButtonType> | string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  id?: string;
  disabled?: boolean;
}

export function Button(props: ButtonProps) {
  const types =
    typeof props?.types === 'string'
      ? props?.types.split(' ')
      : props?.types || ['solid', 'pointed'];
  return (
    <div
      className={`${styles['button']} ${props?.className || ''} ${props?.disabled ? styles['disabled']+' disabled' : ''}
       ${types
        .map((type) => styles?.[type] || '')
        .join(' ')}`}
      style={props?.style}
      onClick={props?.onClick}
      id={props?.id || ''}
    >
      {props?.children}
    </div>
  );
}

export default Button;

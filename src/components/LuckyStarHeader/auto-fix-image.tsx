import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import styles from './auto-fix-image.module.scss';
import CircularProgress from '@mui/material/CircularProgress';
import { Container } from '@mui/system';
/* eslint-disable-next-line */
export interface AutoFixImageProps {
  src: string; // image url
  className?: string;
  style?: object;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  alt?: string;
  placeHolder?: ReactNode; // place holder
  imgStyles?: object;
  imgClassName?: string;
  width?: string | number;
  height?: string | number;
  srcset?: string;
  size?: 'full' | 'fill-width' | 'fill-height';
  position?: 'top' | 'bottom' | 'center';
  id?: string;
}

export function AutoFixImage(props: AutoFixImageProps) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [src, setSrc] = useState<string>('');
  let { width, height, size, position, id } = props;
  width = typeof width === 'number' ? width + 'px' : width;
  height = typeof height === 'number' ? height + 'px' : height;
  size = size || 'full';
  position = position || 'center';
  useEffect(() => {
    setSrc(props.src);
  }, [props.src]);
  return (
    <div
      className={`${styles['container']} ${props?.className || ''}`}
      id={id || ''}
      style={{
        width: width,
        height: height,
        ...props?.style,
      }}
      onClick={props?.onClick}
    >
      {!loaded &&
        (props?.placeHolder || <div className={`${styles['loading-blur']}`} />)}
      <img
        onLoad={() => {
          setLoaded(true);
        }}
        src={src}
        alt={props?.alt || ''}
        style={props?.imgStyles}
        className={`${styles['image']} ${props?.imgClassName || ''} ${
          styles[size]
        } ${styles[position]} ${loaded && styles['loaded']}`}
      ></img>
    </div>
  );
}

export default AutoFixImage;

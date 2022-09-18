import s from './Skeleton.module.scss';
import { memo } from 'react';


type PropsType = {
   animation?: 'pulse' | 'wave' | false,
   children?: JSX.Element,
   height?: number | string,
   style?: object,
   variant: 'circular' | 'rectangular' | 'rounded' | 'text',
   width?: number | string,
}

const Skeleton = (props: PropsType) => {
  const {
    animation = 'pulse',
    height,
    style,
    variant = 'text',
    width,
    children
  } = props;
  return (
    <span
      className={
        `
        ${s.skeleton}
        ${animation && s[animation]}
        ${s[variant]}
        ${!width && s.without_width}
        ${!height && s.without_height}
        ${!!children && s.has_children}
        `
      }
      style={
        {
          height: typeof height === 'number' ? `${height}px` : height,
          width: width === 'string' ? `${width}px` : width,
          ...style,
        }
      }
    />
  )
}

export default memo(Skeleton)

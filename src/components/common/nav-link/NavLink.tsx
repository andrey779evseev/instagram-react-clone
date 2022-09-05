import * as React from "react";
import { Ref } from 'react';
import { NavLink as BaseNavLink } from "react-router-dom";


type PropsType = {
  activeClassName?: string
  activeStyle?: object
  className?: string
  style?: any
  to: string
  children?: JSX.Element
}

const NavLink = React.forwardRef<unknown, PropsType>(
  ({ activeClassName, activeStyle, to, ...props }, ref) => {
    return (
      <BaseNavLink
        ref={ref as Ref<HTMLAnchorElement> | undefined}
        {...props}
        to={to}
        className={({ isActive }) =>
          [
            props.className,
            isActive ? activeClassName : null,
          ]
            .filter(Boolean)
            .join(" ")
        }
        style={({ isActive }) => ({
          ...props.style,
          ...(isActive ? activeStyle : null),
        })}
      />
    );
  }
);


export default NavLink
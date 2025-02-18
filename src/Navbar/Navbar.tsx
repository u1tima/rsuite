import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';
import NavbarBody from './NavbarBody';
import NavbarHeader from './NavbarHeader';
import { prefix, defaultProps, createContext } from '../utils';
import { NavbarProps } from './Navbar.d';

export const NavbarContext = createContext(null);

class Navbar extends React.Component<NavbarProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    className: PropTypes.string,
    appearance: PropTypes.oneOf(['default', 'inverse', 'subtle']),
    as: PropTypes.elementType,
    hasChildContext: PropTypes.bool
  };
  static defaultProps = {
    hasChildContext: true,
    appearance: 'default'
  };

  render() {
    const {
      className,
      as: Component,
      hasChildContext,
      classPrefix,
      appearance,
      ...rest
    } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, addPrefix(appearance), className);

    return (
      <NavbarContext.Provider value={hasChildContext}>
        <Component {...rest} className={classes} role="navigation" />
      </NavbarContext.Provider>
    );
  }
}

const EnhancedNavbar = defaultProps<NavbarProps>({
  as: 'div',
  classPrefix: 'navbar'
})(Navbar);

setStatic('Header', NavbarHeader)(EnhancedNavbar);
setStatic('Body', NavbarBody)(EnhancedNavbar);

export default EnhancedNavbar;

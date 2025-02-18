/* eslint react/prop-types: 0 */

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setDisplayName from 'recompose/setDisplayName';
import wrapDisplayName from 'recompose/wrapDisplayName';
import setPropTypes from 'recompose/setPropTypes';
import { TypeAttributes } from '../@types/common';
import extendReactStatics from './extendReactStatics';
import { prefix, refType, SIZE, STATUS, COLOR } from '.';

export interface RequiredProps {
  className?: string;
  classPrefix?: string;
  innerRef?: React.Ref<any>;
  size?: TypeAttributes.Size;
  color?: TypeAttributes.Color;
  status?: TypeAttributes.Status;
}

interface Options {
  hasSize?: boolean;
  hasStatus?: boolean;
  hasColor?: boolean;
  defaultColor?: string;
}

function withStyleProps<T>(options: Options = {}) {
  return (BaseComponent): React.ComponentType<any> => {
    const { hasSize, hasStatus, hasColor, defaultColor } = options;

    const WithStyleComponent = React.forwardRef((props: RequiredProps & T, ref: React.Ref<any>) => {
      const { classPrefix, size, color, status, className, ...rest } = props;
      const addPrefix = prefix(classPrefix);
      const classes = classNames(className, {
        [addPrefix(size)]: hasSize && size,
        [addPrefix(color)]: hasColor && color,
        [addPrefix(defaultColor)]: !color,
        [addPrefix(status)]: hasStatus && status
      });

      return React.createElement(BaseComponent, {
        ...rest,
        ref,
        classPrefix,
        className: classes
      });
    });

    const propTypes: any = {
      innerRef: refType
    };

    if (hasSize) {
      propTypes.size = PropTypes.oneOf(SIZE);
    }

    if (hasColor) {
      propTypes.color = PropTypes.oneOf(COLOR);
    }

    if (hasStatus) {
      propTypes.status = PropTypes.oneOf(STATUS);
    }

    extendReactStatics(WithStyleComponent, BaseComponent);
    setPropTypes<any>(propTypes)(WithStyleComponent);

    if (process.env.RUN_ENV === 'test') {
      return setDisplayName(wrapDisplayName(BaseComponent, '__test__'))(WithStyleComponent);
    }

    return setDisplayName(wrapDisplayName(BaseComponent, 'withStyleProps'))(WithStyleComponent);
  };
}

export default withStyleProps;

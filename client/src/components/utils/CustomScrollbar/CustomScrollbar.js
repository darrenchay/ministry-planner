import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: 'rgba(140, 140, 140, 0.8)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

export const CustomScrollbar = props => (
    <Scrollbars
      renderThumbHorizontal={renderThumb}
      renderThumbVertical={renderThumb}
      {...props}
    />
  );

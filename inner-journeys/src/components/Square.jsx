import React from 'react';

const Square = ({ color, children }) => {
  const squareStyle = {
    backgroundColor: color,
    flexBasis: `calc(33.333% - 1px)`,
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '1vw',
    fontWeight: 'bold',
  };

  return <div style={squareStyle}>{children}</div>;
};

export default Square;

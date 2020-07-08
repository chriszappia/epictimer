import React, { useState } from 'react';

import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
 
export interface IProps {
  className: string,
};

export function TimerCanvas(props: IProps ) {
  // Declare a new state variable, which we'll call "count"

  return (
    <Stage width={100} height={100} className={props.className}>
      <Layer>
        { /* TODO a hook into here */ }
      </Layer>
    </Stage>
  );
}
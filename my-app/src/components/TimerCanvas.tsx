import React, { useState } from 'react';

import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
 
export interface IProps {
  className: string,
};

export function TimerCanvas(props: IProps ) {

  return (
    <Stage width={100} height={100} className={props.className}>
      <Layer>
      </Layer>
    </Stage>
  );
}
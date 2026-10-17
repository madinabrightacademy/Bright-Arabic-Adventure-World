import React from 'react';
import {
  BaseGameModal,
  BaseGameModalProps,
  GameFlowState,
  HowToPlayStep,
  VictorySummaryItem,
  BaseGameHelpers
} from './BaseGameModal';

export type {
  BaseGameModalProps,
  GameFlowState,
  HowToPlayStep,
  VictorySummaryItem,
  BaseGameHelpers
};

export type GameShellProps = BaseGameModalProps;

export const GameShell: React.FC<GameShellProps> = (props) => {
  return <BaseGameModal {...props} />;
};

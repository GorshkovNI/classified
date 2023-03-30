import React from 'react';
import { iconsTypes } from './Icon/IconType';

export const Icon = ({ name, className }) => {
  const IconComponent = iconsTypes[name];
  return IconComponent ? <IconComponent className={className} /> : null;
};
import React from 'react';
import { iconsTypes } from './Icon/IconType';

export const Icon = ({ name, className, onClick }) => {
  const IconComponent = iconsTypes[name];
  return IconComponent ? <IconComponent className={className} onClick={onClick} /> : null;
};
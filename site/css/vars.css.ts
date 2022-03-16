/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
import deepmerge from 'deepmerge';
import {
  createGlobalTheme,
  createGlobalThemeContract,
} from '@vanilla-extract/css';

import { Mode, tokens } from './tokens';
import { Theme } from './types';

const getVarName = (_value: string | null, path: string[]) => path.join('-');

const { colors, ...restTokens } = tokens;

const baseTokens: Omit<Theme, 'colors'> = restTokens;
const baseVars = createGlobalThemeContract(baseTokens, getVarName);
createGlobalTheme(':root', baseVars, baseTokens);

const makeColorScheme = (mode: Mode = 'light') => {
  const colors = tokens.colors[mode];

  return {
    colors: {
      ...colors,
    },
  };
};

const modeTokens = makeColorScheme('light');
const modeVars = createGlobalThemeContract(modeTokens, getVarName);
createGlobalTheme('[data-mode="light"]', modeVars, modeTokens);
createGlobalTheme('[data-mode="dark"]', modeVars, makeColorScheme('dark'));

type BaseVars = typeof baseVars;
type ModeVars = typeof modeVars;
type Vars = BaseVars & ModeVars;
export const vars = deepmerge(baseVars, modeVars) as Vars;

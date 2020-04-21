import baseStyled, { ThemedStyledInterface } from 'styled-components';
import lunchbox from './lunchbox';

export type LunchboxTheme = typeof lunchbox;
const styled = baseStyled as ThemedStyledInterface<LunchboxTheme> 

export default styled;
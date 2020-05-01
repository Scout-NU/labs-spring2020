import baseStyled, { ThemedStyledInterface } from 'styled-components';
import lunchbox from './lunchbox';

export type LunchboxTheme = typeof lunchbox;
/*
 * Whenever using styled components, be sure to import this as opposed to the classic "styled".
 * Otherwise, the component won't have access to the theme.
 */
const styled = baseStyled as ThemedStyledInterface<LunchboxTheme> 

export default styled;
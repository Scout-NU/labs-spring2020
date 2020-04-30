import { css } from "styled-components";

const BaseFlex = css`
    display: flex;
`

export const Column = css`
    ${BaseFlex};
    flex-direction: column;
`

export const Row = css`
    ${BaseFlex};
    flex-direction: row;
`

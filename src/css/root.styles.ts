import {css} from "@emotion/css";

export const layout = css`
    width: 1280px;
  margin: 32px auto;
`;
export const flex = (direction: FlexDirection = 'column', align: AlignItems = 'initial', justify: JustifyContent = 'initial', gap = '0px', ) => {
    return css`
      display: flex;
        justify-content: ${justify};
      flex-direction: ${direction};
    `;
}

export const createTaskFormInput = css`
    margin-bottom: 16px !important;
`

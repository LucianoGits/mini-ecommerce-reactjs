import styled, { css } from "styled-components";
// TODO: import css and styled components
// TODO: colors to variables
// TODO: use css module for media(mixin) and usage is ${({shrink})=> shrink && shrinkLableStyles}
// TODO: colors to variables

const subColor = "grey";
// const mainColor = 'black';

const shrinkLabelStyles = css`
  top: -14px;
  font-size: size 12px;
  color: $main-color;
`;

export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
  ${({ shrink }) => shrink && shrinkLabelStyles}
`;

export const Group = styled.div`
  position: relative;
  margin: 45px 0;

  input[type="password"] {
    letter-spacing: 0.3em;
  }
`;

export const FormInput = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ ${FormInputLabel} {
    @include ${shrinkLabelStyles};
  }
`;

// .group {

//   .form-input {

//   }

//   .form-input-label {

//   }
// }
// // &.shrink {
// //   @include shrinkLabel();
// // }

declare module 'react-input-mask' {
  import * as React from 'react';

  interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    maskChar?: string | null;
    alwaysShowMask?: boolean;
    beforeMaskedValueChange?: (
      newState: {
        value: string;
        selection: { start: number; end: number };
      },
      oldState: {
        value: string;
        selection: { start: number; end: number };
      },
      userInput: string,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      value: string;
      selection: { start: number; end: number };
    };
  }

  const ReactInputMask: React.FC<Props>;

  export default ReactInputMask;
}

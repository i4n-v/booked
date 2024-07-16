import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";

interface IErrorBoundary {
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal;
}

export { IErrorBoundary };

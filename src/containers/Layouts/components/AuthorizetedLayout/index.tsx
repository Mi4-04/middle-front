import { ReactElement, ReactNode } from "react";

type AuthorizedLayoutProps = {
  children: ReactNode;
};

export default function AuthroizedLayout({
  children,
}: AuthorizedLayoutProps): ReactElement {
  return (
    <>
      <h1> Auth layout</h1>
      {children}
    </>
  );
}

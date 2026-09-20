import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-container 2xl:max-w-[1645px] px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

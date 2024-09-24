import { PropsWithChildren } from "react";

const Title = ({ children }: PropsWithChildren) => {
  return <h1 className="text- text-lg font-bold text-gray-600">{children}</h1>;
};

export default Title;

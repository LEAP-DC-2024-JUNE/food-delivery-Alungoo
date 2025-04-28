import { ReactNode } from "react";
import Image from "next/image";

const ResetPassLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="flex h-screen">
        <div className="w-1/3 flex justify-center items-center">{children}</div>
        <div className="relative w-2/3 h-screen ">
          <Image
            src="/login.png"
            alt="Login"
            layout="fill"
            objectFit="cover"
            className="rounded-t-3xl rounded-b-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassLayout;

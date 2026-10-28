import { SignOutButton } from "@clerk/react";
import ExitIcon from "./icons/ExitIcon";

export default function Header() {
  return (
    <div className="w-full flex items-center justify-center h-10 border-b border-gray-300 border-dashed">
      <div className="max-w-(--max-width) flex justify-between w-full h-full px-5">
        <img src="/favicon.svg" className="py-1" />
        <SignOutButton>
          <ExitIcon
            className="my-auto w-7 h-7 p-1 hover:cursor-pointer hover:bg-white rounded-sm transition-colors duration-100"
            strokeWidth={1.8}
          />
        </SignOutButton>
      </div>
    </div>
  );
}

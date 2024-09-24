"use client";

import { useUserStore } from "@/hooks/useUserStore";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type UserInfoProps = {
  username: string;
};

const UserInfo = ({ username }: UserInfoProps) => {
  const logout = useUserStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer flex-row items-center">
          <User size={20} className="mr-2" />
          <span className="mr-3">{username}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-30">
        <div className="flex flex-col items-start border-none p-2">
          <Button
            className="border-none"
            variant="destructive"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserInfo;

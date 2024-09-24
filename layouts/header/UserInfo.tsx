"use client";

import { useUserStore } from "@/hooks/useUserStore";
import { User, ShieldCheck, LogOut } from "lucide-react";
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
  const isAdmin = useUserStore((state) => state.isAdmin);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleAdminAccess = () => {
    router.push("/items/new");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer flex-row items-center">
          <User size={20} className="mr-2" />
          <span className="mr-3">{username}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="flex flex-col items-start p-2">
          {isAdmin && (
            <Button
              variant="default"
              className="mb-2 flex w-full items-center justify-start space-x-2"
              onClick={handleAdminAccess}
            >
              <ShieldCheck />
              <span>Admin Panel</span>
            </Button>
          )}
          <Button
            variant="destructive"
            className="flex w-full items-center justify-start space-x-2"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserInfo;

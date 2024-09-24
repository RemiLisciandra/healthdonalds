"use client";

import { User } from "lucide-react";

type UserInfoProps = {
  username: string;
};

const UserInfo = ({ username }: UserInfoProps) => {
  return (
    <div className="flex flex-row items-center">
      <User size={20} className="mr-2" />
      <span className="mr-3">{username}</span>
    </div>
  );
};

export default UserInfo;

import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/images/healthdonalds.png"
      alt="Healthdonalds logo"
      width={60}
      height={60}
      priority
    />
  );
};

export default Logo;

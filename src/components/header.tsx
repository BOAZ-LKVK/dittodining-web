import Image from "next/image";

export const Header = () => {
  return (
    <header className="w-full p-4 flex justify-between items-center bg-white">
      <Image
        src="/logo.png"
        alt="logo"
        width={40}
        height={40}
        className="w-10 h-10"
      />
    </header>
  );
};

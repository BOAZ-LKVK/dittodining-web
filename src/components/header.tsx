import Image from "next/image";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/");
  };

  return (
    <header className="w-full p-5 flex justify-between items-center bg-white">
      <Image
        src="/logo.png"
        alt="logo"
        width={40}
        height={40}
        className="w-10 h-10 cursor-pointer"
        onClick={onClick}
      />
    </header>
  );
};

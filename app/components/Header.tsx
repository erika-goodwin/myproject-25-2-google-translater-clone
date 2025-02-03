import { auth } from "@clerk/nextjs/server";
import Link from "next/Link";
import Image from "next/Image";
import logoImage from "../assets/images/Google-Translate-Logo.png";
import { SignInButton, UserButton } from "@clerk/nextjs";

function Header() {
  const { userId } = auth();

  return (
    <header className="flex items-center justify-between px-8 border-b mb-5">
      <div className="flex items-center justify-center h-20">
        <Link href="/">
          <Image
            src={logoImage}
            alt="logo"
            width="100"
            height="100"
            className="cursor-pointer object-contain h-32"
          />
        </Link>
      </div>
      {userId ? <UserButton /> : <SignInButton />}
    </header>
  );
}

export default Header;

import Image from "next/image";
import { Spacer } from "../ui/spacer";
import { lazy, Suspense } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Settings } from "lucide-react";

const AuthButton = lazy(() =>
  import("../ui/authButton").then((mod) => ({ default: mod.AuthButton }))
);

export function HeroSection() {
  return (
    <div className="space-y-6 lg:flex lg:flex-row  items-center justify-center  md:flex-col ">
      <div>
        <h1 className="font-[family-name:var(--font-playwrite)]">
          Travel , Plan and Enjoy your trips
        </h1>

        <Spacer size={8} />
        <h2 className="font-[family-name:var(--font-playwrite)]">
          Save your best moments and destinations
        </h2>

        <Spacer size={8} />
        <div className="flex gap-4 md:items-center w-full md:flex-row flex-col">
          <Suspense>
            <AuthButton type="landingPage" />
          </Suspense>
          <Link href="#features">
            <Button
              variant="outline"
              classNameCustome="px-4 flex items-center gap-2 justify-center"
            >
              App Features <Settings size={15} />
            </Button>
          </Link>
        </div>
      </div>

      <Image
        className="w-full object-cover hidden md:h-[600px] md:block"
        src={"/travel.png"}
        alt="hero"
        width={600}
        height={600}
      />

      <Spacer md={6} />
    </div>
  );
}

/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import { Button } from "~/components/ui/button";
import HeroGraphics from "~/assets/hero-graphics.png";
import { Link } from "react-router";

export default function Hero() {
  return (
    <div className="relative grid grid-cols-10 grid-rows-8 gap-0
      w-[1000px] h-[800px]
      border-b border-r
      bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] 
      bg-[size:100px_100px]"
    >
      <img className="z-0 absolute bottom-0" src={HeroGraphics} />
      <div className="flex flex-col border-t border-l items-center gap-6 p-12 bg-black col-start-3 col-span-6 row-start-1 row-span-3">
        <h1 className="z-1 text-5xl font-medium tracking-tight">Never shop boring again.</h1>
        <p className="z-1 text-muted-foreground w-100 text-center">Neomall turns shopping into discovery, offering only the most captivating products for people who want more than the ordinary.</p>
        <div className="z-1 flex flex-row gap-6">
          <Link to="/login">
            <Button size="lg" className="rounded-full cursor-pointer">Start Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
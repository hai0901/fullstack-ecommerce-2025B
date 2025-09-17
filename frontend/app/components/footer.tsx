/*
 * RMIT University Vietnam
 * Course: COSC2769 - Full Stack Development
 * Semester: 2025B
 * Assessment: Assignment 02
 * Author: Le Duc Trung, Nguyen Huy Anh
 * ID: s3979718, s3956092
 */

import logoIcon from "~/assets/neomall-darkmode-logo-icon.svg";
import { Button } from "./ui/button";
import { Link } from "react-router";

export default function Footer() {
  return (
    <div className="flex w-screen place-content-center border-t h-24">
      <footer className="flex max-w-[1448px] gap-6 items-center tracking-tight font-light">
        <Link to="/">
          <img className="transition duration-300 brightness-50 hover:brightness-100 cursor-pointer" width={24} src={logoIcon}/>
        </Link>
        <div className="flex gap-3">
          <Link to="/about">
            <Button className="text-muted-foreground hover:text-white" variant="link">About</Button>
          </Link>
          <Link to="/copyright">
            <Button className="text-muted-foreground hover:text-white" variant="link">Copyright</Button>
          </Link>
          <Link to="/privacy">
            <Button className="text-muted-foreground hover:text-white" variant="link">Privacy</Button>
          </Link>
          <Link to="/help">
            <Button className="text-muted-foreground hover:text-white" variant="link">Help</Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
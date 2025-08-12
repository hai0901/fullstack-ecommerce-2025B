import { ModeToggle } from "~/components/mode-toggle";


export default function Playground() {
  return (
    <div className="w-screen h-screen">
      <ModeToggle />
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Playground</h1>
    </div>
  )
}
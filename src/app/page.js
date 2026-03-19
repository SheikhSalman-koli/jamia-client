import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function Home() {

  // const users = await fetch('http://localhost:5000/users')

  // const {data} =await users.json()

  // console.log(data);

 
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <Button>Click me</Button>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import HomeBanner from "@/myComponents/homepage/Banner";
import Image from "next/image";

export default async function Home() {

  // const users = await fetch('http://localhost:5000/students')

  // const {data} =await users.json()

  // console.log(data);

 
  return (
    <div>
      <HomeBanner />
    </div>
  );
}

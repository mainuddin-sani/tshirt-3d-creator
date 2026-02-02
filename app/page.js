"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <h1>3D T-Shirt Designer</h1>
      <button onClick={() => router.push("/editor")}>Start Design</button>
    </div>
  );
}

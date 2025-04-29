import Link from "next/link";
import CardCom from "./components/CardCom";
import React, { StrictMode } from "react";

export default async function Home() {

  return (
    < StrictMode>
    <div className="max-w-5xl w-full m-auto">
      <Link href={"/csr-fetch"}>CSR Fetch Sayfas</Link>
      <h1 className="text-3xl font-semibold text-cyan-600">New Arrivals</h1>
      <CardCom/>
      <h1 className="text-3xl font-semibold text-cyan-600">Trending Items</h1>
      <CardCom/>
      <h1 className="text-2xl font-semibold text-cyan-600">Last Seen</h1>
      <CardCom/>
    </div>
    </StrictMode>
  );
}


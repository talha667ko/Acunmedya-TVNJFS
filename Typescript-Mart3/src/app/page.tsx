import Link from "next/link";
import CardCom from "./_components/CardCom";
import React, { StrictMode } from "react";

export default async function Home() {

  return (
    < StrictMode>
    <div className="max-w-5xl w-full m-auto flex flex-col items-center">
      <Link href={"/csr-fetch"}>CSR Fetch Sayfas</Link>
      <h1 className="text-3xl font-semibold text-cyan-600 mt-12 mb-3">New Arrivals</h1>
      <CardCom/>
      <h1 className="text-3xl font-semibold text-cyan-600 mt-12 mb-3">Trending Items</h1>
      <CardCom/>
      <h1 className="text-3xl font-semibold text-cyan-600 mt-12 mb-3">Last Seen</h1>
      <CardCom/>
    </div>
    </StrictMode>
  );
}


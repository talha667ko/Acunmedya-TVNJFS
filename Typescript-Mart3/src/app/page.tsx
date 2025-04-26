import Link from "next/link";
import CardCom from "./components/CardCom";
import React, { StrictMode } from "react";

export default async function Home() {

  return (
    < StrictMode>
    <p>Ana Sayfa</p>
    <Link href={"/csr-fetch"}>CSR Fetch Sayfası</Link>
    <CardCom/>
    </StrictMode>
  );
}


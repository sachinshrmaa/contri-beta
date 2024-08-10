import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <div className="container py-4">
      <h1>Contri</h1>
      <p>Contri is a platform for managing group projects.</p>
      <Link href="/login" className="underline">
        Login
      </Link>
    </div>
  );
}

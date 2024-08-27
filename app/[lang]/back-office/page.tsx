"use client";
import { useRouter } from "next/navigation";

export default function BackOffice() {
  const router = useRouter();
  router.replace("/EN/back-office/pages/languages");
  return (
    <></>
  );
}

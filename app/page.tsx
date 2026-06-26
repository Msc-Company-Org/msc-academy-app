import { redirect } from "next/navigation";

// Por enquanto o app é o painel (CRM). A vitrine/funil migram pra cá na Fase C.
export default function Home() {
  redirect("/painel");
}

import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const session = await getToken({ req, secret });

  // Definisci quali percorsi sono protetti
  const protectedRoutes = [
    "/admin/",
    "/admin/immagini",
    "/admin/sezioni",
    "/admin/sito",
    "/admin/corsi",
    "/api"
  ];

  // Controlla se il percorso richiesto è uno dei percorsi protetti
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/sign-in"; // Reindirizza alla pagina di login
      return NextResponse.redirect(url);
    }
  }

  // Permetti alla richiesta di proseguire se non richiede protezione o se la sessione è valida
  return NextResponse.next();
}

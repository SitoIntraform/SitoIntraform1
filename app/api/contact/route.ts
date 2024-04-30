import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const body = await req.json();

    const { nome, telefono, email, messaggio, corso } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "sitointraform@gmail.com", // La tua email Gmail
        pass: "pwlw zpxj xrlv saej", // Password per app
      },
    });

    const text = `Nuovo messaggio di contatto sul sito di intraform\nDa: ${nome}\nTelefono:${telefono}\nEmail:${email}\n${
      corso ? `Corso: ${corso}` : ""
    }\nMessaggio:\n${messaggio}`;

    const mailOptions = {
      from: "sitointraform@gmail.com",
      to: "giaco.ruetta@gmail.com", // destinatario dell'email
      subject: `${nome} ti ha contattato dal sito di intraform`, // Oggetto dell'email
      text, // Testo dell'email
    };

    const info = await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Errore nell'invio dell'email:", error);
        return new NextResponse("Errore nell'invio della email", {
          status: 500,
        });
      } else {
        console.log("Email inviata: " + info.response);
      }
    });

    return NextResponse.json("Email inviata con successo");
  } catch (err: any) {
    console.log("ERROR_PAGES_POST", err);
    return new NextResponse(err, { status: 400 });
  }
}

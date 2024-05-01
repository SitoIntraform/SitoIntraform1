"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import axios from "axios";
import { Check, DoorClosed, LogOut } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

function PrivacyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      open={isOpen}
      title="Informativa privacy"
      containerClass=""
      body={
        <>
          <div>
            <p className="text-center font-bold">
              Informativa privacy ai sensi degli artt. 13-14 del Regolamento
              Europeo “Privacy” (GDPR)
            </p>
            <p>
              I dati personali da Lei inseriti, sono trattati dal proprietario
              del sito Associazione Intraform – Agenzia Formativa accreditata
              Regione Piemonte - Via Bignone E. 85/12 - 10064 Pinerolo (TO) -
              +390121305343 in qualità di Titolare, per finalità connesse alla
              fornitura dei servizi da Lei richiesti (a titolo esemplificativo:
              richiedere informazioni, registrarsi al sito per ricevere vantaggi
              e offerte, ottenere preventivi, effettuare pagamenti, acquistare
              beni e riceverli presso un domicilio da Lei indicato, effettuare
              una prenotazione, scambiare documenti). Inoltre, i dati da Lei
              forniti, potrebbero essere trattati, solo su Suo esplicito
              consenso, al fine di inviarLe comunicazioni di natura commerciale
              via email o sms relativamente ai servizi offerti dal Titolare. Nel
              primo caso, la base giuridica del trattamento è l’esecuzione di un
              accordo; nel secondo caso è il consenso. I trattamenti avverranno
              con modalità elettroniche e verranno messi a disposizione delle
              terze parti (Responsabili Esterni del trattamento) nell’ambito
              dell’Unione Europea o in Paesi extra UE, regolarmente
              contrattualizzate e che offrono adeguate garanzie di sicurezza,
              necessarie per la fornitura di servizi essenziali al
              soddisfacimento delle Sue esigenze. Tali Responsabili Esterni, il
              cui elenco è disponibile dietro richiesta, possono appartenere a
              categorie di soggetti che supportano il Titolare nell’erogazione
              dei servizi offerti tramite il presente sito (quali, a titolo
              esemplificativo: sviluppatori software e gestori di siti web,
              spedizionieri).
            </p>
            <div className="h5Mobile my-[10px] text-center">COOKIE POLICY</div>
            <p>
              Questo Sito utilizza solo cookie tecnici (ovvero cookie
              necessari).
            </p>
            <div className="h5Mobile my-[10px] text-center">
              Cosa sono i cookies
            </div>
            <p>
              I cookies sono piccoli file di testo che vengono automaticamente
              posizionati sul PC del navigatore all&apos;interno del browser.
              Essi contengono informazioni di base sulla navigazione in Internet
              e grazie al browser vengono riconosciuti ogni volta che
              l&apos;utente visita il sito. Di seguito vengono forniti dettagli
              sui cookie installati da questo sito e indicazioni su come gestire
              le preferenze in merito ad essi.
            </p>
            <div className="h5Mobile my-[10px] text-center">
              A cosa servono i cookies
            </div>
            <p>
              I cookie sono utili in quanto consentono di memorizzare le
              preferenze di navigazione dell’utente e quindi personalizzare il
              sito, secondo le sue esigenze migliorando le esperienze di
              navigazione degli utenti. I cookie possono ad esempio rendere più
              immediato l’utilizzo del Sito e/o abilitare determinate
              funzionalità. Ad esempio, i cookie possono permettere di evitare
              di reinserire le stesse informazioni più volte durante la visita.
              In determinati casi, inoltre, i cookie possono fare in modo che le
              pubblicità visualizzate online siano più adeguate all’utente o
              pertinenti ai suoi interessi. Alcuni cookie sono necessari alla
              corretta erogazione del Sito o utili per una fruizione
              personalizzata degli stessi; in questo caso, la loro inibizione
              potrebbe compromettere alcune funzionalità dei Sito. Inoltre,
              grazie ai cookie, si possono pubblicare sul Sito stesso,
              direttamente o tramite terzi, inserzioni pubblicitarie in linea
              con i tuoi interessi, dedotti sulla base delle tue attività online
              e delle tue abitudini di navigazione.
            </p>
            <div className="h5Mobile my-[10px] text-center">
              Quali categorie di cookie sono utilizzate sul Sito
            </div>
            <div className="h6Mobile my-[10px] text-center">
              Cookie tecnici ovvero necessari
            </div>
            <p>
              I cookie tecnici descritti qui di seguito non richiedono consenso
              e pertanto vengono installati automaticamente a seguito
              dell’accesso al sito.
            </p>
            <p>
              <span>- Cookie necessari al funzionamento:</span> cookies che
              permettono al sito di funzionare correttamente anche consentendo
              all’utente di avere un’esperienza di navigazione funzionale. Ad
              esempio, mantengono l&apos;utente collegato durante la navigazione
              evitando che il sito richieda di collegarsi più volte per accedere
              alle pagine successive.
            </p>
            <div>
              Ricordati che puoi gestire le tue preferenze sui cookie anche
              attraverso il browser
            </div>
            <p>
              Si riportano di seguito istruzioni di maggior dettaglio per la
              gestione dei cookie da parte dell’utente per i browser più
              diffusi. I produttori dei browser potrebbero aggiornare o
              modificare i riferimenti dei link sottostanti di volta in volta,
              per cui si raccomanda di verificare sempre le istruzioni fornite
              dai produttori dei browser di navigazione utilizzati per
              comprendere come impostare i cookie.
            </p>
          </div>
        </>
      }
      bodyContainerClass="regular-normal"
      footer={<></>}
      footerContainerClass=""
      onClose={onClose}
    />
  );
}

export default PrivacyModal;

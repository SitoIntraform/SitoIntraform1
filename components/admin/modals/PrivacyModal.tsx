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
            <p className="text-center font-bold">Informativa privacy ai sensi degli artt. 13-14 del Regolamento Europeo “Privacy” (GDPR)</p>
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
              spedizionieri). Inoltre, saranno trattati per finalità di analisi
              statistiche e di marketing diretto, in maniera anonima, come
              meglio specificato dalla cookie policy. Per modificare o
              cancellare i soli dati che sono archiviati sui sistemi che erogano
              il presente sito, cliccare qui. Le informazioni da lei inserite
              nel form (compreso il suo indirizzo email) potranno essere
              comunicate a una società terza che agirà in qualità di
              Responsabile esterno e che supporta il Titolare nella gestione del
              sito e nell’evasione della sua richiesta. Nel caso di richiesta di
              cancellazione dei suoi dati, La informiamo che potrebbe non essere
              più possibile continuare a fornirLe il servizio richiestoci. La
              informiamo, infine, che potrà proporre reclamo all’Autorità
              Garante per la Protezione dei Dati, qualora ritenesse siano stati
              violati i suoi diritti.
            </p>
            <div className="h5Mobile my-[10px] text-center">COOKIE POLICY</div>
            <p>
              Questo Sito utilizza cookie tecnici (ovvero cookie necessari), e
              con il tuo consenso anche cookie analitici e di profilazione, che
              utilizzeremo noi e terze parti, utili rispettivamente per
              consentire alcune funzionalità fondamentali per il Sito, per
              ottenere misurazioni delle perfomance del Sito stesso o per
              fornirti indicazioni promozionali in linea con i tuoi interessi.
              Per accettare, rifiutare o selezionale i cookie in base alle
              finalità, utilizza i comandi presenti nel popup banner per la
              gestione dei cookie. In particolare, per sapere quali cookie
              vengono installati tramite il presente sito ed esprimere le tue
              preferenze a riguardo, seleziona il comando “ “Dettagli” dove è
              possibile anche visualizzare i singoli cookie rilasciati in ogni
              categoria. Per selezionare le finalità di tuo interesse utilizza
              il box riportato nel banner, e clicca su “Personalizza” per
              confermare le tue preferenze. Le tue preferenze verranno
              registrate in un’apposita piattaforma di gestione del consenso ai
              cookie (la &quot;CMP&quot;), sviluppata in conformità ai principi
              della normativa sul trattamento dei dati personali applicabile
              secondo le linee guida per consentire all’utente di esercitare le
              sue scelte in maniera granulare. La CMP consente di prestare o
              negare il consenso a varie tipologie di cookie, che sono
              identificate e classificate sulla base delle finalità per le quali
              i cookie vengono rilasciati e utilizzati, rendendo più semplice ed
              immediato il loro riconoscimento. Puoi in qualunque momento
              revocare o modificare il consenso rilasciato, cliccando sulla
              relativa icona di accesso alla CPM che apparirà sul Sito. Tale
              icona verrà visualizzata in basso a sinistra, una volta che avrai
              espresso le tue preferenze tramite il pop up banner visualizzato,
              nel momento in cui accedi al Sito stesso. I cookies utilizzati in
              questo Sito rientrano nelle categorie descritte di seguito.
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
            <div>1 - Cookie tecnici ovvero necessari</div>
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
            <p>
              <span>
                - Cookie Statistici e di Misurazione dell&apos;audience:
              </span>
              cookie che aiutano a capire, attraverso dati raccolti in forma
              anonima e aggregata, come gli utenti interagiscono con il Sito
              internet fornendo informazioni relative alle sezioni visitate, il
              tempo trascorso sul sito, eventuali malfunzionamenti.
            </p>
            <p>
              Per esempio, in alcuni casi i cookie di Google Analytics
              utilizzati da questo sito, sono stati resi anonimi e quindi sono
              equivalenti a cookie tecnici.
            </p>
            <div className="h5Mobile my-[10px] text-center">
              2 – Cookie Funzionali
            </div>
            <p>
              In questa categoria rientrano i cookie che permettono di ricordare
              le preferenze selezionate durante la navigazione, ad esempio,
              consentono di impostare la lingua. Questi cookie sono rilasciati
              soltanto su richiesta dell’utente e mediante suo preventivo
              consenso. L&apos;utente è libero di prestare il proprio consenso
              all&apos;installazione dei cookie funzionali e revocarlo in
              qualsiasi momento, tramite la CMP, senza che la possibilità di
              visitare il Sito e fruire dei suoi contenuti sia compromessa;
              tuttavia, se non acconsentissi a questi cookie potrebbe essere
              pregiudicato l’utilizzo di alcune funzionalità. Puoi accedere, in
              qualunque momento, alla CMP tramite l’icona presente sul Sito,
              dove troverai il riepilogo dei consensi rilasciati che potrai
              modificare cliccando sul pulsante “Modifica consenso”; a questo
              punto si aprirà una schermata che ti permette di modificare le tue
              preferenze scegliendo le categorie di tuo interesse e tramite il
              pulsante “Dettagli” puoi conoscere quali cookie funzionali sono
              rilasciati sul Sito, la loro finalità e la durata. Una volta fatta
              la tua scelta, per confermarla clicca sul pulsante “Personalizza”.
            </p>
            <div className="h5Mobile my-[10px] text-center">
              3 – Cookie Analitici
            </div>
            <p>
              I cookie di questa categoria vengono utilizzati per raccogliere
              informazioni statistiche, in forma non aggregata, sull&apos;uso
              del Sito da parte degli utenti che accedono al Sito stesso e sul
              modo in cui questi navigano sul Sito. Come previsto dalla
              normativa applicabile, per l&apos;installazione di cookie
              analitici di terze parti è richiesto il preventivo consenso
              dell&apos;utente. Nel caso in cui presti il tuo consenso
              all&apos;installazione dei cookie analitici, il Titolare terrà
              traccia di tale consenso attraverso un cookie tecnico specifico.
              In questo modo, sarà possibile evitare di riproporre il cookie
              banner durante le future visite al Sito. Puoi accedere, in
              qualunque momento, alla CMP tramite l’icona presente sul Sito,
              dove troverai il riepilogo dei consensi rilasciati che potrai
              modificare cliccando sul pulsante “Modifica consenso”; a questo
              punto si aprirà una schermata che ti permette di modificare le tue
              preferenze scegliendo le categorie di tuo interesse e tramite il
              pulsante “Dettagli” puoi conoscere quali cookie analitici sono
              rilasciati sul Sito ed ottenere così tutte le informazioni
              necessarie. Una volta fatta la tua scelta, per confermarla clicca
              sul pulsante “Personalizza”.
            </p>
            <div className="h5Mobile my-[10px] text-center">
              4 – Cookie di Profilazione
            </div>
            <div>
              I cookie di profilazione vengono utilizzati per raggruppare gli
              utenti in categorie omogenee in base, ad esempio, alle preferenze
              dell&apos;utente. Tali cookie possono essere utilizzati, tra
              l’altro, per inviare messaggi pubblicitari conformi al
              comportamento dell’utente in rete ed ai suoi interessi di
              navigazione. In conformità con la normativa applicabile, è
              necessario il previo consenso degli utenti per
              l&apos;installazione dei cookie di profilazione. L’utente è libero
              di prestare il proprio consenso all&apos;installazione dei cookie
              di profilazione e revocarlo in qualsiasi momento, tramite la CMP
              senza che la possibilità di visitare il Sito e fruire dei suoi
              contenuti sia compromessa. Nel caso in cui l’utente presti il suo
              consenso all&apos;installazione dei cookie di profilazione, il
              Titolare terrà traccia di tale consenso attraverso un cookie
              tecnico specifico. In questo modo, sarà possibile evitare di
              riproporre il cookie banner durante le future visite al Sito. I
              cookie di profilazione sono installati dal Titolare e da soggetti
              terzi, che agiscono in qualità di autonomi titolari del
              trattamento dei dati (cookie di terze parti). Puoi accedere, in
              qualunque momento, alla CMP tramite l’icona presente sul Sito,
              dove troverai il riepilogo dei consensi rilasciati che potrai
              modificare cliccando sul pulsante “Modifica consenso”; a questo
              punto si aprirà una schermata che ti permette di modificare le tue
              preferenze scegliendo le categorie di tuo interesse e tramite il
              pulsante “Dettagli” di ottenere maggiori informazioni sulle terze
              parti che installano i cookie di profilazione, sui singoli cookie
              rilasciati e sulla loro durata. Una volta fatta la tua scelta, per
              confermarla clicca sul pulsante “Personalizza”. Inoltre, accedendo
              alla pagina{" "}
              <a
                href="http://www.youronlinechoices.com/it/le-tue-scelte"
                target="_blank"
              >
                http://www.youronlinechoices.com/it/le-tue-scelte
              </a>{" "}
              è possibile informarsi sulla pubblicità comportamentale oltre che
              disattivare o attivare i cookie delle società elencate che
              lavorano con i gestori dei siti web per raccogliere e utilizzare
              informazioni utili alla fruizione della pubblicità.
            </div>
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

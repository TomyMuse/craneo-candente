import Image from "next/image";
import Link from "next/link";

const roomPreview = [
  { name: "SALA 1", note: "Marshall DSL100H / Ampeg SVT-CL / Pearl Masters" },
  { name: "SALA 2", note: "Vox AC30 C2 / Fender Bassman / Gretsch Renown" },
  { name: "SALA 3", note: "EVH 5150 III / Orange Rocker / Tama Starclassic" },
  { name: "SALA 4", note: "Roland JC-120 / Hartke HD500 / Yamaha Stage" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#09090a] text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-[#070708]/95 backdrop-blur">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Craneo Candente" width={46} height={46} priority />
            <div>
              <p className="brand-display text-2xl leading-none">CRANEO</p>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--accent)]">CANDENTE</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.14em] text-zinc-300 md:flex">
            <a href="#salas" className="hover:text-white">Salas</a>
            <a href="#contacto" className="hover:text-white">Contacto</a>
          </nav>

          <Link href="/reservar" className="action-btn px-4 py-2 text-xs sm:text-sm">
            Reservar
          </Link>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-zinc-800">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,#e53b1940_0,transparent_33%),radial-gradient(circle_at_86%_74%,#ffffff12_0,transparent_32%)]" />
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1.25fr_0.75fr] md:py-20">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Caseros / Buenos Aires</p>
              <h1 className="brand-display text-5xl leading-[0.86] tracking-[0.03em] sm:text-7xl">
                SONIDO BRUTO
                <br />
                RESERVA RAPIDA
              </h1>

              <p className="max-w-xl text-zinc-300">
                Estudio de grabacion y salas de ensayo para bandas que quieren potencia,
                claridad y una agenda sin friccion.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/reservar" className="action-btn px-6 py-3 text-sm">
                  Reservar ahora
                </Link>
                <a href="#salas" className="quiet-btn px-6 py-3 text-sm uppercase tracking-[0.08em]">
                  Ver salas
                </a>
              </div>

              <div className="inline-block -rotate-1 border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs uppercase tracking-[0.16em] text-zinc-300">
                Bloques de 2 horas / Control anti doble reserva
              </div>
            </div>

            <aside className="panel rotate-[0.6deg] p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Reserva online</p>
              <p className="mt-2 text-2xl font-semibold">Protocolo de 3 pasos</p>
              <ul className="mt-5 space-y-3 text-sm text-zinc-300">
                <li>1. Elegi sala</li>
                <li>2. Elegi fecha y horario</li>
                <li>3. Completa datos y confirma</li>
              </ul>
              <p className="mt-5 border-t border-zinc-700 pt-4 text-xs uppercase tracking-[0.14em] text-zinc-400">
                Admin protegido por sesion segura
              </p>
            </aside>
          </div>
        </section>

        <section id="salas" className="border-b border-zinc-800 bg-[#101013]">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <div className="mb-7 flex items-end justify-between gap-4">
              <h2 className="brand-display text-4xl tracking-[0.03em] sm:text-5xl">LAS SALAS</h2>
              <p className="max-w-sm text-right text-sm text-zinc-400">
                Equipamiento profesional, setup estable y respuesta inmediata.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {roomPreview.map((room, index) => (
                <article
                  key={room.name}
                  className={`panel p-5 transition hover:-translate-y-1 ${
                    index % 2 === 0 ? "rotate-[0.35deg]" : "-rotate-[0.35deg]"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">#{index + 1}</p>
                  <h3 className="mt-1 brand-display text-4xl leading-none">{room.name}</h3>
                  <p className="mt-4 text-sm text-zinc-300">{room.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="panel grid gap-6 p-6 md:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="brand-display text-4xl tracking-[0.03em]">CONTACTO</h2>
              <p className="mt-3 text-zinc-300">Av. San Martin 3047, Caseros, Buenos Aires</p>
              <p className="text-zinc-300">WhatsApp: +54 11 3488-6422</p>
              <Link href="/reservar" className="action-btn mt-6 inline-block px-6 py-3 text-sm">
                Ir a reservar
              </Link>
            </div>
            <div className="min-h-[260px] overflow-hidden border border-zinc-700">
              <iframe
                title="Mapa Craneo Candente"
                src="https://maps.google.com/maps?q=Av.+San+Martin+3047,+Caseros,+Buenos+Aires&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

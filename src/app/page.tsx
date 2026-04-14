import Image from "next/image";
import Link from "next/link";

const roomPreview = [
  { name: "Sala 1", gear: "Marshall DSL100H - Ampeg SVT-CL - Pearl Masters" },
  { name: "Sala 2", gear: "Vox AC30 C2 - Fender Bassman - Gretsch Renown" },
  { name: "Sala 3", gear: "EVH 5150 III - Orange Rocker - Tama Starclassic" },
  { name: "Sala 4", gear: "Roland JC-120 - Hartke HD500 - Yamaha Stage" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0c0c0d] text-zinc-100">
      <header className="sticky top-0 z-30 border-b border-zinc-800 bg-black/90 backdrop-blur">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Craneo Candente" width={44} height={44} priority />
            <div>
              <p className="brand-display text-2xl leading-none tracking-wide">CRANEO</p>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[#ff5b2e]">Candente</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.14em] text-zinc-300 md:flex">
            <a href="#salas">Salas</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <Link
            href="/reservar"
            className="rounded-md border border-[#ff5b2e] bg-[#ff5b2e] px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110"
          >
            Reservar
          </Link>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-zinc-800">
          <div className="pointer-events-none absolute inset-0 opacity-[0.2] [background:radial-gradient(circle_at_20%_20%,#ff5b2e66_0,transparent_35%),radial-gradient(circle_at_80%_70%,#ffffff1a_0,transparent_30%)]" />
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:py-20">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">Caseros, Buenos Aires</p>
              <h1 className="brand-display text-5xl leading-[0.88] tracking-[0.03em] sm:text-6xl">
                SONIDO CRUDO
                <br />
                SALAS LISTAS
              </h1>
              <p className="mt-4 max-w-xl text-zinc-300">
                Estudio de grabacion y salas de ensayo para bandas que buscan pegada y
                presencia. Reserva online rapida, sin vueltas.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/reservar"
                  className="rounded-md border border-[#ff5b2e] bg-[#ff5b2e] px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110"
                >
                  Reservar ahora
                </Link>
                <a
                  href="#salas"
                  className="rounded-md border border-zinc-700 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-zinc-200 transition hover:bg-zinc-900"
                >
                  Ver salas
                </a>
              </div>
            </div>

            <aside className="rounded-xl border border-zinc-700 bg-zinc-900/85 p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-zinc-400">Reserva online</p>
              <p className="mt-2 text-2xl font-semibold text-white">Proceso de 3 pasos</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li>1. Elegi sala</li>
                <li>2. Elegi fecha y bloque horario</li>
                <li>3. Completa tus datos y confirma</li>
              </ul>
            </aside>
          </div>
        </section>

        <section id="salas" className="border-b border-zinc-800 bg-[#101013]">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="brand-display text-4xl tracking-[0.03em]">NUESTRAS SALAS</h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {roomPreview.map((room, index) => (
                <article
                  key={room.name}
                  className={`rounded-lg border border-zinc-700 bg-zinc-900 p-5 transition hover:-translate-y-1 ${
                    index % 2 === 0 ? "rotate-[0.4deg]" : "-rotate-[0.4deg]"
                  }`}
                >
                  <h3 className="text-xl font-semibold text-white">{room.name}</h3>
                  <p className="mt-3 text-sm text-zinc-300">{room.gear}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-6 rounded-xl border border-zinc-700 bg-zinc-900 p-6 md:grid-cols-[1fr_1.3fr]">
            <div>
              <h2 className="brand-display text-4xl tracking-[0.03em]">CONTACTO</h2>
              <p className="mt-3 text-zinc-300">Av. San Martin 3047, Caseros, Buenos Aires</p>
              <p className="text-zinc-300">WhatsApp: +54 11 3488-6422</p>
              <Link
                href="/reservar"
                className="mt-6 inline-block rounded-md border border-[#ff5b2e] bg-[#ff5b2e] px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110"
              >
                Ir a reservar
              </Link>
            </div>
            <div className="min-h-[250px] overflow-hidden rounded-lg border border-zinc-700">
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

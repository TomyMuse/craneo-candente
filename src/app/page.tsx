import Image from "next/image";
import Link from "next/link";

const roomPreview = [
  { name: "Sala 1", gear: "Marshall DSL100H · Ampeg SVT-CL · Pearl Masters" },
  { name: "Sala 2", gear: "Vox AC30 C2 · Fender Bassman · Gretsch Renown" },
  { name: "Sala 3", gear: "EVH 5150 III · Orange Rocker · Tama Starclassic" },
  { name: "Sala 4", gear: "Roland JC-120 · Hartke HD500 · Yamaha Stage" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Craneo Candente" width={44} height={44} priority />
            <div>
              <p className="text-lg font-bold tracking-tight">Craneo Candente</p>
              <p className="text-xs text-neutral-500">Estudio y salas de ensayo</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-neutral-600 md:flex">
            <a href="#salas">Salas</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <Link
            href="/reservar"
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
          >
            Reservar
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:py-20">
          <div>
            <p className="mb-3 text-sm font-medium text-neutral-500">Caseros, Buenos Aires</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Estudio de grabacion y salas de ensayo
            </h1>
            <p className="mt-4 max-w-xl text-neutral-600">
              Espacios preparados para ensayar y grabar con calidad profesional.
              Reserva online en pocos pasos, con disponibilidad en tiempo real.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/reservar"
                className="rounded-md bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-700"
              >
                Reservar ahora
              </Link>
              <a
                href="#salas"
                className="rounded-md border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
              >
                Ver salas
              </a>
            </div>
          </div>

          <aside className="rounded-xl border border-neutral-200 bg-white p-6">
            <p className="text-sm font-medium text-neutral-500">Reserva online</p>
            <p className="mt-2 text-2xl font-semibold">Proceso simple de 3 pasos</p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600">
              <li>1. Elegi sala</li>
              <li>2. Elegi fecha y bloque horario</li>
              <li>3. Completa tus datos y confirma</li>
            </ul>
          </aside>
        </section>

        <section id="salas" className="border-y border-neutral-200 bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="text-3xl font-semibold tracking-tight">Nuestras salas</h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {roomPreview.map((room) => (
                <article key={room.name} className="rounded-lg border border-neutral-200 p-5">
                  <h3 className="text-xl font-semibold">{room.name}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{room.gear}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-6 rounded-xl border border-neutral-200 bg-white p-6 md:grid-cols-[1fr_1.3fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Contacto</h2>
              <p className="mt-3 text-neutral-600">Av. San Martin 3047, Caseros, Buenos Aires</p>
              <p className="text-neutral-600">WhatsApp: +54 11 3488-6422</p>
              <Link
                href="/reservar"
                className="mt-6 inline-block rounded-md bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-700"
              >
                Ir a reservar
              </Link>
            </div>
            <div className="min-h-[250px] overflow-hidden rounded-lg border border-neutral-200">
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

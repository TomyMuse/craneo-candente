import Image from "next/image";
import Link from "next/link";

const roomPreview = [
  {
    name: "SALA 1",
    tag: "THE BEAST",
    details: "Marshall DSL100H / Ampeg SVT-CL / Pearl Masters",
    rate: "$15.000/h",
  },
  {
    name: "SALA 2",
    tag: "VINTAGE",
    details: "Vox AC30 C2 / Fender Bassman / Gretsch Renown",
    rate: "$12.000/h",
  },
  {
    name: "SALA 3",
    tag: "HI-GAIN",
    details: "EVH 5150 III / Orange Rocker / Tama Starclassic",
    rate: "$14.000/h",
  },
  {
    name: "SALA 4",
    tag: "STANDARD",
    details: "Roland JC-120 / Hartke HD500 / Yamaha Stage",
    rate: "$10.000/h",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--bg)]/95 backdrop-blur">
        <div className="section-shell flex h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Craneo Candente" width={46} height={46} priority />
            <div>
              <p className="brand-display text-2xl leading-none">Craneo Candente</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)]">
                Estudio + Salas
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.14em] text-zinc-300 md:flex">
            <a href="#salas" className="hover:text-white">Salas</a>
            <a href="#sistema" className="hover:text-white">Sistema</a>
            <a href="#contacto" className="hover:text-white">Contacto</a>
          </nav>

          <Link href="/reservar" className="action-btn px-4 py-2 text-xs sm:text-sm">
            Reservar
          </Link>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/5 py-16 md:py-24">
          <div className="section-shell grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div className="enter-up space-y-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400">
                Caseros / Buenos Aires
              </p>
              <h1 className="brand-display text-5xl leading-[0.85] sm:text-7xl">
                SONIDO FIRME
                <br />
                GESTION CLARA
              </h1>
              <p className="max-w-2xl text-sm text-zinc-300 sm:text-base">
                Espacios de ensayo y grabacion con equipamiento profesional, agenda online
                y confirmacion directa. Vos traes la banda; nosotros sostenemos el flujo.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/reservar" className="action-btn px-6 py-3 text-sm">
                  Reservar ahora
                </Link>
                <a href="#salas" className="quiet-btn px-6 py-3 text-sm uppercase tracking-[0.08em]">
                  Ver salas
                </a>
              </div>
            </div>

            <aside className="panel p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)]">
                Flujo de reservas
              </p>
              <p className="mt-3 text-2xl font-semibold">3 pasos, sin friccion</p>
              <ul className="mt-5 space-y-3 text-sm text-zinc-300">
                <li>1. Seleccion de sala y precio por hora.</li>
                <li>2. Fecha y bloque horario de 2 horas.</li>
                <li>3. Datos de contacto y confirmacion.</li>
              </ul>
              <p className="mt-5 border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.14em] text-zinc-400">
                Validacion anti superposicion en servidor
              </p>
            </aside>
          </div>
        </section>

        <section id="salas" className="py-16 md:py-20">
          <div className="section-shell">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="brand-display text-4xl sm:text-5xl">Las salas</h2>
              <p className="max-w-md text-right text-sm text-zinc-400">
                Cuatro configuraciones listas para ensayo, preproduccion y tomas.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {roomPreview.map((room) => (
                <article key={room.name} className="panel p-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-soft)]">
                    {room.tag}
                  </p>
                  <h3 className="mt-1 brand-display text-4xl leading-none">{room.name}</h3>
                  <p className="mt-3 text-sm text-zinc-300">{room.details}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.16em] text-zinc-400">{room.rate}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="sistema" className="border-y border-white/5 bg-[var(--bg-soft)] py-14">
          <div className="section-shell grid gap-5 md:grid-cols-3">
            <article className="panel p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-soft)]">Reserva</p>
              <h3 className="mt-2 text-xl font-semibold">Disponibilidad real</h3>
              <p className="mt-2 text-sm text-zinc-300">La vista de horarios se actualiza con reservas confirmadas.</p>
            </article>
            <article className="panel p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-soft)]">Operacion</p>
              <h3 className="mt-2 text-xl font-semibold">Panel admin diario y mensual</h3>
              <p className="mt-2 text-sm text-zinc-300">Seguimiento por fecha, lista de turnos y eliminacion de reservas.</p>
            </article>
            <article className="panel p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--accent-soft)]">Seguridad</p>
              <h3 className="mt-2 text-xl font-semibold">Sesion protegida por cookie</h3>
              <p className="mt-2 text-sm text-zinc-300">Acceso administrativo con login y cierre de sesion seguro.</p>
            </article>
          </div>
        </section>

        <section id="contacto" className="py-16 md:py-20">
          <div className="section-shell panel grid gap-6 p-6 md:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="brand-display text-4xl">Contacto</h2>
              <p className="mt-3 text-sm text-zinc-300">Av. San Martin 3047, Caseros, Buenos Aires</p>
              <p className="text-sm text-zinc-300">WhatsApp: +54 11 3488-6422</p>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-zinc-400">
                Atencion con reserva previa
              </p>
              <Link href="/reservar" className="action-btn mt-6 inline-block px-6 py-3 text-sm">
                Ir a reservar
              </Link>
            </div>
            <div className="min-h-[260px] border border-white/10 bg-black">
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

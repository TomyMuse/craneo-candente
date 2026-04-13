import Link from "next/link";

const roomPreview = [
  {
    name: "SALA 1",
    tag: "The Beast",
    gear: "Marshall DSL100H / Ampeg SVT-CL / Pearl Masters",
  },
  {
    name: "SALA 2",
    tag: "Vintage",
    gear: "Vox AC30 C2 / Fender Bassman / Gretsch Renown",
  },
  {
    name: "SALA 3",
    tag: "Hi-Gain",
    gear: "EVH 5150 III / Orange Rocker / Tama Starclassic",
  },
  {
    name: "SALA 4",
    tag: "Standard",
    gear: "Roland JC-120 / Hartke HD500 / Yamaha Stage",
  },
];

export default function HomePage() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/55 backdrop-blur-md">
        <div className="section-shell flex h-18 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Craneo Candente" className="h-11 w-11 object-contain" />
            <div>
              <p className="brand-display text-3xl leading-none">CRANEO</p>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Candente</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.2em] text-muted md:flex">
            <a href="#salas">Salas</a>
            <a href="#propuesta">Propuesta</a>
            <a href="#contacto">Contacto</a>
          </nav>

          <Link href="/reservar" className="action-btn px-4 py-2 text-xs sm:px-6 sm:text-sm">
            Reservar
          </Link>
        </div>
      </header>

      <main>
        <section className="relative flex min-h-screen items-end overflow-hidden pt-20">
          <div className="hero-bg" />
          <div className="grit-layer" />

          <div className="section-shell relative z-10 grid gap-10 pb-14 md:grid-cols-[1.25fr_0.75fr] md:items-end md:pb-20">
            <div className="enter-up space-y-6">
              <span className="accent-pill">Caseros, Buenos Aires</span>
              <h1 className="brand-display max-w-3xl text-6xl leading-[0.88] sm:text-7xl md:text-8xl">
                SONIDO CRUDO
                <br />
                GRABACION PRO
                <br />
                Y SALAS LISTAS
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-zinc-200 sm:text-lg">
                Estudio y salas de ensayo para bandas que quieren pegada, presencia y
                velocidad para agendar sin vueltas.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/reservar" className="action-btn px-7 py-3 text-sm">
                  Reservar ahora
                </Link>
                <a href="#salas" className="quiet-btn px-7 py-3 text-sm uppercase tracking-[0.08em]">
                  Ver salas
                </a>
              </div>
            </div>

            <aside className="panel enter-up p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">Turnos online</p>
              <p className="mt-3 text-3xl font-semibold">Wizard de reserva en 3 pasos</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                Elegis sala, fecha y bloque horario de 2 horas. Confirmas con nombre y
                telefono. El bloqueo de agenda es inmediato.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-zinc-300">
                <li>• Control anti doble-reserva en backend</li>
                <li>• Panel admin protegido por sesion</li>
                <li>• Compatible con Preview y Produccion en Vercel</li>
              </ul>
            </aside>
          </div>
        </section>

        <section id="salas" className="section-shell py-16 sm:py-24">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="brand-display text-5xl sm:text-6xl">LAS SALAS</h2>
            <p className="max-w-md text-right text-sm text-muted">
              Equipamiento de alto impacto para ensayo y preproduccion.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {roomPreview.map((room, index) => (
              <article key={room.name} className="panel p-5 transition-transform duration-200 hover:-translate-y-1">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">#{index + 1}</p>
                <h3 className="mt-2 brand-display text-4xl leading-none">{room.name}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.08em] text-zinc-300">{room.tag}</p>
                <p className="mt-5 text-sm leading-relaxed text-muted">{room.gear}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="propuesta" className="border-y border-[var(--line)] bg-[var(--bg-soft)] py-16 sm:py-20">
          <div className="section-shell grid gap-6 md:grid-cols-3">
            <article className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">Grabacion</p>
              <h3 className="text-2xl font-semibold">Tomas listas para mezclar</h3>
              <p className="text-sm text-muted">
                Setup pensado para avanzar rapido desde toma a entrega sin perder cuerpo.
              </p>
            </article>
            <article className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">Ensayo</p>
              <h3 className="text-2xl font-semibold">Bloques claros de 2 horas</h3>
              <p className="text-sm text-muted">
                Agenda visible por sala, sin superposiciones y con confirmacion inmediata.
              </p>
            </article>
            <article className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">Operacion</p>
              <h3 className="text-2xl font-semibold">Admin diario y mensual</h3>
              <p className="text-sm text-muted">
                Vista operativa para gestionar reservas, filtrado por fecha y borrado seguro.
              </p>
            </article>
          </div>
        </section>

        <section id="contacto" className="section-shell py-16 sm:py-24">
          <div className="panel grid gap-8 p-8 md:grid-cols-[1fr_1.3fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">Contacto</p>
              <h2 className="brand-display mt-2 text-5xl leading-none">VENI A SONAR FUERTE</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Av. San Martin 3047, Caseros. WhatsApp: +54 11 3488-6422.
              </p>
              <Link href="/reservar" className="action-btn mt-6 inline-block px-7 py-3 text-sm">
                Ir al wizard
              </Link>
            </div>
            <div className="min-h-[260px] border border-[var(--line)]">
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
    </>
  );
}

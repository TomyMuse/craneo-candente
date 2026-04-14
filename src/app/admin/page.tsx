"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TIME_SLOTS } from "@/lib/constants";

type AdminReservation = {
  id: string;
  room: { id: number; name: string };
  date: string;
  time: string;
  contact: string;
};

type ViewMode = "daily" | "monthly" | "list";

const roomIds = [1, 2, 3, 4];

function formatDateISO(date: Date): string {
  return date.toISOString().split("T")[0] ?? "";
}

function monthIso(date: Date): string {
  return date.toISOString().slice(0, 7);
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [view, setView] = useState<ViewMode>("daily");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [reservations, setReservations] = useState<AdminReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const headerLabel = useMemo(() => {
    return currentDate.toLocaleDateString("es-AR", {
      weekday: view === "daily" ? "long" : undefined,
      day: view === "daily" ? "numeric" : undefined,
      month: "long",
      year: "numeric",
    });
  }, [currentDate, view]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();
      if (view === "daily") params.set("date", formatDateISO(currentDate));
      if (view === "monthly") params.set("month", monthIso(currentDate));

      try {
        const response = await fetch(`/api/admin/reservations?${params.toString()}`, {
          cache: "no-store",
        });

        if (response.status === 401) {
          router.push("/admin/login");
          return;
        }

        if (!response.ok) {
          throw new Error("No se pudieron cargar las reservas");
        }

        setReservations(await response.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error de red");
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, [currentDate, router, view]);

  const onDelete = async (id: string) => {
    const confirmed = window.confirm("Eliminar esta reserva?");
    if (!confirmed) return;

    const response = await fetch(`/api/reservations/${id}`, { method: "DELETE" });

    if (response.status === 401) {
      router.push("/admin/login");
      return;
    }

    if (!response.ok) {
      setError("No se pudo eliminar la reserva");
      return;
    }

    setReservations((current) => current.filter((entry) => entry.id !== id));
  };

  const onLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const dayReservationsBySlot = (slot: string, roomId: number) =>
    reservations.find((entry) => entry.time === slot && entry.room.id === roomId);

  return (
    <main className="section-shell py-10">
      <header className="panel mb-6 flex flex-wrap items-center justify-between gap-3 p-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">Panel</p>
          <h1 className="brand-display text-5xl leading-none">ADMIN RESERVAS</h1>
        </div>

        <div className="flex gap-2">
          <button type="button" onClick={() => setView("daily")} className={`px-3 py-2 text-xs uppercase tracking-[0.12em] ${view === "daily" ? "action-btn" : "quiet-btn"}`}>
            Diario
          </button>
          <button type="button" onClick={() => setView("monthly")} className={`px-3 py-2 text-xs uppercase tracking-[0.12em] ${view === "monthly" ? "action-btn" : "quiet-btn"}`}>
            Mensual
          </button>
          <button type="button" onClick={() => setView("list")} className={`px-3 py-2 text-xs uppercase tracking-[0.12em] ${view === "list" ? "action-btn" : "quiet-btn"}`}>
            Lista
          </button>
          <button type="button" onClick={onLogout} className="quiet-btn px-3 py-2 text-xs uppercase tracking-[0.12em]">
            Salir
          </button>
        </div>
      </header>

      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          className="quiet-btn px-3 py-2 text-xs uppercase tracking-[0.12em]"
          onClick={() => {
            const next = new Date(currentDate);
            if (view === "monthly") next.setMonth(next.getMonth() - 1);
            else next.setDate(next.getDate() - 1);
            setCurrentDate(next);
          }}
        >
          Anterior
        </button>

        <p className="text-sm capitalize text-muted">{headerLabel}</p>

        <button
          type="button"
          className="quiet-btn px-3 py-2 text-xs uppercase tracking-[0.12em]"
          onClick={() => {
            const next = new Date(currentDate);
            if (view === "monthly") next.setMonth(next.getMonth() + 1);
            else next.setDate(next.getDate() + 1);
            setCurrentDate(next);
          }}
        >
          Siguiente
        </button>
      </div>

      {error ? <p className="mb-4 border border-red-500/60 bg-red-950/20 p-3 text-sm">{error}</p> : null}
      {loading ? <p className="text-sm text-muted">Cargando reservas...</p> : null}

      {!loading && view === "daily" ? (
        <section className="panel overflow-hidden">
          <div className="grid grid-cols-[120px_repeat(4,minmax(110px,1fr))] border-b border-[var(--line)] text-xs uppercase tracking-[0.12em] text-muted">
            <div className="border-r border-[var(--line)] p-3">Horario</div>
            <div className="border-r border-[var(--line)] p-3">Sala 1</div>
            <div className="border-r border-[var(--line)] p-3">Sala 2</div>
            <div className="border-r border-[var(--line)] p-3">Sala 3</div>
            <div className="p-3">Sala 4</div>
          </div>

          {TIME_SLOTS.map((slot) => (
            <div key={slot} className="grid grid-cols-[120px_repeat(4,minmax(110px,1fr))] border-b border-[var(--line)] last:border-0">
              <div className="border-r border-[var(--line)] p-3 text-xs text-zinc-300">{slot}</div>
              {roomIds.map((roomId) => {
                const reservation = dayReservationsBySlot(slot, roomId);
                return (
                  <div key={`${slot}-${roomId}`} className="border-r border-[var(--line)] p-2 last:border-0">
                    {reservation ? (
                      <button
                        type="button"
                        onClick={() => onDelete(reservation.id)}
                        className="w-full border border-red-500/60 bg-red-950/30 p-2 text-left text-xs transition hover:border-red-400"
                      >
                        <p className="font-semibold">{reservation.contact}</p>
                        <p className="mt-1 uppercase tracking-[0.1em] text-red-300">Eliminar</p>
                      </button>
                    ) : (
                      <p className="text-xs text-zinc-600">Libre</p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </section>
      ) : null}

      {!loading && view === "monthly" ? (
        <section className="panel p-4">
          <p className="mb-3 text-sm text-muted">Reservas del mes: {reservations.length}</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {reservations.map((entry) => (
              <article
                key={entry.id}
                className="border border-[var(--line)] bg-[#111116] p-3 text-sm"
              >
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--accent)]">{entry.room.name}</p>
                <p className="mt-1">{entry.date}</p>
                <p>{entry.time}</p>
                <p className="mt-1 text-muted">{entry.contact}</p>
                <button
                  type="button"
                  className="mt-3 quiet-btn px-3 py-1 text-xs uppercase tracking-[0.12em]"
                  onClick={() => onDelete(entry.id)}
                >
                  Eliminar
                </button>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {!loading && view === "list" ? (
        <section className="panel overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--line)] text-xs uppercase tracking-[0.12em] text-muted">
                <th className="p-3">Sala</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Horario</th>
                <th className="p-3">Contacto</th>
                <th className="p-3">Accion</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((entry) => (
                <tr key={entry.id} className="border-b border-[var(--line)]">
                  <td className="p-3">{entry.room.name}</td>
                  <td className="p-3">{entry.date}</td>
                  <td className="p-3">{entry.time}</td>
                  <td className="p-3">{entry.contact}</td>
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => onDelete(entry.id)}
                      className="quiet-btn px-3 py-1 text-xs uppercase tracking-[0.12em]"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}
    </main>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { TIME_SLOTS } from "@/lib/constants";
import { getTomorrowDateISO, isSlotTaken } from "@/lib/booking";

type Room = {
  id: number;
  name: string;
  description: string;
  details: string[];
  price: number;
  image: string;
};

type Availability = {
  room_id: number;
  date: string;
  time: string;
};

type Step = 1 | 2 | 3;

export default function BookingPage() {
  const [step, setStep] = useState<Step>(1);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedDate, setSelectedDate] = useState(getTomorrowDateISO());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [message, setMessage] = useState("");

  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    const loadData = async () => {
      setStatus("loading");
      try {
        const [roomsRes, availabilityRes] = await Promise.all([
          fetch("/api/rooms", { cache: "no-store" }),
          fetch("/api/availability", { cache: "no-store" }),
        ]);

        if (!roomsRes.ok || !availabilityRes.ok) {
          throw new Error("No se pudo cargar datos");
        }

        const roomsData: Room[] = await roomsRes.json();
        const availabilityData: Availability[] = await availabilityRes.json();

        setRooms(roomsData);
        setAvailability(availabilityData);
        setStatus("idle");
      } catch {
        setStatus("error");
        setMessage("No se pudo cargar el sistema de reservas. Reintenta.");
      }
    };

    void loadData();
  }, []);

  const reservationSummary = useMemo(() => {
    if (!selectedRoom || !selectedTime) return null;
    const [y, m, d] = selectedDate.split("-");
    const total = selectedRoom.price * 2;
    return {
      room: selectedRoom.name,
      date: `${d}/${m}/${y}`,
      time: selectedTime,
      total,
    };
  }, [selectedDate, selectedRoom, selectedTime]);

  const canContinueStep2 = Boolean(selectedRoom);
  const canContinueStep3 = Boolean(selectedRoom && selectedTime);

  const onConfirmReservation = async () => {
    if (!selectedRoom || !selectedTime) return;

    if (name.trim().length < 3) {
      setMessage("Ingresa un nombre valido.");
      setStatus("error");
      return;
    }

    const compactPhone = phone.replace(/[\s-]/g, "");
    if (!/^\d{8,20}$/.test(compactPhone)) {
      setMessage("Ingresa un telefono valido (minimo 8 digitos).");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room: {
            id: selectedRoom.id,
            name: selectedRoom.name,
          },
          date: selectedDate,
          time: selectedTime,
          contactName: name,
          contactPhone: phone,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error ?? "No se pudo confirmar la reserva");
      }

      setStatus("success");
      setMessage("Reserva confirmada. Te esperamos en Craneo Candente.");

      const refreshedAvailability = await fetch("/api/availability", {
        cache: "no-store",
      });
      if (refreshedAvailability.ok) {
        setAvailability(await refreshedAvailability.json());
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Error de red");
    }
  };

  return (
    <main className="section-shell py-28">
      <div className="mb-10 flex items-center justify-between gap-4">
        <Link href="/" className="quiet-btn px-4 py-2 text-xs uppercase tracking-[0.14em]">
          Volver
        </Link>
        <p className="text-xs uppercase tracking-[0.24em] text-muted">Paso {step} de 3</p>
      </div>

      <h1
        ref={headingRef}
        tabIndex={-1}
        className="brand-display text-5xl leading-none outline-none sm:text-6xl"
      >
        RESERVA ONLINE
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Elegi sala, fecha y horario. Confirmas con tus datos y el turno se bloquea al instante.
      </p>

      {status === "error" && (
        <p className="mt-6 border border-red-500/60 bg-red-950/20 p-3 text-sm">{message}</p>
      )}
      {status === "success" && (
        <p className="mt-6 border border-emerald-500/60 bg-emerald-950/20 p-3 text-sm">{message}</p>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        <section className="panel p-5 sm:p-7">
          {step === 1 && (
            <div className="space-y-5 enter-up">
              <h2 className="text-lg font-semibold uppercase tracking-[0.14em]">1. Selecciona sala</h2>

              {status === "loading" ? (
                <p className="text-sm text-muted">Cargando salas...</p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {rooms.map((room) => {
                    const selected = room.id === selectedRoom?.id;
                    return (
                      <button
                        key={room.id}
                        type="button"
                        onClick={() => {
                          setSelectedRoom(room);
                          setSelectedTime(null);
                        }}
                        className={`text-left transition-colors ${
                          selected
                            ? "border-[var(--accent)] bg-[color:color-mix(in_srgb,var(--accent)_15%,black)]"
                            : "border-[var(--line)] hover:border-zinc-500"
                        } border p-3`}
                      >
                        <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">{room.description}</p>
                        <h3 className="mt-1 brand-display text-4xl leading-none">{room.name}</h3>
                        <p className="mt-2 text-sm text-zinc-300">${room.price.toLocaleString()} / hora</p>
                        <p className="mt-3 text-xs text-muted">{room.details.join(" / ")}</p>
                      </button>
                    );
                  })}
                </div>
              )}

              <button
                type="button"
                disabled={!canContinueStep2}
                onClick={() => setStep(2)}
                className="action-btn px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continuar
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 enter-up">
              <h2 className="text-lg font-semibold uppercase tracking-[0.14em]">2. Elige fecha y horario</h2>

              <div className="grid gap-4 md:grid-cols-[260px_1fr]">
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.14em] text-muted">Fecha</span>
                  <input
                    type="date"
                    min={getTomorrowDateISO()}
                    value={selectedDate}
                    onChange={(event) => {
                      setSelectedDate(event.target.value);
                      setSelectedTime(null);
                    }}
                    className="w-full border border-[var(--line)] bg-black px-3 py-2"
                  />
                </label>

                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.14em] text-muted">
                    Bloques de 2 horas
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {TIME_SLOTS.map((slot) => {
                      const disabled = !selectedRoom
                        ? true
                        : isSlotTaken(availability, selectedRoom.id, selectedDate, slot);
                      const selected = selectedTime === slot;

                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          disabled={disabled}
                          className={`border px-2 py-2 text-xs uppercase tracking-[0.08em] ${
                            selected
                              ? "border-[var(--accent)] bg-[var(--accent)]/20"
                              : "border-[var(--line)]"
                          } ${disabled ? "opacity-35 line-through" : "hover:border-zinc-500"}`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="quiet-btn px-5 py-2 text-sm uppercase tracking-[0.08em]"
                >
                  Volver
                </button>
                <button
                  type="button"
                  disabled={!canContinueStep3}
                  onClick={() => setStep(3)}
                  className="action-btn px-6 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 enter-up">
              <h2 className="text-lg font-semibold uppercase tracking-[0.14em]">3. Tus datos</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.14em] text-muted">Nombre completo</span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full border border-[var(--line)] bg-black px-3 py-2"
                    placeholder="Ej: Juan Perez"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.14em] text-muted">Telefono</span>
                  <input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="w-full border border-[var(--line)] bg-black px-3 py-2"
                    placeholder="Ej: 11 1234 5678"
                  />
                </label>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="quiet-btn px-5 py-2 text-sm uppercase tracking-[0.08em]"
                >
                  Volver
                </button>
                <button
                  type="button"
                  onClick={onConfirmReservation}
                  className="action-btn px-6 py-2 text-sm"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Confirmando..." : "Confirmar reserva"}
                </button>
              </div>
            </div>
          )}
        </section>

        <aside className="panel h-fit p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)]">Resumen</p>

          {!reservationSummary ? (
            <p className="mt-4 text-sm text-muted">Aun no seleccionaste sala y horario.</p>
          ) : (
            <div className="mt-4 space-y-3 text-sm">
              <p className="text-xl font-semibold">{reservationSummary.room}</p>
              <p className="text-zinc-300">{reservationSummary.date}</p>
              <p className="text-zinc-300">{reservationSummary.time}</p>
              <div className="border-t border-[var(--line)] pt-3">
                <p className="text-xs uppercase tracking-[0.14em] text-muted">Total bloque</p>
                <p className="mt-1 text-2xl font-semibold">${reservationSummary.total.toLocaleString()}</p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}

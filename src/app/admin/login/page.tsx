"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error ?? "No se pudo iniciar sesion");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="section-shell flex min-h-screen items-center justify-center py-16">
      <section className="panel w-full max-w-md p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">Admin</p>
        <h1 className="brand-display mt-2 text-5xl leading-none">LOGIN</h1>
        <p className="mt-2 text-sm text-muted">Acceso al panel operativo de reservas.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.14em] text-muted">Usuario</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full border border-[var(--line)] bg-black px-3 py-2 outline-none focus:border-[var(--accent)]"
              autoComplete="username"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-[0.14em] text-muted">Contrasena</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border border-[var(--line)] bg-black px-3 py-2 outline-none focus:border-[var(--accent)]"
              autoComplete="current-password"
            />
          </label>

          {error ? (
            <p className="border border-red-500/60 bg-red-950/20 p-2 text-sm">{error}</p>
          ) : null}

          <button
            type="submit"
            className="action-btn w-full px-4 py-3 text-sm"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  );
}

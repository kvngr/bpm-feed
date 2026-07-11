/**
 * Minimal typed HTTP client built on the platform `fetch`.
 *
 * Deliberately *not* axios: on React Native axios needs a custom adapter to
 * behave correctly, ships more weight than a wrapper needs, and has had recent
 * CVEs. `fetch` is built into the runtime and covers everything here — with a
 * small helper adding a timeout, JSON parsing, and typed errors. A real
 * deployment would set `BASE_URL` and attach auth headers in this one place.
 */

const DEFAULT_TIMEOUT = 10_000;

export interface HttpError extends Error {
  status?: number;
}

interface RequestOptions {
  timeoutMs?: number;
  /** Caller-supplied cancellation (e.g. TanStack Query's queryFn signal). */
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

async function request<T>(
  url: string,
  init: RequestInit,
  { timeoutMs = DEFAULT_TIMEOUT, signal, headers }: RequestOptions = {},
): Promise<T> {
  // Combine an internal timeout with any caller signal into one controller.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  if (signal) {
    if (signal.aborted) controller.abort();
    else signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: { Accept: "application/json", ...headers, ...init.headers },
    });
    if (!res.ok) {
      const error: HttpError = new Error(`HTTP ${res.status} on ${url}`);
      error.status = res.status;
      throw error;
    }
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

export const http = {
  get: <T>(url: string, options?: RequestOptions) => request<T>(url, { method: "GET" }, options),
  post: <T>(url: string, body: unknown, options?: RequestOptions) =>
    request<T>(
      url,
      { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } },
      options,
    ),
};

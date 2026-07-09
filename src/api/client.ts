import axios from "axios";

/**
 * Shared axios instance. A real app would set `baseURL` to the BPM API and
 * attach auth headers via an interceptor here — kept minimal for the exercise.
 */
export const httpClient = axios.create({
  timeout: 10_000,
  headers: { Accept: "application/json" },
});

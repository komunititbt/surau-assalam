import { JAKIM_ZONE } from "../config/sheets";
import type { PrayerToday } from "./types";

function tsToKLTime(ts: number): string {
  const d = new Date(ts * 1000);
  return d.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Kuala_Lumpur",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function todayKL(): { ymd: string; dayNum: number; year: string; month: string } {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kuala_Lumpur",
    year: "numeric", month: "2-digit", day: "2-digit",
  });
  const parts = fmt.formatToParts(new Date());
  const y = parts.find(p => p.type === "year")!.value;
  const m = parts.find(p => p.type === "month")!.value;
  const d = parts.find(p => p.type === "day")!.value;
  return { ymd: `${y}-${m}-${d}`, dayNum: parseInt(d, 10), year: y, month: m };
}

interface JakimEntry {
  day: number;
  fajr: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
}

async function fetchJakim(): Promise<{ prayers: JakimEntry[] } | null> {
  try {
    const res = await fetch(`https://api.waktusolat.app/v2/solat/${JAKIM_ZONE}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getJakimToday(): Promise<PrayerToday | null> {
  const data = await fetchJakim();
  if (!data?.prayers) return null;
  const { ymd, dayNum } = todayKL();
  const entry = data.prayers.find(p => p.day === dayNum);
  if (!entry) return null;
  return {
    date: ymd,
    fajr: tsToKLTime(entry.fajr),
    dhuhr: tsToKLTime(entry.dhuhr),
    asr: tsToKLTime(entry.asr),
    maghrib: tsToKLTime(entry.maghrib),
    isha: tsToKLTime(entry.isha),
    source: `JAKIM (${JAKIM_ZONE})`,
  };
}

export async function getJakimMonth(): Promise<PrayerToday[]> {
  const data = await fetchJakim();
  if (!data?.prayers) return [];
  const { year, month } = todayKL();
  return data.prayers.map(p => ({
    date: `${year}-${month}-${String(p.day).padStart(2, "0")}`,
    fajr: tsToKLTime(p.fajr),
    dhuhr: tsToKLTime(p.dhuhr),
    asr: tsToKLTime(p.asr),
    maghrib: tsToKLTime(p.maghrib),
    isha: tsToKLTime(p.isha),
    source: `JAKIM (${JAKIM_ZONE})`,
  }));
}
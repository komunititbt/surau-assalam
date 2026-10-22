import Papa from "papaparse";
import { SHEETS } from "../config/sheets";
import type {
  SiteSetting, Page, Announcement, Program, Committee,
  GalleryItem, Document, PrayerTime,
} from "./types";

async function fetchCsv<T>(url: string): Promise<T[]> {
  if (!url || url.startsWith("TAMPAL_")) {
    console.warn(`[sheets] URL belum ditetapkan: ${url}`);
    return [];
  }
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`[sheets] Gagal ambil: ${url} (status ${res.status})`);
    return [];
  }
  const csv = await res.text();
  const { data } = Papa.parse<T>(csv, { header: true, skipEmptyLines: true });
  return data;
}

function isPublished(status: string | undefined): boolean {
  return (status ?? "").trim().toLowerCase() === "published";
}

function todayKL(): string {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kuala_Lumpur",
    year: "numeric", month: "2-digit", day: "2-digit",
  });
  const parts = fmt.formatToParts(new Date());
  const y = parts.find(p => p.type === "year")!.value;
  const m = parts.find(p => p.type === "month")!.value;
  const d = parts.find(p => p.type === "day")!.value;
  return `${y}-${m}-${d}`;
}

function monthKL(): string {
  return todayKL().slice(0, 7); // YYYY-MM
}

// ─────────────────────────────────────────────
// SiteSettings → { key: value }
// ─────────────────────────────────────────────
export async function getSettings(): Promise<Record<string, string>> {
  const rows = await fetchCsv<SiteSetting>(SHEETS.siteSettings);
  return Object.fromEntries(rows.map(r => [r.key, r.value]));
}

// ─────────────────────────────────────────────
// Pages
// ─────────────────────────────────────────────
export async function getPages(): Promise<Page[]> {
  const rows = await fetchCsv<Page>(SHEETS.pages);
  return rows
    .filter(r => isPublished(r.status))
    .sort((a, b) => Number(a.sort_order) - Number(b.sort_order));
}

export async function getPageBySlug(slug: string): Promise<Page | undefined> {
  return (await getPages()).find(p => p.slug === slug);
}

// ─────────────────────────────────────────────
// Announcements (pinned dulu, kemudian tarikh terbaru)
// ─────────────────────────────────────────────
export async function getAnnouncements(): Promise<Announcement[]> {
  const rows = await fetchCsv<Announcement>(SHEETS.announcements);
  return rows
    .filter(r => isPublished(r.status))
    .sort((a, b) => {
      const pinA = (a.is_pinned ?? "").trim().toLowerCase() === "yes" ? 1 : 0;
      const pinB = (b.is_pinned ?? "").trim().toLowerCase() === "yes" ? 1 : 0;
      if (pinA !== pinB) return pinB - pinA;
      return (b.date ?? "").localeCompare(a.date ?? "");
    });
}

// ─────────────────────────────────────────────
// Programs
// ─────────────────────────────────────────────
export async function getUpcomingPrograms(): Promise<Program[]> {
  const rows = await fetchCsv<Program>(SHEETS.programs);
  const today = todayKL();
  return rows
    .filter(r => isPublished(r.status) && (r.date ?? "") >= today)
    .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""));
}

export async function getAllPrograms(): Promise<Program[]> {
  const rows = await fetchCsv<Program>(SHEETS.programs);
  return rows
    .filter(r => isPublished(r.status))
    .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""));
}

// ─────────────────────────────────────────────
// Committee
// ─────────────────────────────────────────────
export async function getCommittee(): Promise<Committee[]> {
  const rows = await fetchCsv<Committee>(SHEETS.committee);
  return rows
    .filter(r => isPublished(r.status))
    .sort((a, b) => Number(a.sort_order) - Number(b.sort_order));
}

// ─────────────────────────────────────────────
// Gallery
// ─────────────────────────────────────────────
export async function getGallery(): Promise<GalleryItem[]> {
  const rows = await fetchCsv<GalleryItem>(SHEETS.gallery);
  return rows
    .filter(r => isPublished(r.status))
    .sort((a, b) => Number(a.sort_order) - Number(b.sort_order));
}

// ─────────────────────────────────────────────
// Documents
// ─────────────────────────────────────────────
export async function getDocuments(): Promise<Document[]> {
  const rows = await fetchCsv<Document>(SHEETS.documents);
  return rows
    .filter(r => isPublished(r.status))
    .sort((a, b) => (b.published_date ?? "").localeCompare(a.published_date ?? ""));
}

// ─────────────────────────────────────────────
// PrayerTimes — sheet (backup/manual)
// ─────────────────────────────────────────────
export async function getPrayerFromSheet(): Promise<PrayerTime[]> {
  const rows = await fetchCsv<PrayerTime>(SHEETS.prayerTimes);
  return rows
    .filter(r => isPublished(r.status))
    .sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""));
}

export async function getTodayPrayerFromSheet(): Promise<PrayerTime | undefined> {
  const today = todayKL();
  return (await getPrayerFromSheet()).find(r => r.date === today);
}

export async function getMonthPrayerFromSheet(): Promise<PrayerTime[]> {
  const month = monthKL();
  return (await getPrayerFromSheet()).filter(r => (r.date ?? "").startsWith(month));
}
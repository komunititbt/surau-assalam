// Tampal URL CSV yang anda salin dari Google Sheets.
// Setiap URL mesti berbentuk:
// https://docs.google.com/spreadsheets/d/e/2PACX-XXX/pub?gid=XXX&single=true&output=csv

export const SHEETS = {
  siteSettings:  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0YLCPWVzB6f4AgQwQeXAXpUWvys2Di6L0qGZYap-jaBEFSzOwkBJbCvxb_qSHuoNauh2m5a73y6yN/pub?gid=512281653&single=true&output=csv",
  pages:         "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0YLCPWVzB6f4AgQwQeXAXpUWvys2Di6L0qGZYap-jaBEFSzOwkBJbCvxb_qSHuoNauh2m5a73y6yN/pub?gid=1352871020&single=true&output=csv",
  announcements: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0YLCPWVzB6f4AgQwQeXAXpUWvys2Di6L0qGZYap-jaBEFSzOwkBJbCvxb_qSHuoNauh2m5a73y6yN/pub?gid=1443855739&single=true&output=csv",
  programs:      "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0YLCPWVzB6f4AgQwQeXAXpUWvys2Di6L0qGZYap-jaBEFSzOwkBJbCvxb_qSHuoNauh2m5a73y6yN/pub?gid=1516218914&single=true&output=csv",
  committee:     "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0YLCPWVzB6f4AgQwQeXAXpUWvys2Di6L0qGZYap-jaBEFSzOwkBJbCvxb_qSHuoNauh2m5a73y6yN/pub?gid=1516619516&single=true&output=csv",
  gallery:       "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0YLCPWVzB6f4AgQwQeXAXpUWvys2Di6L0qGZYap-jaBEFSzOwkBJbCvxb_qSHuoNauh2m5a73y6yN/pub?gid=40865249&single=true&output=csv",
  documents:     "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0YLCPWVzB6f4AgQwQeXAXpUWvys2Di6L0qGZYap-jaBEFSzOwkBJbCvxb_qSHuoNauh2m5a73y6yN/pub?gid=40865249&single=true&output=csv",
  prayerTimes:   "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0YLCPWVzB6f4AgQwQeXAXpUWvys2Di6L0qGZYap-jaBEFSzOwkBJbCvxb_qSHuoNauh2m5a73y6yN/pub?gid=1351816230&single=true&output=csv",
} as const;

// Zon JAKIM untuk Taman Bukit Teratai (Ampang, Hulu Langat) = SGR01
// Jika surau di negeri/zona lain, tukar di sini.
// Senarai zon: https://api.waktusolat.app/zones
export const JAKIM_ZONE = "SGR01";
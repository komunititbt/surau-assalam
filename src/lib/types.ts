export interface SiteSetting {
  key: string;
  value: string;
  description: string;
}

export interface Page {
  slug: string;
  title: string;
  content: string;
  sort_order: string;
  status: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  is_pinned: string;
  status: string;
}

export interface Program {
  id: string;
  title: string;
  date: string;
  time: string;
  end_time: string;
  location: string;
  speaker: string;
  description: string;
  poster_url: string;
  status: string;
}

export interface Committee {
  id: string;
  name: string;
  position: string;
  photo_url: string;
  sort_order: string;
  status: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  event_date: string;
  description: string;
  sort_order: string;
  status: string;
}

export interface Document {
  id: string;
  title: string;
  category: string;
  file_url: string;
  published_date: string;
  description: string;
  status: string;
}

export interface PrayerTime {
  date: string;
  zone_code: string;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  source_url: string;
  status: string;
}

export interface PrayerToday {
  date: string;
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  source: string;
}
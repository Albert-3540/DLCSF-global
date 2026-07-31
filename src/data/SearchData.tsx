export interface SearchItem {
  title: string;
  type: string;
  url: string;
  category: string;
}

export const searchableContent: SearchItem[] = [
  { title: "Home", type: "Page", url: "/", category: "page" },
  { title: "Events", type: "Page", url: "/events", category: "page" },
  { title: "Gallery", type: "Page", url: "/gallery", category: "page" },
  { title: "Prayer Requests", type: "Page", url: "/prayer", category: "page" },
  { title: "Contact Us", type: "Page", url: "/contact", category: "page" },
  // Add more as needed
];
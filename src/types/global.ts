// Menu
export interface MenuItem {
  label: string;
  path: string;
}

export interface Question {
  q: string;
  a: string;
}

export interface FAQ {
  title: string;
  intro: string;
  docs: Question[];
}

export interface Post {
  title: string;
  excerpt: string;
  slug: string;
  content: string;
  coverImage: string;
  date: string;
  tag: string;
}

export interface Story {
  file: string;
  title: string;
  image: string;
  slug: string;
  steps: {
    content: string;
    obs: string;
  }[];
}

// Locales
export type Locale = "en" | "pt";

// Color modes
export type ColorMode = "dark" | "light";

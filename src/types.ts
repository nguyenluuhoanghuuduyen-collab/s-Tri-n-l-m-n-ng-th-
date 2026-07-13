export type CreativeSpace = "diary" | "prose" | "creative" | "criticism";

export interface ColorPalette {
  name: string;
  bg: string;
  text: string;
  accent: string;
}

export interface FontPairing {
  displayFont: string;
  bodyFont: string;
}

export interface ArtisticSuggestion {
  layout: string;
  colorPalette: ColorPalette;
  visualElement: string;
  fontPairing: FontPairing;
}

export interface MuseResponse {
  inspirationSpark: string;
  refinedContent: string;
  artisticSuggestion: ArtisticSuggestion;
  closingThought: string;
  questions: string[];
}

export interface SavedCreation {
  id: string;
  title: string;
  space: CreativeSpace;
  subType: string;
  rawContent: string;
  inspirationSpark: string;
  refinedContent: string;
  artisticSuggestion: ArtisticSuggestion;
  closingThought: string;
  questions: string[];
  createdAt: string;
  
  // Customizations made by user after generation
  customBg?: string;
  customText?: string;
  customAccent?: string;
  customDisplayFont?: string;
  customBodyFont?: string;
  customFontSize?: "sm" | "base" | "lg" | "xl" | "2xl";
  customAlignment?: "left" | "center" | "right" | "justify";
}

export interface TopicPrompt {
  id: string;
  title: string;
  description: string;
  hint: string;
}

export interface HistoryEntry {
  url: string;
  html: string | null;
  title: string;
  timestamp: number;
}

export interface NavigationEvent {
  type: 'NAVIGATE';
  url: string;
}

export type LoadingState = 'IDLE' | 'GENERATING' | 'COMPLETE' | 'ERROR';

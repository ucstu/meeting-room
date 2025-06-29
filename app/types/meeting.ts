export interface MeetingParticipant {
  id: string;
  name: string;
  email?: string;
  avatar?: string | null;
  isHost: boolean;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isSpeaking: boolean;
  joinedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: "text" | "system";
}

export interface MeetingRoom {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  participants: number;
  maxParticipants: number;
  hostId: string;
  createdAt: string;
  status: "active" | "ended" | "waiting";
}

export interface MeetingControls {
  audio: boolean;
  video: boolean;
  screenShare: boolean;
  chat: boolean;
}

// Legacy interfaces for backward compatibility
export interface Participant extends MeetingParticipant {
  audioEnabled: boolean;
  videoEnabled: boolean;
}

export type Room = MeetingRoom;

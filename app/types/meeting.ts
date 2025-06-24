export interface Participant {
  id: number;
  name: string;
  isMicOn: boolean;
  isCameraOn: boolean;
  avatar: string;
}

export interface ChatMessage {
  id: number;
  user: string;
  message: string;
  time: string;
  type: "system" | "user" | "me";
}

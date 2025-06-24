import type { ChatMessage, Participant } from "~/types/meeting";

export function useMeeting() {
  // 会议状态
  const isInMeeting = ref(false);
  const isMicOn = ref(true);
  const isCameraOn = ref(true);
  const isSpeakerOn = ref(true);

  // 聊天功能
  const showChat = ref(false);
  const chatMessages = ref<ChatMessage[]>([
    {
      id: 1,
      user: "系统",
      message: "欢迎加入会议室",
      time: "14:30",
      type: "system",
    },
    { id: 2, user: "张三", message: "大家好！", time: "14:31", type: "user" },
    { id: 3, user: "李四", message: "下午好~", time: "14:32", type: "user" },
  ]);

  // 参会者列表
  const participants = ref<Participant[]>([
    {
      id: 1,
      name: "张三",
      isMicOn: true,
      isCameraOn: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang",
    },
    {
      id: 2,
      name: "李四",
      isMicOn: false,
      isCameraOn: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Li",
    },
    {
      id: 3,
      name: "王五",
      isMicOn: true,
      isCameraOn: false,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wang",
    },
    {
      id: 4,
      name: "赵六",
      isMicOn: true,
      isCameraOn: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zhao",
    },
  ]);

  // 会议功能
  const joinMeeting = () => {
    isInMeeting.value = true;
  };

  const leaveMeeting = () => {
    isInMeeting.value = false;
  };

  const toggleMic = () => {
    isMicOn.value = !isMicOn.value;
  };

  const toggleCamera = () => {
    isCameraOn.value = !isCameraOn.value;
  };

  const toggleSpeaker = () => {
    isSpeakerOn.value = !isSpeakerOn.value;
  };

  const toggleChat = () => {
    showChat.value = !showChat.value;
  };

  const sendMessage = (message: string) => {
    chatMessages.value.push({
      id: Date.now(),
      user: "我",
      message,
      time: new Date().toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "me",
    });
  };

  const inviteParticipants = () => {
    // 邀请参会者逻辑
    alert("邀请链接已复制到剪贴板");
  };

  return {
    // 状态
    isInMeeting,
    isMicOn,
    isCameraOn,
    isSpeakerOn,
    showChat,
    chatMessages,
    participants,

    // 方法
    joinMeeting,
    leaveMeeting,
    toggleMic,
    toggleCamera,
    toggleSpeaker,
    toggleChat,
    sendMessage,
    inviteParticipants,
  };
}

export function useMeeting(room: MaybeRefOrGetter<string>) {
  const { send, receive } = useSignal();

  const roomRef = toRef(room);
  const members = ref<Record<string, ReturnType<typeof usePeer>>>({});

  // #region 主动联系现房间的人
  receive((signal) => {
    if (signal.type === "existing") {
      signal.members.forEach((member) => {
        members.value[member] = usePeer(member);
      });
    }
  });
  // #endregion

  // #region 主动回复服务器的Ping检测
  receive((signal) => {
    if (signal.type === "ping") {
      send({
        type: "pong",
      });
    }
  });
  // #endregion

  // #region 主动联系加入房间的人
  receive((signal) => {
    if (signal.type === "join") {
      members.value[signal.from] = usePeer(signal.from);
    }
  });
  // #endregion

  // #region 主动删除离开房间的人
  receive((signal) => {
    if (signal.type === "leave") {
      const peer = members.value[signal.from];
      if (peer) {
        peer.close();
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete members.value[signal.from];
      }
    }
  });
  // #region

  // #region 告知其他人和服务器我的离开和加入房间状态
  watchImmediate(roomRef, (room, old) => {
    if (old) {
      send({
        type: "leave",
        room: old,
      });
      Object.entries(members.value).forEach(([key, value]) => {
        value.close();
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete members.value[key];
      });
    }
    send({
      type: "join",
      room,
    });
  });
  // #endregion

  return {
    members,
  };
}

export function usePeer(to: string) {
  const { send, receive } = useSignal();

  const connectionstate = ref();
  const iceconnectionstate = ref();
  const icegatheringstate = ref();
  const signalingstate = ref();

  const peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:derper.ucstu.com:3478",
      },
    ],
  });

  peer.addEventListener("connectionstatechange", function (event) {
    console.log(event);
  });

  peer.addEventListener("iceconnectionstatechange", function (event) {
    console.log(event);
  });

  peer.addEventListener("icegatheringstatechange", function (event) {
    console.log(event);
  });

  peer.addEventListener("signalingstatechange", function (event) {
    console.log(event);
  });

  peer.addEventListener("track", function (event) {
    console.log(event);
  });

  peer.addEventListener("datachannel", function (event) {
    console.log(event);
  });

  peer.addEventListener("icecandidate", function (event) {
    const { candidate } = event;
    if (candidate) {
      send({
        type: "ice-candidate",
        candidate,
        to,
      });
    }
  });

  // #region 接收对方可访问的ICE候选者
  receive(async (signal) => {
    if (signal.type === "ice-candidate") {
      await peer.addIceCandidate(new RTCIceCandidate(signal.candidate));
    }
  });
  // #endregion

  // #region 接受对方发起的连接请求并回复
  receive(async (signal) => {
    if (signal.type === "offer") {
      peer.setRemoteDescription(new RTCSessionDescription(signal.offer));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      send({
        type: "answer",
        answer,
        to,
      });
    }
  });
  // #endregion

  // #region 接收对方的连接请求应答
  receive(async (signal) => {
    if (signal.type === "answer") {
      peer.setRemoteDescription(new RTCSessionDescription(signal.answer));
    }
  });
  // #endregion

  // #region 主动向对方发起连接请求
  peer.createOffer().then(async (offer) => {
    await peer.setLocalDescription(offer);
    send({
      type: "offer",
      offer,
      to,
    });
  });
  // #endregion

  function close() {
    peer.close();
  }

  // 销毁时自动关闭连接
  onScopeDispose(close);

  return {
    connectionstate,
    iceconnectionstate,
    icegatheringstate,
    signalingstate,
    close,
  };
}

type Signal =
  | {
      type: "join";
      from: string;
      room: string;
    }
  | {
      type: "existing";
      members: string[];
    }
  | {
      type: "offer";
      from: string;
      to: string;
      offer: RTCSessionDescriptionInit;
    }
  | {
      type: "answer";
      from: string;
      to: string;
      answer: RTCSessionDescriptionInit;
    }
  | {
      type: "ice-candidate";
      from: string;
      to: string;
      candidate: RTCIceCandidateInit;
    }
  | {
      type: "leave";
      from: string;
      room: string;
    }
  | {
      type: "ping";
    }
  | {
      type: "pong";
      from: string;
    };

type OmitFromUnion<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

export const useSignal = createGlobalState(function () {
  const from = useState<string>("signal-from", crypto.randomUUID);
  const { on, trigger } = createEventHook<Signal>();
  const { send, status } = useWebSocket("/ws/meeting", {
    async onMessage(_, event) {
      trigger(
        JSON.parse(
          typeof event.data === "string" ? event.data : await event.data.text()
        ) as Signal
      );
    },
  });

  return {
    status,
    receive: on,
    send(signal: OmitFromUnion<Signal, "from">) {
      send(
        JSON.stringify({
          ...signal,
          from: from.value,
        })
      );
    },
  };
});

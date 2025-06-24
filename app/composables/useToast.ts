interface ToastMessage {
  id: number
  type: "success" | "error" | "info"
  message: string
}

const toasts = ref<ToastMessage[]>([])
let id = 0

export function useToast() {
  function show(message: string, type: "success" | "error" | "info" = "info") {
    const toast: ToastMessage = { id: ++id, type, message }
    toasts.value.push(toast)
    setTimeout(() => {
      const idx = toasts.value.findIndex(t => t.id === toast.id)
      if (idx !== -1) toasts.value.splice(idx, 1)
    }, 2500)
  }
  return {
    show,
    success: (msg: string) => show(msg, "success"),
    error: (msg: string) => show(msg, "error"),
    info: (msg: string) => show(msg, "info"),
    toasts: readonly(toasts)
  }
}

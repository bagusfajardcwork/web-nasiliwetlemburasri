import type { ToastInterface } from "vue-toastification";

export function toastSuccess(toast: ToastInterface, message: string) {
  toast.success(message);
}

export function toastError(toast: ToastInterface, message: string) {
  toast.error(message);
}

export function toastWarning(toast: ToastInterface, message: string) {
  toast.warning(message);
}

export function toastInfo(toast: ToastInterface, message: string) {
  toast.info(message);
}
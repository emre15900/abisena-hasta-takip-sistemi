import Swal from 'sweetalert2'

interface ConfirmOptions {
  title: string
  text: string
  confirmText: string
  cancelText: string
  isDark?: boolean
}

export async function confirmAction({
  title,
  text,
  confirmText,
  cancelText,
  isDark = false,
}: ConfirmOptions): Promise<boolean> {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: '#0284c7',
    cancelButtonColor: '#64748b',
    background: isDark ? '#1e293b' : '#ffffff',
    color: isDark ? '#f1f5f9' : '#0f172a',
    customClass: {
      popup: 'rounded-2xl',
    },
  })
  return result.isConfirmed
}

export async function confirmDelete(
  message: string,
  title: string,
  confirmText: string,
  cancelText: string,
  isDark = false,
): Promise<boolean> {
  const result = await Swal.fire({
    title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: '#e11d48',
    cancelButtonColor: '#64748b',
    background: isDark ? '#1e293b' : '#ffffff',
    color: isDark ? '#f1f5f9' : '#0f172a',
    customClass: {
      popup: 'rounded-2xl',
    },
  })
  return result.isConfirmed
}

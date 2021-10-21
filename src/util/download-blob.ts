export default function downloadBlob(blob: Blob, title: string) {
  const a = document.createElement('a')

  a.href = URL.createObjectURL(blob)
  a.setAttribute('download', title)
  a.style.display = 'none'

  document.body.appendChild(a)

  a.click()
  a.remove()

  window.setTimeout(() => {
    URL.revokeObjectURL(a.href)
  }, 7000)
}

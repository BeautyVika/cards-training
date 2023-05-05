export const fileToBasePromise = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    if (file.size < 4000000) {
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    }
  })

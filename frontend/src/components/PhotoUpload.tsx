interface PhotoUploadProps {
  value?: string
  onChange: (dataUrl: string | undefined) => void
}

export function PhotoUpload({ value, onChange }: PhotoUploadProps) {
  function handleFile(file: File | undefined) {
    if (!file) {
      onChange(undefined)
      return
    }
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="field">
      <label htmlFor="photo">Фото (необязательно)</label>
      <input
        id="photo"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {value && (
        <img
          src={value}
          alt="Предпросмотр фото заявки"
          style={{ maxWidth: '100%', borderRadius: 'var(--radius-md)' }}
        />
      )}
    </div>
  )
}

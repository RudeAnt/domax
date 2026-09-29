interface PhotoUploadProps {
  value?: string
  onChange: (dataUrl: string | undefined) => void
}

/** Плитка «Добавьте фото» из макета; после выбора показывает предпросмотр. */
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
    <div className="photo-tile">
      <label className="photo-tile__label" htmlFor="photo">
        {value ? (
          <img className="photo-tile__preview" src={value} alt="Предпросмотр фото заявки" />
        ) : (
          <span>Добавьте фото</span>
        )}
      </label>
      <input
        id="photo"
        className="photo-tile__input"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {value && (
        <button
          type="button"
          className="photo-tile__remove"
          aria-label="Убрать фото"
          onClick={() => onChange(undefined)}
        >
          ✕
        </button>
      )}
    </div>
  )
}

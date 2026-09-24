import type { TextareaHTMLAttributes } from 'react'
import { useId } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  hint?: string
  error?: string
}

/** Та же .field-обёртка, что и TextField, но для textarea (описание заявки и т.п.). */
export function TextArea({ label, hint, error, id, className, rows = 4, ...rest }: TextAreaProps) {
  const generatedId = useId()
  const textareaId = id ?? generatedId

  return (
    <div className={['field', className].filter(Boolean).join(' ')}>
      <label htmlFor={textareaId}>{label}</label>
      <textarea id={textareaId} rows={rows} aria-invalid={Boolean(error)} {...rest} />
      {error ? (
        <p className="field-hint field-hint--error">{error}</p>
      ) : hint ? (
        <p className="field-hint">{hint}</p>
      ) : null}
    </div>
  )
}

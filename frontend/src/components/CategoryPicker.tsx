import { SLA_CONFIG } from '../data/slaConfig'
import type { RequestCategory } from '../types/request'

interface CategoryPickerProps {
  value: RequestCategory
  onChange: (category: RequestCategory) => void
  suggested?: RequestCategory
}

export function CategoryPicker({ value, onChange, suggested }: CategoryPickerProps) {
  return (
    <div className="field">
      <label htmlFor="category">Категория</label>
      <select
        id="category"
        value={value}
        onChange={(e) => onChange(e.target.value as RequestCategory)}
      >
        {SLA_CONFIG.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      {suggested && suggested !== value && (
        <p className="field-hint">
          По описанию похоже на «{SLA_CONFIG.find((c) => c.id === suggested)?.label}» —
          можно переключить категорию выше.
        </p>
      )}
    </div>
  )
}

import { CATEGORY_CONFIG } from '../data/slaConfig'
import type { RequestCategory } from '../types/request'

interface CategoryPickerProps {
  value: RequestCategory
  onChange: (category: RequestCategory) => void
  suggested?: RequestCategory
}

export function CategoryPicker({ value, onChange, suggested }: CategoryPickerProps) {
  return (
    <div className="panel-field">
      <select
        id="category"
        className="panel-input"
        aria-label="Категория"
        value={value}
        onChange={(e) => onChange(e.target.value as RequestCategory)}
      >
        {CATEGORY_CONFIG.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      {suggested && suggested !== value && (
        <p className="field-hint">
          По описанию похоже на «{CATEGORY_CONFIG.find((c) => c.id === suggested)?.label}» —
          можно переключить категорию выше.
        </p>
      )}
    </div>
  )
}

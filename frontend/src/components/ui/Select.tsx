import type { ReactNode, SelectHTMLAttributes } from 'react'
import { useId } from 'react'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label: string
  options: SelectOption[]
  hint?: ReactNode
}

/**
 * Обобщённый select под .field. CategoryPicker сейчас верстает select
 * вручную с тем же разметочным паттерном — со временем стоит переписать
 * его через этот компонент (options = SLA_CONFIG.map(...)), тут не трогал,
 * чтобы не задеть рабочую логику автоклассификации.
 */
export function Select({ label, options, hint, id, className, ...rest }: SelectProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId

  return (
    <div className={['field', className].filter(Boolean).join(' ')}>
      <label htmlFor={selectId}>{label}</label>
      <select id={selectId} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? <p className="field-hint">{hint}</p> : null}
    </div>
  )
}

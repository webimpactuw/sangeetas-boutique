import { useCallback, useEffect, useMemo } from 'react'
import { PatchEvent, set, unset, useFormValue } from 'sanity'

import {
  SANITY_ACCESSORY_CATEGORY_OPTIONS,
  SANITY_APPAREL_CATEGORY_OPTIONS,
} from '../../app/lib/categories.js'

/**
 * Category dropdown that updates when Shop section (department) changes.
 * Sanity string fields require options.list to be an array — not a function.
 */
export default function CategoryInput(props) {
  const { value, onChange, readOnly } = props
  const department = useFormValue(['department'])

  const options = useMemo(() => {
    const list =
      department === 'accessories'
        ? SANITY_ACCESSORY_CATEGORY_OPTIONS
        : SANITY_APPAREL_CATEGORY_OPTIONS
    return Array.isArray(list) ? list : []
  }, [department])

  useEffect(() => {
    if (!value || options.length === 0) return
    if (!options.some((o) => o.value === value)) {
      onChange(PatchEvent.from(unset()))
    }
  }, [department, options, value, onChange])

  const handleChange = useCallback(
    (event) => {
      const next = event.currentTarget.value
      onChange(PatchEvent.from(next ? set(next) : unset()))
    },
    [onChange],
  )

  return (
    <select
      value={value ?? ''}
      onChange={handleChange}
      disabled={Boolean(readOnly)}
      style={{
        width: '100%',
        padding: '9px 12px',
        fontSize: '14px',
        border: '1px solid #cbd5e1',
        borderRadius: '3px',
        background: readOnly ? '#f1f5f9' : '#fff',
        color: '#1a2744',
      }}
    >
      <option value="">Select a category…</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.title}
        </option>
      ))}
    </select>
  )
}

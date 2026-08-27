import { useRef, useState } from "preact/hooks"

// react-hook-form の薄い代替

type Rule = {
  required?: string
}

type FieldError = {
  type: string
  message?: string
}

type FormErrors<T> = Partial<Record<keyof T, FieldError>>

type RegisterProps = {
  name: string
  value: string
  onInput: (e: { currentTarget: HTMLInputElement | HTMLTextAreaElement }) => void
}

export function useForm<T extends Record<string, unknown>>({ values }: { values?: T } = {}) {
  const [form, setForm] = useState<T>(values ?? ({} as T))
  const [errors, setErrors] = useState<FormErrors<T>>({})
  const rules = useRef<Partial<Record<keyof T, Rule>>>({})

  const register = (name: keyof T & string, opts?: Rule & { value?: unknown }): RegisterProps => {
    if (opts?.value !== undefined) setForm(prev => ({ ...prev, [name]: opts.value }))
    if (opts?.required !== undefined) rules.current[name] = { required: opts.required }
    return {
      name,
      value: (form[name] ?? "") as string,
      onInput: e => setForm(prev => ({ ...prev, [name]: e.currentTarget.value })),
    }
  }

  const setValue = (name: keyof T & string, value: unknown) =>
    setForm(prev => ({ ...prev, [name]: value }))

  const getValues = (name?: keyof T & string) => (name ? form[name] : form)

  const setError = (name: keyof T & string, error: FieldError) =>
    setErrors(prev => ({ ...prev, [name]: error }))

  const handleSubmit = (onSubmit: (data: T) => void) => (e?: { preventDefault: () => void }) => {
    e?.preventDefault()
    const nextErrors: FormErrors<T> = {}
    for (const [name, rule] of Object.entries(rules.current)) {
      if (rule?.required && !form[name as keyof T]) {
        nextErrors[name as keyof T] = { type: "required", message: rule.required }
      }
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) onSubmit(form)
  }

  return { register, setError, errors, handleSubmit, getValues, setValue }
}

export type UseFormReturn<T extends Record<string, unknown>> = ReturnType<typeof useForm<T>>

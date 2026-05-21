import { useEffect, useState, type FormEvent } from 'react'
import { HiXMark } from 'react-icons/hi2'
import type { PatientFormData, PatientRecord } from '../types/patient'
import { useLanguage } from '../context/LanguageContext'
import {
  BLOOD_TYPES,
  createEmptyPatient,
  DEPARTMENTS,
  patientToForm,
  STATUSES,
} from '../utils/patientHelpers'
import { inputClass, labelClass, selectClass } from '../utils/styles'

interface PatientFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: PatientFormData) => void
  patient?: PatientRecord | null
}

export function PatientFormModal({
  isOpen,
  onClose,
  onSubmit,
  patient,
}: PatientFormModalProps) {
  const { t } = useLanguage()
  const [form, setForm] = useState<PatientFormData>(createEmptyPatient())
  const [tagsInput, setTagsInput] = useState('')

  const isEdit = Boolean(patient)

  useEffect(() => {
    if (isOpen) {
      if (patient) {
        setForm(patientToForm(patient))
        setTagsInput(patient.tags.join(', '))
      } else {
        setForm(createEmptyPatient())
        setTagsInput('')
      }
    }
  }, [isOpen, patient])

  if (!isOpen) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!form.fullName.trim()) return

    onSubmit({
      ...form,
      tags: tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    })
    onClose()
  }

  const update = <K extends keyof PatientFormData>(
    key: K,
    value: PatientFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-slate-800">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-800">
          <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-slate-100">
            {isEdit ? t.editPatient : t.addPatient}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            aria-label={t.close}
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t.fullName} required>
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label={t.department}>
              <select
                value={form.department}
                onChange={(e) => update('department', e.target.value)}
                className={selectClass}
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {(t.departments as Record<string, string>)[d] ?? d}
                  </option>
                ))}
              </select>
            </Field>

            <Field label={t.birthDate}>
              <input
                type="date"
                value={form.birthDate.split('T')[0]}
                onChange={(e) => update('birthDate', e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label={t.appointmentDate}>
              <input
                type="date"
                value={form.appointmentDate.split('T')[0]}
                onChange={(e) => update('appointmentDate', e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label={t.status}>
              <select
                value={form.status}
                onChange={(e) =>
                  update('status', e.target.value as PatientRecord['status'])
                }
                className={selectClass}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label={t.priority}>
              <select
                value={form.priority}
                onChange={(e) =>
                  update('priority', e.target.value as PatientRecord['priority'])
                }
                className={selectClass}
              >
                <option value="normal">{t.priorityNormal}</option>
                <option value="acil">{t.priorityUrgent}</option>
              </select>
            </Field>

            <Field label={t.bloodType}>
              <select
                value={form.bloodType}
                onChange={(e) => update('bloodType', e.target.value)}
                className={selectClass}
              >
                {BLOOD_TYPES.map((bt) => (
                  <option key={bt} value={bt}>
                    {bt}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={`${t.diagnosis} (TR)`}>
              <input
                type="text"
                value={form.diagnosis_tr}
                onChange={(e) => update('diagnosis_tr', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label={`${t.diagnosis} (EN)`}>
              <input
                type="text"
                value={form.diagnosis_en}
                onChange={(e) => update('diagnosis_en', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label={`${t.note} (TR)`}>
              <textarea
                rows={2}
                value={form.note_tr}
                onChange={(e) => update('note_tr', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label={`${t.note} (EN)`}>
              <textarea
                rows={2}
                value={form.note_en}
                onChange={(e) => update('note_en', e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label={t.tags}>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="kalp, kronik, diyabet"
              className={inputClass}
            />
          </Field>

          <Field label={t.notes}>
            <textarea
              rows={2}
              value={form.notes ?? ''}
              onChange={(e) => update('notes', e.target.value || null)}
              className={inputClass}
            />
          </Field>

          <div className="flex flex-wrap gap-6">
            <Checkbox
              label={t.isInsured}
              checked={form.isInsured}
              onChange={(v) => update('isInsured', v)}
            />
            <Checkbox
              label={t.isFollowUp}
              checked={form.isFollowUp}
              onChange={(v) => update('isFollowUp', v)}
            />
            <Checkbox
              label={t.isVaccinated}
              checked={form.isVaccinated}
              onChange={(v) => update('isVaccinated', v)}
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="rounded-lg bg-clinic-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-clinic-700"
            >
              {t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({
  label,
  children,
  required,
}: {
  label: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
    </label>
  )
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-slate-300 text-clinic-600 focus:ring-clinic-500 dark:border-slate-600"
      />
      <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
    </label>
  )
}

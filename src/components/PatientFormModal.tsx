import {
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
} from 'antd'
import { useEffect } from 'react'
import type { PatientFormData, PatientRecord } from '../types/patient'
import { useLanguage } from '../context/LanguageContext'
import {
  BLOOD_TYPES,
  createEmptyPatient,
  DEPARTMENTS,
  patientToForm,
  STATUSES,
} from '../utils/patientHelpers'

interface PatientFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: PatientFormData) => void
  patient?: PatientRecord | null
}

type FormValues = PatientFormData & { tagsInput: string }

export function PatientFormModal({
  isOpen,
  onClose,
  onSubmit,
  patient,
}: PatientFormModalProps) {
  const { t } = useLanguage()
  const [form] = Form.useForm<FormValues>()
  const isEdit = Boolean(patient)

  useEffect(() => {
    if (isOpen) {
      if (patient) {
        const data = patientToForm(patient)
        form.setFieldsValue({
          ...data,
          birthDate: data.birthDate.split('T')[0],
          appointmentDate: data.appointmentDate.split('T')[0],
          tagsInput: patient.tags.join(', '),
        })
      } else {
        const empty = createEmptyPatient()
        form.setFieldsValue({
          ...empty,
          tagsInput: '',
        })
      }
    }
  }, [isOpen, patient, form])

  const handleFinish = (values: FormValues) => {
    const { tagsInput, ...rest } = values
    onSubmit({
      ...rest,
      tags: tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    })
    onClose()
  }

  return (
    <Modal
      title={isEdit ? t.editPatient : t.addPatient}
      open={isOpen}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={t.save}
      cancelText={t.cancel}
      width={720}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="mt-4"
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="fullName"
              label={t.fullName}
              rules={[{ required: true, message: t.fullName }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="department" label={t.department}>
              <Select
                options={DEPARTMENTS.map((d) => ({
                  value: d,
                  label: (t.departments as Record<string, string>)[d] ?? d,
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="birthDate" label={t.birthDate}>
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="appointmentDate" label={t.appointmentDate}>
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="status" label={t.status}>
              <Select
                options={STATUSES.map((s) => ({ value: s, label: s }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="priority" label={t.priority}>
              <Select
                options={[
                  { value: 'normal', label: t.priorityNormal },
                  { value: 'acil', label: t.priorityUrgent },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="bloodType" label={t.bloodType}>
              <Select
                options={BLOOD_TYPES.map((bt) => ({ value: bt, label: bt }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item name="diagnosis_tr" label={`${t.diagnosis} (TR)`}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="diagnosis_en" label={`${t.diagnosis} (EN)`}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="note_tr" label={`${t.note} (TR)`}>
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="note_en" label={`${t.note} (EN)`}>
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="tagsInput" label={t.tags}>
          <Input placeholder="kalp, kronik, diyabet" />
        </Form.Item>

        <Form.Item name="notes" label={t.notes}>
          <Input.TextArea rows={2} />
        </Form.Item>

        <Space size="large">
          <Form.Item name="isInsured" valuePropName="checked" noStyle>
            <Checkbox>{t.isInsured}</Checkbox>
          </Form.Item>
          <Form.Item name="isFollowUp" valuePropName="checked" noStyle>
            <Checkbox>{t.isFollowUp}</Checkbox>
          </Form.Item>
          <Form.Item name="isVaccinated" valuePropName="checked" noStyle>
            <Checkbox>{t.isVaccinated}</Checkbox>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  )
}

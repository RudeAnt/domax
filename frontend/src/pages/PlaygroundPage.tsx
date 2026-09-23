import { useState } from 'react'
import { Badge } from '../components/ui/Badge'
import { BottomSheet } from '../components/ui/BottomSheet'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { Fab } from '../components/ui/Fab'
import { IconButton } from '../components/ui/IconButton'
import { PageHeader } from '../components/PageHeader'
import { Select } from '../components/ui/Select'
import { Spinner } from '../components/ui/Spinner'
import { TextArea } from '../components/ui/TextArea'
import { TextField } from '../components/ui/TextField'

/**
 * Только для разработки — визуальная проверка src/components/ui на
 * мобильном вьюпорте. Не подключать в основной флоу пользователя,
 * маршрут добавлен отдельно в App.tsx (см. комментарий там).
 */
export function PlaygroundPage() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <>
      <PageHeader title="UI Kit" showBack />
      <main className="app-content stack">
        <Card style={{ padding: 'var(--space-4)' }}>
          <p style={{ marginTop: 0 }}>Buttons</p>
          <div className="stack" style={{ gap: 'var(--space-2)' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Button variant="primary" loading={loading} onClick={() => setLoading((v) => !v)}>
              Toggle loading
            </Button>
            <IconButton aria-label="Пример иконки">★</IconButton>
          </div>
        </Card>

        <Card style={{ padding: 'var(--space-4)' }}>
          <p style={{ marginTop: 0 }}>Form fields</p>
          <div className="stack">
            <TextField label="Адрес" placeholder="ул. Тестовая, д. 1" />
            <TextField label="Телефон" error="Введите телефон в формате +7..." />
            <TextArea label="Описание" hint="Чем подробнее, тем точнее категория" />
            <Select
              label="Категория"
              options={[
                { value: 'leak', label: 'Протечка' },
                { value: 'elevator', label: 'Лифт' },
              ]}
            />
          </div>
        </Card>

        <Card style={{ padding: 'var(--space-4)' }}>
          <p style={{ marginTop: 0 }}>Badges</p>
          <div className="stack" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            <Badge tone="neutral">Neutral</Badge>
            <Badge tone="info">Info</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="danger">Danger</Badge>
            <Badge tone="success">Success</Badge>
          </div>
        </Card>

        <Card style={{ padding: 'var(--space-4)' }}>
          <p style={{ marginTop: 0 }}>Spinner</p>
          <Spinner size={28} />
        </Card>

        <EmptyState
          title="Пусто"
          description="Так выглядит пустой список заявок"
          action={<Button variant="secondary">Действие</Button>}
        />

        <Button variant="secondary" onClick={() => setSheetOpen(true)}>
          Открыть BottomSheet
        </Button>
      </main>

      <Fab aria-label="Добавить" onClick={() => setSheetOpen(true)}>
        +
      </Fab>

      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Пример шторки">
        <p>Контент внутри BottomSheet — форма, подтверждение действия и т.п.</p>
        <Button variant="primary" onClick={() => setSheetOpen(false)}>
          Закрыть
        </Button>
      </BottomSheet>
    </>
  )
}

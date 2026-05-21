# Abisena — Hasta Takip Sistemi

Poliklinik hasta randevu ve takip paneli. Abisena / Panates teknik değerlendirme case study projesi.

## Tech Stack

- **React 18** (Vite — Next.js kullanılmaz)
- **TypeScript**
- **Tailwind CSS**

## Özellikler

| Özellik | Açıklama |
|---------|----------|
| Listeleme | Hasta kayıtları API'den GET ile çekilir |
| Ekleme | API yok — yeni kayıtlar local state'e eklenir |
| Düzenleme | Local state üzerinde güncellenir |
| Silme | Local state üzerinden silinir |
| Arama | Hasta adına göre metin araması |
| Filtreleme | Randevu durumuna göre filtre |
| Sıralama | Ad, randevu tarihi veya skora göre artan/azalan |
| Dil | TR / EN arayüz desteği |

## API

```
GET https://v0-json-api-three.vercel.app/api/data
```

## Kurulum

```bash
yarn install
yarn dev
```

Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışır.

## Production Build

```bash
yarn build
yarn preview
```

## Proje Yapısı

```
src/
├── api/           # API istekleri
├── components/    # UI bileşenleri
├── context/       # Dil (i18n) context
├── hooks/         # usePatients — state yönetimi
├── i18n/          # Çeviriler (TR/EN)
├── types/         # PatientRecord tip tanımları
└── utils/         # Filtre, sıralama, yardımcılar
```

## Veri Modeli — PatientRecord

`id`, `fullName`, `birthDate`, `appointmentDate`, `createdAt`, `department`, `status`, `priority`, `bloodType`, `score`, `note_tr`, `note_en`, `diagnosis_tr`, `diagnosis_en`, `isInsured`, `isFollowUp`, `isVaccinated`, `tags`, `notes?`

## Lisans

MIT

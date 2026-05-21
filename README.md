# Abisena — Hasta Takip Sistemi

Poliklinik hasta randevu ve takip paneli. Abisena / Panates teknik değerlendirme case study projesi.

## Tech Stack

- **React 18** (Vite — Next.js kullanılmaz)
- **TypeScript**
- **Ant Design 6** (tablo, form, modal, filtreler, dark mode)
- **Redux Toolkit** (tema, dil, hasta state)
- **react-hot-toast** (işlem bildirimleri)
- **Tailwind CSS** (layout yardımcıları)

## Özellikler

| Özellik | Açıklama |
|---------|----------|
| Listeleme | Hasta kayıtları API'den GET ile çekilir |
| Ekleme | API yok — yeni kayıtlar local state'e eklenir |
| Düzenleme | Local state üzerinde güncellenir |
| Silme | Local state üzerinden silinir |
| Arama | Hasta adına göre metin araması |
| Filtreleme | Durum ve önceliğe göre filtre |
| Sıralama | Tablo sütunlarından (ad, randevu, kan grubu) |
| Sütun filtreleri | Bölüm, kan grubu, durum, öncelik |
| Sayfalama | Sayfa başına 10 kayıt |
| Mobil | Accordion liste görünümü |
| Dark mode | Aydınlık / karanlık tema |
| Dil | TR / EN arayüz desteği |
| Kalıcılık | Ekleme/düzenleme/silme localStorage'da saklanır |
| Bildirim | Başarılı işlemlerde sağ üst toast |

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
├── enums/         # Merkezi enum tanımları
├── hooks/         # useLanguage, useTheme, useFilterQueryParams
├── i18n/          # Çeviriler (TR/EN)
├── services/      # localStorage hasta mutasyonları
├── store/         # Redux Toolkit slices
├── types/         # PatientRecord tip tanımları
└── utils/         # Filtre, sıralama, yardımcılar
```

## Veri Modeli — PatientRecord

`id`, `fullName`, `birthDate`, `appointmentDate`, `createdAt`, `department`, `status`, `priority`, `bloodType`, `score`, `note_tr`, `note_en`, `diagnosis_tr`, `diagnosis_en`, `isInsured`, `isFollowUp`, `isVaccinated`, `tags`, `notes?`

## Lisans

MIT

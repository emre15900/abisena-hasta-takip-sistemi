# Abisena — Hasta Takip Sistemi

Poliklinik hasta randevu ve takip paneli. Abisena / Panates teknik değerlendirme case study projesi.

## Ekran Görüntüleri

Uygulamanın arayüzü aşağıda özetlenmiştir. Tüm görseller [`screenshots/`](screenshots/) klasöründedir.

### Ana panel (masaüstü)

İstatistik kartları, arama/filtre alanı ve hasta tablosu. Türkçe ve İngilizce dil desteği; aydınlık ve karanlık tema.

| Aydınlık (TR) | Karanlık (TR) |
|:---:|:---:|
| ![Ana panel — aydınlık tema, Türkçe](screenshots/01-dashboard-light-tr.png) | ![Ana panel — karanlık tema, Türkçe](screenshots/02-dashboard-dark-tr.png) |

| Aydınlık (EN) | Karanlık (EN) |
|:---:|:---:|
| ![Ana panel — aydınlık tema, İngilizce](screenshots/03-dashboard-light-en.png) | ![Ana panel — karanlık tema, İngilizce](screenshots/04-dashboard-dark-en.png) |

### Hasta işlemleri (CRUD)

Yeni hasta ekleme, düzenleme, detay görüntüleme ve silme onayı modalları.

| Yeni hasta (aydınlık) | Yeni hasta (karanlık) |
|:---:|:---:|
| ![Yeni hasta formu](screenshots/05-modal-add-patient-light.png) | ![Yeni hasta formu — karanlık](screenshots/06-modal-add-patient-dark.png) |

| Hastayı düzenle (aydınlık) | Hastayı düzenle (karanlık) |
|:---:|:---:|
| ![Düzenleme modalı](screenshots/07-modal-edit-patient-light.png) | ![Düzenleme modalı — karanlık](screenshots/08-modal-edit-patient-dark.png) |

| Hasta detayı (aydınlık) | Hasta detayı (karanlık) |
|:---:|:---:|
| ![Detay modalı](screenshots/09-modal-detail-light.png) | ![Detay modalı — karanlık](screenshots/10-modal-detail-dark.png) |

| Silme onayı |
|:---:|
| ![Kayıt silme onayı](screenshots/12-modal-delete-confirm.png) |

### Arama ve filtreleme

Hasta adına göre arama; sonuç bulunduğunda istatistik kartları ve tablo güncellenir. Eşleşme yoksa boş durum mesajı gösterilir.

| Aktif arama | Boş sonuç |
|:---:|:---:|
| ![Arama: Emre](screenshots/11-filter-search-active.png) | ![Kriterlere uygun hasta yok](screenshots/13-filter-empty-state.png) |

Filtreler URL sorgu parametrelerine yazılır (`q`, `status`, `priority`); sayfa yenilense veya link paylaşılsa filtreler korunur.

![URL filtre parametreleri](screenshots/20-url-query-filters.png)

### Mobil görünüm

Dar ekranlarda tablo yerine accordion liste; kart genişletildiğinde detaylar ve işlem butonları görünür.

| Mobil panel (aydınlık) | Mobil panel (karanlık) |
|:---:|:---:|
| ![Mobil dashboard](screenshots/14-mobile-dashboard-light.png) | ![Mobil dashboard — karanlık](screenshots/18-mobile-dashboard-dark.png) |

| Accordion liste | Accordion — genişletilmiş (aydınlık) |
|:---:|:---:|
| ![Mobil hasta listesi](screenshots/15-mobile-accordion-list-light.png) | ![Mobil hasta detayı — açık kart](screenshots/16-mobile-accordion-expanded-light.png) |

| Accordion — genişletilmiş (karanlık) | Mobil detay modalı |
|:---:|:---:|
| ![Mobil hasta detayı — karanlık](screenshots/17-mobile-accordion-expanded-dark.png) | ![Mobil hasta detay modalı](screenshots/19-mobile-detail-modal.png) |

### Veri kalıcılığı (localStorage)

Ekleme, düzenleme ve silme işlemleri tarayıcıda saklanır; tema ve dil tercihleri de kalıcıdır.

![localStorage — hasta mutasyonları, tema ve dil](screenshots/21-localstorage-persistence.png)

---

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
screenshots/       # README ekran görüntüleri
```

## Veri Modeli — PatientRecord

`id`, `fullName`, `birthDate`, `appointmentDate`, `createdAt`, `department`, `status`, `priority`, `bloodType`, `score`, `note_tr`, `note_en`, `diagnosis_tr`, `diagnosis_en`, `isInsured`, `isFollowUp`, `isVaccinated`, `tags`, `notes?`

## Lisans

MIT

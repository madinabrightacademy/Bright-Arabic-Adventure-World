const fs = require('fs');

let content = fs.readFileSync('src/data/curriculum.ts', 'utf8');

// 1. Expand KTB in SKILLS_DATA
const oldKtbBlock = `  // KTB - Pelabuhan Kitabah
  {
    skill_id: 'KTB-L1-01',
    owner_island: 'KTB',
    level: 1,
    name: 'Imla\\' Dikte Kata Sederhana',
    description: 'Mendengar kata dan memilih susunan ejaan huruf yang tepat',
    audience: 'AD',
    scope: 'Ejaan akurat'
  },`;

const newKtbBlock = `  // KTB - Pelabuhan Kitabah (Tulis, Imla' & Kaligrafi)
  {
    skill_id: 'KTB-L0-01',
    owner_island: 'KTB',
    level: 0,
    name: 'Goresan Huruf Sambung & 6 Huruf Pemutus Kiri',
    description: 'Menuliskan bentuk huruf pemutus kiri (ا د ذ ر ز و) yang tidak menyambung ke huruf setelahnya',
    audience: 'AD',
    scope: 'Ortografi dasar pemutus kiri'
  },
  {
    skill_id: 'KTB-L0-02',
    owner_island: 'KTB',
    level: 0,
    name: 'Bentuk Posisi Awal, Tengah, dan Akhir',
    description: 'Menuliskan perubahan visual huruf hijaiyah saat berada di awal kata, tengah, dan akhir',
    audience: 'AD',
    scope: 'Bentuk posisi huruf sambung'
  },
  {
    skill_id: 'KTB-L1-01',
    owner_island: 'KTB',
    level: 1,
    name: 'Imla\\' Ta\\' Marbuthah (ـة/ة) vs Ta\\' Maftuhah (ت)',
    description: 'Membedakan bunyi h saat waqaf (ta marbuthah) dan bunyi t permanen (ta maftuhah)',
    audience: 'AD',
    scope: 'Kaidah ortografi ta marbuthah'
  },
  {
    skill_id: 'KTB-L1-02',
    owner_island: 'KTB',
    level: 1,
    name: 'Imla\\' Alif Lam Qamariyyah vs Syamsiyyah & Sukun',
    description: 'Menuliskan alif lam yang berharakat sukun jelas (Qamariyyah) dan ber-syaddah lebur (Syamsiyyah)',
    audience: 'AD',
    scope: 'Ortografi Alif Lam & Asy-Syamsiyyah'
  },
  {
    skill_id: 'KTB-L2-01',
    owner_island: 'KTB',
    level: 2,
    name: 'Hamzah Mutatharrifah di Akhir Kata & Hamzah Qath\\'',
    description: 'Menuliskan letak hamzah akhir kata sesuai harakat huruf sebelumnya (di atas alif, waw, ya, atau baris)',
    audience: 'AD',
    scope: 'Hamzah mutatharrifah & alif layyinah'
  },
  {
    skill_id: 'KTB-L2-02',
    owner_island: 'KTB',
    level: 2,
    name: 'Merangkai Kartu Ucapan Sahabat & Korespondensi (Tahni\\'ah)',
    description: 'Menulis kartu ucapan selamat hari raya, doa kesembuhan, dan terima kasih dengan ejaan indah',
    audience: 'AD',
    scope: 'Penulisan kartu pos fungsional'
  },
  {
    skill_id: 'KTB-L3-01',
    owner_island: 'KTB',
    level: 3,
    name: 'Tanda Baca Arab (Tarqim) & Paragraf Kaligrafi Mandiri',
    description: 'Menerapkan tanda koma (،), titik dua (:), tanda tanya (؟) dan seru (!) dalam susunan teks naskh',
    audience: 'AD',
    scope: 'Tanda baca tarqim & insya\\' muwajjah'
  },`;

if (content.includes(oldKtbBlock)) {
  content = content.replace(oldKtbBlock, newKtbBlock);
  console.log('Successfully expanded KTB skills');
} else {
  console.log('Could not find exact oldKtbBlock, searching fallback');
}

// 2. Expand KLM skills
const oldKlmLast = `  {
    skill_id: 'KLM-L2-01',
    owner_island: 'KLM',
    level: 2,
    name: 'Intonasi Kalimat Tanya, Perintah & Seru',
    description: 'Membedakan nada naik pada istifham (tanya) dan nada tegas berwibawa pada amar (perintah)',
    audience: 'AD',
    scope: 'Intonasi fonetik kalimat kompleks'
  },`;

const newKlmLast = `  {
    skill_id: 'KLM-L2-01',
    owner_island: 'KLM',
    level: 2,
    name: 'Intonasi Kalimat Tanya, Perintah & Seru',
    description: 'Membedakan nada naik pada istifham (tanya) dan nada tegas berwibawa pada amar (perintah)',
    audience: 'AD',
    scope: 'Intonasi fonetik kalimat kompleks'
  },
  {
    skill_id: 'KLM-L2-02',
    owner_island: 'KLM',
    level: 2,
    name: 'Melafalkan Dzikir & Doa Harian dengan Tajwid Presisi',
    description: 'Melafalkan doa bangun tidur, doa makan, dan tasbih dengan makhraj fasih dan intonasi tenang',
    audience: 'AD',
    scope: 'Doa harian & kelancaran tajwid'
  },
  {
    skill_id: 'KLM-L3-01',
    owner_island: 'KLM',
    level: 3,
    name: 'Pidato Singkat (Khitabah) & Presentasi Diri Fasih (Thalaqah Lanjut)',
    description: 'Menyampaikan perkenalan diri dan pesan hikmah lisan 1-2 menit dengan percaya diri di hadapan penutur asli',
    audience: 'AD',
    scope: 'Retorika khitabah & thalaqah mandiri'
  },`;

if (content.includes(oldKlmLast)) {
  content = content.replace(oldKlmLast, newKlmLast);
  console.log('Successfully expanded KLM skills');
}

// 3. Expand TMH skills
const oldTmh = `  // TMH - Kuil Langit
  {
    skill_id: 'TMH-L0-01',
    owner_island: 'TMH',
    level: 0,
    name: 'Gerbang Ujian Jenjang 0 (Mihrab Tamhidi)',
    description: 'Evaluasi komprehensif 4 keterampilan untuk naik Rutbah Thalib',
    audience: 'AD',
    scope: 'Ujian Jenjang 0'
  }`;

const newTmh = `  // TMH - Kuil Langit (Ujian Jenjang 4 Keterampilan)
  {
    skill_id: 'TMH-L0-01',
    owner_island: 'TMH',
    level: 0,
    name: 'Gerbang Ujian Jenjang 0 (Mihrab Tamhidi - Pra-A1)',
    description: 'Evaluasi komprehensif 4 keterampilan untuk naik Rutbah Thalib',
    audience: 'AD',
    scope: 'Ujian Jenjang 0'
  },
  {
    skill_id: 'TMH-L1-01',
    owner_island: 'TMH',
    level: 1,
    name: 'Gerbang Ujian Jenjang 1 (Mihrab Mubtadi\\' - A1)',
    description: 'Evaluasi komprehensif kosakata inti, dialog sapaan & kalimat dasar untuk naik Rutbah Rahhal',
    audience: 'AD',
    scope: 'Ujian Jenjang 1'
  },
  {
    skill_id: 'TMH-L2-01',
    owner_island: 'TMH',
    level: 2,
    name: 'Gerbang Ujian Jenjang 2 (Mihrab Asasi - A2)',
    description: 'Evaluasi tata bahasa qawa\\'id, wacana pendek & menyimak detail untuk naik Rutbah Qari',
    audience: 'AD',
    scope: 'Ujian Jenjang 2'
  },
  {
    skill_id: 'TMH-L3-01',
    owner_island: 'TMH',
    level: 3,
    name: 'Gerbang Ujian Jenjang 3 (Mihrab Mutawassith - B1)',
    description: 'Evaluasi pemahaman teks panjang, dikte paragraf & kelancaran berbicara untuk naik Rutbah Katib',
    audience: 'AD',
    scope: 'Ujian Jenjang 3'
  }`;

if (content.includes(oldTmh)) {
  content = content.replace(oldTmh, newTmh);
  console.log('Successfully expanded TMH skills');
}

fs.writeFileSync('src/data/curriculum.ts', content, 'utf8');
console.log('curriculum.ts updated successfully with expanded skills');

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Play,
  Volume2,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Star,
  Compass,
  Crown,
  ShieldCheck,
  Search,
  Filter,
  Check,
  X,
  HelpCircle,
  FileText,
  Flame,
  ArrowRight
} from 'lucide-react';
import { UserProfile, Island } from '../types/game';
import { sound } from '../services/sound';
import { GameStorage } from '../services/storage';
import { SKILLS_DATA, LEXICON_DATA } from '../data/curriculum';
import { getSkillPedagogy } from '../data/skillPedagogy';

interface PulauTamhidHubModalProps {
  island: Island;
  profile: UserProfile;
  onClose: () => void;
  onLaunchGame: (gameId: string) => void;
  onReward: (xp: number, stars: number) => void;
  onPromote?: () => void;
}

// 6 Jenjang Mihrab Ujian dengan 4 Pilar Terpadu
interface MihrabLevelData {
  level: number;
  mihrabNameAr: string;
  mihrabNameId: string;
  targetRutbah: 'Thalib' | 'Rahhal' | 'Qari' | 'Katib' | 'Adib' | 'Adib Agung';
  hudhudStage: 'Baby' | 'Young' | 'Explorer' | 'Scribe' | 'Guardian' | 'Master';
  hudhudDesc: string;
  badgeColor: string;
  questions: {
    pilar: 'Istima\'' | 'Kalam' | 'Qira\'ah' | 'Kitabah';
    pilarColor: string;
    prompt: string;
    arAudio?: string;
    arText?: string;
    options: {
      text: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  }[];
}

const MIHRAB_LEVELS: MihrabLevelData[] = [
  {
    level: 0,
    mihrabNameAr: 'مِحْرَابُ التَّمْهِيدِ (المُسَافِر ⟵ طَالِب)',
    mihrabNameId: 'Mihrab 0: Tamhidi (Pra-A1)',
    targetRutbah: 'Thalib',
    hudhudStage: 'Baby',
    hudhudDesc: 'Telur Hudhud menetas menjadi anak burung kecil lucu berbulu kuning!',
    badgeColor: 'from-amber-400 to-yellow-600',
    questions: [
      {
        pilar: 'Istima\'',
        pilarColor: 'bg-emerald-500',
        prompt: 'Dengarkan lafal vokal pendek berikut, manakah benda yang dimaksud?',
        arAudio: 'خُبْز',
        options: [
          { text: 'Roti hangat (خُبْزٌ)', isCorrect: true, explanation: 'Benar! Kata yang dilafalkan adalah Khubz (roti).' },
          { text: 'Air bersih (مَاءٌ)', isCorrect: false, explanation: 'Bunyi konsonan awal adalah Kha (خ), bukan Mim (م).' },
          { text: 'Susu segar (حَلِيبٌ)', isCorrect: false, explanation: 'Bukan halib; bunyi berakhiran Zai (ز).' }
        ]
      },
      {
        pilar: 'Kalam',
        pilarColor: 'bg-blue-500',
        prompt: 'Jika sahabatmu menyapa dengan ucapan "السَّلَامُ عَلَيْكُمْ", jawaban lisan yang paling fasih dan santun adalah:',
        arText: 'السَّلَامُ عَلَيْكُمْ',
        options: [
          { text: 'وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللَّهِ', isCorrect: true, explanation: 'Mumtaz! Menjawab salam lengkap mendoakan keselamatan kembali.' },
          { text: 'مَا اسْمُكَ؟', isCorrect: false, explanation: 'Ini menanyakan nama, bukan menjawab salam.' },
          { text: 'أَنَا أَبٌ', isCorrect: false, explanation: 'Ini memperkenalkan peran keluarga, bukan jawaban salam.' }
        ]
      },
      {
        pilar: 'Qira\'ah',
        pilarColor: 'bg-purple-500',
        prompt: 'Bacalah frasa tunjuk berikut: "هٰذَا كِتَابٌ كَبِيرٌ". Apa arti kalimat tersebut?',
        arText: 'هٰذَا كِتَابٌ كَبِيرٌ',
        options: [
          { text: 'Ini sebuah buku yang besar', isCorrect: true, explanation: 'Tepat sekali! Kitab bermakna buku, dan kabir bermakna besar.' },
          { text: 'Ini sebuah pena yang kecil', isCorrect: false, explanation: 'Pena adalah qalam (قلم), bukan kitab.' },
          { text: 'Itu sebuah rumah yang luas', isCorrect: false, explanation: 'Hadha adalah kata tunjuk dekat (ini).' }
        ]
      },
      {
        pilar: 'Kitabah',
        pilarColor: 'bg-amber-500',
        prompt: 'Manakah bentuk huruf Ba yang terletak di posisi AWAL kata bersambung?',
        options: [
          { text: 'بـ (Gigi dengan satu titik di bawah ke arah kiri)', isCorrect: true, explanation: 'Benar! Huruf Ba di awal bersambung memiliki tangan menjulur ke kiri.' },
          { text: 'ـبـ (Tangan di kanan dan kiri)', isCorrect: false, explanation: 'Ini adalah bentuk tengah kata.' },
          { text: 'ـب (Perahu menutup di akhir kata)', isCorrect: false, explanation: 'Ini adalah bentuk akhir kata.' }
        ]
      }
    ]
  },
  {
    level: 1,
    mihrabNameAr: 'مِحْرَابُ المُبْتَدِئِ (طَالِب ⟵ رَحَّال)',
    mihrabNameId: 'Mihrab 1: Mubtadi\' (A1)',
    targetRutbah: 'Rahhal',
    hudhudStage: 'Young',
    hudhudDesc: 'Hudhud tumbuh menjadi burung muda lincah siap menjelajah!',
    badgeColor: 'from-blue-500 to-indigo-600',
    questions: [
      {
        pilar: 'Istima\'',
        pilarColor: 'bg-emerald-500',
        prompt: 'Simak percakapan sapaan: "كَيْفَ حَالُكَ يَا صَدِيقِي؟" Apa respon yang didengar?',
        arAudio: 'أَنَا بِخَيْرٍ وَالحَمْدُ لِلَّهِ',
        options: [
          { text: 'Saya baik-baik saja, alhamdulillah (أَنَا بِخَيْرٍ)', isCorrect: true, explanation: 'Tepat! Respon standar menanyakan kabar.' },
          { text: 'Saya seorang dokter di rumah sakit', isCorrect: false, explanation: 'Bukan jawaban untuk pertanyaan kabar.' },
          { text: 'Saya datang dari Jakarta', isCorrect: false, explanation: 'Ini jawaban untuk asal daerah (min ayna).' }
        ]
      },
      {
        pilar: 'Kalam',
        pilarColor: 'bg-blue-500',
        prompt: 'Kamu ingin menanyakan nama teman baru perempuan secara santun. Ucapan lisan yang benar adalah:',
        options: [
          { text: 'مَا اسْمُكِ؟ (Mā ismuki?) — dengan kasrah untuk muannats', isCorrect: true, explanation: 'Mumtaz! Untuk lawan bicara perempuan, dhamir kaf berharakat kasrah (ki).' },
          { text: 'مَا اسْمُكَ؟ (Mā ismuka?)', isCorrect: false, explanation: 'Ismuka digunakan untuk pria (mudzakkar).' },
          { text: 'مَا اسْمُهُ؟ (Mā ismuhu?)', isCorrect: false, explanation: 'Ismuhu digunakan untuk orang ketiga pria (dia).' }
        ]
      },
      {
        pilar: 'Qira\'ah',
        pilarColor: 'bg-purple-500',
        prompt: 'Bacalah kalimat berikut: "الطَّالِبُ يَكْتُبُ الدَّرْسَ فِي الفَصْلِ". Di manakah murid tersebut menulis?',
        arText: 'الطَّالِبُ يَكْتُبُ الدَّرْسَ فِي الفَصْلِ',
        options: [
          { text: 'Di dalam ruang kelas (فِي الفَصْلِ)', isCorrect: true, explanation: 'Shahih! Al-Fashl bermakna ruang kelas.' },
          { text: 'Di dalam kebun binatang', isCorrect: false, explanation: 'Kebun adalah hadiqah.' },
          { text: 'Di atas meja perpustakaan', isCorrect: false, explanation: 'Teks menyatakan fi al-fashl (di dalam kelas).' }
        ]
      },
      {
        pilar: 'Kitabah',
        pilarColor: 'bg-amber-500',
        prompt: 'Susunlah kata-kata acak berikut menjadi kalimat ismiyyah sempurna: [نَظِيفَةٌ] [هٰذِهِ] [الغُرْفَةُ]',
        options: [
          { text: 'هٰذِهِ الغُرْفَةُ نَظِيفَةٌ (Kamar ini bersih)', isCorrect: true, explanation: 'Benar sekali! Isim isyarah mendahului kata beralif lam, diikuti khabar bertanwin.' },
          { text: 'نَظِيفَةٌ هٰذِهِ الغُرْفَةُ', isCorrect: false, explanation: 'Urutan susunan tidak lazim.' },
          { text: 'الغُرْفَةُ نَظِيفَةٌ هٰذِهِ', isCorrect: false, explanation: 'Isim isyarah tidak diletakkan di akhir susunan na\'at/khabar.' }
        ]
      }
    ]
  },
  {
    level: 2,
    mihrabNameAr: 'مِحْرَابُ الأَسَاسِيِّ (رَحَّال ⟵ قَارِئ)',
    mihrabNameId: 'Mihrab 2: Asasi (A2)',
    targetRutbah: 'Qari',
    hudhudStage: 'Explorer',
    hudhudDesc: 'Hudhud memakai kacamata pelindung dan topi petualang cakrawala!',
    badgeColor: 'from-emerald-500 to-teal-700',
    questions: [
      {
        pilar: 'Istima\'',
        pilarColor: 'bg-emerald-500',
        prompt: 'Dengarkan arahan guru (Awāmir al-Faṣl): Manakah instruksi yang diucapkan?',
        arAudio: 'اِفْتَحُوا كُتُبَكُمْ عَلَى الصَّفْحَةِ العَاشِرَةِ',
        options: [
          { text: 'Bukalah buku-buku kalian pada halaman ke-10!', isCorrect: true, explanation: 'Tepat! Iftaḥū kutubakum ʿalā ṣ-ṣafḥati l-ʿāsyirah.' },
          { text: 'Tutuplah pintu kelas sekarang!', isCorrect: false, explanation: 'Bukan perintah menutup pintu.' },
          { text: 'Dengarkan baik-baik rekaman audio ini!', isCorrect: false, explanation: 'Bukan istami\'ū.' }
        ]
      },
      {
        pilar: 'Kalam',
        pilarColor: 'bg-blue-500',
        prompt: 'Di pasar tradisional, kamu ingin menawar harga buah: "بِكَمْ هٰذَا الكِيلُو مِنَ التُّفَّاحِ؟". Apa makna ujaranmu?',
        arText: 'بِكَمْ هٰذَا الكِيلُو مِنَ التُّفَّاحِ؟',
        options: [
          { text: 'Berapa harga satu kilo buah apel ini?', isCorrect: true, explanation: 'Mumtaz! Bi-kam artinya berapa harga, dan tufah artinya apel.' },
          { text: 'Apakah buah jeruk ini masih segar?', isCorrect: false, explanation: 'Jeruk adalah burtuqal, bukan tuffah.' },
          { text: 'Tolong timbangkan dua kilo anggur!', isCorrect: false, explanation: 'Ini bukan permintaan timbang, melainkan menanyakan harga.' }
        ]
      },
      {
        pilar: 'Qira\'ah',
        pilarColor: 'bg-purple-500',
        prompt: 'Bacalah cuplikan fabel: "سَقَطَتِ النَّمْلَةُ فِي النَّهْرِ، فَأَلْقَتْ لَهَا الحَمَامَةُ وَرَقَةَ شَجَرٍ". Siapakah yang menolong semut?',
        arText: 'سَقَطَتِ النَّمْلَةُ فِي النَّهْرِ، فَأَلْقَتْ لَهَا الحَمَامَةُ وَرَقَةَ شَجَرٍ',
        options: [
          { text: 'Burung merpati (الحَمَامَةُ) dengan melempar sehelai daun', isCorrect: true, explanation: 'Shahih! Al-Hamamah melempar waraqah syajar (daun pohon).' },
          { text: 'Katak sungai yang berenang', isCorrect: false, explanation: 'Katak tidak disebutkan dalam teks.' },
          { text: 'Ikan mas di dalam air', isCorrect: false, explanation: 'Ikan tidak menolong semut dalam fabel ini.' }
        ]
      },
      {
        pilar: 'Kitabah',
        pilarColor: 'bg-amber-500',
        prompt: 'Manakah kalimat fi\'liyyah yang paling tepat harakat fa\'il (pelaku) dan maf\'ul bih (objek)-nya?',
        options: [
          { text: 'قَرَأَ الطَّالِبُ القِصَّةَ (Fa\'il dhommah, Maf\'ul fathah)', isCorrect: true, explanation: 'Benar sekali! Pelaku (At-Thalibu) marfu dhommah, objek (Al-Qishshata) manshub fathah.' },
          { text: 'قَرَأَ الطَّالِبَ القِصَّةُ', isCorrect: false, explanation: 'Harakatnya tertukar; pelaku tidak difathah dan objek tidak didhommah.' }
        ]
      }
    ]
  },
  {
    level: 3,
    mihrabNameAr: 'مِحْرَابُ المُتَوَسِّطِ (قَارِئ ⟵ كَاتِب)',
    mihrabNameId: 'Mihrab 3: Mutawassith (B1)',
    targetRutbah: 'Katib',
    hudhudStage: 'Scribe',
    hudhudDesc: 'Hudhud membawa gulungan perkamen dan pena bulu emas!',
    badgeColor: 'from-amber-600 to-rose-700',
    questions: [
      {
        pilar: 'Istima\'',
        pilarColor: 'bg-emerald-500',
        prompt: 'Dengarkan pengumuman stasiun kereta berikut:',
        arAudio: 'سَيُغَادِرُ القِطَارُ رَقْمُ 5 الرَّصِيفَ الثَّالِثَ بَعْدَ عَشْرِ دَقَائِقَ',
        options: [
          { text: 'Kereta no. 5 akan berangkat dari peron 3 dalam 10 menit', isCorrect: true, explanation: 'Mumtaz! Pemahaman detail informasi waktu dan nomor peron.' },
          { text: 'Kereta api mengalami keterlambatan satu jam', isCorrect: false, explanation: 'Tidak ada kata ta\'khir (keterlambatan).' },
          { text: 'Pintu gerbang keberangkatan telah ditutup', isCorrect: false, explanation: 'Pengumuman menyatakan sayughadir (akan berangkat).' }
        ]
      },
      {
        pilar: 'Kalam',
        pilarColor: 'bg-blue-500',
        prompt: 'Dalam diskusi, bagaimana menyampaikan opini pribadimu secara santun dan terpelajar?',
        options: [
          { text: 'فِي رَأْيِي الشَّخْصِيِّ، التَّعْلِيمُ هُوَ أَسَاسُ النَّجَاحِ', isCorrect: true, explanation: 'Benar! "Fī raʾyī sy-syakhṣiyyi..." adalah formula santun menyampaikan pendapat.' },
          { text: 'أَنْتَ لَا تَفْهَمُ شَيْئًا', isCorrect: false, explanation: 'Ini kalimat kasar dan tidak beradab.' }
        ]
      },
      {
        pilar: 'Qira\'ah',
        pilarColor: 'bg-purple-500',
        prompt: 'Bacalah bait hikmah: "تَعَلَّمْ فَلَيْسَ المَرْءُ يُولَدُ عَالِمًا". Apa pesan moral utama syair tersebut?',
        arText: 'تَعَلَّمْ فَلَيْسَ المَرْءُ يُولَدُ عَالِمًا',
        options: [
          { text: 'Belajarlah, karena tak seorang pun terlahir langsung berilmu', isCorrect: true, explanation: 'Shahih! Nasehat agung dari Imam Syafi\'i tentang pentingnya menuntut ilmu.' },
          { text: 'Ilmu hanya milik orang-orang kaya', isCorrect: false, explanation: 'Bait ini justru menegaskan semua orang harus belajar.' }
        ]
      },
      {
        pilar: 'Kitabah',
        pilarColor: 'bg-amber-500',
        prompt: 'Kaidah Imla: Manakah penulisan kata berhamzah washal yang tepat saat didahului partikel Wau (و)?',
        options: [
          { text: 'وَاسْمُهُ (Washmuhu — alif washal tidak memakai kepala ain)', isCorrect: true, explanation: 'Benar! Ism menggunakan hamzah washal, sehingga tidak ditulis hamzah atas/bawah.' },
          { text: 'وَأَسْمُهُ', isCorrect: false, explanation: 'Salah, ism bukan hamzah qatha.' }
        ]
      }
    ]
  },
  {
    level: 4,
    mihrabNameAr: 'مِحْرَابُ المُتَقَدِّمِ (كَاتِب ⟵ أَدِيب مُتَقَدِّم)',
    mihrabNameId: 'Mihrab 4: Mutaqaddim (B2)',
    targetRutbah: 'Adib',
    hudhudStage: 'Guardian',
    hudhudDesc: 'Hudhud mengenakan mahkota kristal dan perisai sayap baja!',
    badgeColor: 'from-violet-600 to-purple-800',
    questions: [
      {
        pilar: 'Istima\'',
        pilarColor: 'bg-emerald-500',
        prompt: 'Dengarkan kutipan pidato formal ini:',
        arAudio: 'إِنَّ اللُّغَةَ العَرَبِيَّةَ هِيَ وِعَاءُ الحَضَارَةِ الإِسْلَامِيَّةِ الخَالِدَةِ',
        options: [
          { text: 'Bahasa Arab adalah wadah peradaban Islam yang abadi', isCorrect: true, explanation: 'Tepat! Wi\'āʾul hadharah bermakna wadah peradaban.' },
          { text: 'Bahasa Arab adalah bahasa perdagangan kuno semata', isCorrect: false, explanation: 'Teks menyatakan hadharah islamiyyah khalidatan.' }
        ]
      },
      {
        pilar: 'Kalam',
        pilarColor: 'bg-blue-500',
        prompt: 'Dalam debat ilmiah, bagaimana cara membantah argumen lawan secara objektif dan beradab?',
        options: [
          { text: 'مَعَ احْتِرَامِي الشَّدِيدِ لِوُجْهَةِ نَظَرِكَ، لٰكِنَّ الأَدِلَّةَ تُشِيرُ إِلَى خِلَافِ ذٰلِكَ', isCorrect: true, explanation: 'Mumtaz! Dialektika adab tingkat tinggi.' },
          { text: 'كَلَامُكَ كُلُّهُ خَاطِئٌ بِلَا شَكٍّ', isCorrect: false, explanation: 'Terlalu agresif dan tidak ilmiah.' }
        ]
      },
      {
        pilar: 'Qira\'ah',
        pilarColor: 'bg-purple-500',
        prompt: 'Analisis I\'rab: Dalam kalimat "كَرَّمَ المَعْهَدُ الفَائِزِينَ", apa jabatan dan tanda i\'rab kata "الفَائِزِينَ"?',
        arText: 'كَرَّمَ المَعْهَدُ الفَائِزِينَ',
        options: [
          { text: 'Maf\'ul Bih (Objek), status Manshub dengan tanda huruf Ya (ي)', isCorrect: true, explanation: 'Benar sekali! Jamak mudzakkar salim manshub ditandai dengan huruf Ya.' },
          { text: 'Fa\'il (Subjek), status Marfu dengan tanda Wau (و)', isCorrect: false, explanation: 'Subjeknya adalah al-ma\'had (marfu dhommah).' }
        ]
      },
      {
        pilar: 'Kitabah',
        pilarColor: 'bg-amber-500',
        prompt: 'Manakah bentuk fi\'il tsulatsi maziid wazan [اِسْتَفْعَلَ] yang bermakna memohon ampunan?',
        options: [
          { text: 'اِسْتَغْفَرَ — يَسْتَغْفِرُ (Istaghfara - yastaghfiru)', isCorrect: true, explanation: 'Shahih! Wazan istaf\'ala berfaedah thalabul maghfirah (memohon ampunan).' },
          { text: 'غَفَرَ — يَغْفِرُ', isCorrect: false, explanation: 'Ini adalah mujarrad, bukan wazan maziid istaf\'ala.' }
        ]
      }
    ]
  },
  {
    level: 5,
    mihrabNameAr: 'المِحْرَابُ الأَعْلَى (أَدِيب ⟵ أَدِيب الكُلّ الأَعْظَم)',
    mihrabNameId: 'Mihrab 5: Mutamayyiz (C1/C2)',
    targetRutbah: 'Adib Agung',
    hudhudStage: 'Master',
    hudhudDesc: 'Hudhud Maharaja Sayap Keemasan dengan Mahkota Berlian Semesta!',
    badgeColor: 'from-amber-400 via-yellow-500 to-amber-700',
    questions: [
      {
        pilar: 'Istima\'',
        pilarColor: 'bg-emerald-500',
        prompt: 'Simak bait syi\'ir dengan intonasi Bahr Thawil:',
        arAudio: 'وَلَسْتُ أَرَى السَّعَادَةَ جَمْعَ مَالٍ ... وَلٰكِنَّ التَّقِيَّ هُوَ السَّعِيدُ',
        options: [
          { text: 'Aku tak memandang kebahagiaan itu mengumpulkan harta, melainkan orang bertakwalah yang bahagia', isCorrect: true, explanation: 'Mubarak! Bait mahsyur dari penyair Al-Hutai\'ah.' },
          { text: 'Kebahagiaan sejati ada pada kekayaan perhiasan dunia', isCorrect: false, explanation: 'Makna bait justru menolak anggapan tersebut.' }
        ]
      },
      {
        pilar: 'Kalam',
        pilarColor: 'bg-blue-500',
        prompt: 'Dalam khutbah mimbar resmi, kalimat pembuka retoris yang paling agung dan menggugah adalah:',
        options: [
          { text: 'أَيُّهَا الحَفْلُ الكَرِيمُ، السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ... أَمَّا بَعْدُ، فَإِنَّ خَيْرَ الحَدِيثِ كِتَابُ اللَّهِ', isCorrect: true, explanation: 'Mumtaz! Khitabah minbariyyah penuh kharisma fashahah.' },
          { text: 'مَرْحَبًا يَا شَبَاب، كَيْفَ الأُمُورُ مَعَكُمْ؟', isCorrect: false, explanation: 'Ini bahasa gaul santai, tidak layak untuk orasi mimbar tinggi.' }
        ]
      },
      {
        pilar: 'Qira\'ah',
        pilarColor: 'bg-purple-500',
        prompt: 'Balaghah: Kalimat "رَأَيْتُ أَسَدًا يَخْطُبُ عَلَى المِنْبَرِ" (Aku melihat singa berkhutbah di atas mimbar) mengandung gaya bahasa apa?',
        arText: 'رَأَيْتُ أَسَدًا يَخْطُبُ عَلَى المِنْبَرِ',
        options: [
          { text: 'Majaz Isti\'arah Tasrihiyyah (menyerupakan penceramah gagah berani dengan singa)', isCorrect: true, explanation: 'Luar biasa! Singa di sini adalah kiasan untuk orator yang perkasa, bukan singa rimba.' },
          { text: 'Makna haqiqah harfiah (singa binatang sungguhan)', isCorrect: false, explanation: 'Hewan buas tidak bisa berkhutbah di mimbar.' }
        ]
      },
      {
        pilar: 'Kitabah',
        pilarColor: 'bg-amber-500',
        prompt: 'Sintesis Sanad Kelulusan: Manakah ungkapan doa kelulusan yang mencerminkan ketawadhu\'an seorang Adib Agung?',
        options: [
          { text: 'اللَّهُمَّ عَلِّمْنَا مَا يَنْفَعُنَا، وَانْفَعْنَا بِمَا عَلَّمْتَنَا، وَزِدْنَا عِلْمًا وَأَدَبًا', isCorrect: true, explanation: 'Subhanallah! Doa penuh barakah penutup perjalanan kelulusan paripurna.' },
          { text: 'أَنَا أَعْلَمُ مِنْ جَمِيعِ أَهْلِ الأَرْضِ', isCorrect: false, explanation: 'Sikap ujub dan sombong merusak seluruh ilmu.' }
        ]
      }
    ]
  }
];

export const PulauTamhidHubModal: React.FC<PulauTamhidHubModalProps> = ({
  island,
  profile,
  onClose,
  onLaunchGame,
  onReward,
  onPromote
}) => {
  const [activeTab, setActiveTab] = useState<'mihrab' | 'rutbah' | 'syllabus' | 'glossary'>('mihrab');
  const [selectedMihrabIdx, setSelectedMihrabIdx] = useState(profile.level >= 0 && profile.level <= 5 ? profile.level : 0);

  // Mihrab Exam State
  const [examStarted, setExamStarted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [examFinished, setExamFinished] = useState(false);
  const [showCeremonyModal, setShowCeremonyModal] = useState(false);

  // Syllabus & Glossary Filter
  const [syllabusLevelFilter, setSyllabusLevelFilter] = useState<'all' | number>('all');
  const [syllabusSearch, setSyllabusSearch] = useState('');
  const [glossaryCategoryFilter, setGlossaryCategoryFilter] = useState<string>('all');
  const [glossarySearch, setGlossarySearch] = useState('');
  const [activePedagogySkillId, setActivePedagogySkillId] = useState<string | null>(null);

  // Play audio TTS
  const playArabicAudio = (text: string) => {
    sound.playPop();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const tmhSkills = useMemo(() => SKILLS_DATA.filter(s => s.owner_island === 'TMH'), []);
  const tmhLexemes = useMemo(() => LEXICON_DATA.filter(l => l.owner_island === 'TMH'), []);

  // Filtered Syllabus
  const filteredSkills = useMemo(() => {
    return tmhSkills.filter(skill => {
      const matchLevel = syllabusLevelFilter === 'all' || skill.level === syllabusLevelFilter;
      const matchSearch =
        syllabusSearch === '' ||
        skill.name.toLowerCase().includes(syllabusSearch.toLowerCase()) ||
        skill.skill_id.toLowerCase().includes(syllabusSearch.toLowerCase()) ||
        skill.scope.toLowerCase().includes(syllabusSearch.toLowerCase());
      return matchLevel && matchSearch;
    });
  }, [tmhSkills, syllabusLevelFilter, syllabusSearch]);

  // Categories in Glossary
  const glossaryCategories = useMemo(() => {
    const set = new Set<string>();
    tmhLexemes.forEach(l => {
      if (l.category) set.add(l.category);
    });
    return Array.from(set);
  }, [tmhLexemes]);

  // Filtered Glossary
  const filteredLexemes = useMemo(() => {
    return tmhLexemes.filter(lex => {
      const matchCat = glossaryCategoryFilter === 'all' || lex.category === glossaryCategoryFilter;
      const matchSearch =
        glossarySearch === '' ||
        lex.ar_vocalized.includes(glossarySearch) ||
        lex.translit.toLowerCase().includes(glossarySearch.toLowerCase()) ||
        lex.gloss_id.toLowerCase().includes(glossarySearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [tmhLexemes, glossaryCategoryFilter, glossarySearch]);

  const currentMihrab = MIHRAB_LEVELS[selectedMihrabIdx];
  const currentExamQuestion = currentMihrab.questions[currentQuestionIdx];

  // Start Exam
  const handleStartExam = () => {
    sound.playSparkle();
    setExamStarted(true);
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setExamFinished(false);
  };

  // Submit Answer
  const handleSubmitAnswer = () => {
    if (selectedOptionIdx === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const chosen = currentExamQuestion.options[selectedOptionIdx];
    if (chosen.isCorrect) {
      sound.playSuccess();
      setScore(prev => prev + 1);
    } else {
      sound.playPop();
    }
  };

  // Next Question
  const handleNextQuestion = () => {
    sound.playPop();
    if (currentQuestionIdx + 1 < currentMihrab.questions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finished
      setExamFinished(true);
      const finalScore = score + (selectedOptionIdx !== null && currentExamQuestion.options[selectedOptionIdx].isCorrect ? 1 : 0);
      const isPassed = finalScore >= Math.ceil(currentMihrab.questions.length * 0.75);
      if (isPassed) {
        sound.playFanfare();
        setShowCeremonyModal(true);
        onReward(120, 4);
        onPromote?.();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-5xl my-auto bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/40 rounded-3xl border-2 border-amber-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Top Header */}
        <div className="relative p-5 sm:p-6 bg-gradient-to-r from-amber-950/90 via-slate-900 to-yellow-950/80 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30 border border-yellow-200">
              <Crown className="w-7 h-7 sm:w-8 sm:h-8 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 uppercase tracking-widest">
                  {island.id} • MIHRAB KELULUSAN
                </span>
                <span className="text-xs font-medium text-slate-400">
                  {tmhSkills.length} Modul • {tmhLexemes.length} Kosakata Ujian
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-0.5">
                <span>{island.name_id}</span>
                <span className="text-base font-arabic text-amber-300 font-normal">
                  ({island.name_ar})
                </span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 sm:px-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('mihrab');
            }}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-sm border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'mihrab'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Crown className="w-4 h-4" />
            <span>Gerbang Mihrab Ujian</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('rutbah');
            }}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-sm border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'rutbah'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Galeri Rutbah & Syahadah</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('syllabus');
            }}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-sm border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'syllabus'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Silabus 12 Modul Ujian</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('glossary');
            }}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-sm border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'glossary'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Kamus Istilah Ujian ({tmhLexemes.length})</span>
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-slate-200 space-y-6">
          {/* TAB 1: GERBANG MIHRAB UJIAN */}
          {activeTab === 'mihrab' && (
            <div className="space-y-6">
              {/* Level Selector Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                {MIHRAB_LEVELS.map((m, idx) => (
                  <button
                    key={m.level}
                    onClick={() => {
                      sound.playPop();
                      setSelectedMihrabIdx(idx);
                      setExamStarted(false);
                      setExamFinished(false);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedMihrabIdx === idx
                        ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/50'
                        : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Jenjang {m.level}</div>
                    <div className="font-bold text-sm text-white truncate">{m.targetRutbah}</div>
                    <div className="text-[11px] font-arabic text-amber-300 truncate mt-0.5">
                      {m.hudhudStage}
                    </div>
                  </button>
                ))}
              </div>

              {/* Mihrab Arena & Simulator */}
              {!examStarted && !examFinished && (
                <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900/90 to-amber-950/40 border-2 border-amber-500/30 text-center space-y-5">
                  <div className="inline-flex p-4 rounded-3xl bg-amber-500/10 border border-amber-400/30 text-amber-300 shadow-inner">
                    <Crown className="w-12 h-12 text-amber-400 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 uppercase">
                      Gerbang Kehormatan Jenjang {currentMihrab.level}
                    </span>
                    <h3 className="text-2xl font-black text-white mt-2">
                      {currentMihrab.mihrabNameId}
                    </h3>
                    <p className="text-base font-arabic text-amber-300 mt-1">
                      {currentMihrab.mihrabNameAr}
                    </p>
                    <p className="text-sm text-slate-300 max-w-xl mx-auto mt-2">
                      Ujian integrasi 4 pilar (Istima', Kalam, Qira'ah, dan Kitabah). Lulus dengan nilai minimal 75% untuk menaikkan Rutbah menjadi <strong className="text-amber-300">{currentMihrab.targetRutbah}</strong> dan evolusi pendamping Hudhud menjadi <strong className="text-yellow-400">{currentMihrab.hudhudStage}</strong>.
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={handleStartExam}
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-black text-base shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>Masuki Mihrab Ujian Sekarang</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Active Exam Runner */}
              {examStarted && !examFinished && (
                <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-amber-500/40 space-y-5 shadow-2xl">
                  {/* Progress Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${currentExamQuestion.pilarColor}`}>
                        Pilar {currentQuestionIdx + 1}: {currentExamQuestion.pilar}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Soal {currentQuestionIdx + 1} dari {currentMihrab.questions.length}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-amber-400">
                      Skor Benar: {score}
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-white">
                      {currentExamQuestion.prompt}
                    </h4>

                    {currentExamQuestion.arAudio && (
                      <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                        <button
                          onClick={() => playArabicAudio(currentExamQuestion.arAudio || '')}
                          className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-sm flex items-center gap-2 shadow-md hover:bg-amber-400 transition-all"
                        >
                          <Volume2 className="w-5 h-5" />
                          <span>Dengarkan Suara Ujian</span>
                        </button>
                        <span className="text-xs text-slate-300">
                          Klik untuk memutar lafal audio bahasa Arab penutur asli
                        </span>
                      </div>
                    )}

                    {currentExamQuestion.arText && (
                      <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                        <span className="text-2xl sm:text-3xl font-arabic text-amber-300 font-bold leading-relaxed">
                          {currentExamQuestion.arText}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {currentExamQuestion.options.map((opt, optIdx) => {
                      const isSelected = selectedOptionIdx === optIdx;
                      let btnStyle = 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-800';

                      if (isAnswerSubmitted) {
                        if (opt.isCorrect) {
                          btnStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500/50';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-950/80 border-rose-400 text-rose-200 ring-2 ring-rose-500/50';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-amber-500/20 border-amber-400 text-amber-200 ring-2 ring-amber-400/40';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswerSubmitted}
                          onClick={() => {
                            sound.playPop();
                            setSelectedOptionIdx(optIdx);
                          }}
                          className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span className="font-medium text-sm sm:text-base">{opt.text}</span>
                          {isAnswerSubmitted && opt.isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                          )}
                          {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                            <X className="w-5 h-5 text-rose-400 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after submission */}
                  {isAnswerSubmitted && (
                    <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700 space-y-1">
                      <div className="text-xs font-bold text-amber-300 uppercase">Ulasan Kaidah:</div>
                      <p className="text-sm text-slate-300">
                        {currentExamQuestion.options[selectedOptionIdx || 0]?.explanation}
                      </p>
                    </div>
                  )}

                  {/* Action Controls */}
                  <div className="flex justify-end gap-3 pt-2">
                    {!isAnswerSubmitted ? (
                      <button
                        disabled={selectedOptionIdx === null}
                        onClick={handleSubmitAnswer}
                        className="px-6 py-3 rounded-2xl bg-amber-500 disabled:opacity-50 text-slate-950 font-black text-sm hover:bg-amber-400 transition-all shadow-lg"
                      >
                        Kirim Jawaban
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-sm hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                      >
                        <span>{currentQuestionIdx + 1 < currentMihrab.questions.length ? 'Lanjut Soal Pilar Berikutnya' : 'Lihat Hasil Mihrab'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Exam Finished Card */}
              {examFinished && (
                <div className="p-6 rounded-3xl bg-slate-900 border-2 border-amber-500/40 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
                    <Award className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Hasil Ujian Mihrab Jenjang {currentMihrab.level}</h3>
                  <div className="text-4xl font-black text-amber-400">
                    {score} / {currentMihrab.questions.length} Benar
                  </div>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    {score >= Math.ceil(currentMihrab.questions.length * 0.75)
                      ? `Selamat! Kamu dinyatakan MUMTAZ dan berhak menyandang gelar Rutbah ${currentMihrab.targetRutbah}!`
                      : 'Tetap semangat! Ulangi latihan silabus dan kuasai materi 4 pilar untuk menembus ambang batas kelulusan.'}
                  </p>

                  <div className="flex justify-center gap-3 pt-3">
                    <button
                      onClick={handleStartExam}
                      className="px-5 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-white font-bold text-sm hover:bg-slate-700"
                    >
                      Ulangi Ujian Ini
                    </button>
                    <button
                      onClick={() => setActiveTab('rutbah')}
                      className="px-5 py-3 rounded-2xl bg-amber-500 text-slate-950 font-black text-sm hover:bg-amber-400"
                    >
                      Buka Galeri Rutbah
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: GALERI RUTBAH & SYAHADAH */}
          {activeTab === 'rutbah' && (
            <div className="space-y-6">
              {/* Rutbah Progression Tracker */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-yellow-950/60 border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Crown className="w-5 h-5 text-amber-400" />
                    <span>Hierarki 6 Gelar Kehormatan (Rutbah) Kuil Langit</span>
                  </h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-400/40">
                    Rutbah Kamu: {profile.rutbah || 'Musafir'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { title: 'Musafir', ar: 'مُسَافِر', stage: 'Baby Hudhud', desc: 'Pemula (Pra-A1)' },
                    { title: 'Thalib', ar: 'طَالِب', stage: 'Baby Explorer', desc: 'Lulusan Jenjang 0' },
                    { title: 'Rahhal', ar: 'رَحَّال', stage: 'Young Explorer', desc: 'Lulusan Jenjang 1' },
                    { title: 'Qari\'', ar: 'قَارِئ', stage: 'Explorer', desc: 'Lulusan Jenjang 2' },
                    { title: 'Katib', ar: 'كَاتِب', stage: 'Scribe', desc: 'Lulusan Jenjang 3' },
                    { title: 'Adib', ar: 'أَدِيب', stage: 'Master Adib', desc: 'Lulusan Jenjang 4 & 5' }
                  ].map((r, i) => (
                    <div
                      key={r.title}
                      className={`p-3.5 rounded-2xl border ${
                        profile.rutbah === r.title
                          ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/50'
                          : 'bg-slate-800/40 border-slate-700/60'
                      }`}
                    >
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Tingkat {i}</div>
                      <div className="font-black text-base text-white">{r.title}</div>
                      <div className="font-arabic text-amber-300 text-sm">{r.ar}</div>
                      <div className="text-[11px] text-slate-300 mt-1">{r.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Digital Syahadah Certificate Card */}
              <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-amber-50 to-amber-100 text-slate-900 border-4 border-amber-600 shadow-2xl space-y-4 text-center">
                <div className="text-xs font-bold uppercase tracking-widest text-amber-800">
                  مَعْبَدُ السَّمَاءِ • شَهَادَةُ التَّقْدِيرِ وَالنَّجَاحِ
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-serif">
                  IJAZAH SANAD KELULUSAN RESMI
                </h2>
                <p className="text-xs text-slate-700">Madinah Bright Academy • Kepulauan Bahasa Arab Terpadu</p>

                <div className="py-2 border-y-2 border-amber-700/30 max-w-lg mx-auto">
                  <div className="text-xs font-semibold text-slate-600">Dianugerahkan kepada sang penjelajah:</div>
                  <div className="text-xl sm:text-2xl font-black text-amber-900 mt-1">
                    {profile.name || 'Thalib al-Ilm'}
                  </div>
                  <div className="text-sm font-bold text-amber-700 mt-1">
                    Atas keberhasilan menempuh jenjang dengan predikat kehormatan: {profile.rutbah || 'Musafir'}
                  </div>
                </div>

                <div className="flex items-center justify-between max-w-md mx-auto pt-2 text-xs text-slate-600">
                  <div>
                    <div className="font-bold text-slate-800">Tanggal Anugerah</div>
                    <div>{new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 border-2 border-amber-700 flex items-center justify-center text-slate-950 font-black shadow-md">
                    👑 SANAD
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">Dewan Penguji</div>
                    <div>Kuil Langit (TMH)</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SILABUS 12 MODUL UJIAN */}
          {activeTab === 'syllabus' && (
            <div className="space-y-4">
              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar pb-1">
                  <button
                    onClick={() => setSyllabusLevelFilter('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      syllabusLevelFilter === 'all'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Semua ({tmhSkills.length})
                  </button>
                  {[0, 1, 2, 3, 4, 5].map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setSyllabusLevelFilter(lvl)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        syllabusLevelFilter === lvl
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Jenjang {lvl}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={syllabusSearch}
                    onChange={e => setSyllabusSearch(e.target.value)}
                    placeholder="Cari modul atau ujian..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredSkills.map(skill => {
                  const pedagogy = getSkillPedagogy(skill);
                  return (
                    <div
                      key={skill.skill_id}
                      className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 hover:border-amber-500/40 transition-all space-y-2 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/30">
                            {skill.skill_id} • Level {skill.level}
                          </span>
                          <span className="text-xs text-slate-400 font-medium truncate">
                            {skill.scope}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-white mt-1.5">
                          {skill.name}
                        </h4>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                          {skill.description}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                        <button
                          onClick={() => {
                            sound.playPop();
                            setActivePedagogySkillId(skill.skill_id);
                          }}
                          className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Buka Detail Modul & Kuis</span>
                        </button>

                        <button
                          onClick={() => {
                            sound.playSparkle();
                            setSelectedMihrabIdx(skill.level);
                            setActiveTab('mihrab');
                            handleStartExam();
                          }}
                          className="px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold text-xs transition-all border border-amber-400/40"
                        >
                          Uji Mihrab Ini
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: KAMUS ISTILAH UJIAN (49 KOSAKATA) */}
          {activeTab === 'glossary' && (
            <div className="space-y-4">
              {/* Category Filter & Search */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar pb-1">
                  <button
                    onClick={() => setGlossaryCategoryFilter('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      glossaryCategoryFilter === 'all'
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Semua Kategori ({tmhLexemes.length})
                  </button>
                  {glossaryCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setGlossaryCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        glossaryCategoryFilter === cat
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={glossarySearch}
                    onChange={e => setGlossarySearch(e.target.value)}
                    placeholder="Cari lafal, arti, istilah..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Glossary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredLexemes.map(lex => (
                  <div
                    key={lex.id}
                    className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-amber-500/40 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{lex.visual_hint || '🏛️'}</span>
                        <span className="font-arabic text-xl font-bold text-amber-300">
                          {lex.ar_vocalized}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-300">
                        {lex.translit}
                      </div>
                      <div className="text-[11px] text-slate-400 leading-tight">
                        {lex.gloss_id}
                      </div>
                    </div>

                    <button
                      onClick={() => playArabicAudio(lex.ar_vocalized)}
                      className="p-2.5 rounded-xl bg-slate-700/60 hover:bg-amber-500 text-slate-300 hover:text-slate-950 transition-all flex-shrink-0"
                      title="Dengarkan pengucapan"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PEDAGOGY DETAIL MODAL POPUP */}
        <AnimatePresence>
          {activePedagogySkillId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
              >
                {(() => {
                  const s = tmhSkills.find(item => item.skill_id === activePedagogySkillId);
                  if (!s) return null;
                  const p = getSkillPedagogy(s);
                  return (
                    <>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div>
                          <span className="text-xs font-bold text-amber-400">
                            {s.skill_id} • Level {s.level}
                          </span>
                          <h3 className="text-xl font-black text-white">{p.explanation.conceptTitle}</h3>
                        </div>
                        <button
                          onClick={() => setActivePedagogySkillId(null)}
                          className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {p.explanation.overview}
                      </p>

                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-amber-300 uppercase">Kaidah & Syarat Kelulusan:</h4>
                        {p.explanation.rules.map((r, i) => (
                          <div key={i} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                            <div className="font-bold text-sm text-white">{r.title}</div>
                            <div className="text-xs text-slate-300">{r.explanation}</div>
                            {r.exampleAr && (
                              <div className="text-sm font-arabic text-amber-300 pt-1 font-bold">
                                {r.exampleAr}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {p.explanation.hudhudTips && (
                        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-start gap-3">
                          <span className="text-xl">🪶</span>
                          <div>
                            <div className="text-xs font-bold text-amber-300">Tips Sahabat Hudhud:</div>
                            <div className="text-xs text-slate-300">{p.explanation.hudhudTips}</div>
                          </div>
                        </div>
                      )}

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => setActivePedagogySkillId(null)}
                          className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400"
                        >
                          Tutup Panduan Modul
                        </button>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* UPACARA PENOBATAN RUTBAH MODAL POPUP */}
        <AnimatePresence>
          {showCeremonyModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="w-full max-w-lg bg-gradient-to-b from-amber-900/90 via-slate-900 to-slate-950 border-4 border-amber-400 rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-4"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/50 animate-bounce">
                  <Crown className="w-12 h-12" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/40 uppercase">
                    Upacara Penobatan Rutbah Kuil Langit
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                    MUBARAK! NAIK RUTBAH!
                  </h3>
                  <div className="text-3xl font-black text-amber-400 font-serif">
                    {currentMihrab.targetRutbah}
                  </div>
                  <p className="text-sm text-slate-300 mt-2">
                    Selamat, wahai sang pembelajar sejati! Kamu telah lulus menembus segel Mihrab Jenjang {currentMihrab.level} dengan gemilang!
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-xs text-left space-y-1">
                  <div className="font-bold text-amber-300">Pencapaian Baru Terbuka:</div>
                  <div>✨ Evolusi Hudhud: <strong>{currentMihrab.hudhudStage}</strong> ({currentMihrab.hudhudDesc})</div>
                  <div>✨ Hadiah Kelulusan: <strong>+120 XP</strong> & <strong>+4 Bintang Kehormatan</strong></div>
                  <div>✨ Segel Mihrab Jenjang Berikutnya Terbuka!</div>
                </div>

                <button
                  onClick={() => setShowCeremonyModal(false)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-base shadow-xl shadow-amber-500/30 hover:scale-105 transition-all"
                >
                  Terima Mahkota & Lanjutkan Petualangan
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export interface HijaiyahLetter {
  char: string;
  name: string;
  translit: string;
  makhrajCategory: 'Al-Jauf (Rongga Mulut)' | 'Al-Halq (Tenggorokan)' | 'Al-Lisan (Lidah)' | 'Asy-Syafatan (Dua Bibir)' | 'Al-Khaisyum (Pangkal Hidung)';
  makhrajDesc: string;
  sifat: string;
  forms: {
    isolated: string;
    start: string;
    middle: string;
    end: string;
  };
  harakatExamples: {
    fathah: { ar: string; id: string };
    kasrah: { ar: string; id: string };
    dhammah: { ar: string; id: string };
    tanwin: { ar: string; id: string };
    sukun: { ar: string; id: string };
    tasydid: { ar: string; id: string };
  };
}

export interface IqraWordItem {
  id: string;
  ar: string;
  translit: string;
  meaning?: string;
  audioText?: string;
  syllables?: string[];
  ruleTag?: string;
}

export interface IqraPageMetadata {
  pageId: string; // e.g. 'iq1_p1'
  globalPageNumber: number; // 1 to 36
  jilidNumber: number; // 1 to 6
  difficultyTier: 'pemula' | 'dasar' | 'menengah' | 'lanjutan' | 'mahir' | 'tajwid_mushaf';
  difficultyScore: number; // 1 to 100
  tajweedCategory: string;
  competencyFocus: string;
  targetCharacters?: string[];
  estimatedMinutes: number;
  xpReward: number;
  starReward: number;
  minWordMasteryCount: number;
  prerequisitePageId?: string;
}

export interface IqraPage {
  pageNumber: number;
  metadata?: IqraPageMetadata;
  title: string;
  subtitle: string;
  conceptRule: string;
  words: IqraWordItem[];
}

export interface IqraJilid {
  jilid: number; // 1 to 6
  title: string;
  levelBadge: string;
  focus: string;
  description: string;
  colorScheme: {
    primary: string;
    secondary: string;
    bgGradient: string;
    border: string;
  };
  pages: IqraPage[];
  quizQuestions: {
    id: string;
    question: string;
    arPrompt?: string;
    options: { ar: string; translit: string; isCorrect: boolean; feedback: string }[];
  }[];
}

export const HIJAIYAH_DATA: HijaiyahLetter[] = [
  {
    char: 'ا',
    name: 'Alif',
    translit: 'A',
    makhrajCategory: 'Al-Jauf (Rongga Mulut)',
    makhrajDesc: 'Keluar dari rongga mulut dan tenggorokan terbuka bebas saat berharakat atau mad.',
    sifat: 'Mad, nafas mengalir, lembut tanpa hambatan.',
    forms: { isolated: 'ا', start: 'ا', middle: 'ـا', end: 'ـا' },
    harakatExamples: {
      fathah: { ar: 'أَ', id: 'A' },
      kasrah: { ar: 'إِ', id: 'I' },
      dhammah: { ar: 'أُ', id: 'U' },
      tanwin: { ar: 'أً', id: 'An' },
      sukun: { ar: 'أْ', id: 'Mati (Hentak)' },
      tasydid: { ar: 'أَّ', id: 'Ditekan' }
    }
  },
  {
    char: 'ب',
    name: 'Bāʾ',
    translit: 'Ba',
    makhrajCategory: 'Asy-Syafatan (Dua Bibir)',
    makhrajDesc: 'Merapatkan kedua bibir (bagian dalam yang basah) secara mantap.',
    sifat: 'Jahr (jelas), Syiddah (kuat tertahan), Qalqalah (memantul saat sukun).',
    forms: { isolated: 'ب', start: 'بـ', middle: 'ـبـ', end: 'ـب' },
    harakatExamples: {
      fathah: { ar: 'بَ', id: 'Ba' },
      kasrah: { ar: 'بِ', id: 'Bi' },
      dhammah: { ar: 'بُ', id: 'Bu' },
      tanwin: { ar: 'بًا', id: 'Ban' },
      sukun: { ar: 'أَبْ', id: 'Ab (Memantul)' },
      tasydid: { ar: 'رَبَّ', id: 'Rabba' }
    }
  },
  {
    char: 'ت',
    name: 'Tāʾ',
    translit: 'Ta',
    makhrajCategory: 'Al-Lisan (Lidah)',
    makhrajDesc: 'Ujung lidah menempel pada pangkal gigi seri atas dengan sedikit desis nafas halus.',
    sifat: 'Hams (ada nafas berdesis halus), Syiddah (tertahan sebelum lepas), tipis (tarqiq).',
    forms: { isolated: 'ت', start: 'تـ', middle: 'ـتـ', end: 'ـت' },
    harakatExamples: {
      fathah: { ar: 'تَ', id: 'Ta' },
      kasrah: { ar: 'تِ', id: 'Ti' },
      dhammah: { ar: 'تُ', id: 'Tu' },
      tanwin: { ar: 'تًا', id: 'Tan' },
      sukun: { ar: 'أَتْ', id: 'At (Desis halus)' },
      tasydid: { ar: 'حَتَّى', id: 'Hatta' }
    }
  },
  {
    char: 'ث',
    name: 'Tsāʾ',
    translit: 'Tsa',
    makhrajCategory: 'Al-Lisan (Lidah)',
    makhrajDesc: 'Ujung lidah keluar sedikit menyentuh ujung gigi seri atas (lembut berselaput nafas).',
    sifat: 'Hams (bernafas), Rakhawah (suara mengalir), lembut tidak ditekan keras.',
    forms: { isolated: 'ث', start: 'ثـ', middle: 'ـثـ', end: 'ـث' },
    harakatExamples: {
      fathah: { ar: 'ثَ', id: 'Tsa' },
      kasrah: { ar: 'ثِ', id: 'Tsi' },
      dhammah: { ar: 'ثُ', id: 'Tsu' },
      tanwin: { ar: 'ثًا', id: 'Tsan' },
      sukun: { ar: 'أَثْ', id: 'Ats (Aliran lembut)' },
      tasydid: { ar: 'مَثَّلَ', id: 'Matstsala' }
    }
  },
  {
    char: 'ج',
    name: 'Jīm',
    translit: 'Ja',
    makhrajCategory: 'Al-Lisan (Lidah)',
    makhrajDesc: 'Tengah lidah menempel rapat pada langit-langit atas (tidak mendesis seperti "c").',
    sifat: 'Jahr (suara terang), Syiddah (tertahan rapat), Qalqalah (memantul kuat saat sukun).',
    forms: { isolated: 'ج', start: 'جـ', middle: 'ـجـ', end: 'ـج' },
    harakatExamples: {
      fathah: { ar: 'جَ', id: 'Ja' },
      kasrah: { ar: 'جِ', id: 'Ji' },
      dhammah: { ar: 'جُ', id: 'Ju' },
      tanwin: { ar: 'جًا', id: 'Jan' },
      sukun: { ar: 'أَجْ', id: 'Aj (Memantul)' },
      tasydid: { ar: 'حَجَّ', id: 'Hajja' }
    }
  },
  {
    char: 'ح',
    name: 'Ḥāʾ',
    translit: 'Ḥa (Bersih)',
    makhrajCategory: 'Al-Halq (Tenggorokan)',
    makhrajDesc: 'Tengah tenggorokan (daerah katup epiglotis), suara bersih berdesis hangat.',
    sifat: 'Hams (udara mengalir), Rakhawah (suara renyah bersih), tipis (tarqiq).',
    forms: { isolated: 'ح', start: 'حـ', middle: 'ـحـ', end: 'ـح' },
    harakatExamples: {
      fathah: { ar: 'حَ', id: 'Ḥa' },
      kasrah: { ar: 'حِ', id: 'Ḥi' },
      dhammah: { ar: 'حُ', id: 'Ḥu' },
      tanwin: { ar: 'حًا', id: 'Ḥan' },
      sukun: { ar: 'أَحْ', id: 'Aḥ (Desis bersih)' },
      tasydid: { ar: 'رَحَّبَ', id: 'Raḥḥaba' }
    }
  },
  {
    char: 'خ',
    name: 'Khāʾ',
    translit: 'Kha (Tebal)',
    makhrajCategory: 'Al-Halq (Tenggorokan)',
    makhrajDesc: 'Bagian atas tenggorokan dekat anak lidah (uvula), terdengar dengkuran halus gurih.',
    sifat: 'Hams, Rakhawah, Isti\'la (pangkal lidah naik, suara tebal/tafkhim).',
    forms: { isolated: 'خ', start: 'خـ', middle: 'ـخـ', end: 'ـخ' },
    harakatExamples: {
      fathah: { ar: 'خَ', id: 'Kha' },
      kasrah: { ar: 'خِ', id: 'Khi' },
      dhammah: { ar: 'خُ', id: 'Khu' },
      tanwin: { ar: 'خًا', id: 'Khan' },
      sukun: { ar: 'أَخْ', id: 'Akh (Gurih tebal)' },
      tasydid: { ar: 'سَخَّرَ', id: 'Sakh-khara' }
    }
  },
  {
    char: 'د',
    name: 'Dāl',
    translit: 'Da',
    makhrajCategory: 'Al-Lisan (Lidah)',
    makhrajDesc: 'Ujung lidah menempel pada pangkal gigi seri atas (huruf pemutus tidak menyambung ke kiri).',
    sifat: 'Jahr (jelas), Syiddah (kuat), Qalqalah (pantulan jernih saat sukun).',
    forms: { isolated: 'د', start: 'د', middle: 'ـد', end: 'ـد' },
    harakatExamples: {
      fathah: { ar: 'دَ', id: 'Da' },
      kasrah: { ar: 'دِ', id: 'Di' },
      dhammah: { ar: 'دُ', id: 'Du' },
      tanwin: { ar: 'دًا', id: 'Dan' },
      sukun: { ar: 'أَدْ', id: 'Ad (Memantul)' },
      tasydid: { ar: 'شَدَّ', id: 'Syadda' }
    }
  },
  {
    char: 'ذ',
    name: 'Dhāl',
    translit: 'Dza',
    makhrajCategory: 'Al-Lisan (Lidah)',
    makhrajDesc: 'Ujung lidah menyentuh ujung gigi seri atas (suara mengalir lembut, huruf pemutus kiri).',
    sifat: 'Jahr, Rakhawah (mengalir getar lembut), tipis (tarqiq).',
    forms: { isolated: 'ذ', start: 'ذ', middle: 'ـذ', end: 'ـذ' },
    harakatExamples: {
      fathah: { ar: 'ذَ', id: 'Dza' },
      kasrah: { ar: 'ذِ', id: 'Dzi' },
      dhammah: { ar: 'ذُ', id: 'Dzu' },
      tanwin: { ar: 'ذًا', id: 'Dzan' },
      sukun: { ar: 'إِذْ', id: 'Idz (Aliran getar)' },
      tasydid: { ar: 'ذَكَّرَ', id: 'Dzakkara' }
    }
  },
  {
    char: 'ر',
    name: 'Rāʾ',
    translit: 'Ra',
    makhrajCategory: 'Al-Lisan (Lidah)',
    makhrajDesc: 'Punggung ujung lidah bergetar halus menyentuh gusi atas (tebal saat fathah/dhammah, tipis saat kasrah).',
    sifat: 'Jahr, Inhiraf (menyimpang), Takrir (getaran terkontrol tidak berlebihan).',
    forms: { isolated: 'ر', start: 'ر', middle: 'ـر', end: 'ـر' },
    harakatExamples: {
      fathah: { ar: 'رَ', id: 'Ra (Tebal)' },
      kasrah: { ar: 'رِ', id: 'Ri (Tipis)' },
      dhammah: { ar: 'رُ', id: 'Ru (Tebal)' },
      tanwin: { ar: 'رًا', id: 'Ran' },
      sukun: { ar: 'أَرْ', id: 'Ar (Tebal)' },
      tasydid: { ar: 'مَرَّ', id: 'Marra' }
    }
  },
  {
    char: 'ز',
    name: 'Zāy',
    translit: 'Za',
    makhrajCategory: 'Al-Lisan (Lidah)',
    makhrajDesc: 'Ujung lidah di belakang gigi seri bawah, menghasilkan desis lebah nyaring (Shafir).',
    sifat: 'Jahr, Rakhawah, Shafir (desis tajam), tipis.',
    forms: { isolated: 'ز', start: 'ز', middle: 'ـز', end: 'ـز' },
    harakatExamples: {
      fathah: { ar: 'زَ', id: 'Za' },
      kasrah: { ar: 'زِ', id: 'Zi' },
      dhammah: { ar: 'زُ', id: 'Zu' },
      tanwin: { ar: 'زًا', id: 'Zan' },
      sukun: { ar: 'أَزْ', id: 'Az (Desis tajam)' },
      tasydid: { ar: 'عَزَّ', id: '‘Azza' }
    }
  },
  {
    char: 'س',
    name: 'Sīn',
    translit: 'Sa',
    makhrajCategory: 'Al-Lisan (Lidah)',
    makhrajDesc: 'Ujung lidah di dinding gigi seri bawah, desis halus mengalir dengan nafas lepas.',
    sifat: 'Hams (angin mengalir), Rakhawah, Shafir (desis jernih tipis).',
    forms: { isolated: 'س', start: 'سـ', middle: 'ـسـ', end: 'ـس' },
    harakatExamples: {
      fathah: { ar: 'سَ', id: 'Sa' },
      kasrah: { ar: 'سِ', id: 'Si' },
      dhammah: { ar: 'سُ', id: 'Su' },
      tanwin: { ar: 'سًا', id: 'San' },
      sukun: { ar: 'أَسْ', id: 'As (Desis bersih)' },
      tasydid: { ar: 'بَسَّ', id: 'Bassa' }
    }
  },
  {
    char: 'ش',
    name: 'Syīn',
    translit: 'Sya',
    makhrajCategory: 'Al-Lisan (Lidah)',
    makhrajDesc: 'Tengah lidah terangkat ke langit-langit dengan udara berhamburan luas di dalam mulut (Tafasy-syi).',
    sifat: 'Hams, Rakhawah, Tafasy-syi (angin menyebar di rongga mulut).',
    forms: { isolated: 'ش', start: 'شـ', middle: 'ـشـ', end: 'ـش' },
    harakatExamples: {
      fathah: { ar: 'شَ', id: 'Sya' },
      kasrah: { ar: 'شِ', id: 'Syi' },
      dhammah: { ar: 'شُ', id: 'Syu' },
      tanwin: { ar: 'شًا', id: 'Syan' },
      sukun: { ar: 'أَشْ', id: 'Asy (Angin berhamburan)' },
      tasydid: { ar: 'بَشَّرَ', id: 'Basysyara' }
    }
  },
  {
    char: 'ص',
    name: 'Ṣād',
    translit: 'Sha (Tebal Bulat)',
    makhrajCategory: 'Al-Lisan (Lidah)',
    makhrajDesc: 'Ujung lidah di gigi seri bawah, lidah melengkung menempel langit-langit (Ithbaq tebal).',
    sifat: 'Hams, Rakhawah, Shafir, Isti\'la (tebal), Ithbaq (rongga terkatup padat).',
    forms: { isolated: 'ص', start: 'صـ', middle: 'ـصـ', end: 'ـص' },
    harakatExamples: {
      fathah: { ar: 'صَ', id: 'Ṣha' },
      kasrah: { ar: 'صِ', id: 'Ṣhi' },
      dhammah: { ar: 'صُ', id: 'Ṣhu' },
      tanwin: { ar: 'صًا', id: 'Ṣhan' },
      sukun: { ar: 'أَصْ', id: 'Aṣh (Tebal desis bulat)' },
      tasydid: { ar: 'قَصَّ', id: 'Qaṣṣa' }
    }
  },
  {
    char: 'ض',
    name: 'Ḍād',
    translit: 'Dha (Tepi Lidah Memanjang)',
    makhrajCategory: 'Al-Lisan (Lidah)',
    makhrajDesc: 'Salah satu atau kedua tepi lidah ditekan ke dinding gigi geraham atas (Istithalah memanjang).',
    sifat: 'Jahr, Rakhawah, Isti\'la, Ithbaq, Istithalah (suara memanjang khas bahasa Arab).',
    forms: { isolated: 'ض', start: 'ضـ', middle: 'ـضـ', end: 'ـض' },
    harakatExamples: {
      fathah: { ar: 'ضَ', id: 'Ḍha' },
      kasrah: { ar: 'ضِ', id: 'Ḍhi' },
      dhammah: { ar: 'ضُ', id: 'Ḍhu' },
      tanwin: { ar: 'ضًا', id: 'Ḍhan' },
      sukun: { ar: 'أَضْ', id: 'Aḍh (Memanjang geraham)' },
      tasydid: { ar: 'عَضَّ', id: '‘Aḍḍa' }
    }
  },
  {
    char: 'ط',
    name: 'Ṭāʾ',
    translit: 'Tha (Paling Kuat)',
    makhrajCategory: 'Al-Lisan (Lidah)',
    makhrajDesc: 'Ujung lidah ditekan kuat ke pangkal gigi seri atas dengan seluruh lidah menempel langit-langit.',
    sifat: 'Huruf paling kuat: Jahr, Syiddah, Isti\'la, Ithbaq, Qalqalah mantap saat sukun.',
    forms: { isolated: 'ط', start: 'طـ', middle: 'ـطـ', end: 'ـط' },
    harakatExamples: {
      fathah: { ar: 'طَ', id: 'Ṭha' },
      kasrah: { ar: 'طِ', id: 'Ṭhi' },
      dhammah: { ar: 'طُ', id: 'Ṭhu' },
      tanwin: { ar: 'طًا', id: 'Ṭhan' },
      sukun: { ar: 'أَطْ', id: 'Aṭ (Qalqalah tebal megah)' },
      tasydid: { ar: 'حَطَّ', id: 'Ḥaṭṭa' }
    }
  },
  {
    char: 'ظ',
    name: 'Ẓāʾ',
    translit: 'Zha (Tebal Gigi Seri)',
    makhrajCategory: 'Al-Lisan (Lidah)',
    makhrajDesc: 'Ujung lidah menempel pada ujung gigi seri atas dengan pangkal lidah terangkat tebal.',
    sifat: 'Jahr, Rakhawah, Isti\'la, Ithbaq (berbeda dengan Dzal yang tipis).',
    forms: { isolated: 'ظ', start: 'ظـ', middle: 'ـظـ', end: 'ـظ' },
    harakatExamples: {
      fathah: { ar: 'ظَ', id: 'Ẓha' },
      kasrah: { ar: 'ظِ', id: 'Ẓhi' },
      dhammah: { ar: 'ظُ', id: 'Ẓhu' },
      tanwin: { ar: 'ظًا', id: 'Ẓhan' },
      sukun: { ar: 'أَظْ', id: 'Aẓh (Tebal mantap)' },
      tasydid: { ar: 'عَظَّمَ', id: '‘Aẓẓama' }
    }
  },
  {
    char: 'ع',
    name: 'ʿAyn',
    translit: '‘Ain (Tengah Kerongkongan)',
    makhrajCategory: 'Al-Halq (Tenggorokan)',
    makhrajDesc: 'Tengah tenggorokan menyempit elastis (tidak tercekik keras, suara bulat murni).',
    sifat: 'Jahr, Bainiyyah (antara syiddah dan rakhawah), Infitah tipis.',
    forms: { isolated: 'ع', start: 'عـ', middle: 'ـعـ', end: 'ـع' },
    harakatExamples: {
      fathah: { ar: 'عَ', id: '‘A' },
      kasrah: { ar: 'عِ', id: '‘I' },
      dhammah: { ar: 'عُ', id: '‘U' },
      tanwin: { ar: 'عًا', id: '‘An' },
      sukun: { ar: 'أَعْ', id: 'A‘ (Elastis jernih)' },
      tasydid: { ar: 'دَعَّ', id: 'Da‘' }
    }
  },
  {
    char: 'غ',
    name: 'Ghayn',
    translit: 'Gha (Atas Tenggorokan)',
    makhrajCategory: 'Al-Halq (Tenggorokan)',
    makhrajDesc: 'Atas tenggorokan dekat pangkal lidah, suara basah mengalir seperti berkumur lembut.',
    sifat: 'Jahr, Rakhawah, Isti\'la (suara tebal).',
    forms: { isolated: 'غ', start: 'غـ', middle: 'ـغـ', end: 'ـغ' },
    harakatExamples: {
      fathah: { ar: 'غَ', id: 'Gha' },
      kasrah: { ar: 'غِ', id: 'Ghi' },
      dhammah: { ar: 'غُ', id: 'Ghu' },
      tanwin: { ar: 'غًا', id: 'Ghan' },
      sukun: { ar: 'أَغْ', id: 'Agh (Mengalir basah)' },
      tasydid: { ar: 'غَلَّ', id: 'Ghalla' }
    }
  },
  {
    char: 'ف',
    name: 'Fāʾ',
    translit: 'Fa',
    makhrajCategory: 'Asy-Syafatan (Dua Bibir)',
    makhrajDesc: 'Ujung dua gigi seri atas menempel ke bagian dalam bibir bawah dengan hembusan nafas.',
    sifat: 'Hams (nafas mengalir lepas), Rakhawah, tipis.',
    forms: { isolated: 'ف', start: 'فـ', middle: 'ـفـ', end: 'ـف' },
    harakatExamples: {
      fathah: { ar: 'فَ', id: 'Fa' },
      kasrah: { ar: 'فِ', id: 'Fi' },
      dhammah: { ar: 'فُ', id: 'Fu' },
      tanwin: { ar: 'فًا', id: 'Fan' },
      sukun: { ar: 'أَفْ', id: 'Af (Hembus bibir)' },
      tasydid: { ar: 'كَفَّ', id: 'Kaffa' }
    }
  },
  {
    char: 'ق',
    name: 'Qāf',
    translit: 'Qa (Pangkal Lidah Belakang)',
    makhrajCategory: 'Al-Lisan (Lidah)',
    makhrajDesc: 'Pangkal lidah paling belakang naik menempel pada langit-langit lunak (daerah anak lidah).',
    sifat: 'Jahr, Syiddah, Isti\'la (tebal), Qalqalah (pantulan bulat tegas).',
    forms: { isolated: 'ق', start: 'قـ', middle: 'ـقـ', end: 'ـق' },
    harakatExamples: {
      fathah: { ar: 'قَ', id: 'Qa' },
      kasrah: { ar: 'قِ', id: 'Qi' },
      dhammah: { ar: 'قُ', id: 'Qu' },
      tanwin: { ar: 'قًا', id: 'Qan' },
      sukun: { ar: 'أَقْ', id: 'Aq (Pantulan bulat tebal)' },
      tasydid: { ar: 'حَقَّ', id: 'Ḥaqqa' }
    }
  },
  {
    char: 'ك',
    name: 'Kāf',
    translit: 'Ka',
    makhrajCategory: 'Al-Lisan (Lidah)',
    makhrajDesc: 'Pangkal lidah agak ke depan sedikit dari Qaf, menempel ke langit-langit keras dengan hembusan nafas.',
    sifat: 'Hams (nafas berbisik saat dilepas), Syiddah, tipis (tarqiq).',
    forms: { isolated: 'ك', start: 'كـ', middle: 'ـكـ', end: 'ـك' },
    harakatExamples: {
      fathah: { ar: 'كَ', id: 'Ka' },
      kasrah: { ar: 'كِ', id: 'Ki' },
      dhammah: { ar: 'كُ', id: 'Ku' },
      tanwin: { ar: 'كًا', id: 'Kan' },
      sukun: { ar: 'أَكْ', id: 'Ak (Hams desis halus)' },
      tasydid: { ar: 'شَكَّ', id: 'Syakka' }
    }
  },
  {
    char: 'ل',
    name: 'Lām',
    translit: 'La',
    makhrajCategory: 'Al-Lisan (Lidah)',
    makhrajDesc: 'Tepi depan lidah hingga ujungnya menempel pada gusi gigi seri atas.',
    sifat: 'Jahr, Tawassuth (suara mengalir dari samping lidah), Inhiraf, tipis kecuali lafazh Jalalah.',
    forms: { isolated: 'ل', start: 'لـ', middle: 'ـلـ', end: 'ـل' },
    harakatExamples: {
      fathah: { ar: 'لَ', id: 'La' },
      kasrah: { ar: 'لِ', id: 'Li' },
      dhammah: { ar: 'لُ', id: 'Lu' },
      tanwin: { ar: 'لاً', id: 'Lan' },
      sukun: { ar: 'أَلْ', id: 'Al' },
      tasydid: { ar: 'دَلَّ', id: 'Dalla' }
    }
  },
  {
    char: 'م',
    name: 'Mīm',
    translit: 'Ma',
    makhrajCategory: 'Asy-Syafatan (Dua Bibir)',
    makhrajDesc: 'Merapatkan kedua bibir dengan dengungan murni mengalir lewat rongga hidung (Ghunnah).',
    sifat: 'Jahr, Tawassuth, Ghunnah (berdengung di hidung).',
    forms: { isolated: 'م', start: 'مـ', middle: 'ـمـ', end: 'ـم' },
    harakatExamples: {
      fathah: { ar: 'مَ', id: 'Ma' },
      kasrah: { ar: 'مِ', id: 'Mi' },
      dhammah: { ar: 'مُ', id: 'Mu' },
      tanwin: { ar: 'مًا', id: 'Man' },
      sukun: { ar: 'أَمْ', id: 'Am' },
      tasydid: { ar: 'ثُمَّ', id: 'Tsumma (Ghunnah 2 harakat)' }
    }
  },
  {
    char: 'ن',
    name: 'Nūn',
    translit: 'Na',
    makhrajCategory: 'Al-Lisan (Lidah)',
    makhrajDesc: 'Ujung lidah menempel pada gusi atas di bawah makhraj Lam dengan dengungan hidung (Ghunnah).',
    sifat: 'Jahr, Tawassuth, Ghunnah di rongga hidung.',
    forms: { isolated: 'ن', start: 'نـ', middle: 'ـنـ', end: 'ـن' },
    harakatExamples: {
      fathah: { ar: 'نَ', id: 'Na' },
      kasrah: { ar: 'نِ', id: 'Ni' },
      dhammah: { ar: 'نُ', id: 'Nu' },
      tanwin: { ar: 'نًا', id: 'Nan' },
      sukun: { ar: 'عَنْ', id: '‘An' },
      tasydid: { ar: 'إِنَّ', id: 'Inna (Ghunnah 2 harakat)' }
    }
  },
  {
    char: 'هـ',
    name: 'Hāʾ',
    translit: 'Ha (Dada Pangkal)',
    makhrajCategory: 'Al-Halq (Tenggorokan)',
    makhrajDesc: 'Pangkal tenggorokan paling bawah (dekat pita suara / dada), suara ringan halus.',
    sifat: 'Hams (nafas mengalir panjang), Rakhawah, Khafa (sangat samar harus diperjelas).',
    forms: { isolated: 'هـ', start: 'هـ', middle: 'ـهـ', end: 'ـه' },
    harakatExamples: {
      fathah: { ar: 'هَ', id: 'Ha' },
      kasrah: { ar: 'هِ', id: 'Hi' },
      dhammah: { ar: 'هُ', id: 'Hu' },
      tanwin: { ar: 'هًا', id: 'Han' },
      sukun: { ar: 'أَهْ', id: 'Ah' },
      tasydid: { ar: 'شَهَّقَ', id: 'Syahhaqa' }
    }
  },
  {
    char: 'و',
    name: 'Wāw',
    translit: 'Wa',
    makhrajCategory: 'Asy-Syafatan (Dua Bibir)',
    makhrajDesc: 'Membulatkan kedua bibir ke depan dengan rongga terbuka (huruf pemutus kiri).',
    sifat: 'Jahr, Rakhawah, Lin (lembut mengalir saat sukun sebelumnya fathah).',
    forms: { isolated: 'و', start: 'و', middle: 'ـو', end: 'ـو' },
    harakatExamples: {
      fathah: { ar: 'وَ', id: 'Wa' },
      kasrah: { ar: 'وِ', id: 'Wi' },
      dhammah: { ar: 'وُ', id: 'Wu' },
      tanwin: { ar: 'وًا', id: 'Wan' },
      sukun: { ar: 'أَوْ', id: 'Au (Lin lembut)' },
      tasydid: { ar: 'قَوَّى', id: 'Qawwa' }
    }
  },
  {
    char: 'ي',
    name: 'Yāʾ',
    translit: 'Ya',
    makhrajCategory: 'Al-Lisan (Lidah)',
    makhrajDesc: 'Tengah lidah terangkat ke langit-langit tanpa menempel rapat.',
    sifat: 'Jahr, Rakhawah, Lin (lembut mengalir saat sukun sebelumnya fathah).',
    forms: { isolated: 'ي', start: 'يـ', middle: 'ـيـ', end: 'ـي' },
    harakatExamples: {
      fathah: { ar: 'يَ', id: 'Ya' },
      kasrah: { ar: 'يِ', id: 'Yi' },
      dhammah: { ar: 'يُ', id: 'Yu' },
      tanwin: { ar: 'يًا', id: 'Yan' },
      sukun: { ar: 'أَيْ', id: 'Ai (Lin lembut)' },
      tasydid: { ar: 'أَيَّدَ', id: 'Ayyada' }
    }
  }
];

import {
  IQRA_36_PAGES_DATA,
  getAllIqraPages,
  getIqraPageById,
  getIqraPageByGlobalNumber,
  calculateIqraProgressStats
} from './iqraCurriculum36';

export const IQRA_JILID_DATA: IqraJilid[] = IQRA_36_PAGES_DATA;
export {
  getAllIqraPages,
  getIqraPageById,
  getIqraPageByGlobalNumber,
  calculateIqraProgressStats
};

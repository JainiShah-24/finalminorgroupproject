import { Translations } from '../types';

export const translations: Translations = {
  welcome: {
    en: 'Welcome to FarmConnect',
    hi: 'फार्म कनेक्ट में आपका स्वागत है',
    gu: 'ફાર્મ કનેક્ટમાં તમારું સ્વાગત છે'
  },
  subtitle: {
    en: 'Connecting Farmers and Workers for Better Agriculture',
    hi: 'बेहतर कृषि के लिए किसानों और मजदूरों को जोड़ना',
    gu: 'વધુ સારી કૃષિ માટે ખેડૂતો અને કામદારોને જોડવું'
  },
  phone: {
    en: 'Phone Number',
    hi: 'फोन नंबर',
    gu: 'ફોન નંબર'
  },
  password: {
    en: 'Password',
    hi: 'पासवर्ड',
    gu: 'પાસવર્ડ'
  },
  home: {
    en: 'Home',
    hi: 'होम',
    gu: 'હોમ'
  },
  language: {
    en: 'Language',
    hi: 'भाषा',
    gu: 'ભાષા'
  },
  leaseAssets: {
    en: 'Lease Land & Equipment',
    hi: 'भूमि और उपकरण किराए पर दें',
    gu: 'જમીન અને સાધનો ભાડે આપો'
  },
  jobListings: {
    en: 'Job Listings',
    hi: 'नौकरी सूची',
    gu: 'નોકરી યાદી'
  },
  loginAsFarmer: {
    en: 'Login as Farmer',
    hi: 'किसान के रूप में लॉगिन',
    gu: 'ખેડૂત તરીકે લૉગિન'
  },
  loginAsWorker: {
    en: 'Login as Worker',
    hi: 'मजदूर के रूप में लॉगिन',
    gu: 'કામદાર તરીકે લૉગિન'
  },
  register: {
    en: 'Register',
    hi: 'पंजीकरण',
    gu: 'નોંધણી'
  },
  login: {
    en: 'Login',
    hi: 'लॉगिन',
    gu: 'લૉગિન'
  },
  name: {
    en: 'Full Name',
    hi: 'पूरा नाम',
    gu: 'સંપૂર્ણ નામ'
  },
  username: {
    en: 'Username',
    hi: 'उपयोगकर्ता नाम',
    gu: 'વપરાશકર્તા નામ'
  },
  email: {
    en: 'Email Address',
    hi: 'ईमेल पता',
    gu: 'ઈમેઈલ સરનામું'
  },
  otp: {
    en: 'Enter OTP',
    hi: 'OTP दर्ज करें',
    gu: 'OTP દાખલ કરો'
  },
  verify: {
    en: 'Verify OTP',
    hi: 'OTP सत्यापित करें',
    gu: 'OTP ચકાસો'
  },
  dashboard: {
    en: 'Dashboard',
    hi: 'डैशबोर्ड',
    gu: 'ડેશબોર્ડ'
  },
  profile: {
    en: 'Profile',
    hi: 'प्रोफाइल',
    gu: 'પ્રોફાઇલ'
  },
  findWorkers: {
    en: 'Find Workers',
    hi: 'मजदूर खोजें',
    gu: 'કામદાર શોધો'
  },
  findWork: {
    en: 'Find Work',
    hi: 'काम खोजें',
    gu: 'કામ શોધો'
  },
  leaseEquipment: {
    en: 'Lease Equipment',
    hi: 'उपकरण किराए पर लें',
    gu: 'સાધનો ભાડે લો'
  },
  news: {
    en: 'News & Education',
    hi: 'समाचार और शिक्षा',
    gu: 'સમાચાર અને શિક્ષણ'
  },
  logout: {
    en: 'Logout',
    hi: 'लॉगआउट',
    gu: 'લૉગઆઉટ'
  }
};

export const getTranslation = (key: string, language: string): string => {
  return translations[key]?.[language as keyof typeof translations[string]] || translations[key]?.en || key;
};
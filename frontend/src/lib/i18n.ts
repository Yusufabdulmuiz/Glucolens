import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// THIS IS OUR TRANSLATION RESOURCES (The Dictionary)
const resources = {
  // English (Default)
  en: {
    translation: {
      "welcome": "Welcome back!",
      "login_title": "Login to your account",
      "email_label": "Email or username",
      "password_label": "Password",
      "login_button": "Login",
      "demo_button": "Try Demo",
      "forgot_password": "Forgot password?",
      "no_account": "Don't have an account?",
      "sign_up": "Sign up",
      // --- REGISTRATION KEYS ---
      "reg_title": "Create Your Account",
      "reg_subtitle": "Join GlucoLens to start monitoring your health",
      "reg_username": "Username",
      "reg_email": "Email (Gmail)",
      "reg_phone": "Phone Number",
      "reg_password": "Password",
      "reg_confirm": "Confirm Password",
      "reg_email_consent": "I agree to receive reminders and progress updates by email.",
      "reg_sms_consent": "I agree to receive reminders and progress updates by SMS.",
      "reg_ai_warning": "This application uses AI models to estimate diabetes risk and potential complications. Predictions are not 100% accurate. AI can produce errors or hallucinations. This tool does not replace medical diagnosis. For confirmation, consult a healthcare professional.",
      "reg_submit": "Sign Up",
      "reg_have_account": "Already have an account?",
      "reg_login_link": "Log In"
    }
  },
  // French (Français)
  fr: {
    translation: {
      "welcome": "Bon retour !",
      "login_title": "Connectez-vous à votre compte",
      "email_label": "Email ou nom d'utilisateur",
      "password_label": "Mot de passe",
      "login_button": "Connexion",
      "demo_button": "Essayer la démo",
      "forgot_password": "Mot de passe oublié ?",
      "no_account": "Pas encore de compte ?",
      "sign_up": "S'inscrire",
      // --- REGISTRATION KEYS ---
      "reg_title": "Créez votre compte",
      "reg_subtitle": "Rejoignez GlucoLens pour surveiller votre santé",
      "reg_username": "Nom d'utilisateur",
      "reg_email": "Email (Gmail)",
      "reg_phone": "Numéro de téléphone",
      "reg_password": "Mot de passe",
      "reg_confirm": "Confirmer le mot de passe",
      "reg_email_consent": "J'accepte de recevoir des rappels et des mises à jour par email.",
      "reg_sms_consent": "J'accepte de recevoir des rappels et des mises à jour par SMS.",
      "reg_ai_warning": "Cette application utilise l'IA pour estimer les risques de diabète. Les prédictions ne sont pas exactes à 100 %. Consultez un professionnel de la santé.",
      "reg_submit": "S'inscrire",
      "reg_have_account": "Vous avez déjà un compte ?",
      "reg_login_link": "Connexion"
    }
  },
  // Arabic (العربية)
  ar: {
    translation: {
      "welcome": "مرحبًا بعودتك!",
      "login_title": "تسجيل الدخول إلى حسابك",
      "email_label": "البريد الإلكتروني أو اسم المستخدم",
      "password_label": "كلمة المرور",
      "login_button": "تسجيل الدخول",
      "demo_button": "جرب النسخة التجريبية",
      "forgot_password": "هل نسيت كلمة المرور؟",
      "no_account": "ليس لديك حساب؟",
      "sign_up": "إنشاء حساب",
      // --- REGISTRATION KEYS ---
      "reg_title": "أنشئ حسابك",
      "reg_subtitle": "انضم إلى GlucoLens لمراقبة صحتك",
      "reg_username": "اسم المستخدم",
      "reg_email": "البريد الإلكتروني",
      "reg_phone": "رقم الهاتف",
      "reg_password": "كلمة المرور",
      "reg_confirm": "تأكيد كلمة المرور",
      "reg_email_consent": "أوافق على تلقي التذكيرات عبر البريد الإلكتروني.",
      "reg_sms_consent": "أوافق على تلقي التذكيرات عبر الرسائل القصيرة.",
      "reg_ai_warning": "يستخدم هذا التطبيق الذكاء الاصطناعي لتقدير مخاطر مرض السكري. التوقعات ليست دقيقة 100٪. استشر طبيبًا مختصًا.",
      "reg_submit": "إنشاء حساب",
      "reg_have_account": "لديك حساب بالفعل؟",
      "reg_login_link": "تسجيل الدخول"
    }
  },
  // Spanish (Español)
  es: {
    translation: {
      "welcome": "¡Bienvenido de nuevo!",
      "login_title": "Inicia sesión en tu cuenta",
      "email_label": "Correo o usuario",
      "password_label": "Contraseña",
      "login_button": "Iniciar sesión",
      "demo_button": "Probar demo",
      "forgot_password": "¿Olvidaste tu contraseña?",
      "no_account": "¿No tienes una cuenta?",
      "sign_up": "Regístrate",
      // --- REGISTRATION KEYS ---
      "reg_title": "Crea tu cuenta",
      "reg_subtitle": "Únete a GlucoLens para monitorear tu salud",
      "reg_username": "Nombre de usuario",
      "reg_email": "Correo (Gmail)",
      "reg_phone": "Número de teléfono",
      "reg_password": "Contraseña",
      "reg_confirm": "Confirmar contraseña",
      "reg_email_consent": "Acepto recibir recordatorios por correo.",
      "reg_sms_consent": "Acepto recibir recordatorios por SMS.",
      "reg_ai_warning": "Esta aplicación usa IA para estimar riesgos de diabetes. Las predicciones no son 100% exactas. Consulte a un profesional de la salud.",
      "reg_submit": "Regístrate",
      "reg_have_account": "¿Ya tienes una cuenta?",
      "reg_login_link": "Iniciar sesión"
    }
  },
  // Swahili (Kiswahili)
  sw: {
    translation: {
      "welcome": "Karibu tena!",
      "login_title": "Ingia kwenye akaunti yako",
      "email_label": "Barua pepe au jina la mtumiaji",
      "password_label": "Nenosiri",
      "login_button": "Ingia",
      "demo_button": "Jaribu Demo",
      "forgot_password": "Umesahau nenosiri?",
      "no_account": "Hauna akaunti?",
      "sign_up": "Jisajili",
      // ---  REGISTRATION KEYS ---
      "reg_title": "Fungua Akaunti Yako",
      "reg_subtitle": "Jiunge na GlucoLens kufuatilia afya yako",
      "reg_username": "Jina la mtumiaji",
      "reg_email": "Barua pepe",
      "reg_phone": "Nambari ya simu",
      "reg_password": "Nenosiri",
      "reg_confirm": "Thibitisha Nenosiri",
      "reg_email_consent": "Ninakubali kupokea vikumbusho kwa barua pepe.",
      "reg_sms_consent": "Ninakubali kupokea vikumbusho kwa SMS.",
      "reg_ai_warning": "Programu hii hutumia AI kukadiria hatari ya ugonjwa wa kisukari. Utabiri sio sahihi 100%. Wasiliana na daktari.",
      "reg_submit": "Jisajili",
      "reg_have_account": "Tayari una akaunti?",
      "reg_login_link": "Ingia"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
        

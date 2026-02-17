import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// TRANSLATION RESOURCES (The Dictionary)
const resources = {
  // 1. English (Default)
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
      "sign_up": "Sign up"
    }
  },
  // 2. French (Français)
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
      "sign_up": "S'inscrire"
    }
  },
  // 3. Arabic (العربية - Right to Left)
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
      "sign_up": "إنشاء حساب"
    }
  },
  // 4. Spanish (Español)
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
      "sign_up": "Regístrate"
    }
  },
  // 5. Swahili (Kiswahili)
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
      "sign_up": "Jisajili"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // Default to English if language not found
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;


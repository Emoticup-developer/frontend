// src/TranslateComponent.jsx
import { useEffect, useRef } from "react";
import Cookies from "js-cookie";

const TranslateComponent = () => {
  const translateRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,fr,de,es,zh-CN",
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        translateRef.current
      );

      const savedLang = Cookies.get("language");
      if (savedLang) {
        changeLanguage(savedLang);
      }
    };
  }, []);

  const changeLanguage = (langCode) => {
    const interval = setInterval(() => {
      const combo = document.querySelector(".goog-te-combo");
      if (combo) {
        combo.value = langCode;
        combo.dispatchEvent(new Event("change"));
        clearInterval(interval);
      }
    }, 500);
  };

  return (
    <div
      id="google_translate_element"
      ref={translateRef}
      style={{ display: "none" }}
    />
  );
};

export default TranslateComponent;

// utils/libreTranslate.js
export async function libreTranslate(text, targetLang, sourceLang = "auto") {
  const response = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      q: text,
      source: sourceLang,
      target: targetLang,
      format: "text",
    }),
  });

  const data = await response.json();
  return data.translatedText;
}

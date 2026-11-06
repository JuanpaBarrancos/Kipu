# Kipu, web instalable

Esta carpeta es Kipu lista para publicar en internet con tu propio enlace. Se puede instalar en el celular como una app, abre sin internet y no necesita cuenta ni servidor: lo que anota cada comerciante se guarda solo en su propio celular.

## Qué hay en la carpeta

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app completa |
| `manifest.webmanifest` | Nombre, ícono y colores para instalarla en el celular |
| `sw.js` | Guarda la app en el celular para que abra sin internet |
| `icons/` | Íconos de la app |
| `fonts/` | Las letras de la app y sus licencias libres (SIL Open Font License) |
| `.nojekyll` | Evita que GitHub Pages modifique archivos |

Sube **todos** los archivos tal cual, sin cambiar nombres ni carpetas.

## Antes de publicar: pon tus datos de contacto

Abre `index.html` con un editor de texto, busca `const PILOTO` y cambia:

```js
const PILOTO = {responsable:'el equipo del piloto de Kipu', contacto:''};
```

- `responsable`: quién recibe los indicadores. Aparece en la pantalla de consentimiento. Por ejemplo, `'Jean Pierre Barrancos, responsable del piloto Kipu'`.
- `contacto`: tu celular con código de país y sin espacios, por ejemplo `'5917xxxxxxx'`. Con eso, el botón "Compartir por WhatsApp" de Indicadores del piloto te escribe directo a ti. Si lo dejas vacío, WhatsApp pide elegir el chat.

## Publicar gratis con GitHub Pages

1. Crea una cuenta en github.com, si no tienes.
2. Crea un repositorio nuevo, **público**, por ejemplo `kipu`.
3. En el repositorio: **Add file → Upload files**. Arrastra todo el contenido de esta carpeta, incluidas `icons` y `fonts`, y confirma con **Commit changes**.
4. Ve a **Settings → Pages**. En **Source** elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guarda.
5. Espera unos minutos. Tu enlace será `https://TU-USUARIO.github.io/kipu/`.

La app funciona dentro de una subcarpeta como `/kipu/` porque todas sus rutas son relativas.

**Otra opción:** Netlify permite arrastrar la carpeta en su página de publicación. Revisa sus condiciones actuales al entrar; no lo verifiqué para esta guía.

## Cómo la instala un comerciante

- **Android (Chrome):** abre el enlace. Kipu muestra un aviso con el botón **Instalar Kipu**. Si no aparece, abre el menú ⋮ del navegador y elige **Instalar aplicación** o **Agregar a la pantalla principal**; el nombre exacto cambia según la versión de Chrome.
- **iPhone (Safari):** abre el enlace en Safari, toca **Compartir** y luego **Agregar a inicio**.

En iPhone, conviene que siempre la instalen. Safari puede borrar los datos de sitios que no se abren en 7 días, pero no los de las apps agregadas a la pantalla de inicio, según explicó el equipo de WebKit en 2020 ([iTnews](https://www.itnews.com.au/news/apple-cops-flak-for-deleting-local-browser-storage-after-7-days-539833)). Si Apple cambió esta regla después, conviene revisarla.

## Pasar datos desde el enlace de Claude

Cada enlace guarda sus propios datos. Si alguien ya usó Kipu en el enlace de Claude:

1. En el enlace de Claude: **Más → Mis datos y copia → Descargar copia**.
2. En el enlace nuevo: **Mis datos y copia → Restaurar una copia** y elige ese archivo.

## Actualizar la app

Reemplaza los archivos en el repositorio por los nuevos. Quien tenga Kipu instalada recibe la versión nueva la próxima vez que la abra con internet. Sus datos no se tocan.

## Privacidad y consentimiento

- Kipu no tiene servidor y no envía datos. Todo vive en el navegador de cada persona.
- Los indicadores del piloto solo se comparten si el comerciante lee y acepta el consentimiento en **Indicadores del piloto**. Puede retirarlo cuando quiera.
- El texto se muestra en la app. Si lo cambias, sube el número de `CONSENTIMIENTO_V` en `index.html` para que se vuelva a pedir.
- Si en el futuro estos datos se usaran para un análisis de crédito, haría falta un consentimiento nuevo y específico para eso.

## Límites conocidos

- Si el comerciante borra los datos del navegador o usa un limpiador de memoria, pierde lo anotado. La app le recuerda guardar una copia cada semana.
- Los datos no se sincronizan entre celulares.
- El importador lee extractos en CSV. Yape descarga el extracto en PDF, que Kipu no lee. Para Yape están el sumador del cierre y el cuadre del QR por semana.

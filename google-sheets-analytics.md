# Analytics Gratuito con Google Sheets

## Configuración paso a paso:

### 1. Crear Google Sheet
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja llamada "DDSolutions Analytics"
3. Crea columnas: Fecha, Hora, Página, Referrer, País, Dispositivo, Navegador

### 2. Crear Google Apps Script
1. En tu Google Sheet, ve a Extensiones > Apps Script
2. Pega este código:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.page || '',
      data.referrer || '',
      data.userAgent || '',
      data.screenResolution || '',
      data.language || '',
      data.sessionId || ''
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // Obtener estadísticas
  const stats = {
    totalVisits: data.length - 1,
    lastVisit: data[data.length - 1][0],
    topPages: getTopPages(data),
    devices: getDeviceStats(data)
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(stats))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Implementar como Web App
4. Obtener la URL del webhook

### 3. Código para tu sitio:

```html
<script>
// Analytics simple con Google Sheets
(function() {
    const SHEETS_WEBHOOK = 'TU_URL_DE_GOOGLE_APPS_SCRIPT';
    
    // Enviar datos de visita
    fetch(SHEETS_WEBHOOK, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            page: window.location.pathname,
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            screenResolution: `${screen.width}x${screen.height}`,
            language: navigator.language,
            sessionId: Date.now() + Math.random()
        })
    });
})();
</script>
```

## Ventajas:
✅ 100% Gratuito
✅ Datos en tu control
✅ Fácil de configurar
✅ Puedes crear dashboards en Google Sheets
✅ Integración con Google Data Studio

## Limitaciones:
⚠️ Máximo 10,000 filas gratis
⚠️ No tracking en tiempo real
⚠️ Funcionalidad básica
# Formato de Códigos QR para Tickets Companya

## Formato del QR

Los códigos QR de los tickets físicos de Companya deben contener el ID del token NFT correspondiente en uno de estos formatos:

### Formato 1: Simple (Recomendado para MVP)
```
1
```
Solo el número del tokenId (por ejemplo: `1`, `42`, `123`)

### Formato 2: Con Prefijo (Más seguro)
```
COMPANYA-TOKEN-1
```
Formato: `COMPANYA-TOKEN-{tokenId}`

## Cómo Generar los QR

### Opción 1: Usando un generador online
1. Ir a https://www.qr-code-generator.com/
2. Seleccionar "Text" 
3. Ingresar: `COMPANYA-TOKEN-1` (o el tokenId que corresponda)
4. Descargar e imprimir en el ticket físico

### Opción 2: Programáticamente (para generación masiva)
```javascript
// Ejemplo usando qrcode library en Node.js
const QRCode = require('qrcode');

async function generateTicketQR(tokenId) {
  const qrData = `COMPANYA-TOKEN-${tokenId}`;
  await QRCode.toFile(`ticket-${tokenId}.png`, qrData);
}
```

## Flujo de Uso

1. **Silver recibe el ticket físico** con QR impreso
2. **Companion escanea el QR** con su app
3. **App extrae el tokenId** del QR
4. **App verifica en el contrato** que el token existe y está disponible
5. **App asigna el companion** y completa el servicio
6. **NFT se transfiere** del Silver al Companion

## Ejemplo de Ticket Físico

```
╔══════════════════════════════════════╗
║        TICKET COMPANYA               ║
║                                      ║
║   [QR CODE]                          ║
║   COMPANYA-TOKEN-42                  ║
║                                      ║
║   Token ID: #42                      ║
║   Válido para: 1 acompañamiento      ║
║   Ciudad: Bogotá                     ║
╚══════════════════════════════════════╝
```

## Seguridad

- Cada QR es único y corresponde a un token específico
- El token solo puede ser usado una vez
- La verificación se hace on-chain antes de procesar
- El historial queda registrado en la blockchain

# Migración DNS a Cloudflare — checklist de control

No cambiar nameservers hasta completar y verificar este documento.

## Inventario previo

Registrar para cada entrada: tipo, nombre, contenido/destino, TTL, prioridad, proxy y propósito. Conservar especialmente MX, SPF, DKIM, DMARC, verificaciones de proveedor, autodiscover/autoconfig y subdominios.

## Validación de correo

- Identificar proveedor por MX, panel contractual y encabezados de una prueba controlada.
- Replicar todos los registros en Cloudflare con proxy desactivado donde corresponda.
- Validar SPF sin crear múltiples registros SPF.
- Validar cada selector DKIM y la política DMARC.
- Probar envío y recepción, incluidos destinatarios externos, antes y después del cambio.

## Cambio controlado

- Reducir TTL con antelación cuando sea posible.
- Comparar inventario origen/destino entre dos revisores.
- Cambiar nameservers únicamente después de la preview web y la validación DNS.
- Confirmar raíz, `www`, HTTPS, redirecciones y correo.
- Conservar evidencia con fecha y plan de reversión.

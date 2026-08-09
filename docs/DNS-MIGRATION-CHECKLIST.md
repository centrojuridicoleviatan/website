# Migración DNS a Cloudflare — checklist de control

No cambiar nameservers hasta completar y verificar este documento.

## Inventario previo

Registrar para cada entrada: tipo, nombre, contenido/destino, TTL, prioridad, proxy y propósito. Conservar especialmente MX, SPF, DKIM, DMARC, verificaciones de proveedor, autodiscover/autoconfig y subdominios.

## Fotografía pública — 2026-08-09

Evidencia: [snapshot Markdown](evidence/dns/2026-08-09-public-snapshot.md) y [datos JSON](evidence/dns/2026-08-09-public-snapshot.json).

| Función | Registro público observado | Estado |
|---|---|---|
| DNS autoritativo | `launch1.spaceship.net`, `launch2.spaceship.net` | Spaceship sigue siendo autoritativo |
| Web raíz | A `66.29.148.111` (TTL observado: 300) | Preservar hasta validar Pages |
| `www` | CNAME a `centrojuridicoleviatan.com` | Preservar comportamiento |
| Subdominios observados | `ftp` y `webdisk` → `66.29.148.111` | Confirmar propósito antes de migrar |
| Correo entrante | MX prioridad 1 → `smtp.google.com` | Confirmar proveedor y cuenta en panel/encabezados |
| SPF | `v=spf1 include:spf.shared.spaceship.host include:_spf.google.com ~all` | Conservar como un solo registro SPF |
| DKIM | TXT en `google._domainkey` | Conservar valor íntegro |
| Verificación | `google-site-verification=49CGNAl4-1N5NJknZNzv1WMZTDgq-1A9jFvXEHzj9hc` | Conservar |
| DMARC | Sin respuesta pública en `_dmarc` | Confirmar en exportación; no inventar una política durante la migración |
| CAA | Sin respuesta pública en el dominio raíz | Confirmar en exportación |

Esta fotografía no enumera una zona DNS completa. La exportación autenticada de Spaceship mediante `GET /v1/dns/records/{domain}` con permiso `dnsrecords:read` sigue pendiente y es una puerta obligatoria.

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

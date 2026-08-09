# Cloudflare Pages

## Configuración de compilación

- Repositorio: `centrojuridicoleviatan/website`
- Rama de producción futura: `main`
- Comando: `npm run build`
- Directorio de salida: `dist`
- Versión de Node.js: `22`

La primera validación debe realizarse mediante una URL `*.pages.dev` de preview. No se debe añadir `centrojuridicoleviatan.com`, cambiar nameservers ni modificar registros DNS durante esa validación.

## Puerta de seguridad para el dominio

Antes de asociar el dominio personalizado se requiere:

1. Inventario completo de DNS en Spaceship.
2. Identificación verificable del proveedor de correo.
3. Réplica de MX, SPF, DKIM, DMARC, verificaciones y subdominios.
4. Revisión comparativa de origen y destino.
5. Pruebas controladas de envío y recepción.
6. Plan de reversión documentado.

La configuración técnica declarada en `wrangler.jsonc` no conecta el dominio ni modifica DNS.

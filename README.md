# Centro Jurídico LEVIATÁN — sitio oficial

Fuente oficial del sitio institucional de LEVIATÁN. El proyecto comunica capacidades verificables en ciberseguridad, protección digital e investigación defensiva de IA sin atribuir certificaciones, alianzas o respaldos inexistentes.

La versión pública anterior a la migración se conserva, junto con hashes de integridad y procedencia, en [`archive/current-site`](archive/current-site/README.md).

## Desarrollo

```bash
npm ci
npm run dev
npm run build
```

La salida estática se genera en `dist/`. En Cloudflare Pages: comando `npm run build`, directorio `dist`, Node.js 22.

## Controles

- Cambios mediante pull request y revisión.
- Dependencias revisadas por Dependabot.
- Compilación automática en GitHub Actions.
- Encabezados defensivos en `public/_headers`.
- Política de divulgación en `/responsible-disclosure` y contacto estándar en `/.well-known/security.txt`.

## Estado

Este repositorio no acredita certificación ISO, pertenencia a FIRST, condición oficial de CSIRT ni respaldo de terceros. Los objetivos futuros deben mantenerse diferenciados de los controles implementados.

# Inventario DNS público — centrojuridicoleviatan.com

Capturado: 2026-08-09T20:53:59.101Z

> Alcance: fotografía de registros públicos y nombres observados en Certificate Transparency. No sustituye la exportación autenticada y completa de la zona en Spaceship.

> Puerta de seguridad: no cambiar nameservers ni DNS de producción hasta comparar esta evidencia con la exportación de Spaceship y preservar MX, SPF, DKIM, DMARC, verificaciones y subdominios.

## Respuestas positivas

| Nombre | Tipo | Valor |
|---|---|---|
| centrojuridicoleviatan.com | A | [{"address":"66.29.148.111","ttl":300}] |
| centrojuridicoleviatan.com | MX | [{"exchange":"smtp.google.com","priority":1}] |
| centrojuridicoleviatan.com | NS | ["launch1.spaceship.net","launch2.spaceship.net"] |
| centrojuridicoleviatan.com | SOA | {"nsname":"launch1.spaceship.net","hostmaster":"support.spaceship.com","serial":1785775717,"refresh":43200,"retry":3600,"expire":604800,"minttl":3600} |
| centrojuridicoleviatan.com | TXT | [["google-site-verification=49CGNAl4-1N5NJknZNzv1WMZTDgq-1A9jFvXEHzj9hc"],["v=spf1 include:spf.shared.spaceship.host include:_spf.google.com ~all"]] |
| ftp.centrojuridicoleviatan.com | A | [{"address":"66.29.148.111","ttl":300}] |
| google._domainkey.centrojuridicoleviatan.com | TXT | [["v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmcU9vct88pVrIPrJpgvAZT0UKpVbAh8tiHHXE1yxS1S1bWSPzILle/Xju1dkMmgouikLjQOFaXCqO0mPjpLMsWw0hCbYxzuujR6uUUZH4u5FVsfllnNcjijEeZUS9atLUiQwiOQEgKD1rR6EM9XCQ6VANeFaXEBi5iAAHtdMTaJY5DxPQYfkZy58tjfGRFQE6ND","gRGEBirgsxOoiRLP+LYek3ulTOAibDIQdelENsSAu9yfPRinMyo8F5olwRTBpUi5DeB2Hpjep6iC0ECkgqPZDde/O6qsRqWAIOsj0PeZe0kytebTg8gS4clm1oq3SVz92m4buxoF/1owqw4derwIDAQAB"]] |
| webdisk.centrojuridicoleviatan.com | A | [{"address":"66.29.148.111","ttl":300}] |
| www.centrojuridicoleviatan.com | A | {"records":[{"address":"66.29.148.111","ttl":299}],"resolution":"via-cname","cnameTargets":["centrojuridicoleviatan.com"]} |
| www.centrojuridicoleviatan.com | CNAME | ["centrojuridicoleviatan.com"] |

## Cobertura

- Consultas registradas: 109
- Respuestas positivas: 10
- Nombres descubiertos por Certificate Transparency: 0
- Error de Certificate Transparency: HTTP_502 (attempt 1); TIMEOUT (attempt 2); HTTP_404 (attempt 1); HTTP_502 (attempt 2)

Los resultados sin datos se conservan en el JSON para trazabilidad. La ausencia de respuesta en un nombre consultado no demuestra que no existan otros nombres o registros en la zona.

## Trazabilidad

- Workflow: https://github.com/centrojuridicoleviatan/website/actions/runs/31335424461
- Commit de captura: `d5e9f967c14cb1f34dbc324895a98a6146e58094`
- Artefacto de Actions: `9044174924`
- SHA-256 del ZIP: `15601fe43da0cf192f6aabd5ce8860be0d2c9c035fa4e2f409a9adbed8c67fd0`
- SHA-256 del JSON: `b2dd4472b2b47cbdfcfed458a55e078020dd2c158b4c65177e2b0e70ca5eed93`
- Exportación autenticada de Spaceship: pendiente; sigue siendo obligatoria antes de cualquier cambio.

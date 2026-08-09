import { promises as fs } from "node:fs";
import dns from "node:dns/promises";

const DOMAIN = "centrojuridicoleviatan.com";
const CAPTURED_AT = new Date().toISOString();

const KNOWN_HOSTS = [
  DOMAIN,
  `www.${DOMAIN}`,
  `mail.${DOMAIN}`,
  `webmail.${DOMAIN}`,
  `smtp.${DOMAIN}`,
  `imap.${DOMAIN}`,
  `pop.${DOMAIN}`,
  `autoconfig.${DOMAIN}`,
  `autodiscover.${DOMAIN}`,
  `ftp.${DOMAIN}`,
  `cpanel.${DOMAIN}`,
  `webdisk.${DOMAIN}`,
  `api.${DOMAIN}`,
  `security.${DOMAIN}`,
  `staging.${DOMAIN}`
];

const SPECIAL_QUERIES = [
  { name: `_dmarc.${DOMAIN}`, types: ["TXT"] },
  { name: `_mta-sts.${DOMAIN}`, types: ["TXT"] },
  { name: `_smtp._tls.${DOMAIN}`, types: ["TXT"] },
  { name: `_domainconnect.${DOMAIN}`, types: ["CNAME", "TXT"] },
  { name: `_domainkey.${DOMAIN}`, types: ["TXT"] },
  ...["default", "selector1", "selector2", "google", "k1", "s1", "s2", "mail", "smtp", "spacemail", "mx"].map(
    (selector) => ({ name: `${selector}._domainkey.${DOMAIN}`, types: ["CNAME", "TXT"] })
  ),
  ...["_autodiscover._tcp", "_imaps._tcp", "_pop3s._tcp", "_submission._tcp", "_caldavs._tcp", "_carddavs._tcp"].map(
    (service) => ({ name: `${service}.${DOMAIN}`, types: ["SRV"] })
  )
];

function stableRecords(records) {
  if (!Array.isArray(records)) return records;
  return [...records].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
}

async function resolveRecord(name, type) {
  try {
    let records;
    if (type === "A") records = await dns.resolve4(name, { ttl: true });
    else if (type === "AAAA") records = await dns.resolve6(name, { ttl: true });
    else records = await dns.resolve(name, type);
    return { name, type, status: "answer", records: stableRecords(records) };
  } catch (error) {
    const code = error?.code || "UNKNOWN";
    const status = ["ENODATA", "ENOTFOUND", "ESERVFAIL", "EREFUSED"].includes(code) ? "no-data" : "error";
    return { name, type, status, error: code };
  }
}

async function certificateTransparencyNames() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(
      `https://crt.sh/?q=%25.${DOMAIN}&output=json`,
      {
        signal: controller.signal,
        headers: { "user-agent": "centro-juridico-leviatan-dns-inventory/1.0" }
      }
    );
    if (!response.ok) throw new Error(`HTTP_${response.status}`);
    const rows = await response.json();
    const names = new Set();
    for (const row of rows) {
      for (const value of String(row.name_value || "").split("\n")) {
        const name = value.trim().toLowerCase().replace(/^\*\./, "");
        if (name === DOMAIN || name.endsWith(`.${DOMAIN}`)) names.add(name);
      }
    }
    return { names: [...names].sort(), error: null };
  } catch (error) {
    return { names: [], error: error?.name === "AbortError" ? "TIMEOUT" : String(error?.message || error) };
  } finally {
    clearTimeout(timeout);
  }
}

function renderValue(records) {
  return JSON.stringify(records)
    .replaceAll("|", "\\|")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

const ct = await certificateTransparencyNames();
const ordinaryNames = [...new Set([...KNOWN_HOSTS, ...ct.names])].sort();
const ordinaryQueries = ordinaryNames.flatMap((name) => {
  const types = name === DOMAIN
    ? ["A", "AAAA", "CAA", "MX", "NS", "SOA", "TXT"]
    : ["A", "AAAA", "CNAME", "MX", "TXT"];
  return types.map((type) => ({ name, type }));
});
const specialQueries = SPECIAL_QUERIES.flatMap(({ name, types }) =>
  types.map((type) => ({ name, type }))
);
const queries = [...ordinaryQueries, ...specialQueries];
const results = await Promise.all(queries.map(({ name, type }) => resolveRecord(name, type)));
results.sort((a, b) => a.name.localeCompare(b.name) || a.type.localeCompare(b.type));

const answers = results.filter((result) => result.status === "answer");
const snapshot = {
  schemaVersion: 1,
  capturedAt: CAPTURED_AT,
  domain: DOMAIN,
  scope: "Public DNS and certificate-transparency snapshot; not an authenticated zone export.",
  authoritativeWarning: "Do not change nameservers or production DNS from this snapshot. Compare it with the complete Spaceship API export first.",
  certificateTransparency: {
    source: "crt.sh",
    discoveredNames: ct.names,
    error: ct.error
  },
  queriedNames: [...new Set(queries.map(({ name }) => name))].sort(),
  results
};

const markdown = [
  "# Inventario DNS público — centrojuridicoleviatan.com",
  "",
  `Capturado: ${CAPTURED_AT}`,
  "",
  "> Alcance: fotografía de registros públicos y nombres observados en Certificate Transparency. No sustituye la exportación autenticada y completa de la zona en Spaceship.",
  "",
  "> Puerta de seguridad: no cambiar nameservers ni DNS de producción hasta comparar esta evidencia con la exportación de Spaceship y preservar MX, SPF, DKIM, DMARC, verificaciones y subdominios.",
  "",
  "## Respuestas positivas",
  "",
  "| Nombre | Tipo | Valor |",
  "|---|---|---|",
  ...answers.map(({ name, type, records }) => `| ${name} | ${type} | ${renderValue(records)} |`),
  "",
  "## Cobertura",
  "",
  `- Consultas realizadas: ${results.length}`,
  `- Respuestas positivas: ${answers.length}`,
  `- Nombres descubiertos por Certificate Transparency: ${ct.names.length}`,
  `- Error de Certificate Transparency: ${ct.error || "ninguno"}`,
  "",
  "Los resultados sin datos se conservan en el JSON para trazabilidad. La ausencia de respuesta en un nombre consultado no demuestra que no existan otros nombres o registros en la zona.",
  ""
].join("\n");

await fs.writeFile("dns-snapshot.json", JSON.stringify(snapshot, null, 2) + "\n");
await fs.writeFile("dns-snapshot.md", markdown);

console.log(JSON.stringify({
  capturedAt: CAPTURED_AT,
  domain: DOMAIN,
  queries: results.length,
  answers: answers.length,
  ctNames: ct.names.length,
  ctError: ct.error
}));

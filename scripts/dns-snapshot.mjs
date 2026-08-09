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
    if (Array.isArray(records) && records.length === 0) {
      return { name, type, status: "no-data", error: "EMPTY_ANSWER" };
    }
    return { name, type, status: "answer", records: stableRecords(records) };
  } catch (error) {
    const code = error?.code || "UNKNOWN";
    const status = ["ENODATA", "ENOTFOUND", "ESERVFAIL", "EREFUSED"].includes(code) ? "no-data" : "error";
    return { name, type, status, error: code };
  }
}

async function fetchCertificateTransparency(endpoint) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(endpoint, {
      signal: controller.signal,
      headers: { "user-agent": "centro-juridico-leviatan-dns-inventory/1.1" }
    });
    if (!response.ok) throw new Error(`HTTP_${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function certificateTransparencyNames() {
  const endpoints = [
    `https://crt.sh/?q=${encodeURIComponent(`%.${DOMAIN}`)}&output=json`,
    `https://crt.sh/?q=${encodeURIComponent(DOMAIN)}&output=json`
  ];
  const failures = [];
  for (const endpoint of endpoints) {
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        const rows = await fetchCertificateTransparency(endpoint);
        const names = new Set();
        for (const row of rows) {
          for (const value of String(row.name_value || "").split("\n")) {
            const name = value.trim().toLowerCase().replace(/^\*\./, "");
            if (name === DOMAIN || name.endsWith(`.${DOMAIN}`)) names.add(name);
          }
        }
        return { names: [...names].sort(), error: null };
      } catch (error) {
        const reason = error?.name === "AbortError" ? "TIMEOUT" : String(error?.message || error);
        failures.push(`${reason} (attempt ${attempt})`);
      }
    }
  }
  return { names: [], error: failures.join("; ") };
}

async function resolveOrdinaryName(name) {
  if (name === DOMAIN) {
    return await Promise.all(
      ["A", "AAAA", "CAA", "MX", "NS", "SOA", "TXT"].map((type) => resolveRecord(name, type))
    );
  }

  const cname = await resolveRecord(name, "CNAME");
  if (cname.status === "answer") {
    const addresses = await Promise.all(["A", "AAAA"].map((type) => resolveRecord(name, type)));
    return [
      cname,
      ...addresses.map((result) => ({
        ...result,
        resolution: "via-cname",
        cnameTargets: cname.records
      }))
    ];
  }

  const direct = await Promise.all(
    ["A", "AAAA", "MX", "TXT"].map((type) => resolveRecord(name, type))
  );
  return [cname, ...direct];
}

async function resolveSpecialQuery({ name, types }) {
  if (types.includes("CNAME")) {
    const cname = await resolveRecord(name, "CNAME");
    if (cname.status === "answer") return [cname];
    const remaining = await Promise.all(
      types.filter((type) => type !== "CNAME").map((type) => resolveRecord(name, type))
    );
    return [cname, ...remaining];
  }
  return await Promise.all(types.map((type) => resolveRecord(name, type)));
}

function renderResult(result) {
  const value = result.resolution === "via-cname"
    ? { records: result.records, resolution: result.resolution, cnameTargets: result.cnameTargets }
    : result.records;
  return JSON.stringify(value)
    .replaceAll("|", "\\|")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

const ct = await certificateTransparencyNames();
const ordinaryNames = [...new Set([...KNOWN_HOSTS, ...ct.names])].sort();
const ordinaryResults = (await Promise.all(ordinaryNames.map(resolveOrdinaryName))).flat();
const specialResults = (await Promise.all(SPECIAL_QUERIES.map(resolveSpecialQuery))).flat();
const results = [...ordinaryResults, ...specialResults];
results.sort((a, b) => a.name.localeCompare(b.name) || a.type.localeCompare(b.type));

const answers = results.filter((result) => result.status === "answer");
const snapshot = {
  schemaVersion: 2,
  capturedAt: CAPTURED_AT,
  domain: DOMAIN,
  scope: "Public DNS and certificate-transparency snapshot; not an authenticated zone export.",
  authoritativeWarning: "Do not change nameservers or production DNS from this snapshot. Compare it with the complete Spaceship API export first.",
  cnameHandling: "When a CNAME exists, direct MX/TXT lookups are omitted to avoid misreporting records inherited by resolver alias chasing.",
  certificateTransparency: {
    source: "crt.sh",
    discoveredNames: ct.names,
    error: ct.error
  },
  queriedNames: [...new Set(results.map(({ name }) => name))].sort(),
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
  ...answers.map((result) => `| ${result.name} | ${result.type} | ${renderResult(result)} |`),
  "",
  "## Cobertura",
  "",
  `- Consultas registradas: ${results.length}`,
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

import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const audiences = [
  'Figuras públicas',
  'Creadores de contenido',
  'Políticos',
  'Empresarios',
  'Influencers',
  'Televisoras',
  'Periodistas',
  'Organizaciones evaluadas',
  'OnlyFans',
  'TikTokers',
  'Instagram',
  'Facebook',
  'YouTubers'
];

const capabilityGroups = [
  {
    number: '01',
    label: 'Capacidades',
    title: 'Qué hacemos',
    items: [
      'Detectamos información expuesta.',
      'Identificamos contenido filtrado.',
      'Localizamos cuentas falsas.',
      'Documentamos evidencia técnica.',
      'Gestionamos solicitudes de retirada y desindexación.',
      'Monitoreamos internet 24/7.'
    ]
  },
  {
    number: '02',
    label: 'Problemas',
    title: 'Qué resolvemos',
    items: [
      'Filtración de datos personales.',
      'OnlyFans, Telegram y contenido íntimo.',
      'Deepfakes y robo de identidad.',
      'Difamación y doxxing.',
      'Documentos filtrados y bases expuestas.',
      'Uso indebido de imagen.'
    ]
  },
  {
    number: '03',
    label: 'Diferenciador',
    title: 'Cómo trabajamos',
    items: [
      'No sustituimos a su abogado: entregamos evidencia técnica.',
      'No sustituimos a su manager: reducimos la exposición digital.',
      'No sustituimos a su equipo TI: nos enfocamos en la exposición pública.',
      'Nos integramos a su equipo como unidad técnica especializada.'
    ]
  }
];

const interventions = [
  {
    number: '01',
    title: 'Filtraron tus datos privados en internet.',
    body: 'Localizamos, documentamos y gestionamos su retiro o desindexación por las vías aplicables.'
  },
  {
    number: '02',
    title: 'Lo primero que aparece sobre tu nombre son difamaciones.',
    body: 'Construimos evidencia, exigimos correcciones y fortalecemos el trabajo jurídico con seguimiento técnico.'
  },
  {
    number: '03',
    title: 'Crearon videos, anuncios o perfiles con tu rostro mediante IA.',
    body: 'Identificamos contenido sintético, campañas, rutas de difusión y explotación no autorizada de la identidad.'
  },
  {
    number: '04',
    title: 'Filtraron contenido exclusivo o íntimo.',
    body: 'Rastreamos copias, preservamos evidencia y coordinamos retiros en plataformas, foros, redes y sitios espejo.'
  }
];

const locations = [
  ['San Pedro Garza García', 'Calzada del Valle'],
  ['New York', 'Madison Avenue'],
  ['Miami', 'Brickell Avenue']
];

const pages = {
  '/ai-security': {
    eyebrow: 'AI Security / Defensive AI Lab',
    title: 'Inteligencia artificial bajo una mirada defensiva.',
    lead: 'Investigación y prototipado defensivo para evaluar riesgos de sistemas de IA sin facilitar abuso.',
    items: [
      ['Evaluación de amenazas y abuso', 'Analizamos escenarios realistas, superficies de exposición y controles proporcionales.'],
      ['Pruebas controladas y reproducibles', 'Documentamos alcance, metodología, resultados y limitaciones.'],
      ['Seguridad de aplicaciones con modelos de IA', 'Evaluamos integración, datos, permisos, observabilidad y resistencia al uso indebido.'],
      ['Documentación responsable de hallazgos', 'Priorizamos correcciones y divulgación coordinada con las partes autorizadas.']
    ]
  },
  '/research': {
    eyebrow: 'Research',
    title: 'Investigación que puede ser examinada.',
    lead: 'Publicaremos metodología, alcance, limitaciones, artefactos reproducibles y estado de revisión de cada trabajo.',
    items: [
      ['Notas técnicas', 'Análisis claros sobre problemas concretos y decisiones de diseño.'],
      ['Evaluaciones defensivas', 'Pruebas con autorización, límites definidos y resultados trazables.'],
      ['Taxonomías de riesgo', 'Lenguaje compartido para clasificar amenazas, impactos y mitigaciones.'],
      ['Registro de correcciones', 'Cambios, revisiones y límites conservados como parte del trabajo.']
    ]
  },
  '/open-source': {
    eyebrow: 'Open Source',
    title: 'Herramientas abiertas con responsabilidad.',
    lead: 'El software liberado por LEVIATÁN incluirá licencia, documentación, modelo de amenazas, historial de cambios y un proceso de seguridad definido.',
    items: [
      ['Herramientas defensivas', 'Software orientado a prevención, evaluación y respuesta autorizada.'],
      ['Conjuntos de pruebas', 'Casos reproducibles que faciliten la validación de controles.'],
      ['Plantillas de gobernanza', 'Recursos para documentar responsabilidades, riesgos y decisiones.'],
      ['Contribuciones trazables', 'Cambios revisables con procedencia, contexto y atribución.']
    ]
  },
  '/security': {
    eyebrow: 'Security',
    title: 'Seguridad como proceso verificable.',
    lead: 'La seguridad se gestiona como proceso verificable: identificación, priorización, remediación, comunicación y aprendizaje.',
    items: [
      ['Política de vulnerabilidades', 'Reglas claras para evaluar y corregir hallazgos dentro de activos autorizados.'],
      ['Dependencias y control de cambios', 'Revisión de componentes, automatización y trazabilidad de modificaciones.'],
      ['Respaldo y recuperación', 'Preparación para restaurar operaciones y conservar evidencia relevante.'],
      ['Registro de incidentes', 'Cronología, decisiones, acciones correctivas y aprendizaje institucional.']
    ]
  },
  '/csirt': {
    eyebrow: 'CSIRT',
    title: 'Preparación para responder con disciplina.',
    lead: 'LEVIATÁN está desarrollando capacidades de respuesta a incidentes. Esta página no afirma acreditación, membresía ni estatus oficial de CSIRT.',
    items: [
      ['Preparación', 'Alcance, roles, criterios de escalamiento y ejercicios.'],
      ['Triage y coordinación', 'Clasificación inicial y respuesta proporcional al impacto observado.'],
      ['Preservación de evidencia', 'Integridad, cronología y manejo responsable de información técnica.'],
      ['Lecciones aprendidas', 'Correcciones, responsables y seguimiento después de cada incidente.']
    ]
  },
  '/responsible-disclosure': {
    eyebrow: 'Responsible Disclosure',
    title: 'Reportes de buena fe. Correcciones coordinadas.',
    lead: 'Los reportes sobre activos bajo nuestro control se coordinan únicamente mediante canales privados proporcionados de forma expresa; este sitio no publica formularios ni direcciones de recepción.',
    items: [
      ['Incluye activo, impacto y pasos reproducibles', 'Comparte únicamente la información necesaria mediante el canal privado que se te haya proporcionado.'],
      ['No accedas a datos de terceros', 'Detén la prueba si encuentras información ajena o una condición no autorizada.'],
      ['No interrumpas servicios', 'Evita degradación, indisponibilidad, persistencia y técnicas destructivas.'],
      ['Espera confirmación antes de divulgar', 'La validación, mitigación y comunicación se coordinan por los canales autorizados.']
    ]
  },
  '/governance': {
    eyebrow: 'Governance',
    title: 'Autoridad, límites y rendición de cuentas.',
    lead: 'Nuestra gobernanza separa afirmaciones, evidencia y aspiraciones. Los compromisos públicos deben tener responsable, fecha y registro.',
    items: [
      ['Autoridad y rendición de cuentas', 'Cada decisión relevante debe tener propietario y registro verificable.'],
      ['Gestión de riesgos', 'Priorización explícita de probabilidad, impacto, controles y riesgo residual.'],
      ['Conflictos de interés', 'Identificación, declaración y tratamiento antes de aceptar o continuar un asunto.'],
      ['Revisión periódica', 'Evaluación de controles, resultados, excepciones y acciones pendientes.']
    ]
  },
  '/transparency': {
    eyebrow: 'Transparency',
    title: 'Transparencia desde el principio.',
    lead: 'Este registro distinguirá controles implementados, trabajo en curso y objetivos futuros. No presentaremos planes como certificaciones.',
    items: [
      ['Cambios relevantes', 'Publicación de modificaciones que afecten compromisos o controles del sitio.'],
      ['Incidentes materiales', 'Comunicación proporcional cuando exista información verificada y publicable.'],
      ['Solicitudes institucionales', 'Registro compatible con las obligaciones legales y la protección de terceros.'],
      ['Métricas con contexto', 'Datos acompañados de alcance, periodo, método y limitaciones.']
    ]
  },
  '/collaboration': {
    eyebrow: 'Institutional Collaboration',
    title: 'Colaboración con propósito y autorización.',
    lead: 'Colaboramos mediante objetivos definidos, autorización verificable, minimización de datos y reglas claras de publicación.',
    items: [
      ['Instituciones públicas', 'Proyectos delimitados, responsables identificados y tratamiento adecuado de información.'],
      ['Universidades', 'Investigación, formación y transferencia de conocimiento con metodología explícita.'],
      ['CERT y CSIRT', 'Coordinación técnica sin atribuir afiliación, membresía o respaldo inexistente.'],
      ['Laboratorios y empresas de tecnología', 'Evaluaciones defensivas y colaboración con propiedad y divulgación acordadas.']
    ]
  },
  '/privacy': {
    eyebrow: 'Privacidad',
    title: 'Datos mínimos. Propósito definido.',
    lead: 'Este sitio es informativo y no dispone de formularios públicos, campos de captura ni direcciones de correo publicadas para recibir solicitudes.',
    items: [
      ['Sin formularios públicos', 'El sitio no solicita nombres, correos, teléfonos, expedientes ni datos sensibles.'],
      ['Sin recepción pública por correo', 'Los canales operativos se proporcionan únicamente cuando existe invitación, referencia o relación autorizada.'],
      ['Minimización', 'Cuando existe una relación autorizada, se limita la información al propósito y alcance necesarios.'],
      ['Seguridad razonable', 'Aplicamos medidas proporcionales a la sensibilidad y al riesgo de la información tratada.']
    ]
  },
  '/terms': {
    eyebrow: 'Términos',
    title: 'Alcance claro para el uso del sitio.',
    lead: 'La información pública del sitio es general y no crea por sí misma relación abogado-cliente, garantía ni autorización para realizar pruebas.',
    items: [
      ['Uso lícito', 'El sitio y sus materiales deben utilizarse de forma legal y responsable.'],
      ['Propiedad intelectual', 'Los contenidos conservan los derechos y licencias indicados en cada caso.'],
      ['Limitación de responsabilidad', 'La información general no sustituye asesoría adaptada a hechos concretos.'],
      ['Cambios documentados', 'Las modificaciones relevantes se registrarán y comunicarán de forma proporcional.']
    ]
  },
  '/conflicts-of-interest': {
    eyebrow: 'Conflictos de interés',
    title: 'Independencia antes de intervenir.',
    lead: 'Antes de aceptar un asunto evaluamos relaciones, intereses y circunstancias que puedan afectar la independencia, la confidencialidad o la calidad del trabajo.',
    items: [
      ['Identificación temprana', 'Recabamos únicamente la información necesaria para realizar una evaluación inicial por canales previamente autorizados.'],
      ['Tratamiento documentado', 'Las medidas, restricciones o decisiones se dejan asentadas.'],
      ['Confidencialidad', 'La revisión no autoriza compartir información sensible fuera de su propósito.'],
      ['Decisión responsable', 'Cuando el conflicto no puede gestionarse adecuadamente, el asunto no se acepta o se interrumpe.']
    ]
  }
};

function Mark() {
  return (
    <svg className="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="28" />
      <circle cx="32" cy="32" r="18" />
      <path d="M32 4v8M32 52v8M4 32h8M52 32h8M32 32l15-13" />
      <path className="mark-letter" d="M20 19v25h13" />
      <circle className="mark-dot" cx="32" cy="32" r="2.5" />
    </svg>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <div className="nav-shell">
        <a className="brand" href="/" aria-label="Centro Jurídico LEVIATÁN, inicio">
          <Mark />
          <span className="brand-copy">
            <strong>LEVIATÁN</strong>
            <small>Centro Jurídico de Inteligencia y Protección Digital</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="/#capacidades">Capacidades</a>
          <a href="/#intervencion">Intervención</a>
          <a href="/ai-security">AI Security</a>
          <a href="/research">Research</a>
          <a href="/transparency">Transparencia</a>
        </nav>
        <div className="nav-actions">
          <span className="language" aria-label="Idiomas Español e English">Español · English</span>
          <details className="mobile-menu">
            <summary aria-label="Abrir menú">Menú</summary>
            <nav aria-label="Navegación móvil">
              <a href="/#capacidades">Capacidades</a>
              <a href="/#intervencion">Intervención</a>
              <a href="/ai-security">AI Security</a>
              <a href="/research">Research</a>
              <a href="/security">Security</a>
              <a href="/governance">Governance</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-intro">
          <a className="brand footer-brand" href="/">
            <Mark />
            <span className="brand-copy"><strong>LEVIATÁN</strong><small>Inteligencia técnica para decisiones jurídicas.</small></span>
          </a>
          <p>Ciberseguridad, protección digital e investigación defensiva de inteligencia artificial.</p>
        </div>
        <div className="footer-column">
          <span>Capacidades</span>
          <a href="/servicios">Servicios</a>
          <a href="/ai-security">AI Security</a>
          <a href="/research">Research</a>
          <a href="/open-source">Open Source</a>
          <a href="/security">Security</a>
          <a href="/csirt">CSIRT</a>
        </div>
        <div className="footer-column">
          <span>Institucional</span>
          <a href="/governance">Governance</a>
          <a href="/transparency">Transparency</a>
          <a href="/collaboration">Institutional Collaboration</a>
          <a href="/responsible-disclosure">Responsible Disclosure</a>
        </div>
        <div className="footer-column">
          <span>Legal</span>
          <a href="/privacy">Aviso de privacidad</a>
          <a href="/terms">Términos</a>
          <a href="/conflicts-of-interest">Conflictos de interés</a>
        </div>
      </div>
      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} Centro Jurídico LEVIATÁN.</small>
        <small>Las capacidades y reconocimientos se describen únicamente cuando existe evidencia verificable.</small>
      </div>
    </footer>
  );
}

function Layout({ children }) {
  return <><Header />{children}<Footer /></>;
}

function SectionHeading({ eyebrow, title, body, inverse = false }) {
  return (
    <div className={`section-heading${inverse ? ' inverse' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <div>
        <h2>{title}</h2>
        {body && <p className="section-lead">{body}</p>}
      </div>
    </div>
  );
}

function Home() {
  return (
    <Layout>
      <main id="contenido">
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-main">
              <p className="eyebrow">Acceso privado · por recomendación o invitación</p>
              <p className="hero-institution">Centro jurídico de inteligencia y protección digital</p>
              <h1>Defensa digital para un entorno de <em>riesgo real.</em></h1>
              <p className="hero-position">La inteligencia técnica detrás de las decisiones jurídicas.</p>
              <p className="hero-lead">Construimos capacidades verificables en ciberseguridad, protección digital e investigación defensiva de inteligencia artificial.</p>
              <div className="actions">
                <a className="button button-ghost" href="#capacidades">Ver capacidades</a>
              </div>
            </div>
            <aside className="hero-aside">
              <span className="aside-index">L / 01</span>
              <div className="hero-manifesto" aria-label="Detectamos. Documentamos. Protegemos.">
                <span>Detectamos.</span>
                <span>Documentamos.</span>
                <strong>Protegemos.</strong>
              </div>
              <div className="private-note">
                <strong>Atención selectiva</strong>
                <p>Solo atendemos figuras públicas, creadores de contenido, políticos, empresarios, influencers, televisoras, periodistas y organizaciones previamente evaluadas.</p>
              </div>
            </aside>
          </div>
          <div className="hero-meta">
            <span>San Pedro Garza García</span>
            <span>New York</span>
            <span>Miami</span>
            <span>Atención mediante cita</span>
          </div>
          <div className="audience-block">
            <span className="audience-label">Solo atendemos</span>
            <div className="audiences">{audiences.map(item => <span key={item}>{item}</span>)}</div>
          </div>
        </section>

        <section className="purpose paper-section">
          <div className="purpose-number">L / 02</div>
          <div>
            <p className="eyebrow dark">Propósito</p>
            <h2>La confianza institucional no se declara. <em>Se demuestra.</em></h2>
          </div>
          <p>Documentamos procesos, controles, investigación, correcciones y límites. Diferenciamos con claridad el estado actual de los objetivos futuros.</p>
        </section>

        <section className="capabilities section-shell" id="capacidades">
          <SectionHeading
            eyebrow="Qué hacemos"
            title="Detectamos. Documentamos. Protegemos."
            body="Unidad técnica especializada que trabaja junto con abogados, managers, representantes y empresas."
          />
          <div className="capability-grid">
            {capabilityGroups.map(group => (
              <article className="capability-card" key={group.number}>
                <div className="card-top"><span>{group.number}</span><span>{group.label}</span></div>
                <h3>{group.title}</h3>
                <ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
          <div className="section-action"><a className="text-link" href="/servicios">Explorar todos los servicios <span>↗</span></a></div>
        </section>

        <section className="intervention paper-section" id="intervencion">
          <SectionHeading
            eyebrow="Intervención"
            title="Respuesta clara para casos de alta sensibilidad."
            body="Problema visible. Evidencia verificable. Priorización y plan de acción."
            inverse
          />
          <div className="intervention-list">
            {interventions.map(item => (
              <article key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="institutional section-shell">
          <SectionHeading
            eyebrow="Capacidad institucional"
            title="Defensa, investigación y responsabilidad."
            body="Unimos la intervención técnica del sitio original con una estructura institucional verificable."
          />
          <div className="institutional-grid">
            <article><span>01</span><h3>Defensive AI Lab</h3><p>Evaluación responsable de amenazas y controles para sistemas de IA.</p><a href="/ai-security">Explorar <b>↗</b></a></article>
            <article><span>02</span><h3>Security &amp; CSIRT</h3><p>Preparación y respuesta a incidentes con procesos documentados.</p><a href="/csirt">Ver capacidades <b>↗</b></a></article>
            <article><span>03</span><h3>Research &amp; Open Source</h3><p>Publicaciones y herramientas defensivas reproducibles.</p><a href="/research">Consultar investigación <b>↗</b></a></article>
          </div>
        </section>

        <section className="status-band">
          <div><p className="eyebrow">Estado institucional</p><h2>Transparencia desde el principio.</h2></div>
          <div><p>Estamos formalizando controles y capacidades. No afirmamos certificaciones ISO, membresía FIRST, respaldo gubernamental ni alianzas que no hayan sido obtenidas y publicadas con evidencia.</p><a className="text-link" href="/transparency">Ver transparencia <span>↗</span></a></div>
        </section>

        <section className="presence section-shell">
          <SectionHeading
            eyebrow="Presencia"
            title="Atención privada y coordinada."
            body="Intervención técnica y jurídica mediante evaluación previa, cita o referencia."
          />
          <div className="presence-grid">
            {locations.map(([city, street], index) => <article key={city}><span>0{index + 1}</span><h3>{city}</h3><p>{street}</p></article>)}
          </div>
          <div className="presence-cta">
            <p>La atención se coordina exclusivamente por invitación o referencia. Este sitio no recibe solicitudes ni datos de contacto.</p>
          </div>
        </section>
      </main>
    </Layout>
  );
}

function ServicesPage() {
  return (
    <Layout>
      <main id="contenido" className="inner-page">
        <section className="page-hero">
          <p className="eyebrow">Servicios</p>
          <h1>Protección digital con alcance, límites y evidencia.</h1>
          <p className="page-lead">Capacidades defensivas para organizaciones y personas previamente evaluadas que necesitan reducir riesgo digital con alcance, límites y entregables documentados.</p>
        </section>
        <section className="page-content">
          <div className="page-feature-grid">
            {[
              ['Evaluación de exposición digital', 'Mapeo autorizado de información expuesta, suplantaciones, filtraciones y rutas de difusión.'],
              ['Asesoría en gestión de incidentes', 'Triage, priorización, preservación de evidencia y coordinación con responsables jurídicos y técnicos.'],
              ['Diseño de políticas y controles', 'Reglas operativas para reducir exposición, ordenar decisiones y documentar responsabilidades.'],
              ['Capacitación en seguridad y protección digital', 'Formación ajustada al perfil de riesgo de figuras públicas, equipos y organizaciones.']
            ].map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{body}</p></article>)}
          </div>
          <div className="service-detail-grid">
            {capabilityGroups.map(group => <article key={group.number}><p className="eyebrow">{group.label}</p><h2>{group.title}</h2><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}
          </div>
          <aside className="limits-note"><strong>Estado y límites</strong><p>Estas capacidades se implementan con alcance autorizado, evidencia conservada y revisión proporcional al riesgo. No implican certificación, afiliación o respaldo de terceros.</p></aside>
        </section>
      </main>
    </Layout>
  );
}

function StandardPage({ data }) {
  return (
    <Layout>
      <main id="contenido" className="inner-page">
        <section className="page-hero">
          <p className="eyebrow">{data.eyebrow}</p>
          <h1>{data.title}</h1>
          <p className="page-lead">{data.lead}</p>
        </section>
        <section className="page-content">
          <div className="page-feature-grid">
            {data.items.map(([title, body], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h2>{title}</h2>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <aside className="limits-note"><strong>Estado y límites</strong><p>La información de esta página describe capacidades y compromisos de trabajo. No implica certificación, afiliación o respaldo de terceros.</p></aside>
          <div className="page-next"><p>Acceso y atención únicamente mediante invitación, referencia o relación previamente autorizada.</p></div>
        </section>
      </main>
    </Layout>
  );
}

function NotFound() {
  return <Layout><main id="contenido" className="not-found"><p className="eyebrow">404</p><h1>Página no encontrada.</h1><a className="button button-gold" href="/">Volver al inicio</a></main></Layout>;
}

const path = window.location.pathname.replace(/\/$/, '') || '/';
const routeTitle = path === '/' ? 'Centro Jurídico LEVIATÁN' : path === '/servicios' ? 'Servicios' : pages[path]?.eyebrow;
document.title = routeTitle ? `${routeTitle} | LEVIATÁN` : 'Página no encontrada | LEVIATÁN';

let screen;
if (path === '/') screen = <Home />;
else if (path === '/servicios') screen = <ServicesPage />;
else if (pages[path]) screen = <StandardPage data={pages[path]} />;
else screen = <NotFound />;

createRoot(document.getElementById('root')).render(screen);

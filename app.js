const programs = [
  {
    rank: 1,
    name: "Baby Juve",
    state: "Critico",
    tone: "red",
    digital: 0,
    direct: 0,
    total: 0,
    digitalShare: "0%",
    trials: 8,
    daysSinceInstagram: "Pte.",
    analysis:
      "No registra leads en el corte de mayo, pero si aparecen pruebas. El problema principal esta en captacion digital y trazabilidad del origen.",
    posts:
      "Reel para papas: primera clase sin miedo. Carrusel de edades, horarios y beneficios. Testimonio con CTA a prueba.",
    ads:
      "Campana always-on a padres con objetivo WhatsApp/lead. Audiencias por padres con hijos pequenos, colegios y zonas cercanas.",
  },
  {
    rank: 2,
    name: "Global Soccer Academy",
    state: "Atacar",
    tone: "orange",
    digital: 1,
    direct: 46,
    total: 47,
    digitalShare: "2%",
    trials: 6,
    daysSinceInstagram: "Pte.",
    analysis:
      "Depende casi totalmente del directo. La marca necesita recuperar captacion digital por edad, sede y horario.",
    posts:
      "Reel de entrenamiento por categoria. Carrusel de sedes y horarios. Video corto de progreso de alumno.",
    ads:
      "Campanas WhatsApp por edad, sede y horario. Probar creativos separados para padres y jovenes.",
  },
  {
    rank: 3,
    name: "Juventus Academy Guatemala",
    state: "Atacar",
    tone: "orange",
    digital: 2,
    direct: 57,
    total: 59,
    digitalShare: "3%",
    trials: 10,
    daysSinceInstagram: "Pte.",
    analysis:
      "Marca fuerte, pero el motor digital esta muy por debajo del directo. Hay que convertir valor de marca en leads medibles.",
    posts:
      "Reel con metodologia Juventus. Carrusel por edades/sedes. Testimonio o antes/despues de alumno.",
    ads:
      "Retargeting a interesados e interacciones. Campana de prueba por sede con creativo institucional.",
  },
  {
    rank: 4,
    name: "Nido Aguila",
    state: "Atencion",
    tone: "yellow",
    digital: 2,
    direct: 81,
    total: 83,
    digitalShare: "2%",
    trials: 7,
    daysSinceInstagram: "Pte.",
    analysis:
      "Tiene alto volumen directo y casi nada de digital. La conversion total sigue baja, asi que necesita mejor captacion y mensaje de prueba.",
    posts:
      "Reel de entreno con energia de club. Carrusel de proceso para prueba. Post de cupos/horarios por categoria.",
    ads:
      "Escalar digital con control. Retargeting a visitantes e interacciones y campana de prueba por categoria.",
  },
  {
    rank: 5,
    name: "Centro Formacion Ser Portero",
    state: "Escalar",
    tone: "green",
    digital: 4,
    direct: 93,
    total: 97,
    digitalShare: "4%",
    trials: 2,
    daysSinceInstagram: "Pte.",
    analysis:
      "Buen desempeno general y alta conversion total, pero el volumen digital sigue bajo. Conviene escalar con control.",
    posts:
      "Reel tecnico de reflejos/atajadas. Post por nivel/edad. Video de entrenador explicando mejora especifica.",
    ads:
      "Prueba controlada de presupuesto digital con segmentacion por futbol, porteros y padres de jugadores.",
  },
  {
    rank: 6,
    name: "Global Running Academy",
    state: "Crecer",
    tone: "green",
    digital: 4,
    direct: 5,
    total: 9,
    digitalShare: "44%",
    trials: 3,
    daysSinceInstagram: "Pte.",
    analysis:
      "Bajo volumen total, pero buen balance digital y buena senal de conversion a prueba. Requiere crecer demanda.",
    posts:
      "Reel de comunidad/ruta. Post de prueba grupal gratis. Historia con encuesta sobre distancia deseada.",
    ads:
      "Anuncios locales con gancho de prueba grupal. Separar principiantes vs corredores activos.",
  },
  {
    rank: 7,
    name: "Global Basketball Academy",
    state: "Optimizar",
    tone: "blue",
    digital: 20,
    direct: 71,
    total: 91,
    digitalShare: "22%",
    trials: 5,
    daysSinceInstagram: "Pte.",
    analysis:
      "Es la que mas leads digitales genera en mayo, pero las pruebas no suben proporcionalmente. El problema es calidad y paso a prueba.",
    posts:
      "Reel de clase de prueba. Carrusel de beneficios por edad/nivel. Clip de entrenamiento con CTA a prueba.",
    ads:
      "Mantener volumen digital, sumar remarketing y ajustar copy para filtrar mejores prospectos.",
  },
];

const toneMap = {
  red: ["#f43f5e", "#fff0f2", "#9f1239"],
  orange: ["#f97316", "#fff0df", "#9a3412"],
  yellow: ["#f59e0b", "#fff8df", "#92400e"],
  green: ["#00a651", "#e6f8ef", "#065f46"],
  blue: ["#1d7cff", "#edf5ff", "#1d4ed8"],
};

function renderPrograms() {
  const list = document.querySelector("#programList");
  list.innerHTML = `
    <div class="program-header" aria-hidden="true">
      <span>Prioridad</span>
      <span>Programa</span>
      <span>Estado</span>
      <span>Dig.</span>
      <span>Dir.</span>
      <span>Total</span>
      <span>% Dig.</span>
      <span>Pruebas</span>
      <span>Dias IG</span>
      <span>Accion semanal</span>
    </div>
    ${programs
      .map((program) => {
      const [accent, tone, accentDark] = toneMap[program.tone];
      return `
        <article class="program-card" style="--accent:${accent};--tone:${tone};--accent-dark:${accentDark}">
          <div class="program-main">
            <div class="rank">${program.rank}</div>
            <div class="program-title">
              <strong>${program.name}</strong>
            </div>
            <span class="state">${program.state}</span>
            <div class="metric compact"><span>Dig.</span><strong>${program.digital}</strong></div>
            <div class="metric compact"><span>Dir.</span><strong>${program.direct}</strong></div>
            <div class="metric compact"><span>Total</span><strong>${program.total}</strong></div>
            <div class="metric compact"><span>% Dig.</span><strong>${program.digitalShare}</strong></div>
            <div class="metric compact"><span>Pruebas</span><strong>${program.trials}</strong></div>
            <div class="metric compact instagram-age"><span>Dias IG</span><strong>${program.daysSinceInstagram}</strong></div>
            <div class="action-cell">${program.state === "Critico" ? "Atacar demanda digital" : program.state === "Escalar" ? "Escalar con control" : program.state === "Optimizar" ? "Optimizar calidad" : program.state === "Crecer" ? "Crecer demanda" : "Mover pauta + contenido"}</div>
          </div>
          <div class="program-detail">
            <div class="recommendation">
              <h3>Análisis de marca</h3>
              <p>${program.analysis}</p>
            </div>
            <div class="recommendation">
              <h3>Publicaciones sugeridas</h3>
              <p>${program.posts}</p>
            </div>
            <div class="recommendation">
              <h3>Pauta recomendada</h3>
              <p>${program.ads}</p>
            </div>
          </div>
        </article>
      `;
    })
      .join("")}
  `;
}

function buildCampaign() {
  const priority = programs[0];
  const output = document.querySelector("#campaignOutput");
  const details = document.querySelector("#campaignDetails");

  details.innerHTML = `
    <div class="campaign-grid">
      <article class="campaign-item">
        <h3>Marca prioritaria</h3>
        <p>${priority.name}</p>
      </article>
      <article class="campaign-item">
        <h3>Objetivo</h3>
        <p>Generar leads digitales para clase de prueba durante la semana.</p>
      </article>
      <article class="campaign-item">
        <h3>Insight</h3>
        <p>Los padres necesitan confianza antes de llevar a sus hijos a la primera clase.</p>
      </article>
      <article class="campaign-item">
        <h3>Concepto visual</h3>
        <p>Video vertical de primer entrenamiento: bienvenida, juego guiado, entrenador cercano y cierre con niño sonriendo.</p>
      </article>
      <article class="campaign-item">
        <h3>Copys</h3>
        <ul>
          <li>Tu hijo puede probar una clase antes de inscribirse. Agenda su primera experiencia en Baby Juve.</li>
          <li>Futbol, confianza y diversion desde la primera clase. Reserva una prueba esta semana.</li>
          <li>El primer paso no tiene que dar miedo. Nosotros lo acompanamos desde la cancha.</li>
        </ul>
      </article>
      <article class="campaign-item">
        <h3>Hooks</h3>
        <ul>
          <li>Primera clase sin miedo</li>
          <li>Asi empieza un pequeno futbolista</li>
          <li>Antes de inscribirlo, deja que pruebe</li>
        </ul>
      </article>
      <article class="campaign-item">
        <h3>CTA</h3>
        <p>Agenda una clase de prueba por WhatsApp.</p>
      </article>
      <article class="campaign-item">
        <h3>Pauta</h3>
        <p>Objetivo: leads o mensajes. Audiencia: padres con hijos pequenos, zonas cercanas a sede, intereses en futbol infantil y colegios.</p>
      </article>
    </div>
  `;
  output.hidden = false;
  output.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelector("#buildCampaign").addEventListener("click", buildCampaign);
renderPrograms();

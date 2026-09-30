/** Los 6 tratamientos del alcance congelado (ficha D1, sección 3). */
export const SERVICIOS = [
  {
    slug: "higiene",
    icono: "higiene",
    titulo: "Higiene dental",
    corto: "Limpieza profesional y prevención con revisión completa en cada visita.",
    descripcion:
      "Limpieza con ultrasonidos, revisión de encías y pulido. Te llevas un plan de cuidado a tu medida y con la fecha de la siguiente revisión ya en el calendario. El punto de partida ideal cada 6–12 meses.",
  },
  {
    slug: "empastes",
    icono: "empastes",
    titulo: "Empastes y restauradores",
    corto: "Empastes del color del esmalte, incrustaciones y reconstrucciones.",
    descripcion:
      "Reparamos caries y dientes dañados con empastes estéticos del color de tu esmalte, incrustaciones y reconstrucciones. Antes de empezar conoces el presupuesto al céntimo: ni una sorpresa.",
  },
  {
    slug: "ortodoncia-invisible",
    icono: "ortodoncia",
    titulo: "Ortodoncia invisible",
    corto: "Férulas transparentes con plan 3D y seguimiento digital.",
    descripcion:
      "Estudio digital de tu boca y un plan de movimiento en 3D que ves antes de empezar. Férulas transparentes casi imposibles de notar, con revisiones cortas y seguimiento de cerca entre cita y cita.",
  },
  {
    slug: "implantes",
    icono: "implantes",
    titulo: "Implantes dentales",
    corto: "Recupera piezas perdidas con planificación 3D y cirugía minuciosa.",
    descripcion:
      "Sustituimos dientes perdidos con implantes planificados en radiografía 3D. Se sienten, muerden y se limpian como los tuyos. Si lo necesitas, hay financiación cómoda a tu ritmo.",
  },
  {
    slug: "endodoncia",
    icono: "endodoncia",
    titulo: "Endodoncia",
    corto: "Tratamos el nervio del diente para salvarlo y quitar el dolor.",
    descripcion:
      "Cuando la caries llega al nervio, el tratamiento de conducto salva la pieza natural: desinfectamos el conducto, lo sellamos y restauramos la corona. Todo con anestesia local y sin dolor.",
  },
  {
    slug: "odontopediatria",
    icono: "odontopediatria",
    titulo: "Odontopediatría",
    corto: "Cuidado amable de los dientes de los más pequeños, desde la primera visita.",
    descripcion:
      "Primera revisión sin prisa, sellado de fisuras y fluorización, con técnica de cepillado incluida. El objetivo: que venir al dentista sea un trámite normal (y hasta agradable) desde los 3 años.",
  },
] as const;

export type Servicio = (typeof SERVICIOS)[number];
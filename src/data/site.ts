/**
 * Datos de la clínica — TODO lo que cambia de un cliente a otro vive aquí.
 * Negocio 100% FICTICIO (demo D1). La URL se actualiza tras crear el sitio en Netlify.
 */
export const SITE = {
  name: "Clínica Dental Serrano",
  corto: "Dental Serrano",
  url: "https://d1-clinica-serrano.netlify.app", // ← renombrar/editar tras el deploy
  ogImage: "/images/og-clinica-serrano.jpg",
  direccion: {
    calle: "Calle del Rosario, 14", // ficticia
    cp: "02001",
    ciudad: "Albacete",
    provincia: "Albacete",
  },
  geo: { lat: 38.9943, lng: -1.8585 },
  telefono: "+34 967 123 456", // ficticio
  telefonoHref: "+34967123456",
  horario: [
    { dias: "Lunes a viernes", horas: "9:00 – 14:00 · 16:00 – 20:00" },
    { dias: "Sábados", horas: "9:30 – 13:30" },
    { dias: "Domingos", horas: "Cerrado" },
  ],
};

export const NAV = [
  { href: "/", texto: "Inicio" },
  { href: "/servicios/", texto: "Servicios" },
  { href: "/la-clinica/", texto: "La clínica" },
  { href: "/contacto/", texto: "Contacto" },
];

export const HORARIO_JSONLD = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "14:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "16:00",
    closes: "20:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Saturday",
    opens: "09:30",
    closes: "13:30",
  },
];
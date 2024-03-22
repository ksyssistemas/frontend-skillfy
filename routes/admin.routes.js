// /*!

// =========================================================
// * NextJS Argon Dashboard PRO - v1.1.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/nextjs-argon-dashboard-pro
// * Copyright 2021 Creative Tim (https://www.creative-tim.com)

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */

const routes = [
  {
    collapse: true,
    name: "Dashboard",
    icon: "ni ni-tv-2",
    state: "examplesCollapse",
    views: [
      {
        path: "/admin",
        name: "Administrador",
        miniName: "A",
        layout: "/dashboard",
      },
    ],
  },
  {
    collapse: true,
    name: "Registros",
    icon: "ni ni-archive-2",
    state: "examplesCollapse",
    views: [
      {
        path: "/admin",
        name: "Administradores",
        miniName: "A",
        layout: "/records",
      },
      {
        path: "/customers",
        name: "Clientes",
        miniName: "C",
        layout: "/records",
      },
      {
        path: "/contact-persons",
        name: "Contatos",
        miniName: "A",
        layout: "/records",
      },
      {
        path: "/employees",
        name: "Colaboradores",
        miniName: "C",
        layout: "/records",
      },
      {
        path: "/plans",
        name: "Planos",
        miniName: "A",
        layout: "/records",
      },
    ],
  },
  {
    collapse: true,
    name: "Cadastros",
    icon: "ni ni-single-copy-04",
    state: "dashboardsCollapse",
    views: [
      {
        path: "/admin",
        name: "Administradores",
        miniName: "A",
        layout: "/register",
      },
      {
        path: "/public-entity",
        name: "Entidades Públicas",
        miniName: "E",
        layout: "/register",
      },
      {
        path: "/public-bodies",
        name: "Órgãos Públicos",
        miniName: "O",
        layout: "/register",
      },
      {
        path: "/public-agents",
        name: "Agentes Públicos",
        miniName: "A",
        layout: "/register",
      },
      {
        path: "/departments",
        name: "Departamentos",
        miniName: "D",
        layout: "/register",
      },
      {
        path: "/roles",
        name: "Cargos",
        miniName: "C",
        layout: "/register",
      },
      {
        path: "/employees",
        name: "Colaboradores",
        miniName: "C",
        layout: "/register",
      },
      {
        path: "/plans",
        name: "Plano",
        miniName: "P",
        layout: "/register",
      },
    ],
  },
];

export default routes;

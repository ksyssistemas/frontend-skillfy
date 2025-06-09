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
    state: "dashboardCollapse",
    views: [
      {
        path: "/admin",
        name: "Administrador",
        miniName: "A",
        layout: "/dashboard",
      }
    ],
  },
  {
    collapse: true,
    name: "Registros e Cadastros",
    icon: "ni ni-archive-2",
    state: "recordsCollapse",
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
      name: "Avaliações",
      icon: "ni ni-paper-diploma",
      state: "appraisalsCollapse",
      views: [
        {
          path: "/appraisal-settings",
          name: "Configurar",
          miniName: "C",
          layout: "/performance",
        },
],
    },
    {
    collapse: true,
    name: "Exemplos",
    icon: "ni ni-ungroup text-orange",
    state: "examplesCollapse",
    views: [
      {
        path: "/pricing",
        name: "Preços",
        miniName: "P",
        layout: "/auth",
      },
      {
        path: "/timeline",
        name: "Timeline",
        miniName: "T",
        layout: "/admin",
      },
      ],
  },
   {
    path: "/widgets",
    name: "Ferramentas",
    icon: "ni ni-archive-2 text-green",
    layout: "/admin",
  },
  {
    path: "/charts",
    name: "Gráficos",
    icon: "ni ni-chart-pie-35 text-info",
    layout: "/admin",
  },
  {
    path: "/calendar",
    name: "Calendário",
    icon: "ni ni-calendar-grid-58 text-red",
    layout: "/admin",
  },
]

export default routes;

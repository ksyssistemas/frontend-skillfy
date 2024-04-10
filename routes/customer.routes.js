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
    icon: "ni ni-tv-2 text-white",
    state: "examplesCollapse",
    views: [
      {
        path: "/client",
        name: "Nome Cliente",
        miniName: "A",
        layout: "/dashboard",
      }
    ],
  },
    {
      collapse: true,
      name: "Registros e Cadastros",
      icon: "ni ni-archive-2 text-white",
      state: "examplesCollapse",
      views: [
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
          path: "/employees",
          name: "Colaboradores",
          miniName: "C",
          layout: "/report",
        },
      ],
    },
    // {
    //   collapse: true,
    //   name: "Cadastro",
    //   icon: "ni ni-single-copy-04 text-white",
    //   state: "dashboardsCollapse",
    //   views: [
    //     // {
    //     //   path: "/admin",
    //     //   name: "Administrador",
    //     //   miniName: "A",
    //     //   layout: "/register",
    //     // },
    //     // {
    //     //   path: "/plans",
    //     //   name: "Plano",
    //     //   miniName: "P",
    //     //   layout: "/register",
    //     // },
    //     {
    //       path: "/departments",
    //       name: "Departamentos",
    //       miniName: "D",
    //       layout: "/register",
    //     },
    //     {
    //       path: "/roles",
    //       name: "Cargos",
    //       miniName: "C",
    //       layout: "/register",
    //     },
    //     {
    //       path: "/employees",
    //       name: "Colaboradores",
    //       miniName: "C",
    //       layout: "/register",
    //     },
    //   ],
    // },
    {
        collapse: true,
        name: "Desempenho",
        icon: "ni ni-paper-diploma text-white",
        state: "appraisalsCollapse",
        views: [
          {
            path: "/appraisal-cycle-list",
            name: "Avaliações",
            miniName: "A",
            layout: "/performance",
          },
          // {
          //   path: "/add-appraisal",
          //   name: "Adicionar Avaliação",
          //   miniName: "AD",
          //   layout: "/performance",
          // },
        ],
      },
]

export default routes;
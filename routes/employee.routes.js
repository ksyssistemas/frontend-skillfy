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
    name: "Você",
    icon: "ni ni-archive-2",
    state: "youCollapse",
    views: [
      {
        path: "/profile",
        name: "Perfil",
        miniName: "P",
        layout: "/employee",
      },
      {
        path: "/social-network",
        name: "Rede",
        miniName: "R",
        layout: "/employee",
      },
      // {
      //   path: "/absence-record",
      //   name: "Ausências",
      //   miniName: "A",
      //   layout: "/employee",
      // },
      {
        path: "/tasks",
        name: "Tarefas",
        miniName: "T",
        layout: "/employee",
      },
    ],
  },
  // {
  //   collapse: true,
  //   name: "Cadastro",
  //   icon: "ni ni-single-copy-04 text-blue",
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
    name: "Avaliações",
    icon: "ni ni-paper-diploma",
    state: "appraisalsCollapse",
    views: [
      // {
        // collapse: true,
        // name: "Avaliações",
        // miniName: "A",
        // state: "appraisalCollapse",
        // views: [
          {
            path: "/add-appraisals-skills-list",
            name: "Realizar",
            miniName: "R",
            layout: "/performance",
          },
          {
            path: "/appraisal-result",
            name: "Resultados",
            miniName: "R",
            layout: "/performance",
          },
        // ],
      // },
    ],
  },
  {
    collapse: true,
    name: "PDI",
    icon: "ni ni-chart-bar-32",
    state: "pdiCollapse",
    views: [
      {
        path: "/dashboard-pdi",
        name: "Dashboard",
        miniName: "D",
        layout: "/pdi",
      },
    ],
  },
];

export default routes;

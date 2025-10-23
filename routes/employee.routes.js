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
  {
    collapse: true,
    name: "Avaliações",
    icon: "ni ni-paper-diploma",
    state: "appraisalsCollapse",
    views: [
          {
            path: "/add-appraisals-skills-list",
            name: "Realizar",
            miniName: "R",
            layout: "/performance",
          },
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

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
      icon: "ni ni-tv-2 text-black",
      state: "examplesCollapse",
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
      name: "Registros",
      icon: "ni ni-archive-2 text-orange",
      state: "examplesCollapse",
      views: [
        {
          path: "/admin",
          name: "Administradores",
          miniName: "A",
          layout: "/report",
        },
        {
          path: "/client",
          name: "Cliente",
          miniName: "C",
          layout: "/report",
        },
        {
          path: "/contact-persons",
          name: "Contatos",
          miniName: "A",
          layout: "/report",
        },
        {
          path: "/employees",
          name: "Colaboradores",
          miniName: "C",
          layout: "/report",
        },
        {
          path: "/plans",
          name: "Planos",
          miniName: "A",
          layout: "/report",
        },
      ],
    },
    {
      collapse: true,
      name: "Cadastros",
      icon: "ni ni-single-copy-04 text-blue",
      state: "dashboardsCollapse",
      views: [
        {
          path: "/admin",
          name: "Administrador",
          miniName: "A",
          layout: "/register",
        },
        {
          path: "/plans",
          name: "Plano",
          miniName: "P",
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
      ],
    },
]

export default routes;
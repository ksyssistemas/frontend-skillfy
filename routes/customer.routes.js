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

import { useAuth } from '../hooks/useAuth';

const routes = () => {
  const { authenticationDataLoggedInUser } = useAuth();

  let companyName = authenticationDataLoggedInUser?.data?.companyName || "Seu Dashboard";
  const sector = authenticationDataLoggedInUser?.data?.sector;

  // Definições condicionais conforme o setor
  const isPublicSector = sector === "publico";

  const departmentsName = isPublicSector ? "Órgãos Públicos" : "Departamentos";
  const employeesName = isPublicSector ? "Agentes Públicos" : "Colaboradores";
  const departmentsPath = "/departments";
  const employeesPath = "/employees";

  const departmentsMiniName = isPublicSector ? "O" : "D";
  const employeesMiniName = isPublicSector ? "A" : "C";

  return [
    {
      collapse: true,
      name: companyName,
      icon: "ni ni-tv-2",
      state: "dashboardCollapse",
      views: [
        {
          path: "/customer",
          name: "Painel",
          miniName: "P",
          layout: "/dashboard",
        }
      ],
    },
    {
      collapse: true,
      name: "Registros",
      icon: "ni ni-archive-2",
      state: "records&RegisterCollapse",
      views: [
        {
          path: departmentsPath,
          name: departmentsName,
          miniName: departmentsMiniName,
          layout: "/records",
        },
        {
          path: "/roles",
          name: "Cargos e Funçôes",
          miniName: "C",
          layout: "/records",
        },
        {
          path: employeesPath,
          name: employeesName,
          miniName: employeesMiniName,
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
          path: "/appraisals",
          name: "Criar",
          miniName: "C",
          layout: "/performance",
        },
        {
          path: "/appraisal-settings",
          name: "Configurar",
          miniName: "C",
          layout: "/performance",
        },
        // {
        //   path: "/add-appraisals-skills-list",
        //   name: "Realizar",
        //   miniName: "R",
        //   layout: "/performance",
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
          name: "Painel",
          miniName: "P",
          layout: "/pdi",
        },
        {
          path: "/add-pdi",
          name: "Criar",
          miniName: "C",
          layout: "/pdi",
        },
        {
          path: "/competencies-pdi",
          name: "Ações",
          miniName: "A",
          layout: "/pdi",
        },
      ]
    },
  ]
}

export default routes;
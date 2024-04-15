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

  // Defina os valores padrão para 'name' e 'path'
  let departmentsName = authenticationDataLoggedInUser &&
    authenticationDataLoggedInUser.sector === "publico" ?
    "Órgãos Públicos" : "Departamentos";
  let employeesName = authenticationDataLoggedInUser &&
    authenticationDataLoggedInUser.sector === "publico" ?
    "Agentes Públicos" : "Colaboradores";
  let departmentsPath = "/departments";
  let employeesPath = "/employees";

  // Se authenticationDataLoggedInUser não está disponível ou se o setor não está definido, mantenha os valores padrão
  if (!authenticationDataLoggedInUser || !authenticationDataLoggedInUser.data.sector) {
    departmentsName = "Departamentos";
    employeesName = "Colaboradores";
  }

  // Defina os valores padrão para 'miniName'
  let departmentsMiniName = authenticationDataLoggedInUser &&
    authenticationDataLoggedInUser.sector === "publico" ? "O" : "D";
  let employeesMiniName = authenticationDataLoggedInUser &&
    authenticationDataLoggedInUser.sector === "publico" ? "A" : "C";

  // Se authenticationDataLoggedInUser não está disponível ou se o setor não está definido, mantenha os valores padrão
  if (!authenticationDataLoggedInUser || !authenticationDataLoggedInUser.data.sector) {
    departmentsMiniName = "D";
    employeesMiniName = "C";
  }

  return [
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
          path: departmentsPath,
          name: departmentsName,
          miniName: departmentsMiniName,
          layout: "/records",
        },
        {
          path: employeesPath,
          name: employeesName,
          miniName: employeesMiniName,
          layout: "/records",
        },
        {
          path: "/roles",
          name: "Cargos",
          miniName: "C",
          layout: "/records",
        },
      ],
    },
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
}

export default routes;
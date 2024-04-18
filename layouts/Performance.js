/*!

=========================================================
* NextJS Argon Dashboard PRO - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-argon-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { withRouter } from "next/router";
// core components
import PerformanceNavbar from "components/Navbars/PerformanceNavbar.js";
import PerformanceFooter from "components/Footers/PerformanceFooter.js";
import SidebarCustomer from "components/Sidebar/SidebarCustomer";
import routes from "../routes/customer.routes";
// import routes from "routes.js";

function Performance({ router, children }) {
  const [sidenavOpen, setSidenavOpen] = React.useState(true);

  const routesCustomer = routes();

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/performance") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routesCustomer.length; i++) {
      if (router.pathname.indexOf(routesCustomer[i].layout + routesCustomer[i].path) !== -1) {
        return routesCustomer[i].name;
      }
    }
    return "Brand";
  };

  // toggles collapse between mini sidenav and normal
  const toggleSidenav = (e) => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
    }
    setSidenavOpen(!sidenavOpen);
  };

  const getNavbarTheme = () => {
    return router.pathname.indexOf("Performance/alternative-dashboard") === -1
      ? "dark"
      : "light";
  };

  return (
    <>
      <SidebarCustomer
        routes={routesCustomer}
        toggleSidenav={toggleSidenav}
        sidenavOpen={sidenavOpen}
        logo={{
          innerLink: "/",
          imgSrc: require("assets/img/brand/nextjs_argon_black.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content">
        <PerformanceNavbar
          theme={getNavbarTheme()}
          toggleSidenav={toggleSidenav}
          sidenavOpen={sidenavOpen}
          brandText={getBrandText(router.pathname)}
        />
        {children}
        <PerformanceFooter />
      </div>
      {sidenavOpen ? (
        <div className="backdrop d-xl-none" onClick={toggleSidenav} />
      ) : null}
    </>
  );
}

export default withRouter(Performance);

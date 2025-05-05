
import React from "react";
import { withRouter } from "next/router";
import Sidebar from "components/Sidebar/SidebarEmployee.js";
import "assets/css/styles/layoutspage.css";
import routes from "routes/employee.routes";
import EmployeeNavbar from "../components/Navbars/EmployeeNavbar";
import EmployeeFooter from "../components/Footers/EmployeeFooter";
import SidebarEmployee from "../components/Sidebar/SidebarEmployee";

function Employee({ router, children }) {
  const [sidenavOpen, setSidenavOpen] = React.useState(true);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/register") {
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
    for (let i = 0; i < routes.length; i++) {
      if (router.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
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
    return router.pathname.indexOf("admin/alternative-dashboard") === -1
      ? "dark"
      : "light";
  };
  return (
    <>
      <SidebarEmployee
        routes={routes}
        toggleSidenav={toggleSidenav}
        sidenavOpen={sidenavOpen}
        logo={{
          innerLink: "/",
          imgSrc: require("assets/img/brand/skillfy-logo-white.png"),
          imgAlt: "...",
        }}
      />

      <div className="main-content">
        <EmployeeNavbar
          theme={getNavbarTheme()}
          toggleSidenav={toggleSidenav}
          sidenavOpen={sidenavOpen}
          brandText={getBrandText(router.pathname)}
        />
        <main>
          {children}
        </main>
        <EmployeeFooter />
      </div>
      {sidenavOpen ? (
        <div className="backdrop d-xl-none" onClick={toggleSidenav} />
      ) : null}
    </>
  );
}

export default withRouter(Employee);

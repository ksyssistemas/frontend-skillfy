import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import PageChange from "components/PageChange/PageChange.js";

// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "@fullcalendar/common/main.min.css";
import "@fullcalendar/daygrid/main.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "select2/dist/css/select2.min.css";
import "quill/dist/quill.core.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// plugins styles downloaded
import "assets/vendor/nucleo/css/nucleo.css";
// core styles
import "assets/scss/nextjs-argon-dashboard-pro.scss?v1.1.0";
import { AuthProvider } from "../contexts/AuthContext";
import { AlertProvider } from "../contexts/AlertContext";
import { AppraisalCycleProvider } from "../contexts/PerformanceContext/CycleContext";
import { SweetAlertProvider } from "../contexts/SweetAlertContext";
import { AppraisalSkillsProvider } from "../contexts/PerformanceContext/AppraisalSkillsContext";
import { AdminProvider } from "../contexts/RecordsContext/AdminContext";
import { CustomerProvider } from "../contexts/RecordsContext/CustomerContext";
import { ContactPersonProvider } from "../contexts/RecordsContext/ContactPersonContext";
import { DepartmentProvider } from "../contexts/RecordsContext/DepartmentContext";
import { EmployeeFunctionProvider } from "../contexts/RecordsContext/EmployeeFunctionContext";
import { RoleProvider } from "../contexts/RecordsContext/RoleContext";
import { EmployeeProvider } from "../contexts/RecordsContext/EmployeeContext";
import { AppraisalEvidencesProvider } from "../contexts/PerformanceContext/AppraisalEvidencesContext";
import { AppraisalCaptionsProvider } from "../contexts/PerformanceContext/AprraisalCaptionsContext";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
  componentDidMount() {
    let comment = document.createComment(`

=========================================================
* * NextJS Argon Dashboard PRO v1.1.0 based on Argon Dashboard PRO React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-argon-dashboard-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

`);
    document.insertBefore(comment, document.documentElement);
  }
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment>
        <AuthProvider>
          <AlertProvider>
            <AdminProvider>
              <CustomerProvider>
                <ContactPersonProvider>
                  <DepartmentProvider>
                    <RoleProvider>
                      <EmployeeFunctionProvider>
                        <EmployeeProvider>
                          <AppraisalCycleProvider>
                            <SweetAlertProvider>
                              <AppraisalSkillsProvider>
                                <AppraisalEvidencesProvider>
                                  <AppraisalCaptionsProvider>
                                    <Head>
                                      <meta
                                        name="viewport"
                                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                                      />
                                      <title>SkillFy</title>
                                      {/* <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script> */}
                                    </Head>
                                    <Layout>
                                      <Component {...pageProps} />
                                    </Layout>
                                  </AppraisalCaptionsProvider>
                                </AppraisalEvidencesProvider>
                              </AppraisalSkillsProvider>
                            </SweetAlertProvider>
                          </AppraisalCycleProvider>
                        </EmployeeProvider>
                      </EmployeeFunctionProvider>
                    </RoleProvider>
                  </DepartmentProvider>
                </ContactPersonProvider>
              </CustomerProvider>
            </AdminProvider>
          </AlertProvider>
        </AuthProvider>
      </React.Fragment >
    );
  }
}

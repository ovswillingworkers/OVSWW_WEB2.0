"use client";
import "./globals.css";
import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <section className="footer">
      <div className="Footer">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h1 className="text-uppercase fw-bold mb-4">
                <i className="me-3 fas fa-gem" />
                Willing Workers
              </h1>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h3 className="text-uppercase fw-bold mb-4">
                Do you have Questions? Call or visit us.
              </h3>

              <p>
                <i className="me-3 fas fa-phone" /> Phone: (323) 937-5950{" "}
                <br></br>
                <i className="me-3 fas fa-fax" /> Fax: + 01 234 567 89
              </p>

              <p>
                <i className="me-2 fas fa-home" />
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURI(
                    "4813 W. Washington Blvd., Los Angeles, Los Angeles 90016"
                  )}`}
                  target="_blank"
                >
                  4813 W. Washington Blvd.<br></br>
                  Los Angeles , Los Angeles 90016
                </a>
              </p>
              <p>
                <i className="me-4 fas fa-envelope" />
                info@willingworkers.com
              </p>
            </div>
          </div>
        </div>
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © {new Date().getFullYear()} Willing Workers. All rights reserved.
        </div>
      </div>
    </section>
  );
};

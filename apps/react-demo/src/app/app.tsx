import { GoAAppHeader, GoAMicrositeHeader } from "@abgov/react-components";
import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import "../styles.scss";

export default function App() {
  return (
    <>
      <GoAMicrositeHeader type="alpha" version="UAT"></GoAMicrositeHeader>

      <GoAAppHeader url="#" heading="Design Systems"></GoAAppHeader>

      <div className="container">
        <div className="navigation-bar">
          <nav>
            <Link className="navigation-link" to="/pagination">
              Pagination
            </Link>
            <Link className="navigation-link" to="/app-footer">
              AppFooter
            </Link>
            <Link className="navigation-link" to="/app-header">
              App Header
            </Link>
            <Link className="navigation-link" to="/badge">
              Badge
            </Link>
            <Link className="navigation-link" to="/button">
              Button
            </Link>
            <Link className="navigation-link" to="/button-group">
              Button Group
            </Link>
            <Link className="navigation-link" to="/callout">
              Callout
            </Link>
            <Link className="navigation-link" to="/checkbox">
              Checkbox
            </Link>
            <Link className="navigation-link" to="/chip">
              Chip
            </Link>
            <Link className="navigation-link" to="/circular-progress">
              Circular Progress
            </Link>
            <Link className="navigation-link" to="/container">
              Container
            </Link>
            <Link className="navigation-link" to="/divider">
              Divider
            </Link>
            <Link className="navigation-link" to="/dropdown">
              Dropdown
            </Link>
            <Link className="navigation-link" to="/form-item">
              Form Item
            </Link>
            <Link className="navigation-link" to="/hero-banner">
              Hero Banner
            </Link>
            <Link className="navigation-link" to="/icon-button">
              Icon Button
            </Link>
            <Link className="navigation-link" to="/input">
              Input
            </Link>
            <Link className="navigation-link" to="/microsite-header">
              Microsite header
            </Link>
            <Link className="navigation-link" to="/modal">
              Modal
            </Link>
            <Link className="navigation-link" to="/notification-banner">
              Notification Banner
            </Link>
            <Link className="navigation-link" to="/radio">
              Radio
            </Link>
            <Link className="navigation-link" to="/skeleton">
              Skeleton
            </Link>
            <Link className="navigation-link" to="/table">
              Table
            </Link>
            <Link className="navigation-link" to="/textarea">
              TextArea
            </Link>
          </nav>
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

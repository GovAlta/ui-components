import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./app/app";
import AppFooter from "./routes/appFooter";
import AppHeader from "./routes/appHeader";
import Badge from "./routes/badge";
import Button from "./routes/button";
import ButtonGroup from "./routes/buttonGroup";
import Callout from "./routes/callout";
import Checkbox from "./routes/checkbox";
import Chip from "./routes/chip";
import CircularProgress from "./routes/circularProgress";
import Container from "./routes/container";
import Divider from "./routes/divider";
import Dropdown from "./routes/dropdown";
import FormItem from "./routes/formItem";
import HeroBanner from "./routes/heroBanner";
import IconButton from "./routes/iconButton";
import Input from "./routes/input";
import MicrositeHeader from "./routes/micrositeHeader";
import Modal from "./routes/modal";
import NotificationBanner from "./routes/notificationBanner";
import Radio from "./routes/radio";
import Skeleton from "./routes/skeleton";
import Table from "./routes/table";
import TextArea from "./routes/textarea";
import Pagination from "./routes/pagination";

import "@abgov/web-components/index.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="pagination" element={<Pagination />} />
        <Route path="app-footer" element={<AppFooter />} />
        <Route path="app-header" element={<AppHeader />} />
        <Route path="badge" element={<Badge />} />
        <Route path="button" element={<Button />} />
        <Route path="button-group" element={<ButtonGroup />} />
        <Route path="callout" element={<Callout />} />
        <Route path="checkbox" element={<Checkbox />} />
        <Route path="chip" element={<Chip />} />
        <Route path="circular-progress" element={<CircularProgress />} />
        <Route path="container" element={<Container />} />
        <Route path="divider" element={<Divider />} />
        <Route path="dropdown" element={<Dropdown />} />
        <Route path="form-item" element={<FormItem />} />
        <Route path="hero-banner" element={<HeroBanner />} />
        <Route path="icon-button" element={<IconButton />} />
        <Route path="input" element={<Input />} />
        <Route path="microsite-header" element={<MicrositeHeader />} />
        <Route path="modal" element={<Modal />} />
        <Route path="notification-banner" element={<NotificationBanner />} />
        <Route path="radio" element={<Radio />} />
        <Route path="skeleton" element={<Skeleton />} />
        <Route path="table" element={<Table />} />
        <Route path="textarea" element={<TextArea />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);

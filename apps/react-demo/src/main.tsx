import { StrictMode } from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./app/app";
import Button from "./routes/button";
import Checkbox from "./routes/checkbox";
import Radio from "./routes/radio";
import Dropdown from "./routes/dropdown";
import Input from "./routes/input";
import TextArea from "./routes/textarea";
import Modal from "./routes/modal";
import AppFooter from "./routes/appFooter";
import Badge from "./routes/badge";
import Callout from "./routes/callout";
import Chip from "./routes/chip";
import CircularProgress from "./routes/circularProgress";
import HeroBanner from "./routes/heroBanner";
import AppHeader from "./routes/appHeader";
import MicrositeHeader from "./routes/micrositeHeader";
import Container from "./routes/container";
import Skeleton from "./routes/skeleton";
import FormItem from "./routes/formItem";
import IconButton from "./routes/iconButton";

import "@abgov/styles";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="button" element={<Button />} />
        <Route path="checkbox" element={<Checkbox />} />
        <Route path="radio" element={<Radio />} />
        <Route path="dropdown" element={<Dropdown />} />
        <Route path="input" element={<Input />} />
        <Route path="textarea" element={<TextArea />} />
        <Route path="modal" element={<Modal />} />
        <Route path="app-footer" element={<AppFooter />} />
        <Route path="badge" element={<Badge />} />
        <Route path="callout" element={<Callout />} />
        <Route path="chip" element={<Chip />} />
        <Route path="circular-progress" element={<CircularProgress />} />
        <Route path="hero-banner" element={<HeroBanner />} />
        <Route path="app-header" element={<AppHeader />} />
        <Route path="microsite-header" element={<MicrositeHeader />} />
        <Route path="container" element={<Container />} />
        <Route path="skeleton" element={<Skeleton />} />
        <Route path="form-item" element={<FormItem />} />
        <Route path="icon-button" element={<IconButton />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);

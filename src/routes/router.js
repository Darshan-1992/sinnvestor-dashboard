import { Routes, Route } from "react-router-dom";
import Layout from "layout/Layout";
import ProfileData from "pages/profile-data/profile-data";
import Opportunities from "pages/opportunities/opportunities";
import Portfolio from "pages/portfolio/portfolio";
import Postbox from "pages/postbox/postbox";
import PostboxCreate from "pages/postbox/create";
import PostboxConversion from "pages/postbox/conversion";
import Home from "pages/home/home";

const Router = () => {
  return (
    <Routes>
    <Route path="/home" element={<Home url="https://www.sinnvestment.eu/" />}  />
        <Route path="/" element={<Layout />}>
            <Route index element={<ProfileData />} />
            <Route path="/opportunities" element={<Opportunities   />} />
            <Route path="/opportunities/:tabs" element={<Opportunities   />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/postbox" element={<Postbox />} />
            <Route path="/postbox/create" element={<PostboxCreate />} />
            <Route path="/postbox/conversion/:id" element={<PostboxConversion />} />
        </Route>
      </Routes>
  );
}

export default Router;

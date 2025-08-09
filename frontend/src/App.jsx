import "./App.css";
import Header from "./components/components1/Header";
import Footer from "./components/components1/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProfileDetails from "./pages/ProfileDetails";
import AllProfiles from "./pages/AllProfiles";


function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 dark:bg-zinc-800">
      <Header />

      <main className="flex-1 px-4 py-6 max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/profile/:id" element={<ProfileDetails />} />
          <Route path="/profiles" element={<AllProfiles />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

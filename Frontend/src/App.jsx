import React from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import { PathContextProvider } from "./components/Home/PathContext";

function App() {
  return (
    <>
      <PathContextProvider>
        <Header />

        <main>
          <Home />
        </main>

        <Footer />
      </PathContextProvider>
    </>
  );
}

export default App;

import "./App.css";
import FirebaseOffscreen from "@/components/FirebaseOffscreen.jsx";
import Nav from "@/components/Nav.jsx";
import { ThemeProvider } from "@/components/ui/theme-provider.tsx";
import { Toaster } from "sonner";
import HomePage from "@/pages/HomePage.jsx";

function App() {
    return (
      <ThemeProvider>
          <Nav />
          <FirebaseOffscreen />
          <Toaster />
          <div className={"m-5"}>
              <HomePage />
          </div>
      </ThemeProvider>
    );
}

export default App;

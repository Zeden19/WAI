import "./App.css";
import FirebaseOffscreen from "@/components/FirebaseOffscreen.jsx";
import Nav from "@/components/Nav.jsx";
import { ThemeProvider } from "@/components/ui/theme-provider.jsx";
import { Toaster } from "sonner";

function App() {
    return (
      <ThemeProvider>
          <Nav/>
          <FirebaseOffscreen />
          <Toaster/>
      </ThemeProvider>
    );
}

export default App;

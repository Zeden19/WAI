import "./App.css";
import FirebaseOffscreen from "@/components/FirebaseOffscreen.jsx";
import { ThemeProvider } from "@/components/ui/theme-provider.jsx";
import { Toaster } from "sonner";

function App({ children }) {
    return (
      <ThemeProvider>
          <FirebaseOffscreen />
          <Toaster />
          {children}
      </ThemeProvider>
    );
}

export default App;

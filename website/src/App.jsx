import "./App.css";
import FirebaseOffscreen from "@/components/FirebaseOffscreen.jsx";
import { Button } from "@/components/ui/button.jsx";
import Nav from "@/components/Nav.jsx";
import { ThemeProvider } from "@/components/ui/theme-provider.jsx";

function App() {
    return (
      <ThemeProvider>
          <Nav/>
          <FirebaseOffscreen />
          <Button></Button>
      </ThemeProvider>
    );
}

export default App;

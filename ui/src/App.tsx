import React from "react";
import { Container, Box } from "@mui/material";
import { AppProvider } from "@/context";
import { 
  AppHeader, 
  MainContent, 
  ConnectedCityForm, 
  Notifications 
} from "@/components";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <AppHeader />
          <MainContent />
          <ConnectedCityForm />
          <Notifications />
        </Box>
      </Container>
    </AppProvider>
  );
};

export default App;

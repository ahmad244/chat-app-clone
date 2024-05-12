import React from "react";

import { Providers } from "./Providers";
import { RoutesComponent } from "./Routes";
import { SocketProvider } from "../contexts/SocketProvider";

function App() {
  return (
    <Providers>
      <SocketProvider >
        <RoutesComponent />
      </SocketProvider>
    </Providers>
  );
}

export default App;

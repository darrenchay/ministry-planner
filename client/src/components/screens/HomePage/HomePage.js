import React from "react";
import { Box } from "grommet";

export default function HomePage() {
  return (
    <div>
      <Box
        gridArea="main"
        direction="row"
        pad="medium"
        width={{
          max: "1200px",
        }}
        style={{ margin: "auto", marginTop: 50 }}
      >
          <p>HOME PAGE</p>
      </Box>
    </div>
  );
}
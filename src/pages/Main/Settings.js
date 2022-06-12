import React from "react";
import { Grid, Card, Container } from "@mui/material";

const Settings = () => {
  return (
    <Container maxWidth="sm" className="auth-layout">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card
            sx={{
              height: 200,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1 style={{ textAlign: "center" }}>Settings</h1>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;

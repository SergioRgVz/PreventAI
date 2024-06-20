import React from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

const ResumenFactores = ({ title, selectedFactors, allFactors }) => {
  const selectedFactorsList = allFactors.filter((factor) =>
    selectedFactors.includes(factor.ID)
  );

  return (
    <div>
      <Typography variant="h6">{title}</Typography>
      <List>
        {selectedFactorsList.map((factor) => (
          <ListItem key={factor.ID}>
            <ListItemText primary={factor.Nombre} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ResumenFactores;

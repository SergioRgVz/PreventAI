import { FormControlLabel, Checkbox, FormGroup, Typography } from "@mui/material";

const FactoresCheckList = ({ title, factors, selectedFactors = [], handleFactorChange }) => {
  return (
    <div>
      <Typography variant="h6">{title}</Typography>
      <FormGroup>
        {factors.map((factor) => (
          <FormControlLabel
            key={factor.ID}
            control={
              <Checkbox
                checked={selectedFactors.includes(factor.ID)}
                onChange={() => handleFactorChange(factor.ID)}
                name={factor.Nombre}
              />
            }
            label={factor.Nombre}
            style={{ textAlign: "left" }}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default FactoresCheckList;

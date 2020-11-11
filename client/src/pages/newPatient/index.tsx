import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export const NewPatientPage = () => {
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [householdNum, setHouseholdNum] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [estimatedAge, setEstimatedAge] = useState('');
  const [isExactDOB, setIsExactDOB] = useState(true);
  const [zone, setZone] = useState('');
  const [village, setVillage] = useState('');
  const [gender, setGender] = useState('male');
  const [pregnant, setPregnant] = useState(false);
  const [gestationalAge, setGestationalAge] = useState('');
  const [gestationalAgeUnit, setGestationalAgeUnit] = useState('');
  const [drugHistory, setDrugHistory] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');

  return (
    <>
      <h1>New Patient</h1>
      <Paper>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                required
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Patient Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Household Number"
                value={householdNum}
                onChange={(e) => setHouseholdNum(e.target.value)}
              />
            </Grid>
            <Grid item md={4}>
              <ToggleButtonGroup
                exclusive
                size="large"
                value={isExactDOB}
                onChange={(_, newVal) => setIsExactDOB(newVal)}>
                <ToggleButton value={true}>Date of Birth</ToggleButton>
                <ToggleButton value={false}>Estimated Age</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item md={4}>
              {isExactDOB ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  type="date"
                  label="Date of Birth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              ) : (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Patient Age"
                  type="number"
                  value={estimatedAge}
                  onChange={(e) => setEstimatedAge(e.target.value)}
                />
              )}
            </Grid>
            <Grid item md={2}>
              <TextField
                fullWidth
                variant="outlined"
                label="Zone"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                fullWidth
                variant="outlined"
                label="Village"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                required={true}
              />
            </Grid>
            <Grid item md={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Gender</InputLabel>
                <Select
                  fullWidth
                  label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as string)}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={pregnant}
                    onChange={(e) => setPregnant(e.target.checked)}
                    color="primary"
                    disabled={gender !== 'female'}
                  />
                }
                label="Pregnant"
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Gestational Age"
                value={gestationalAge}
                type="number"
                disabled={!pregnant}
                onChange={(e) => setGestationalAge(e.target.value)}
              />
            </Grid>
            <Grid item md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Gestational Age Unit</InputLabel>
                <Select
                  fullWidth
                  label="Gestational Age Unit"
                  value={gestationalAgeUnit}
                  disabled={!pregnant}
                  onChange={(e) =>
                    setGestationalAgeUnit(e.target.value as string)
                  }>
                  <MenuItem value="weeks">Weeks</MenuItem>
                  <MenuItem value="months">Months</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                label="Drug History"
                value={drugHistory}
                onChange={(e) => setDrugHistory(e.target.value)}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                label="Medical History"
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

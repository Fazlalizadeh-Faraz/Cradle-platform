import React from 'react';
import { GESTATIONAL_AGE_UNITS } from '../../../patientInfoForm';
import { validateInput } from '../validation';

export const useNewPatient = () => {
  const [patient, setPatient] = React.useState({
    household: '',
    patientInitial: '',
    patientId: '',
    patientName: '',
    patientAge: 0,
    patientSex: 'FEMALE',
    isPregnant: false,
    gestationalAgeValue: '',
    gestationalAgeUnit: GESTATIONAL_AGE_UNITS.WEEKS,
    zone: '',
    dob: null,
    villageNumber: '',
    drugHistory: '',
    medicalHistory: '',
    householdError: false,
    patientInitialError: false,
    patientIdError: false,
    patientNameError: false,
    patientAgeError: false,
    patientSexError: false,
    isPregnantError: false,
    gestationalAgeValueError: false,
    gestationalAgeUnitError: false,
    zoneError: false,
    dobError: false,
    villageNumberError: false,
    drugHistoryError: false,
    medicalHistoryError: false,
  });
  const getAgeBasedOnDOB = (value: string) => {
    const year: string = value.substr(0, value.indexOf('-'));
    const yearNow: number = new Date().getUTCFullYear();
    return yearNow - +year;
  };

  const handleChangePatient = (e: any) => {
    console.log(e.currentTarget.value);
    const errors: any = validateInput(e.target.name, e.target.value);

    if (e.target.name === 'patientSex' && e.target.name === 'MALE') {
      setPatient({
        ...patient,
        [e.target.name]: e.target.value,
        gestationalAgeValue: '',
        isPregnant: false,
      });
    }
    if (e.target.name === 'isPregnant') {
      setPatient({
        ...patient,
        [e.target.name]: e.target.checked,
      });
    }
    if (e.target.name === 'dob') {
      const calculatedAge: number = getAgeBasedOnDOB(e.target.value);
      setPatient({
        ...patient,
        [e.target.name]: e.target.value,
        patientAge: calculatedAge,
        dobError: errors.dobError,
      });
    }
    if (e.target.name == 'patientInitial') {
      setPatient({
        ...patient,
        [e.target.name]: e.target.value,
        patientInitialError: errors.patientInitialError,
      });
    }
    if (e.target.name == 'patientId') {
      setPatient({
        ...patient,
        [e.target.name]: e.target.value,
        patientIdError: errors.patientIdError,
      });
    }
    if (e.target.name == 'patientAge') {
      setPatient({
        ...patient,
        [e.target.name]: e.target.value,
        patientAgeError: errors.patientAgeError,
      });
    } else {
      setPatient({
        ...patient,
        [e.target.name]: e.target.value,
      });
    }
  };
  return { patient, handleChangePatient };
};

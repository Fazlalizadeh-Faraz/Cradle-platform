import { EndpointEnum } from '../../../src/server';
import { BASE_URL } from '../../../src/server/utils';
import { initialState, PatientField, PatientState, SEXES } from './state';

export const handleChangeCustom = (handleChange: any, setFieldValue: any) => {
  const resetGestational = () => {
    setFieldValue(PatientField.gestationalAge, initialState[PatientField.gestationalAge], false);
    setFieldValue(PatientField.gestationalAgeUnit, initialState[PatientField.gestationalAgeUnit], false);
  }

  return (e: React.ChangeEvent<any>) => {
    handleChange(e);

    if(e.target.name === PatientField.patientSex && e.target.value === SEXES.MALE) {
      setFieldValue(PatientField.isPregnant, false, false);
      resetGestational();
    }
    else if(e.target.name === PatientField.isPregnant && !e.target.checked) {
      resetGestational();
    }
  }
}

export const handlePatientIdBlur = (handleBlur: any, setExistingPatientId: (val: string | null) => void) => {
  return (e: any) => {
    handleBlur(e);

    const patientId = e.target.value;
    if(patientId.length !== 0) {
      const fetchOptions = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };

      fetch(BASE_URL + EndpointEnum.PATIENTS + '/' + patientId + EndpointEnum.INFO, fetchOptions)
        .then(resp => setExistingPatientId(resp.status === 200 ? patientId : null))
        .catch(_ => setExistingPatientId(null))
    } else {
      setExistingPatientId(null)
    }
  }
}

export const handleSubmit = (history: any, setSubmitError: (error: boolean) => void) => {
  return async (values: PatientState, { setSubmitting }: any) => {
    setSubmitting(true);

    // deep copy
    let patientData = JSON.parse(JSON.stringify(values));

    delete patientData[PatientField.gestationalAge];
    delete patientData[PatientField.estimatedAge];

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(patientData),
    };

    try {
      let resp = await fetch(BASE_URL + EndpointEnum.PATIENTS, fetchOptions);

      if (!resp.ok) {
        throw new Error('Response failed with error code: ' + resp.status)
      }

      let respJson = await resp.json();

      history.push('/patients/' + respJson['patientId']);
    }
    catch(e) {
      setSubmitError(true);
    }
    
    setSubmitting(false);
  }
}
import { Endpoints } from '../../../server/endpoints';
import { serverRequestActionCreator } from '../../reducers/utils';

const GET_SELECTED_PATIENT_STATISTICS_REQUESTED = `selectedPatientStatistics/GET_SELECTED_PATIENT_STATISTICS_REQUESTED`;
const GET_SELECTED_PATIENT_STATISTICS_SUCCESS = `selectedPatientStatistics/GET_SELECTED_PATIENT_STATISTICS_SUCCESS`;
const GET_SELECTED_PATIENT_STATISTICS_ERROR = `selectedPatientStatistics/GET_SELECTED_PATIENT_STATISTICS_ERROR`;

export const getSelectedPatientStatisticsRequested = () => ({
  type: GET_SELECTED_PATIENT_STATISTICS_REQUESTED,
});

export const getSelectedPatientStatistics = (patientId) => {
  return serverRequestActionCreator({
    endpoint: `${Endpoints.PATIENT}${Endpoints.STATS}/${patientId}`,
    onSuccess: (response) => ({
      type: GET_SELECTED_PATIENT_STATISTICS_SUCCESS,
      payload: response,
    }),
    onError: (error) => ({
      type: GET_SELECTED_PATIENT_STATISTICS_ERROR,
      payload: error,
    }),
  });
};

const initialState = {
  selectedPatientStatsList: [],
};

export const selectedPatientStatisticsReducer = (
  state = initialState, 
  action
) => {
  switch (action.type) {
    case GET_SELECTED_PATIENT_STATISTICS_SUCCESS:
      return {
        ...state,
        selectedPatientStatsList: action.payload.data,
      };

    case GET_SELECTED_PATIENT_STATISTICS_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case GET_SELECTED_PATIENT_STATISTICS_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
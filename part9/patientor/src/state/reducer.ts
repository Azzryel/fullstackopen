import { State } from "./state";
import { Patient, DiagnosesEntry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_SINGLE_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSES_LIST";
    payload: DiagnosesEntry[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_SINGLE_PATIENT":
      return {
        ...state,
        patient: [action.payload],
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: action.payload
      };
    default:
      return state;
  }
};

export const patientList = (content: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: content
  };
};

export const addPatient = (content: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: content
  };
};

export const singlePatientData = (content: Patient): Action => {
  return {
    type: "SET_SINGLE_PATIENT",
    payload: content
  };
};

export const diagnosesList = (content: DiagnosesEntry[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: content
  };
};

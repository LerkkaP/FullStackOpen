import patientsData from "../data/patients";
import { NonSensitivePatients, NewPatient, Patient, Gender } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): NonSensitivePatients[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender: gender as Gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient,
};

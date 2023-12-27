import patientsData from "../data/patients";
import { NonSensitivePatient, NewPatient, Patient, Gender } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender: gender as Gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient[] => {
  const patient = patientsData.filter((patient) => patient.id === id);
  return patient.map(({ id, name, ssn, entries, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    ssn,
    dateOfBirth,
    gender: gender as Gender,
    occupation,
    entries
  }));};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    entries: [],
    ...entry,
  };
  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getPatientById,
  addPatient,
};

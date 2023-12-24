import axios from "axios";
import { Diary, NewDiary } from "../types";
const baseUrl = "http://localhost:3000/api/diaries"

const getAll = async () => {
    const { data } = await axios.get<Diary[]>(
        baseUrl
      );
    return data;
}

const createDiary = async (object: NewDiary) => {
  const response = await axios
    .post<Diary>(baseUrl, object);
  return response.data;
}

export default {getAll, createDiary}
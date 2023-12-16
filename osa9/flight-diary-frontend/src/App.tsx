import { useEffect, useState } from "react";
import { Diary } from "./types";
import diaryService from "./services/diaries";

//import DiaryList from "./components/DiaryList";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchDiariesList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiariesList();
  }, [])
  return (
  <div>
    <h2>Diary entries</h2>
    {diaries.map(diary =>
    <div key={diary.id}>
      <p><b>{diary.date}</b></p>
      <p>
        visibility: {diary.visibility}<br />
        weather: {diary.weather}
      </p>
    </div>
    )}
  </div>
  )
}

export default App;
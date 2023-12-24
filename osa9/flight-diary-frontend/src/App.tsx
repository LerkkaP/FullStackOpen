import { useEffect, useState } from "react";
import { Diary } from "./types";
import diaryService from "./services/diaries";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchDiariesList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiariesList();
  }, [])

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newDiary = await diaryService.createDiary({
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    });
    setDiaries([...diaries, newDiary]);
    setDate("")
    setVisibility("")
    setWeather("")
    setComment("")
  }
  return (
  <div>
    <h2>Add new entry</h2>
    <form onSubmit={diaryCreation}>
      <div>
        date<input value={date} onChange={(event) => setDate(event.target.value)}/>
      </div>
      <div>
        visibility<input value={visibility} onChange={(event) => setVisibility(event.target.value)}/>
      </div>
      <div>
        weather<input value={weather} onChange={(event) => setWeather(event.target.value)}/>
      </div>
      <div>
        comment<input value={comment} onChange={(event) => setComment(event.target.value)}/>
      </div>
      <button type="submit">add</button>
    </form>
    <h2>Diary entries</h2>
    {diaries.map(diary =>
    <div key={diary.id}>
      <p><b>{diary.date}</b></p>
      <p>
        visibility: {diary.visibility}<br />
        weather: {diary.weather}<br />
        comment: {diary.comment}
      </p>
    </div>
    )}
  </div>
  )
}

export default App;
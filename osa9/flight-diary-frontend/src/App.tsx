import { useEffect, useState } from "react";
import { Diary } from "./types";
import diaryService from "./services/diaries";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchDiariesList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
    void fetchDiariesList();
  }, [])

  useEffect(() => {
    if(!message){
     setShow(false)
     return
    }
    setShow(true)
    const timer = setTimeout(() => {
      setShow(false)
    }, 2500);
    return () => clearTimeout(timer);
  }, [message])

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const newDiary = await diaryService.createDiary({
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment
      })

      setDiaries([...diaries, newDiary]);
      setDate("")
      setVisibility("")
      setWeather("")
      setComment("")
    } catch(error) {
      if (axios.isAxiosError(error)) {
        if (error.response !== undefined) {
          const errorMessage = error.response.data.split(".")[1]
          setMessage(errorMessage)
        }
      } else {
        console.error(error);
      }
    }
  }
  return (
  <div>
    <h2>Add new entry</h2>
    {show && (
      <p style={{color: "red"}}>{message}</p>
    )}
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
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

  console.log(visibility)

  return (
  <div>
    <h2>Add new entry</h2>
    {show && (
      <p style={{color: "red"}}>{message}</p>
    )}
    <form onSubmit={diaryCreation}>
      <div>
        date<input value={date} type="date" onChange={(event) => setDate(event.target.value)} />
      </div>

      <div>
        visibility
        great <input type="radio" value="great" name="visibility" checked={visibility === "great"} onChange={(event) => setVisibility(event.target.value)}/>
        good <input type="radio" value="good" name="visiblity" checked={visibility === "good"} onChange={(event) => setVisibility(event.target.value)}/>
        ok <input type="radio" value="ok" name="visiblity" checked={visibility === "ok"} onChange={(event) => setVisibility(event.target.value)}/>
        poor <input type="radio" value="poor" name="visiblity" checked={visibility === "poor"} onChange={(event) => setVisibility(event.target.value)}/>
      </div>
      <div>
        weather
        sunny <input type="radio" value="sunny"  name="weather" checked={weather === "sunny"} onChange={(event) => setWeather(event.target.value)}/>
        rainy <input type="radio" value="rainy" name="weather" checked={weather === "rainy"} onChange={(event) => setWeather(event.target.value)}/>
        cloudy <input type="radio" value="cloudy" name="weather" checked={weather === "cloudy"} onChange={(event) => setWeather(event.target.value)}/>
        stormy <input type="radio" value="stormy" name="weather" checked={weather === "stormy"} onChange={(event) => setWeather(event.target.value)}/>
        windy <input type="radio" value="windy" name="weather" checked={weather === "windy"} onChange={(event) => setWeather(event.target.value)}/>
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
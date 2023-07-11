import { useDispatch, useSelector } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote, handleClick}) => {
  return (
    <div>
      {anecdote.content}
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdotes}) => {
      if (filter === '') {
        return anecdotes
      }
    return anecdotes.filter(n => n.content.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
    })

    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    return (
        <div>
          {sortedAnecdotes.map(anecdote => 
            <Anecdote
              key={anecdote.id}
              anecdote={anecdote}
              handleClick={() => 
                dispatch(incrementVote(anecdote.id))
              }
            />
          )}
    </div>
  )
}

export default AnecdoteList

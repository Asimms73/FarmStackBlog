import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  


  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

      axios.get(url, {signal: abortCont.signal})
      .then(res => {
        setIsPending(false);
        setData(res.data);
        setError(null);
      })
      .catch(err => {
        // auto catches network / connection error
        if(err.name !== 'AbortError'){
          setIsPending(false);
          setError(err.message);
        } 
      })

      return () => abortCont.abort();
  }, [url])

  return { data, isPending, error };
}
 
export default useFetch;
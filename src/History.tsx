import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "./App";
import { RootState } from "./app/store";
import { load_guesses } from "./historySlice";

const History = () => {
    const dispatch = useThunkDispatch();
    const { guesses } = useSelector((state: RootState) => state.history);
    
    useEffect(() => dispatch(load_guesses()), []);

    return (
        <ol>
            {guesses.map(guess => <li>{guess.guess}</li>)}
        </ol>
    );
};

export default History;
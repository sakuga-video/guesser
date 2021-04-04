import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunkDispatch } from "./App";
import { RootState } from "./app/store";
import { load_round_details } from "./historySlice";
import RoundDetails from "./RoundDetails";

const RoundDetailsLoader = ({round_id}:{round_id: number}) => {
    const dispatch = useThunkDispatch();
    useEffect(() => dispatch(load_round_details(round_id)), [dispatch, round_id]);
    const active_round = useSelector((state: RootState) => state.history.active_round);

    return active_round ? <RoundDetails round={active_round} /> : null;
}

export default RoundDetailsLoader;
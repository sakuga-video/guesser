import { Container, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useThunkDispatch } from "./App";
import { RootState } from "./app/store";
import { load_tag_details } from "./historySlice";
import TagDetails from "./TagDetails";

const TagDetailsLoader = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useThunkDispatch();
    useEffect(() => dispatch(load_tag_details(parseInt(id))), [dispatch, id]);
    const { active_tag, active_rounds } = useSelector((state: RootState) => state.history);

    if (active_tag === undefined || active_rounds === undefined) {
        return (
            <Container>
                <Typography variant="h3" component="h1">
                    No such tag
                </Typography>
            </Container>
        )
    }

    return <TagDetails tag={active_tag} rounds={active_rounds} />
};
export default TagDetailsLoader;
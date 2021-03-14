import { Button, Divider, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from 'axios';
import { API_URL } from "./constants";

const BoardsListItem = (props) => {
    const data = props.data;

    return <ListItemText
        primary={`${data.category.key}::${data.category.value}`}
        secondary={<>
            <Typography variant="body2">
                {data.title}
            </Typography>
        </>}
    />
}

const BoardsListLoader = (props) => {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        axios.get(API_URL + `/board?limit=${props.limit || 5}&offset=${props.offset}`)
            .then(res => {
                setBoards(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [props.offset, props.limit]);

    return <List component="nav">
        {boards.map(board => <ListItem divider>
            <BoardsListItem data={board} />
        </ListItem>)}
    </List>
}

const BoardsListPage = (props) => {
    const [offset, setOffset] = useState(0)
    const limit = props.limit || 5;

    return <>
        <BoardsListLoader offset={offset} limit={limit} />
        <Button onClick={() => {
            setOffset(offset + limit);
        }}>
            next
        </Button>
        <Button onClick={() => {
            setOffset(offset - limit);
        }}>
            prev
        </Button>
    </>
}

export default BoardsListPage;
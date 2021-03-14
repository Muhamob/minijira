import { Button, Divider, Link, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { useEffect, useState, forwardRef } from "react";
import axios from 'axios';
import { API_URL } from "./constants";
import { Link as RouterLink } from 'react-router-dom';

const BoardsListItem = (props) => {
    const data = props.data;

    const renderLink = forwardRef((itemProps, ref) => <RouterLink
        to={`/boards/${data.key}`}
        ref={ref}
        {...itemProps}
    />);

    return <ListItem divider component={renderLink}>
        <ListItemText
            primary={`${data.category.key}::${data.category.value}`}
            secondary={<Typography variant="body2">
                {data.title}
            </Typography>}
        />
    </ListItem>
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

    return <List>
        {boards.map(board => <BoardsListItem data={board} />)}
    </List>
}

const BoardsListPage = (props) => {
    const [offset, setOffset] = useState(0)
    const limit = props.limit || 5;

    return <>
        <Typography variant="h3">
            Boards
        </Typography>
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
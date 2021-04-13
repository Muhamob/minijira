import {
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@material-ui/core";
import { useEffect, useState, forwardRef } from "react";
import axios from 'axios';
import { API_URL } from "./constants";
import { Link as RouterLink } from 'react-router-dom';
import { QueryClient, useQueryClient, useQuery, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

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
    const queryClient = useQueryClient();
    const query = useQuery('boardList', () => axios.get(API_URL + `/board?limit=${props.limit || 5}&offset=${props.offset}`))

    if (query.data) {
        console.log(query.data);
        return <List>
            {query.data.data.map(board => <BoardsListItem data={board} />)}
        </List>
    } else if (query.isLoading) {
        return <Box>
            Loading
        </Box>
    } else if (query.isError) {
        return <Box>
            <span style={{color: 'red'}}>Error</span>
        </Box>
    } else {
        return <Box>
            Something went wrong
        </Box>
    }
}

const BoardsListPage = (props) => {
    const [offset, setOffset] = useState(0)
    const limit = props.limit || 5;

    return <QueryClientProvider client={queryClient}>
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
            const nextOffset = offset - limit;
            setOffset( (nextOffset < 0) ? 0 : offset - limit );
        }}>
            prev
        </Button>
    </QueryClientProvider>
}

export default BoardsListPage;
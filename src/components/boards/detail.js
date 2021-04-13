import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import { API_URL } from "./constants";
import {
    Box,
    Card,
    List,
    ListItem,
    Typography,
    CardContent
} from "@material-ui/core";
import { createTree } from "./utils";
import { QueryClient, useQueryClient, useQuery, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const Task = (props) => {
    // Object with all tasks
    const tree = props.tree;

    return <Box x={2}>
        <Card>
            <CardContent>
                <Typography variant="h5">
                    {tree.task.title}
                </Typography>
                <Typography variant="body1">
                    {tree.task.description}
                </Typography>
                <List>
                    {tree.subtasks.map(subtask => <ListItem>
                        <Task tree={subtask} />
                    </ListItem>
                    )}
                </List>
            </CardContent>
        </Card>
    </Box>
}

const BoardLoader = (props) => {
    const queryClient = useQueryClient();
    const query = useQuery('board', async () => {
        const res = await axios.get(API_URL + `/board/${props.key_}`);
        return {
            data: res.data,
            trees: createTree(res.data.tasks),
            res: res
        }
    });

    if (query.data) {
        return <>
            <Typography variant="h3">
                {query.data.data.title}
            </Typography>
            <Typography variant="subtitle1">
                owned by: {query.data.data.owner.name || null}
            </Typography>
            {
                query.data.trees.map(tree => {
                    return <Task tree={tree} />
                })
            }
        </>
    } else {
        return <Typography variant="h3">
            {(() => {
                if (query.isLoading) {
                    return "Loading"
                } else if (query.isError) {
                    return "Error"
                } else {
                    return "Something went wrong"
                }
            })()}
        </Typography>
    }
}

const BoardPage = (props) => {
    const { key } = useParams();
    
    return <QueryClientProvider client={queryClient}>
        <BoardLoader key_={key} />
    </QueryClientProvider>;
}

export default BoardPage;
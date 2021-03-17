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

const BoardPage = (props) => {
    const { key } = useParams();
    const [data, setData] = useState({
        data: [],
        trees: [],

    });
    const [trees, setTrees] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get(API_URL + `/board/${key}`)
            .then((res) => {
                setData({
                    data: res.data,
                    trees: createTree(res.data.tasks)
                });
                setLoaded(true);
            })
            .catch((err) => {
                console.log("err")
                console.error(err);
            })
    }, [setLoaded]);

    if (loaded) {
        return <>
            <Typography variant="h3">
                {data.data.title}
            </Typography>
            <Typography variant="subtitle1">
                owned by: {data.data.owner.name || null}
            </Typography>
            {data.trees.map(tree => {
                return <Task tree={tree} />
            })}
        </>;
    } else {
        return "Loading"
    }
}

export default BoardPage;
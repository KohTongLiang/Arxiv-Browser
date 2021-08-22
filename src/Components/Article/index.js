import React, { useState, useEffect } from 'react'

// import material ui components
import { Grid, Container, Card, CardContent, CardActionArea, Typography,
    CardActions, Button, IconButton, Divider, Input, FormGroup, InputLabel,
    FormControl, Select, MenuItem } from '@material-ui/core'
import { List as ListIcon, 
    ViewColumn as ViewColumnIcon  } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

// import constants
import { STYLE } from '../../Constants/styles'

const useStyles = makeStyles((theme) => (STYLE));

function Article (props) {
    const classes = useStyles();
    const [papersList, setPapersList] = useState([])
    const [filter, setFilter] = useState('ti')
    const [papersView, setPapersView] = useState(0); // 0 = list, 1 = column

    const handleSearchPapers = searchValue => {
        props.searchPapers({
            searchTerm: searchValue,
            searchType: filter,
        })
    }

    return (
        <Container className={classes.mainContainer}>
            <FormGroup>
                <FormControl>
                    <InputLabel>Search papers</InputLabel>
                    <Input onChane={(event) => handleSearchPapers(event.target.value)} inputTypeSearch/>
                </FormControl>
                <FormControl>
                <Select value={filter} onChange={(event) => setFilter(event.target.value)}>
                    <MenuItem value="ti">Title</MenuItem>
                    <MenuItem value="au">Author</MenuItem>
                    <MenuItem value="abs">Abstract</MenuItem>
                    <MenuItem value="co">Comment</MenuItem>
                    <MenuItem value="jr">Journal Reference</MenuItem>
                    <MenuItem value="cat">Subject Category</MenuItem>
                    <MenuItem value="rn">Report Number</MenuItem>
                    <MenuItem value="id">ID</MenuItem>
                    <MenuItem value="all">All</MenuItem>
                </Select>
                </FormControl>
            </FormGroup>
            <div>
                <IconButton onClick={()=>setPapersView(0)}><ListIcon /></IconButton>
                <IconButton onClick={()=>setPapersView(1)}><ViewColumnIcon /></IconButton>
            </div>
            <Divider />
            {(papersView === 0 && papersList) && papersList.map(e => (
                <Card key={e.id} className={classes.cardRoot}>
                <CardActions>
                    <div className={classes.cardAction}>
                    <Typography variant="h5">
                        {e.title}
                    </Typography>
                    </div>
                </CardActions>
                <CardActionArea>
                    <CardContent>
                    <Typography variant="body1" onClick={() => props.viewFormHandler(e)}>
                        {e.content}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <div className={classes.cardAction}>
                    <Button size="small">Share</Button>
                    <Button size="small">Archive</Button>
                    </div>
                </CardActions>
                </Card>
            ))}

            <Grid container spacing={3}>
                {(papersView === 1 && papersList) && papersList.map(e => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card key={e.id} className={classes.cardRoot}>
                    <CardActions>
                        <div className={classes.cardAction}>
                        <Typography variant="h5">
                            {e.title}
                        </Typography>
                        </div>
                    </CardActions>
                    <CardActionArea>
                        <CardContent>
                        <Typography variant="body1" onClick={() => props.viewFormHandler(e)}>
                            {e.content}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <div className={classes.cardAction}>
                        <Button size="small">Share</Button>
                        <Button size="small">Archive</Button>
                        </div>
                    </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Article;
import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';

function Home() {
    const { loading, data } =useQuery(FETCH_POST_QUERY);

    return (  
    <Grid columns={1} >
        <Grid.Row className="page-title">
            <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row className="feed">
        { loading ? (
            <h1>Loading posts...</h1>
        ) : (
            data && 
            data.getPosts.map ((post) => (
                <Grid.Column  key={post.id} style={{marginBottom: 40, marginLeft: 160, marginRight: 160 }}>
                    <PostCard post={post} />
                </Grid.Column>
            ))
        )}
    </Grid.Row>
    <Grid.Row className="user-title"></Grid.Row>
    </Grid>
    );
}

const FETCH_POST_QUERY = gql`
{
    getPosts {
        id 
        body 
        createdAt 
        username 
        likeCount
        
        likes{
            username
        }
        commentCount
        comments{
            id
            username
            createdAt
            body
        }
    }
}
`

export default Home;
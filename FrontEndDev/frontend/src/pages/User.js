import React, {useContext} from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';

function User() {
    const { user } = useContext(AuthContext);
    const activeuser = user.username

    const { loading, error, data } =useQuery(FETCH_POST_QUERY, {
        variables: { username: activeuser },
    });
    if (loading) return null;

    if (error) return `Error! ${error}`;


    return (  
    <Grid columns={1} >
        <Grid.Row className="user-title">
            <h1>{user.username}</h1>
        </Grid.Row>
        <Grid.Row className="feed">
        { loading ? (
            <h1>Loading posts...</h1>
        ) : (
            data && 
            data.getPostsbyUser.map ((post) => (
                <Grid.Column  key={post.id} style={{marginBottom: 40, marginLeft: 160, marginRight: 160 }}>
                    <PostCard post={post} />
                </Grid.Column>
            ))
        )}
    </Grid.Row>
    </Grid>
    );
}
const element = <User name="awkwardwaltz" />;
const FETCH_POST_QUERY = gql`

query getPostsbyUser($username: String!){
 
    getPostsbyUser(username: $username) {
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

export default User;
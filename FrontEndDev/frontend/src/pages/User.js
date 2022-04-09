import React, {useContext} from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid, Image } from 'semantic-ui-react';

import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';

function User(props) {
    const userName = props.match.params.userName;
    const { user } = useContext(AuthContext);


    const { loading, error, data } =useQuery(FETCH_POST_QUERY, {
        variables: { username: userName },
    });
    if (loading) return null;

    if (error) return `Error! ${error}`;


    return (  
    <Grid columns={1} >
        <Grid.Row className="user-title">
            <h1>{userName}</h1>
            <Grid.Row className="profile-info">
            <Grid columns="2" width={70}>
                      <Grid.Column width={3}style={{marginBottom: 4, marginLeft: 190 }}>
                      <Image
                      
                      size='medium'
                      src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                      display='inline-block'
                      />   
                      </Grid.Column>
                    <Grid.Column >
                        
                        <h1>Bio</h1>   
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>                    
                    
                    
                    </Grid.Column>
                    </Grid>

            </Grid.Row> 
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
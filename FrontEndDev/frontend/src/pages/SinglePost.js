import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import moment from 'moment';
import {
  Button,
  Card,
  Form,
  Grid,
  Image,
  Icon,
  Label,
  Container
} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';


function SinglePost(props){
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const commentInputRef = useRef(null);

    const [comment, setComment] = useState('');

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
          postId
        }
    });

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
      update() {
        setComment('');
        commentInputRef.current.blur();
      },
      variables: {
        postId,
        body: comment
      }
    });

    function deletePostCallback(){
        props.history.push('/');
    }

    let postMarkup;
    if(!data){
        
        postMarkup=<p>Loading Post...</p>
    } else{

        const {id, body, createdAt, username, comments, likes,  likeCount, commentCount} = data.getPost;
        console.log();
        postMarkup = (
          <>
            <Grid columns="1">
                    <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
              </Grid.Row>
                <Grid.Row className="feed">
                    
                    <Grid columns="2" width={70}>
                      <Grid.Column width={3}style={{marginBottom: 4, marginLeft: 190 }}>
                      <Image
                      
                      size='medium'
                      src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                      display='inline-block'
                      />   
                      </Grid.Column>
                    <Grid.Column >
                                   
                    
                    <Card fluid > 
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                            <Card.Description>{body}</Card.Description>
                        </Card.Content>
                        <hr/>
                        <Card.Content extra>
                            <LikeButton user={user} post={{id, likeCount, likes}}/>

                            {user && user.username === username &&(
                                <DeleteButton postId= {id} callback={deletePostCallback}/>
                            )}
                        </Card.Content>
                    </Card>
                    
                    </Grid.Column>
                    </Grid>


                    

                    <Grid.Column style={{marginBottom: 40, marginLeft: 160, marginRight: 160 }}>
                    { user && (
                      <Card fluid>
                        <Card.Content>
                          <p>Post a comment</p>
                          <Form>
                            <div className="ui action input fluid">
                              <input
                                type="text"
                                placeholder="Comment.."
                                name="comment"
                                value={comment}
                                onChange={event => setComment(event.target.value)}
                                ref={commentInputRef}
                              />
                              <button type="submit"
                                className="ui button teal"
                                disabled={comment.trim() === ''}
                                onClick={submitComment}
                              >
                                Submit
                              </button>
                            </div>
                          </Form>
                        </Card.Content>
                      </Card>
                    )}
                    {comments.map(comment => (
                      <Card fluid key={comment.id}>
                        <Card.Content>
                          { user && user.username === comment.username && (
                            <DeleteButton postId={id} commentId={comment.id}/>
                          )}
                          <Card.Header>{comment.username}</Card.Header>
                          <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                          <Card.Description>{comment.body}</Card.Description>
                        </Card.Content>
                      </Card>
                    ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </>
        )
    }
    return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql `
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id body createdAt username
      }
      commentCount
    }
  }
`

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;


export default SinglePost;
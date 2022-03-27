import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import {Button, Confirm, Icon} from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../util/graphql'
import MyPopup from '../util/MyPopup';    

function DeleteButton({ postId, commentId, callback }){
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy){
            console.log("Success!")
            setConfirmOpen(false);
            if(!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                const newPostData = [...data.getPosts.filter(p => p.id !== postId)];
                console.log(newPostData);
                
                proxy.writeQuery({ query: FETCH_POSTS_QUERY, newPostData });
            }
            if(callback) callback();
        },
        variables: { 
            postId, 
            commentId
        }
            
    })
    return(
        <>
        <MyPopup
           content={commentId ? 'Delete Comment' : 'Delete Post'} 
           >
           
            <Button color='red' floated='right' onClick={() => setConfirmOpen(true)}>
            <Icon name="trash" style={{marginTop: 0}}/>
            Delete
            </Button> 
       
           
           </MyPopup>
            <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePostOrMutation} />
        </>
    )
}

const DELETE_POST_MUTATION = gql `
    mutation deletePost($postId: ID!){
        deletePost(postId:$postId)
    }
`;

const DELETE_COMMENT_MUTATION = gql `
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            comments {
                id username createdAt body
            }
            commentCount
        }
    }
`

export default DeleteButton
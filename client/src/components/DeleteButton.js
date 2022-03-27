import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import {Button, Confirm, Icon} from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../util/graphql'
    
function DeleteButton({ postId, callback }){
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy){
            console.log("Success!")
            setConfirmOpen(false);
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            const newPostData = [...data.getPosts.filter(p => p.id !== postId)];
            console.log(newPostData);
            
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, newPostData });
            if(callback) callback();
        },
        variables: { 
            postId 
        }
            
    })
    return(
        <>
            <Button color='red' floated='right' onClick={() => setConfirmOpen(true)}>
                <Icon name="trash" style={{marginTop: 0}}/>
                Delete
            </Button> 
            <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePost} />
        </>
    )
}

const DELETE_POST_MUTATION = gql `
    mutation deletePost($postId: ID!){
        deletePost(postId:$postId)
    }
`;

export default DeleteButton
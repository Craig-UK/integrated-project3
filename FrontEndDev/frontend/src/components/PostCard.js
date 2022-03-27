import React from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';


function PostCard({post: { body, createdAt, id, username, likeCount, commentCount, likes}}){
    function LikePost(){
      console.log("Like Post!")
    }
    function commentOnPost(){
      console.log("Comment on Post!")
    }
    return(
        <Card fluid>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(false)}</Card.Meta>
          <Card.Description>
            {body}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
         
        <Button as='div' labelPosition='right' onClick={LikePost} floated="right">
      <Button color='blue'>
        <Icon name='heart' />
        Like
      </Button>
      <Label basic color='teal' pointing='left'>
        {likeCount}
      </Label>
    </Button>
    <Button as='div' labelPosition='right' onClick={commentOnPost} floated="right">
      <Button color='teal'>
        <Icon name='comments' />
        Comments
      </Button>
      <Label basic color='blue' pointing='left'>
        {commentCount}
      </Label>
    </Button>
    
        </Card.Content>
      </Card>
    )
}

export default PostCard;
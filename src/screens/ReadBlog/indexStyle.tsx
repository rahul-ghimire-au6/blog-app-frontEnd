import styled from 'styled-components';


export const ReadBlogStyle = styled.div`
margin-top:15vh;
margin-left:16vw;
margin-right:16vw;
.BlogContainer{
    box-shadow:0px 0px 4px 4px rgb(0,0,0,0.1);
    padding-left:3vw;
    padding-right:2vw;
    padding-top:2vh;
    border-radius:12px;
    padding-bottom:3vh;
}
.creatorDiv{
    display:flex;
    justify-content:right;
    width:100%;
    margin-bottom:10vh;
}
.postedTime{
    margin-top:0px;
    font-size:0.9vw;
    color:grey;
    line-height:1.5vh;
}
.commentContainer{
    box-shadow:0px 0px 4px 4px rgb(0,0,0,0.1);
    padding-left:3vw;
    padding-right:2vw;
    padding-top:1vh;
    border-radius:12px;
    margin-bottom:10vh;
    padding-bottom:5vh;
    height:100%;
}
.commentDiv{
    border:1px solid #c0c0c0;
    min-height:20vh;
}
.commentButtonDiv{
    margin-top:3vh;
}
.viewCommentDiv{
    border: 1px solid #c0c0c0;
    border-radius:12px;
    padding:2vh 2vw;
    margin-bottom:2vh;
}
.authorContainer{
    display:flex;
}
.commentAuthor{
    font-weight:700;
    font-size:0.9vw;
}
.commentDivider{
    background-color:grey;
    border-radius:50%;
    width:0.3em;
    height:0.3em;
    margin-left:0.5vw;
    margin-top:1vh;
} 
.commentCreatedAt{
    margin-left:0.5vw;
    margin-top:0.5vh;
    font-size:0.7vw;
}
`
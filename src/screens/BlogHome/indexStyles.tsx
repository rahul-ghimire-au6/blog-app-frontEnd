import styled from "styled-components";

export const BodyHomeStyle = styled.div`
    margin-left:5vw;
    margin-right:5vw;
    margin-top:15vh;
    .h1Span:hover{
        cursor:pointer;
    }
    .h1Span::after {
        content: '';
        width: 0px;
        height: 1px;
        display: block;
        background: black;
        transition: 1s;
      }
      .h1Span:hover::after {
        width: 10%;
      }
      .intro1h1{
        margin-top:8vh;
        font-family:Monospace;
        line-height:5vh;
      }
      .intro2h1{
        margin-top:8vh;
        font-family:Monospace;
        line-height:10vh;
        font-size:4vw;
      }
      .intro3h1{
        margin-top:10vh;
        font-family:Monospace;
        line-height:6vh;
      }
      .blogCardDiv{
        margin-left:12vw;
        margin-right:12vw;
        margin-bottom:1vh;
        padding:1.5vh 1.5vw;
        height:20vh;
        box-shadow:0px 0px 4px 4px rgb(0,0,0,0.1);
      }
      .blogCardDiv:hover{
        transform:scale(1.1);
        transition:1s;
        cursor:pointer;
      }
      .blogTitleDiv{
        
        h4{
          margin-top:2vh;
          margin-bottom:0vh;
        }
      }
      .blogDescriptionDiv {
        height:5vh;
        margin-top:0vh;
        margin-bottom:0vh;
        font-color:#c0c0c0;
        font-size:0.9vw;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height:2.5vh;
      }
      .creatorDetailDiv{
        margin-top:2vh;
        display:flex;
        justify-content:right;
        align-items:bottom;
        .creatorName{
          font-color:#c0c0c0;
          font-size:0.9vw;
        }
        .by{
          margin-right:0.5vw;
          font-color:#c0c0c0;
          font-size:0.9vw;
          margin-left:0.5vw;
        }
        .createdAt{
          margin-top:0px;
          font-color:#c0c0c0;
          font-size:0.8vw;
          line-height:1.5vh;
        }
      }
`;


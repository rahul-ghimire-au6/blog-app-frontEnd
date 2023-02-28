import styled from 'styled-components';

export const UserRegisterationStyles = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:95vh;
    .rootDiv{
        height:70vh;
        width:35vw;
        border-radius:12px;
        padding-left:2vw;
        padding-right:2vw;
        box-shadow: 0px 0px 10px 10px rgb(0,0,0,0.1);
    }
    .headerDiv{
        margin-top:1vh;
        display:flex;
        flex-direction:column;
        align-items:center;
        h2{
            font-family:sans-serif
        }
    }
    .divider{
        border-top:1px solid #d9d9d9;
        width:20vw;
        margin-top:1vh;
    }
    .formDiv{
        margin-top:3vh;
        display:flex;
        flex-direction: column;
        align-items:center;
    }
    .textDiv{
        margin-top:1vh;
        margin-bottom:1vh;
    }
    .buttonDiv{
        margin-top:1vh;
    }
    .paragraphDiv{
        display:flex;
        justify-content:center;
        margin-top:2vh;
        p {
            font-family:sans-serif;
            font-weight:700;
            font-size:0.9vw;
        }
        span:hover{
            cursor:pointer;
            color:blue;
            text-decoration: underline;
        }
    }
`;

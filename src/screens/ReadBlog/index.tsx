import { useState, useEffect } from 'react'
import { ReadBlogStyle } from './indexStyle';
import { useAppDispatch, useAppSelector } from '@/redux/reduxHooks';
import { blogDataInterface } from '../BlogHome/index';
import { convertTime } from '../BlogHome/index'
import BlogTextArea from '../../components/BlogTextArea/index';
import { EditorState, convertToRaw } from 'draft-js';
import { fetchAllCommentByBlogId, addComment } from '../../redux/action/commentAction'
import { convertToHtml } from '../CreateBlog/index';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Router from 'next/router';
import { userInfoInterface } from '../BlogHome/index';
import DOMPurify from 'dompurify';


interface Iprops {
    id?: string;
}
interface IcommentData {
    _id: string,
    userId: {
        _id: string,
        name: string,
        email: string
    },
    blogId: string,
    commentText: string,
    createdAt: Date
}


export default function ReadBlog({ id }: Iprops) {

    const [currentBlogData, setCurrentBlogData] = useState<blogDataInterface>();
    const { userInfo }: { userInfo: userInfoInterface } = useAppSelector(state => state.user);
    const { blogData } = useAppSelector(state => state.blog);
    const { commentData } = useAppSelector(state => state.comment);
    const [comment, setComment] = useState(EditorState.createEmpty());
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (id) {
            dispatch(fetchAllCommentByBlogId(id));
        }
        const temp = blogData.find((element: blogDataInterface) => element._id === id);
        if (temp) {
            setCurrentBlogData(temp)
        } else {
            Router.push('/')
        }
    }, [blogData, id, dispatch])

    const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const commentBlock = convertToRaw(comment.getCurrentContent()).blocks;
        const comment159 = commentBlock.map(element => (!element.text.trim() && '\n') || element.text).join('\n');
        if (comment159.length === 1) {
            toast.error("Please Add Some Comment")
        } else {
            const commentHtml = convertToHtml(comment)
            if (id) {
                dispatch(addComment(id, commentHtml, userInfo.authToken as string));
                setTimeout(() => {
                    dispatch(fetchAllCommentByBlogId(id));
                }, 2000);
            }

        }
    }

    return (
        <ReadBlogStyle>
            <div className='BlogContainer'>
                {currentBlogData ?
                    <div>
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentBlogData.blogTitle) }} />
                            {/* for security reasons using dom purify to sanitize the
                            html so that potential cross-site scripting attack can be prevented */}
                        </div>
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentBlogData.blogDescription) }} />
                            {/* for security reasons using dom purify to sanitize the
                            html so that potential cross-site scripting attack can be prevented */}
                        </div>
                    </div>
                    : ""}
                {/* author name */}
                <div>
                    <div className='creatorDiv'>
                        <div>
                            - Author:&nbsp;
                        </div>
                        <div>
                            {currentBlogData?.userId.name}&nbsp;({currentBlogData?.userId.email})
                            <p className='postedTime'>posted on:- {convertTime(currentBlogData?.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* comments */}
            <div className='commentContainer'>
                <div><h2>Comments</h2></div>
                {/* showing user comment */}
                {commentData.map((element: IcommentData) => (<div key={element._id}>
                    <div className='viewCommentDiv'>
                        <div className='authorContainer'>
                            {/* author name div */}
                            <div className='commentAuthor'>
                                {element.userId.name}
                            </div>
                            <div className='commentDivider'></div>
                            <div className='commentCreatedAt'>
                                {convertTime(element.createdAt)}
                            </div>
                        </div>

                        {/* start of comment body */}
                        <div className='commentBody'>
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(element.commentText) }} />
                        </div>
                    </div>
                </div>))}
                {/* add comment */}
                <div>
                    <h2>Add Comments</h2>
                </div>
                <div className='commentDiv'>
                    <BlogTextArea
                        options={['inline', 'blockType', 'fontSize', 'list', 'emoji', 'colorPicker', 'history']}
                        textAlign={{ "inDropdown": false }}
                        inline={{ "inDropdown": false }}
                        history={{ "inDropdown": false }}
                        currentState={comment}
                        setCurrentState={setComment}
                    />
                </div>
                <div className='commentButtonDiv'>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </ReadBlogStyle>
    )
}

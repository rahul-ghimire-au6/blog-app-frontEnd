import React, { useState, useEffect } from 'react'
import { CreateBlogStyle } from './indexStyle';
import { blogFacts } from '../../utils/constants';
import BlogTextArea from '../../components/BlogTextArea/index';
import { EditorState, convertToRaw } from 'draft-js';
import Button from '@mui/material/Button';
import draftToHtml from 'draftjs-to-html';
import { toast } from 'react-toastify';
import { createBlog } from '../../redux/action/blogActions';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { userInfoInterface } from '../BlogHome/index';
import DOMPurify from 'dompurify';

export const convertToHtml = (blogElement: EditorState) => {
    return draftToHtml(convertToRaw(blogElement.getCurrentContent()));
}


export default function CreateBlog() {

    function getRandomInt(min: number = 0, max: number = blogFacts.length - 1) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const dispatch = useAppDispatch();
    const [blogFactState, setBlogFactState] = useState("");
    const [blogHeading, setBlogHeading] = useState(EditorState.createEmpty());
    const [blogDescription, setBlogDescription] = useState(EditorState.createEmpty());
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const { userInfo }: { userInfo: userInfoInterface } = useAppSelector(state => state.user);

    useEffect(() => {
        setBlogFactState(blogFacts[getRandomInt()])
    }, [])


    const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const titleBlock = convertToRaw(blogHeading.getCurrentContent()).blocks;
        const bodyBlock = convertToRaw(blogDescription.getCurrentContent()).blocks;
        const title159 = titleBlock.map(element => (!element.text.trim() && '\n') || element.text).join('\n');
        const body159 = bodyBlock.map(element => (!element.text.trim() && '\n') || element.text).join('\n');
        if (title159.length === 1 || body159.length === 1) {
            toast.error("Both Fields Are Mandatory")
        } else {
            const titleHtml = convertToHtml(blogHeading)
            const bodyHtml = convertToHtml(blogDescription)
            dispatch(createBlog(titleHtml, bodyHtml, userInfo.authToken as string));
        }
    }

    const handlePreview = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const titleHtml = convertToHtml(blogHeading)
        const bodyHtml = convertToHtml(blogDescription)
        setTitle(titleHtml);
        setBody(bodyHtml);

    }

    return (
        <CreateBlogStyle>
            <div><h1 className='createBlogHeader'>Do You Know ?<br />{blogFactState}</h1></div>
            <div>
                <h4 className='titleh4'>Title:</h4>
                <div className='HeadingBlogArea'>
                    <BlogTextArea
                        options={['inline', 'blockType', 'fontSize', 'textAlign', 'history']}
                        textAlign={{ "inDropdown": false }}
                        inline={{ "inDropdown": true }}
                        history={{ "inDropdown": false }}
                        currentState={blogHeading}
                        setCurrentState={setBlogHeading}
                    />
                </div>
            </div>
            <div>
                <h4 className='bodyh4'>Body:</h4>
                <div className='BodyBlogArea'>
                    <BlogTextArea
                        options={['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history']}
                        textAlign={{ "inDropdown": true }}
                        inline={{ "inDropdown": true }}
                        history={{ "inDropdown": false }}
                        link={{ "inDropdown": true }}
                        currentState={blogDescription}
                        setCurrentState={setBlogDescription}
                    />
                </div>
            </div>
            <div className='blogButtonDiv'>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                <Button variant="contained" onClick={handlePreview}>Preview</Button>
            </div>

            {/* Preview code here  */}
            {
                title === "" && body === "" ? "" : <div>
                    <div><h1>Preview:- </h1></div>
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }} />
                    </div>
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }} />
                    </div>
                </div>
            }
        </CreateBlogStyle>
    )
}

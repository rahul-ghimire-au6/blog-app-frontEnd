import { useEffect } from 'react'
import { BodyHomeStyle } from './indexStyles';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks'
import { fetchAllBlog, fetchBlogsByUserId } from '../../redux/action/blogActions'
import Router from 'next/router';
import { convert } from 'html-to-text';


export interface userInfoInterface {
    userName?: string,
    authToken?: string
}

export interface blogDataInterface {
    _id: string,
    blogTitle: string,
    blogDescription: string,
    createdAt: Date,
    userId: {
        _id: string,
        name: string,
        email: string,
    }
}

export const convertTime = (temp: Date|undefined) => {
    if(temp){
        const date159 = new Date(temp);
        return `${date159.getDate()}/${date159.getMonth() + 1}/${date159.getFullYear()}`
    }
}

export default function BlogHome() {
    const { userInfo }: { userInfo: userInfoInterface } = useAppSelector(state => state.user);
    const { blogData, userBlogData } = useAppSelector(state => state.blog);
    const dispatch = useAppDispatch()

    useEffect(() => {
        const auth = userInfo.authToken
        if (auth) {
            dispatch(fetchAllBlog())
            dispatch(fetchBlogsByUserId(auth))
        }
    }, [userInfo.authToken, dispatch])

    const convertBlogTitle = (title: string) => {
        // const temp = title.replace(/<[^>]*>/g, '');
        const options = {
            wordwrap: null,
        };
        const text = convert(title, options);
        return text
    }

    const handleBlogRedirection = (e:React.MouseEvent<HTMLElement>,id: string) => {
        e.preventDefault()
        Router.push(`/read/${id}`);
    }

    return (
        <BodyHomeStyle>
            <div className='headingDiv1'>
                <div>
                    <h1 className='intro1h1'>Hey {userInfo.userName}, <br /><span className='h1Span'>What&apos;s on your mind?</span></h1>
                </div>
                {userBlogData.length === 0 ? <div>
                    <h1 className='intro2h1'>You Have Created 0 Blogs, :-(<br /><span className='h1Span' onClick={() => { Router.push('/create') }}>Click Here To Create Some</span> </h1>
                </div> : <div></div>}
                {blogData.length === 0 ? <div>
                    <h1 className='intro3h1'>Unfortunately We Have 0 Blogs :-(<br /><span className='h1Span' onClick={() => { Router.push('/create') }}>Can you <span>Help Us</span> By Creating Some?</span></h1>
                </div> : <div>
                    {blogData.map((element: blogDataInterface) => (<div key={element._id}>
                        <div className='blogCardDiv' onClick={(e)=>handleBlogRedirection(e,element._id)}>
                            <div className='blogTitleDiv'>
                                <h4>{convertBlogTitle(element.blogTitle)}</h4>
                            </div>
                            <div className='blogDescriptionDiv'>
                                {/* <p>{convertBlogTitle(element.blogDescription)}</p> */}
                                {convertBlogTitle(element.blogDescription)}
                            </div>
                            <div className='creatorDetailDiv'>
                                <div className='by'>
                                    - author:
                                </div>
                                <div className='creatorName'>
                                    <b>{element.userId.name}</b>&nbsp;({element.userId.email})
                                    <p className='createdAt'>posted on:- {convertTime(element.createdAt)}</p>
                                </div>
                            </div>

                        </div>
                    </div>))}
                </div>}
            </div>
        </BodyHomeStyle>
    )
}

import React from 'react'
import NavBar from '../../components/NavBar/index'
import { useRouter } from 'next/router'
import ReadBlog from '../../screens/ReadBlog/index'

export default function Read() {
    const router = useRouter()
    const { id } = router.query
    return (
        <div>
            <NavBar />
            <ReadBlog id={id as string}/>
        </div>
    )
}

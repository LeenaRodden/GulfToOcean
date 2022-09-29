import React, { useState, useEffect } from 'react';
import { server } from './constants';

export function Blog(props: any) {
    interface blogPost {
        thread_num: number,
        subject: string,
        username: string,
        publish_date: string,
        post_text: string
    }

    const [blog, setBlog] = useState<blogPost[] | null>(null);
    const [page, setPage] = useState(1);
    const [maxReached, setMaxReached] = useState(false); 
    const pageSize = 5;


    useEffect(
        () => {
            setBlog(null);
            fetch(server + "/home/blog?partial=true&page=" + page.toString()+ "&pageSize=" + pageSize.toString())
                .then(response => response.json())
                .then(data => processBlog(data))
                .catch(err => alert(err))

            function processBlog(obj: blogPost[]) {
                if (obj.length !== pageSize) {
                    setMaxReached(true);
                    if (obj.length === 0) {
                        setPage(page - 1);
                    }
                } else if (maxReached) {
                    setMaxReached(false);
                }
                
                setBlog(obj);
            }

        }, [page])

    if (blog == null) {
        return(<div>Loading...Please Wait</div>)
    }

    return (
        <div className='centerPanel divMain blog'>
            <h2 className='contact'>Blog</h2>
            <h4 className='contact'><small>RECENT POSTS</small></h4>
            <BlogList />
            <br />
            <div className='centerPanel blogNav'>
            {page <= 1 ? <button className='pagerDisabled'>Previous</button> : <button onClick={previousPage} className='pagerButton'>Previous</button>}
            
                {maxReached ? <button className='pagerDisabled'>Next</button> : <button onClick={nextPage} className='pagerButton'>Next</button>}
            </div>
        </div>
    );

    function previousPage(){
        setPage(page - 1);
    }

    function nextPage() {
        setPage(page + 1);
    }

    function BlogList() {
        return (
            <div>
                {blog === null ? <span /> : blog.map((p: blogPost) =>
                    <div className='row' key={p.thread_num}>
                        <hr />
                        <h2>{p.subject}</h2>
                        <h5><span className="glyphicon glyphicon-time"></span> Post by {p.username}, <DisplayCSDate csDate={p.publish_date} /></h5>
                        <p dangerouslySetInnerHTML={{ __html: p.post_text}} ></p>
                    </div>
                )}
            </div>
            )
    }

    interface csDateProps {
        csDate: string
    }

    function DisplayCSDate(props:csDateProps) {
        let disp = new Date(parseInt(props.csDate.replace('/Date(', '')));
        let timeStr = disp.toLocaleString();
        return <span>{timeStr}</span>;
    }


}
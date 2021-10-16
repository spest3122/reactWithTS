import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import './styles.css'
import { useContextSelector } from 'use-context-selector'
import { MemberContext } from '../context'

const Row = () => {
    const scrollRef = useRef(null)
    const list = useContextSelector(MemberContext, (data) => data.list)
    const pageConfig = useContextSelector(
        MemberContext,
        (data) => data.pageConfig
    )
    const scrollHandle = useContextSelector(
        MemberContext,
        (data) => data.scrollHandle
    )
    useEffect(() => {
        scrollRef.current.scrollTop = pageConfig.scrollStop
    }, [list])

    return (
        <main className="ml-2 mt-4 h-full">
            <h1>會員管理(表格式)</h1>
            <section
                className="mt-4 pl-4 pr-4 h-5/6 overflow-y-auto hiddenScroll"
                ref={scrollRef}
                onScroll={scrollHandle}
            >
                {list.map((item, index) => (
                    <div
                        key={'row' + index}
                        className="flex border-2 border-black p-5 rounded-lg justify-between leading-6 mb-6"
                    >
                        <div className="flex">
                            <p>姓名 : {item.name}</p>
                            <div className="pl-4 pr-4 w-px flex items-center">
                                |
                            </div>
                            <p>帳號 : {item.username}</p>
                            <div className="pl-4 pr-4 w-px flex items-center">
                                |
                            </div>
                            <p>角色 : {item.role}</p>
                        </div>
                        <div>
                            <Link to="/member/detail">詳情</Link>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    )
}

export default Row

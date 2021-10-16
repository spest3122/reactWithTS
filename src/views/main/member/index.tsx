import { renderRoute } from '@src/routes/tool'
import { Switch, Link } from 'react-router-dom'
import { MemberContext } from './context'
import { useEffect, useState, useRef } from 'react'
import { debounce } from 'lodash'
import { getUserName } from '@api'

const Member = (props) => {
    const [list, setList] = useState([])
    const [pageConfig, setPageConfig] = useState({
        total: 0,
        page: 0,
        size: 10,
        pageList: [],
        scrollStop: 0,
        mode: 1, //list
    })
    useEffect(() => {
        getUserList()
    }, [pageConfig.page])

    const getUserList = async () => {
        let res = await getUserName({
            page: pageConfig.page,
            size: pageConfig.size,
            pageList: [],
        })
        let listData = res.data.data.content
        let totalNumber = res.data.data.total
        let pageList = Array.from(
            { length: Math.ceil(totalNumber / 10) },
            (_, i) => i + 1
        )
        setPageConfig((prev) => ({
            ...prev,
            total: totalNumber,
            pageList: pageList,
        }))
        if (pageConfig.mode === 2) {
            setList((prev) => [...prev, ...listData])
        } else if (pageConfig.mode === 1) {
            setList(listData)
        }
    }

    const changePage = (move) => {
        let page = pageConfig.page
        let list = pageConfig.pageList
        if (move === 'next') {
            page += 1
        } else if (move === 'prev') {
            page -= 1
        } else {
            page = move
        }
        if (page >= list[list.length - 1] || page < 0) {
            return
        }
        setPageConfig((prev) => ({ ...prev, page: page, mode: 1 }))
    }

    const callNextUserList = debounce((e, pos) => {
        if (
            e.target.scrollTop > 150 &&
            pageConfig.page !== Math.ceil(pageConfig.total / 10) - 1
        ) {
            let page = pageConfig.page + 1
            setPageConfig((prev) => ({
                ...prev,
                page: page,
                scrollStop: pos,
                mode: 2,
            }))
        } else {
            setPageConfig((prev) => ({
                ...prev,
                scrollStop: pos,
                mode: 2,
            }))
        }
    }, 300)
    const scrollHandle = (e) => {
        callNextUserList(e, e.target.scrollTop)
    }
    return (
        <MemberContext.Provider
            value={{ list, changePage, pageConfig, scrollHandle }}
        >
            <Switch>{renderRoute(props.route.routes, props.route.path)}</Switch>
        </MemberContext.Provider>
    )
}

export default Member

import { useEffect, useState, useRef } from 'react'
import './captcha.css'
import recycle from '/image/recycle.png'

/**
 * 數字驗證碼
 */

const enumMode = ['>', '<']

const threeRandomNumber = (mode) => {
    /**
     * {
     *   press: true, //按過沒按過
     *   x: 0,
     *   y: 0,
     *   rNumber: 22 //隨機數字
     * }
     * 位置的機制
     * 1. 位置不重複
     * 2. 給予的值不超過當前clientHeight&clientWidth範圍
     */
    let randomNumberAry = []
    let fixedNumber = 99
    for (let i = 0; i < 3; i++) {
        randomNumberAry.push({
            rNumber: Math.round(Math.random() * fixedNumber),
            press: false,
            x: 10 * (i + 1),
            y: 20 * (i + 1),
        })
    }
    return randomNumberAry
}

const Captcha = (props) => {
    const { endVerify } = props
    const [threeNumber, setThreeNumber] = useState([])
    const [randomMode, setRandomMode] = useState('')
    const [result, setResult] = useState([])
    const captchaRef = useRef(null)
    //刷新驗證碼
    const onRefresh = () => {
        setUpCaptcha()
        setResult([])
    }
    //設置驗證碼
    const setUpCaptcha = () => {
        const randomMode = Math.floor(Math.random() * 2)
        const mode = enumMode[randomMode]
        const randomNumber = threeRandomNumber(mode)
        setThreeNumber(randomNumber)
        setRandomMode(enumMode[randomMode])
    }
    //校驗
    const verifyCode = () => {
        const answer = threeNumber
            .map((item) => item.rNumber)
            .sort((a, b) => {
                if (randomMode === '>') {
                    return b - a
                } else {
                    return a - b
                }
            })
        const isMatch = result.every((item, index) => item === answer[index])
        if (isMatch) {
            endVerify(2)
        } else {
            endVerify(1)
            onRefresh()
        }
    }

    useEffect(() => {
        setUpCaptcha()
    }, [])

    useEffect(() => {
        if (result.length >= 3) {
            verifyCode()
        }
    }, [result])

    return (
        <div className="absolute h-full w-full flex justify-center items-center bg-gray-300	">
            <div className="captcha">
                <div className="captchaScreen" ref={captchaRef}>
                    {threeNumber.map((item, index) => (
                        <div
                            className="numberPlace"
                            style={{ top: item.x + 20, left: item.y + 20 }}
                            key={'number' + index}
                            onClick={() =>
                                setResult((prev) => [...prev, item.rNumber])
                            }
                        >
                            {item.rNumber}
                        </div>
                    ))}
                </div>
                <div className="mt-2 flex items-center justify-end">
                    <p className="flex-1 text-center">
                        {randomMode === '>' ? '請由大到小' : '請由小到大'}
                    </p>
                    <button onClick={onRefresh}>
                        <img className="recycle" src={recycle} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Captcha

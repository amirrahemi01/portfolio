import React from 'react'

type Props = {}

function Footer({ }: Props) {
    return (
        <footer className="flex flex-col bg-slate-960 text-slate-100 p-3 font-sans">

            <p className="float-right">&copy; 2024 Amir Rahemi, All rights reserved.</p>
            <p className="flex">
                made with
                <span className="mx-1">
                    <img src="https://emojicdn.elk.sh/%F0%9F%A9%B5" alt="" width="20" />
                </span>
                in rasht :)
            </p>

        </footer>
    )
}

export default Footer
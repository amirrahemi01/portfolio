import React from 'react'

type Props = {}

function Footer({ }: Props) {
    return (
        <footer className="bg-slate-960 text-slate-100 p-3 font-sans">

            <p className="float-right">&copy; 2024 Amir Rahemi, All rights reserved.</p>
            <p className="flex">
                made with
                <span className="mx-1">
                    <img src="https://emojicdn.elk.sh/%E2%9D%A4%EF%B8%8F" alt="" width="20" />
                </span>
                in rasht :)
            </p>

        </footer>
    )
}

export default Footer
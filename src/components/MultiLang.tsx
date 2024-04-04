import React from 'react'
import Dropdown from './Dropdown'
import { useTranslation } from 'react-i18next';
import { IoLanguage } from 'react-icons/io5';

import IR from "../assets/icon/iran.jpeg"
import USA from "../assets/icon/usa.jpeg"

type Props = {}

function MultiLang({ }: Props) {
    // Multi Language Functions
    const [t, i18n] = useTranslation("global");

    const handleChangeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
        document.documentElement.className = lang;
    };

    // Dropdown values
    const options = [
        { value: 'FA', label: <button className="flex items-center justify-center" onClick={() => handleChangeLanguage("en")}><p>EN</p> &#10240;<img src={USA} className="rounded" alt="USA Flag" width="50px" /></button> },
        { value: 'EN', label: <button className="flex items-center justify-center mt-1" onClick={() => handleChangeLanguage("fa")}><p>FA</p> &#10240;<img src={IR} className="rounded" alt="IRAN Flag" width="50px" /></button> },
    ];

    return (
        <div>
            <Dropdown
                options={options}
                text={<button><IoLanguage /></button>}
            />
        </div>
    )
}

export default MultiLang;
import React from 'react';

import Dropdown from './Dropdown'

import { useNavigate, useLocation } from 'react-router-dom';
import { IoLanguage } from 'react-icons/io5';

import IR from "../assets/icon/iran.jpeg"
import USA from "../assets/icon/usa.jpeg"

function MultiLang() {
    // Multi Language Functions — preserve current page when switching lang
    const navigate = useNavigate();
    const location = useLocation();

    const handleChangeLanguage = (lang: 'en' | 'fa') => {
        const { pathname, search, hash } = location;
        const isFa = pathname.startsWith('/fa');
        // strip /fa prefix to get language-agnostic path
        let base = isFa ? pathname.slice(3) : pathname;
        if (!base) base = '/';
        if (!base.startsWith('/')) base = '/' + base;

        let nextPath: string;
        if (lang === 'fa') {
            // already fa → stay, otherwise prefix with /fa
            nextPath = isFa ? pathname : (base === '/' ? '/fa' : `/fa${base}`);
        } else {
            // en → remove /fa prefix if present
            nextPath = isFa ? (base === '/' ? '/' : base) : pathname;
        }
        navigate(`${nextPath}${search}${hash}`);
    };

    // Dropdown values
    const options = [
        { value: 'FA', label: <button className="flex items-center justify-center" onClick={() => handleChangeLanguage("en")}><p>EN</p> &#10240;<img src={USA} className="rounded" alt="USA Flag" width="50px" loading="lazy" /></button> },
        { value: 'EN', label: <button className="flex items-center justify-center mt-1" onClick={() => handleChangeLanguage("fa")}><p>FA</p> &#10240;<img src={IR} className="rounded" alt="IRAN Flag" width="50px" loading="lazy" /></button> },
    ];

    return (
        <div className="text-gray-100">
            <Dropdown
                options={options}
                text={<button><IoLanguage /></button>}
            />
        </div>
    )
}

export default MultiLang;
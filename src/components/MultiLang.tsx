import React from 'react';

import Dropdown from './Dropdown'

import { useNavigate } from 'react-router-dom';
import { IoLanguage } from 'react-icons/io5';

import IR from "../assets/icon/iran.jpeg"
import USA from "../assets/icon/usa.jpeg"

function MultiLang() {
    // Multi Language Functions
    const navigate = useNavigate();

    const handleChangeLanguage = (lang: 'en' | 'fa') => {
        navigate(lang === 'fa' ? '/fa' : '/');
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
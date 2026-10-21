"use client";

// Path: src/components/ContactUs.tsx
import React, { useRef, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaSquareXTwitter, FaTelegram } from 'react-icons/fa6';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { useTranslation } from '@/i18n';
import { siteContent } from '@/data/site';
import { useToast } from './Toast';

interface ContactProps { }

// Each hover tilts the icon a different, unpredictable amount (4–14°, left or right).
let lastTilt = 0;
function randomTilt(e: React.SyntheticEvent<HTMLElement>) {
  let deg = 0;
  do {
    deg = (4 + Math.random() * 10) * (Math.random() < 0.5 ? -1 : 1);
  } while (Math.abs(deg - lastTilt) < 5);
  lastTilt = deg;
  e.currentTarget.style.setProperty('--tilt', `${deg.toFixed(1)}deg`);
}

const ContactUs: React.FC<ContactProps> = () => {
  const form = useRef<HTMLFormElement>(null);
  const [t, i18n] = useTranslation("global");

  const { showToast, ToastContainer } = useToast();

const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!form.current) return;

  const formData = new FormData(form.current);

  // Honeypot: a hidden field people never see. If something filled it, it's a bot —
  // act as if it worked, but send nothing.
  if (String(formData.get('website') || '').trim() !== '') {
    showToast(t('content.messageSentSuccess'), 'success');
    form.current.reset();
    return;
  }

  const name = formData.get('user_name');
  const email = formData.get('user_email');
  const message = formData.get('message');

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  // Two independent channels, sent together: the email (EmailJS) and an instant Telegram alert
  // (our own /api/contact function, which keeps the bot token on the server). The message
  // counts as sent if either one gets through, so one service being down never loses it.
  const sendEmailJs = async () => {
    if (!serviceId || !templateId || !publicKey) {
      throw new Error('EmailJS environment variables are missing');
    }
    // `time` and `lang` are used by the email template (see emailjs/contact-template.html).
    const time = `${new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Tehran' })} (Tehran)`;
    const language = i18n.language === 'fa' ? 'Persian' : 'English';
    await emailjs.send(serviceId, templateId, { name, email, message, time, lang: language }, publicKey);
  };

  const sendTelegram = async () => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message, lang: i18n.language }),
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.ok) throw new Error(`Telegram alert failed (${response.status})`);
  };

  const [emailResult, telegramResult] = await Promise.allSettled([sendEmailJs(), sendTelegram()]);
  if (emailResult.status === 'rejected') console.error('Email failed:', emailResult.reason);
  if (telegramResult.status === 'rejected') console.error('Telegram alert failed:', telegramResult.reason);

  if (emailResult.status === 'fulfilled' || telegramResult.status === 'fulfilled') {
    showToast(t('content.messageSentSuccess'), 'success');
    form.current?.reset();
  } else {
    showToast(t('content.messageSentError'), 'error');
  }
};

  const socialLinks = [
    { icon: <FaTelegram />, href: siteContent.telegram, color: 'hover:text-blue-300 dark:hover:text-blue-200', label: 'Telegram' },
    { icon: <FaLinkedinIn />, href: 'https://linkedin.com/in/amirrahemi', color: 'hover:text-blue-300 dark:hover:text-blue-200', label: 'LinkedIn' },
    { icon: <FaGithub />, href: 'https://github.com/amirrahemi01', color: 'hover:text-purple-400', label: 'GitHub' },
    { icon: <FaFacebookF />, href: 'https://facebook.com/madeby_amir', color: 'hover:text-blue-300 dark:hover:text-blue-200', label: 'Facebook' },
    { icon: <FaInstagram />, href: 'https://instagram.com/amirrahemiii', color: 'hover:text-pink-400', label: 'Instagram' },
    { icon: <FaSquareXTwitter />, href: 'https://twitter.com/madeby_amir', color: 'hover:text-blue-300 dark:hover:text-blue-200', label: 'Twitter' },
  ];

  const isFa = (i18n.language || "en") as "en" | "fa";

  return (
    <div className="w-full py-20 px-4 relative rounded-2xl bg-[#ededed] dark:bg-[#080808] p-4" id="contact">
      <ToastContainer />

      
      <div className="max-w-6xl mx-auto relative z-10" dir={isFa === "fa"  ? "rtl" : "ltr"} >
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="type-title mb-4 px-4"
          >
            {t('content.contact')}
          </h2>

          <div className="h-1.5 w-24 md:w-32 mx-auto bg-blue-200 rounded-full"></div>
          <p className="type-body mt-4 px-4">{t('content.contactText')}</p>
        </div>

        <div className="mb-12 md:mb-16" />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Contact Form */}
          <div
            className="backdrop-blur-xl bg-white/10 dark:bg-slate-800/30 rounded-3xl p-8 border border-white/20 dark:border-slate-700/50 shadow-2xl transition-all duration-500 text-left rtl:text-right"
          >
            <form dir={isFa === "fa" ? "rtl" : "ltr"} ref={form} onSubmit={sendEmail} className="space-y-6">
              {/* Honeypot (spam trap): off-screen and skipped by keyboard/screen readers; bots fill it in. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="type-label block mb-2">{t("content.contactName")}</label>
                  <input
                    type="text"
                    name="user_name"
                    placeholder={t("content.placeHolderName")}
                    required
                    className="contact-field"
                  />
                </div>

                <div className="group">
                  <label className="type-label block mb-2">{t("content.contactEmail")}</label>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="your@email.com"
                    required
                    className="contact-field"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="group">
                <label className="type-label block mb-2">{t("content.contactMessage")}</label>
                <textarea
                  name="message"
                  placeholder={t("content.placeHolderYourMessage")}
                  required
                  rows={6}
                  className="contact-field resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3.5 bg-blue-300 hover:brightness-125 rounded-full text-white font-bold text-base transition duration-200"
              >
                <span className="relative ltr:top-[0.17em]">{t("content.contactSendMessage")}</span>
              </button>
            </form>
          </div>

          {/* Social Links & Info */}
          <div className="flex flex-col justify-center space-y-8">

            {/* Social Icons */}
            <div
              className="backdrop-blur-xl bg-slate-655/10 dark:bg-slate-655/20 rounded-3xl p-8 border border-white/20 dark:border-slate-700/50 shadow-2xl"
            >
              <h3 className="type-heading mb-6 text-center">{t("content.contactConnect")}</h3>
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-center w-16 h-16 mx-auto bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border-2 border-white/20 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 ${social.color} transition-all duration-300 hover:[transform:rotate(var(--tilt,6deg))_scale(1.1)] focus-visible:[transform:rotate(var(--tilt,6deg))_scale(1.1)] hover:shadow-xl`}
                    aria-label={social.label}
                    onMouseEnter={randomTilt}
                    onFocus={randomTilt}
                  >
                    <span className="text-3xl">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info Cards */}
            <div
              className="backdrop-blur-xl bg-slate-655/10 dark:bg-slate-655/20 rounded-3xl p-8 border border-white/20 dark:border-slate-700/50 shadow-2xl"
            >
              <h3 className="type-heading mb-4 text-left rtl:text-right">{t("content.contactGet")}</h3>
              <div className="space-y-3">
                {/* A real mailto link, so tapping it opens the visitor's email app */}
                <a
                  href={`mailto:${siteContent.email}`}
                  dir="ltr"
                  className="group flex w-fit items-center gap-3 text-base text-black/65 transition-colors hover:text-black dark:text-white/65 dark:hover:text-white"
                >
                  <span className="w-10 h-10 flex items-center justify-center bg-blue-300/10 dark:bg-blue-200/15 rounded-lg">
                    <MdOutlineAlternateEmail className="text-blue-300 dark:text-blue-200" />
                  </span>
                  <span className="lowercase underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-current">
                    {siteContent.email}
                  </span>
                </a>
                <p className="type-small mt-4">
                  {t("content.contactDes")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
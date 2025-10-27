// Path: src/components/ContactUs.tsx
import React, { useRef, FormEvent } from 'react';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaSquareXTwitter } from 'react-icons/fa6';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useToast } from './Toast';

interface ContactProps { }

const ContactUs: React.FC<ContactProps> = () => {
  const form = useRef<HTMLFormElement>(null);
  const [t, i18n] = useTranslation("global");

  const { showToast, ToastContainer } = useToast();

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS environment variables are missing');
      alert('Email service is not configured. Please check environment variables.');
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        (response: EmailJSResponseStatus) => {
          console.log('SUCCESS!', response);
          showToast('Message sent successfully! 🎉', 'success');
          form.current?.reset();
        },
        (error: any) => {
          console.error('FAILED...', error);
          showToast('Failed to send message. Please try again.', 'error');
        }
      );

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS environment variables are missing');
      showToast('Email service is not configured. Please check environment variables.', 'error');
      return;
    }
  };

  const socialLinks = [
    { icon: <MdOutlineAlternateEmail />, href: 'mailto:amirrahemi01@gmail.com', color: 'hover:text-red-400', label: 'Email' },
    { icon: <FaLinkedinIn />, href: 'https://linkedin.com/in/amirrahemi', color: 'hover:text-blue-400', label: 'LinkedIn' },
    { icon: <FaGithub />, href: 'https://github.com/amirrahemi', color: 'hover:text-purple-400', label: 'GitHub' },
    { icon: <FaFacebookF />, href: 'https://facebook.com/madeby_amir', color: 'hover:text-blue-500', label: 'Facebook' },
    { icon: <FaInstagram />, href: 'https://instagram.com/amirrahemiii', color: 'hover:text-pink-400', label: 'Instagram' },
    { icon: <FaSquareXTwitter />, href: 'https://twitter.com/madeby_amir', color: 'hover:text-sky-400', label: 'Twitter' },
  ];

  return (
    <div className="w-full py-20 px-4 relative" id="contact">
      <ToastContainer />
      
      {/* Background Effects */}
      <div className="absolute top-10 left-5 md:top-20 md:left-20 w-48 h-48 md:w-72 md:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-5 md:bottom-20 md:right-20 w-64 h-64 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 px-4"
            style={{
              background: 'linear-gradient(to right, rgb(96, 165, 250), rgb(192, 132, 252), rgb(244, 114, 182))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {t("content.contact")}
          </h2>
          <div className="h-1.5 w-24 md:w-32 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-base md:text-lg px-4">Let's create something amazing together</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Contact Form */}
          <div 
            className="backdrop-blur-xl bg-white/10 dark:bg-slate-800/30 rounded-3xl p-8 border border-white/20 dark:border-slate-700/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
            style={{ animation: 'fadeInLeft 0.6s ease-out' }}
          >
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t("content.contactName")}</label>
                  <input
                    type="text"
                    name="user_name"
                    placeholder={t("content.placeHolderName")}
                    required
                    className="w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 rounded-xl px-5 py-3 border-2 border-transparent focus:border-blue-400 dark:focus:border-blue-500 focus:outline-none transition-all duration-300 group-hover:bg-white/70 dark:group-hover:bg-slate-900/70"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t("content.contactEmail")}</label>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="your@email.com"
                    required
                    className="w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 rounded-xl px-5 py-3 border-2 border-transparent focus:border-blue-400 dark:focus:border-blue-500 focus:outline-none transition-all duration-300 group-hover:bg-white/70 dark:group-hover:bg-slate-900/70"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="group">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t("content.contactMessage")}</label>
                <textarea
                  name="message"
                  placeholder={t("content.placeHolderYourMessage")}
                  required
                  rows={6}
                  className="w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 rounded-xl px-5 py-3 border-2 border-transparent focus:border-blue-400 dark:focus:border-blue-500 focus:outline-none resize-none transition-all duration-300 group-hover:bg-white/70 dark:group-hover:bg-slate-900/70"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group relative w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105"
              >
                <span className="relative z-10">{t("content.contactSendMessage")}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>
          </div>

          {/* Social Links & Info */}
          <div className="flex flex-col justify-center space-y-8">
            
            {/* Social Icons */}
            <div 
              className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-3xl p-8 border border-white/20 dark:border-slate-700/50 shadow-2xl"
              style={{ animation: 'fadeInRight 0.6s ease-out' }}
            >
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">{t("content.contactConnect")}</h3>
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-center w-16 h-16 mx-auto bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border-2 border-white/20 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 ${social.color} transition-all duration-300 hover:scale-110 hover:rotate-6 hover:shadow-xl`}
                    style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
                    aria-label={social.label}
                  >
                    <span className="text-3xl">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info Cards */}
            <div 
              className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-3xl p-8 border border-white/20 dark:border-slate-700/50 shadow-2xl"
              style={{ animation: 'fadeInRight 0.6s ease-out 0.2s both' }}
            >
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{t("content.contactGet")}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <MdOutlineAlternateEmail className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="lowercase">amirrahemi01@gmail.com</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                  {t("content.contactDes")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ContactUs;
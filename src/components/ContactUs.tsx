import React, { useRef, FormEvent } from 'react';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { FaFacebookF, FaGithub, FaInbox, FaInstagram, FaLinkedinIn, FaLocationArrow, FaSquareXTwitter, FaX } from 'react-icons/fa6';
import { MdOutlineAlternateEmail } from 'react-icons/md';

interface ContactProps { }

const ContactUs: React.FC<ContactProps> = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, {
        publicKey: 'YOUR_PUBLIC_KEY',
      })
      .then(
        (response: EmailJSResponseStatus) => {
          console.log('SUCCESS!', response);
        },
        (error: any) => {
          console.error('FAILED...', error);
        }
      );
  };

  return (
    <div className="inline-flex items-center gap-4 w-full">

      <form ref={form} onSubmit={sendEmail} className="flex flex-col text-blue-100 float-left">
        <h2 className="text-4xl">Just Say Hello!</h2>
        <div className="inline-flex gap-4">
          <input className="bg-slate-655 focus:outline-none rounded-xl p-5 my-4 w-1/2" placeholder="Name" type="text" name="user_name" />

          <input className="bg-slate-655 focus:outline-none rounded-xl p-5 my-4 w-1/2" placeholder="Email" type="email" name="user_email" />
        </div>

        <textarea className="bg-slate-655 focus:outline-none rounded-xl p-5 my-4 resize-none" placeholder="Message" name="message" />
        <input className="bg-blue-100 text-black px-4 py-2 w-28 rounded-xl cursor-pointer" type="submit" value="Send" />
      </form>


      <div className="float-right flex flex-col justify-center items-center w-1/2 p-5 h-full rounded-xl gap-2">
        <h2 className="text-3xl">More</h2>
        <br />
        <div className="flex flex-row justify-center text-5xl">
          <a href="mailto:amirrahemi01@gmail.com"><MdOutlineAlternateEmail /></a>
          <a href="https://linkedin.com/in/amirrahemi"><FaLinkedinIn /></a>
          <a href="https://linkedin.com/"><FaGithub /></a>
          <a href="https://linkedin.com/madeby_amir"><FaFacebookF /></a>
          <a href="https://linkedin.com/amirrahemiii"><FaInstagram /></a>
          <a href="https://linkedin.com/madeby_amir"><FaSquareXTwitter /></a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

import React, { useRef, FormEvent } from 'react';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

interface ContactProps {}

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
    <form ref={form} onSubmit={sendEmail} className="flex flex-col">
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};

export default ContactUs;

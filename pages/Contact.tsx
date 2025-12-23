import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TrueFocus, BlurText } from '../components/AnimatedUI';
import HeroOrb from '../components/HeroOrb';

const schema = z.object({
  name: z.string().min(2, "Name ist zu kurz"),
  email: z.string().email("Ungültige Email"),
  company: z.string().min(1, "Firma erforderlich"),
  message: z.string().min(10, "Nachricht bitte etwas ausführlicher"),
  privacy: z.boolean().refine(val => val === true, "Datenschutz muss akzeptiert werden")
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Subtle Orb for Contact too */}
      <div className="absolute top-0 right-0 opacity-30 pointer-events-none transform translate-x-1/2 -translate-y-1/2">
        <HeroOrb />
      </div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl font-display font-bold mb-6">
            <BlurText text="Let's build the future." />
          </h1>
          <p className="text-xl text-gray-500 mb-10">
            Bereit für den nächsten Schritt? Buchen Sie ein unverbindliches Kennenlernen oder schreiben Sie uns.
          </p>

          <div className="space-y-8">
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
              <h3 className="font-bold mb-2">Office Berlin</h3>
              <p className="text-gray-500">Torstraße 1, 10119 Berlin<br />Germany</p>
            </div>

            <a href="#" className="block w-full text-center py-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:text-blue-500 transition-colors font-mono">
              [ Book a 15min Discovery Call ]
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-black p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center text-4xl mb-6">✓</div>
              <h3 className="text-2xl font-bold mb-2">Nachricht gesendet!</h3>
              <p className="text-gray-500">Wir melden uns innerhalb von 24 Stunden.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <TrueFocus placeholder="Name" {...register('name')} />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <TrueFocus placeholder="Email" type="email" {...register('email')} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <TrueFocus placeholder="Company" {...register('company')} />
                {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
              </div>

              <div className="relative">
                <textarea
                  {...register('message')}
                  placeholder="Wie können wir helfen?"
                  className="w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-700 py-3 px-1 text-lg outline-none focus:border-blue-500 transition-colors min-h-[100px] resize-none"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  {...register('privacy')}
                  className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="privacy" className="text-sm text-gray-500">
                  Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu.
                </label>
              </div>
              {errors.privacy && <p className="text-red-500 text-sm">{errors.privacy.message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sende...' : 'Anfrage absenden'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
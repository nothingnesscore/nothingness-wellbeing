import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { AnimatedAccordion } from '../animations/AnimatedAccordion';

export function FaqSection() {
  const { darkMode } = useTheme();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "What is non-clinical counselling?",
      answer: "Non-clinical counselling focuses on personal growth, self-understanding, and navigating life's challenges without relying on medical diagnoses or clinical frameworks. It is a person-centred approach where we explore your experiences in a safe, non-judgmental space. Please note that it is not a substitute for psychiatric treatment or crisis intervention."
    },
    {
      question: "How do the psychology tutoring sessions work?",
      answer: "Tutoring sessions are designed around your specific curriculum and learning goals, whether you are in Class XI/XII, an undergraduate, or a postgraduate student. We move beyond rote learning, focusing on deep conceptual clarity and critical thinking through dialogue and practice."
    },
    {
      question: "Are sessions held online or in person?",
      answer: "Both options are available. Online sessions are conducted via video call, offering flexibility to suit your schedule. In-person sessions take place at our calm, welcoming space in Kalighat, Kolkata."
    },
    {
      question: "What are your fees?",
      answer: "Pricing is personalised and tailored to your circumstances, reflecting our commitment to accessible support. There is no one-size-fits-all approach. Please reach out to discuss what feels right and feasible for you."
    },
    {
      question: "How long is a typical session?",
      answer: "A standard counselling or tutoring session lasts for 50 to 60 minutes. We can adjust the frequency and duration based on your evolving needs and learning pace."
    }
  ];

  return (
    <section id="faq" className="mb-20 reveal-on-scroll">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-light mb-3">Frequently Asked Questions</h3>
        <div className="zen-line"></div>
        <p className="text-stone-600 dark:text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          Answers to some common questions about our practice.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((item, index) => (
          <AnimatedAccordion 
            key={index}
            title={item.question}
            darkMode={darkMode}
            isOpen={expandedFaq === index}
            onToggle={() => toggleFaq(index)}
          >
            {item.answer}
          </AnimatedAccordion>
        ))}
      </div>
    </section>
  );
}

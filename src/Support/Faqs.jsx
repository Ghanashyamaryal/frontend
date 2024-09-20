import React from 'react';

const FAQs = () => {
  const faqs = [
    {
      question: "How do I book a travel package?",
      answer: "To book a travel package, browse our available packages, select your desired package, and follow the booking process. You will receive a confirmation email once your booking is successful.",
    },
    {
      question: "What is the cancellation policy?",
      answer: "Our cancellation policy allows you to cancel your booking up to 7 days before your travel date for a full refund. Cancellations made within 7 days will incur a fee.",
    },
    {
      question: "How can I contact customer support?",
      answer: "You can contact our customer support team via email at support@etravelguide.com or call us at (123) 456-7890.",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Frequently Asked Questions</h2>
      <div className="max-w-2xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-lg text-blue-400 font-semibold mb-2"> Q : {faq.question}</h4>
            <p className="text-gray-700">A: {faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;

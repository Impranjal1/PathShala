import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send } from 'lucide-react';
import { z } from 'zod';
import emailjs from '@emailjs/browser';

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    rating: z.number().min(1, "Please select a rating").max(5)
});

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_ID = import.meta.env.VITE_PUBLIC_ID;

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        message: '',
        rating: 0
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [focused, setFocused] = useState({
        name: false,
        message: false
    });

    const handleStarClick = (rating) => {
        setFormData(prev => ({ ...prev, rating }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleFocus = (name) => {
        setFocused(prev => ({ ...prev, [name]: true }));
    };

    const handleBlur = (name) => {
        setFocused(prev => ({ ...prev, [name]: false }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        setSubmitStatus('');
    
        try {
            const validData = contactSchema.parse(formData);
            
            // Prepare the email payload
            const emailParams = {
                from_name: validData.name,
                message: validData.message,
                rating: validData.rating, // Send the rating value here
                to_name: "Recipient Name" // Replace this with the recipient's name, or leave it dynamic
            };
    
            // Send the email using emailjs
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                emailParams, // Pass the payload with the message and rating
                PUBLIC_ID
            );
    
            setSubmitStatus('success');
            setFormData({ name: '', message: '', rating: 0 });
        } catch (error) {
            if (error instanceof z.ZodError) {
                const formattedErrors = {};
                error.errors.forEach(err => {
                    formattedErrors[err.path[0]] = err.message;
                });
                setErrors(formattedErrors);
            } else {
                setSubmitStatus('error');
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white shadow-md rounded-xl p-6 border border-gray-100"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                    <label
                        htmlFor="name"
                        className={`absolute left-3 transition-all duration-200 ${
                            focused.name || formData.name
                                ? '-top-2.5 text-xs bg-white px-2 text-blue-600'
                                : 'top-3 text-gray-500'
                        }`}
                    >
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={() => handleBlur('name')}
                        className={`mt-0 block w-full px-3 py-3 bg-white border-2 rounded-lg shadow-sm transition-colors duration-200
                            ${errors.name 
                                ? 'border-red-300 focus:border-red-500' 
                                : 'border-gray-200 focus:border-blue-500'
                            }
                            ${focused.name ? 'border-blue-500' : ''}
                        `}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                            <span className="mr-1">•</span>{errors.name}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Rating
                    </label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                                key={star}
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleStarClick(star)}
                                className="focus:outline-none transition-transform duration-200 hover:rotate-12"
                            >
                                <Star
                                    className={`w-6 h-6 transition-colors duration-200 ${
                                        star <= formData.rating 
                                            ? 'fill-yellow-400 text-yellow-400' 
                                            : 'text-gray-300 hover:text-yellow-300'
                                    }`}
                                />
                            </motion.button>
                        ))}
                    </div>
                    {errors.rating && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                            <span className="mr-1">•</span>{errors.rating}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <label
                        htmlFor="message"
                        className={`absolute left-3 transition-all duration-200 ${
                            focused.message || formData.message
                                ? '-top-2.5 text-xs bg-white px-2 text-blue-600'
                                : 'top-3 text-gray-500'
                        }`}
                    >
                        Your Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={() => handleBlur('message')}
                        className={`mt-0 block w-full px-3 py-3 bg-white border-2 rounded-lg shadow-sm transition-colors duration-200
                            ${errors.message 
                                ? 'border-red-300 focus:border-red-500' 
                                : 'border-gray-200 focus:border-blue-500'
                            }
                            ${focused.message ? 'border-blue-500' : ''}
                        `}
                    />
                    {errors.message && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                            <span className="mr-1">•</span>{errors.message}
                        </p>
                    )}
                </div>

                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center space-x-2
                        ${isSubmitting 
                            ? 'bg-blue-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        } transition-all duration-200 shadow-md hover:shadow-lg`}
                >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
                </motion.button>

                {submitStatus && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3 rounded-lg text-center ${
                            submitStatus === 'success' 
                                ? 'bg-green-50 text-green-700' 
                                : 'bg-red-50 text-red-700'
                        }`}
                    >
                        {submitStatus === 'success' 
                            ? 'Thank you for your message! We ll get back to you soon.'
                            : 'There was an error sending your message. Please try again later.'}
                    </motion.div>
                )}
            </form>
        </motion.div>
    );
};

export default ContactForm;
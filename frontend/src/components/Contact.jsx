import { motion } from 'framer-motion';
import {
    //  FaFacebook,
    FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp
} from "react-icons/fa";
import {
    Phone, Mail,
    //  ArrowRight,
    Clock, MapPinHouse
} from 'lucide-react';
import ContactForm from './ContactForm';

const socialIcons = [
    // { Icon: FaFacebook, color: "#1877F2", label: "Facebook" },
    { Icon: FaTwitter, color: "#1DA1F2", label: "Twitter" },
    { Icon: FaInstagram, color: "#E4405F", label: "Instagram" },
    { Icon: FaLinkedin, color: "#0A66C2", label: "LinkedIn" },
    { Icon: FaWhatsapp, color: "#25D366", label: "WhatsApp" }
];

const Contact = () => {
    // const quickLinks = [
    //     { title: "Home", href: "#" },
    //     { title: "Features", href: "#" },
    //     { title: "About Us", href: "#" },
    //     { title: "Calculator", href: "#" },
    //     { title: "Reviews", href: "#" },
    // ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <footer className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <h2 className="text-5xl font-bold mb-2 text-gray-800">Get in Touch</h2>
                    <p className="text-xl text-gray-600">We love to hear from you. Contact us for any queries.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        {["Phone", "Email", "Working Hours", "Address"].map((info, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.01 }}
                                className="bg-white p-4 rounded-lg border border-gray-100 hover:border-blue-500 transition-colors duration-300"
                            >
                                <div className="flex items-center space-x-3">
                                    {info === "Phone" && <Phone className="w-4 h-4 text-blue-600" />}
                                    {info === "Email" && <Mail className="w-4 h-4 text-blue-600" />}
                                    {info === "Working Hours" && <Clock className="w-4 h-4 text-blue-600" />}
                                    {info === "Address" && <MapPinHouse className="w-4 h-4 text-blue-600" />}
                                    <div>
                                        <h3 className="text-base font-medium text-gray-800">{info}</h3>
                                        <p className="text-sm text-gray-600">
                                            {info === "Phone" ? "+91 1234567890" :
                                                info === "Address" ? "Mumbai Jaipur Thane Noida" :
                                                    info === "Email" ? "contact@Pathshala.com" :
                                                        "Mon - Sat: 9:00 AM - 7:00 PM"}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <ContactForm />
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center mt-12 border-t border-gray-200 pt-8">
                    <div className="text-center">
                        <motion.h3
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-2xl font-semibold text-gray-800"
                        >
                            PathShala
                        </motion.h3>
                        <p className="text-lg text-gray-600 max-w-lg mx-auto">
                            Making education accessible and hassle-free for everyone.
                        </p>

                        <div className="flex justify-center items-center space-x-4 mt-4">
                            {socialIcons.map(({ Icon, color, label }, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 w-16 h-16 bg-white shadow-sm rounded-full hover:bg-gray-50 flex justify-center items-center"
                                    style={{ border: `1px solid ${color}20` }}
                                >
                                    <Icon className="w-8 h-8" style={{ color }} />
                                    <span className="sr-only">{label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-200 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <p className="text-center text-sm text-gray-600">
                        © {new Date().getFullYear()} PathShala. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Contact;